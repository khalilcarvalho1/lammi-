import { useEffect, useState } from 'react'
import { StudyTheme } from '@/services/supabaseClient'
import { AREAS, countByArea, countByTema } from '@/services/content-hierarchy'

interface Props {
  selected: Set<StudyTheme>
  onChange: (next: Set<StudyTheme>) => void
  counts: Record<string, number>
  // Opcional: aproveitamento do usuário por tema/subtema (histórico local),
  // usado para mostrar "45 questões · 32% acerto" ao lado da contagem.
  progress?: Record<string, { total: number; acertos: number }>
}

function sumProgress(ids: string[], progress: Record<string, { total: number; acertos: number }>) {
  return ids.reduce((acc, id) => {
    const p = progress[id]
    if (p) { acc.total += p.total; acc.acertos += p.acertos }
    return acc
  }, { total: 0, acertos: 0 })
}

// Filtro hierárquico em dois níveis: Área (expansível) > Tema (selecionável).
// Selecionar um tema inclui automaticamente todos os seus subtemas no filtro,
// igual ao comportamento de ?tema= na URL (ver resolverFiltroURL).
export function ThemeHierarchyFilter({ selected, onChange, counts, progress }: Props) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set())

  // Auto-expande áreas que já têm algum tema/subtema selecionado (ex.: vindo de link ?tema=)
  useEffect(() => {
    if (selected.size === 0) return
    setExpanded(prev => {
      const next = new Set(prev)
      for (const area of AREAS) {
        const temQualquerSelecionado = area.temas.some(
          t => selected.has(t.id as StudyTheme) || t.subtemas.some(s => selected.has(s.id as StudyTheme))
        )
        if (temQualquerSelecionado) next.add(area.id)
      }
      return next
    })
  }, [selected])

  const toggleExpand = (areaId: string) => {
    setExpanded(prev => { const n = new Set(prev); n.has(areaId) ? n.delete(areaId) : n.add(areaId); return n })
  }

  const toggleTema = (temaId: string, subtemaIds: string[]) => {
    const ids = [temaId, ...subtemaIds]
    const ativo = ids.every(id => selected.has(id as StudyTheme))
    const next = new Set(selected)
    ids.forEach(id => { ativo ? next.delete(id as StudyTheme) : next.add(id as StudyTheme) })
    onChange(next)
  }

  const areasComConteudo = AREAS
    .map(area => ({ area, total: countByArea(area.id, counts) }))
    .filter(({ total }) => total > 0)

  if (areasComConteudo.length === 0) {
    return <span style={{ fontSize: '.72rem', color: 'var(--text-dim)' }}>Nenhuma área com questões ainda</span>
  }

  return (
    <div>
      {areasComConteudo.map(({ area, total }) => {
        const isOpen = expanded.has(area.id)
        const temasComConteudo = area.temas
          .map(tema => ({ tema, total: countByTema(tema.id, counts) }))
          .filter(({ total }) => total > 0)

        return (
          <div key={area.id}>
            <button
              className="tema-btn"
              onClick={() => toggleExpand(area.id)}
              aria-expanded={isOpen}
            >
              <span style={{ fontSize: '.84rem', display: 'flex', alignItems: 'center', gap: '.4rem' }}>
                <span style={{ display: 'inline-block', width: '.9em', transition: 'transform .15s', transform: isOpen ? 'rotate(90deg)' : 'none' }}>▸</span>
                {area.emoji} {area.label}
              </span>
              <span className="count-badge">{total}</span>
            </button>

            {isOpen && (
              <div style={{ marginLeft: '.9rem', marginBottom: '.3rem' }}>
                {temasComConteudo.map(({ tema, total: temaTotal }) => {
                  const subtemaIds = tema.subtemas.map(s => s.id)
                  const ativo = [tema.id, ...subtemaIds].every(id => selected.has(id as StudyTheme))
                  const prog = progress ? sumProgress([tema.id, ...subtemaIds], progress) : null
                  return (
                    <button
                      key={tema.id}
                      className={`subtema-btn ${ativo ? 'active' : ''}`}
                      onClick={() => toggleTema(tema.id, subtemaIds)}
                    >
                      <span style={{ fontSize: '.8rem' }}>
                        {tema.label}
                        {prog && prog.total > 0 && (
                          <span style={{ display: 'block', fontSize: '.68rem', opacity: .75, fontWeight: 400 }}>
                            {prog.total} respondida{prog.total !== 1 ? 's' : ''} · {Math.round(prog.acertos / prog.total * 100)}% acerto
                          </span>
                        )}
                      </span>
                      <span className="count-badge">{temaTotal}</span>
                    </button>
                  )
                })}
                {temasComConteudo.length === 0 && (
                  <span style={{ fontSize: '.7rem', color: 'var(--text-dim)' }}>Nenhum tema com questões</span>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
