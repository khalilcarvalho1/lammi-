import { useState } from 'react'
import { AREAS, countByArea, countByTema, getAllSubtemaIds, Area, Tema } from '@/services/content-hierarchy'

// Item de seleção do simulado — pode representar uma ÁREA inteira (todos os
// temas com conteúdo) ou um TEMA específico dentro de uma área. Os dois níveis
// nunca coexistem para a mesma área: selecionar todos os temas de uma área
// colapsa automaticamente para uma única entrada 'area', e desmarcar um tema
// dentro de uma área totalmente selecionada "quebra" essa entrada em temas
// individuais (todos exceto o desmarcado).
export interface SelItem {
  key: string           // 'area:<id>' ou 'tema:<id>'
  kind: 'area' | 'tema'
  label: string
  areaLabel: string
  areaId: string
  emoji: string
  studyThemes: string[] // ids (tema + subtemas) a passar para loadQuestionsForFilter
  available: number
}

interface Props {
  counts: Record<string, number>
  selection: Map<string, SelItem>
  onChange: (next: Map<string, SelItem>) => void
}

export function SimuladoContentSelector({ counts, selection, onChange }: Props) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set())

  const areasComConteudo = AREAS
    .map(area => ({ area, total: countByArea(area.id, counts) }))
    .filter(({ total }) => total > 0)

  const toggleExpand = (areaId: string) => {
    setExpanded(prev => { const n = new Set(prev); n.has(areaId) ? n.delete(areaId) : n.add(areaId); return n })
  }

  const temasComConteudoDe = (area: Area) =>
    area.temas.map(tema => ({ tema, total: countByTema(tema.id, counts) })).filter(x => x.total > 0)

  const isAreaFull = (areaId: string) => selection.has(`area:${areaId}`)
  const isAreaPartial = (area: Area) =>
    !isAreaFull(area.id) && temasComConteudoDe(area).some(({ tema }) => selection.has(`tema:${tema.id}`))

  const areaEntry = (area: Area, total: number): SelItem => ({
    key: `area:${area.id}`,
    kind: 'area',
    label: area.label,
    areaLabel: area.label,
    areaId: area.id,
    emoji: area.emoji,
    studyThemes: [...new Set([...getAllSubtemaIds(area.id), ...area.temas.map(t => t.id)])],
    available: total,
  })

  const temaEntry = (area: Area, tema: Tema, total: number): SelItem => ({
    key: `tema:${tema.id}`,
    kind: 'tema',
    label: tema.label,
    areaLabel: area.label,
    areaId: area.id,
    emoji: area.emoji,
    studyThemes: [tema.id, ...tema.subtemas.map(s => s.id)],
    available: total,
  })

  const toggleArea = (area: Area, total: number) => {
    const next = new Map(selection)
    const key = `area:${area.id}`
    if (next.has(key)) {
      next.delete(key)
    } else {
      for (const it of [...next.values()]) {
        if (it.kind === 'tema' && it.areaId === area.id) next.delete(it.key)
      }
      next.set(key, areaEntry(area, total))
    }
    onChange(next)
  }

  const toggleTema = (area: Area, tema: Tema, total: number) => {
    const next = new Map(selection)
    const areaKey = `area:${area.id}`
    const temaKey = `tema:${tema.id}`
    const temasComConteudo = temasComConteudoDe(area)

    if (next.has(areaKey)) {
      // Área estava totalmente selecionada — "quebra" em temas individuais,
      // omitindo o que está sendo desmarcado agora.
      next.delete(areaKey)
      for (const { tema: t, total: tTotal } of temasComConteudo) {
        if (t.id === tema.id) continue
        next.set(`tema:${t.id}`, temaEntry(area, t, tTotal))
      }
    } else if (next.has(temaKey)) {
      next.delete(temaKey)
    } else {
      next.set(temaKey, temaEntry(area, tema, total))
      // Se agora todos os temas com conteúdo da área estão selecionados
      // individualmente, colapsa para uma única entrada de área.
      const todosSelecionados = temasComConteudo.every(({ tema: t }) => t.id === tema.id || next.has(`tema:${t.id}`))
      if (todosSelecionados) {
        for (const { tema: t } of temasComConteudo) next.delete(`tema:${t.id}`)
        next.set(areaKey, areaEntry(area, countByArea(area.id, counts)))
      }
    }
    onChange(next)
  }

  if (areasComConteudo.length === 0) {
    return <span style={{ fontSize: '.72rem', color: 'var(--text-dim)' }}>Nenhuma área com questões ainda</span>
  }

  return (
    <div>
      {areasComConteudo.map(({ area, total }) => {
        const isOpen = expanded.has(area.id)
        const full = isAreaFull(area.id)
        const partial = isAreaPartial(area)
        const temasComConteudo = temasComConteudoDe(area)

        return (
          <div key={area.id} style={{ marginBottom: '.15rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
              <input
                type="checkbox"
                checked={full}
                ref={el => { if (el) el.indeterminate = partial }}
                onChange={() => toggleArea(area, total)}
                style={{ cursor: 'pointer', flexShrink: 0 }}
                aria-label={`Selecionar toda a área ${area.label}`}
              />
              <button
                className="tema-btn"
                onClick={() => toggleExpand(area.id)}
                aria-expanded={isOpen}
                style={{ flex: 1 }}
              >
                <span style={{ fontSize: '.84rem', display: 'flex', alignItems: 'center', gap: '.4rem' }}>
                  <span style={{ display: 'inline-block', width: '.9em', transition: 'transform .15s', transform: isOpen ? 'rotate(90deg)' : 'none' }}>▸</span>
                  {area.emoji} {area.label}
                </span>
                <span className="count-badge">{total}</span>
              </button>
            </div>

            {isOpen && (
              <div style={{ marginLeft: '1.6rem', marginBottom: '.3rem' }}>
                {temasComConteudo.map(({ tema, total: temaTotal }) => {
                  const ativo = full || selection.has(`tema:${tema.id}`)
                  return (
                    <label key={tema.id} className={`subtema-btn ${ativo ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '.5rem', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={ativo}
                        onChange={() => toggleTema(area, tema, temaTotal)}
                        style={{ cursor: 'pointer', flexShrink: 0 }}
                      />
                      <span style={{ fontSize: '.8rem', flex: 1 }}>{tema.label}</span>
                      <span className="count-badge">{temaTotal}</span>
                    </label>
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
