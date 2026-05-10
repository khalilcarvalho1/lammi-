import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { THEMES, StudyTheme } from '@/services/supabaseClient'
import { aulasService, Aula } from '@/services/aulasService'

const TYPE_ICONS:  Record<string, string> = { video: '🎬', pdf: '📄', slide: '🖥️', article: '📝', texto: '📝' }
const TYPE_LABELS: Record<string, string> = { video: 'Vídeo', pdf: 'PDF', slide: 'Slide', article: 'Texto', texto: 'Texto' }
const TYPE_COLORS: Record<string, string> = {
  video:   'badge-red',
  pdf:     'badge-amber',
  slide:   'badge-blue',
  article: 'badge-green',
  texto:   'badge-green',
}

export function AulasPage() {
  const [aulas,       setAulas]       = useState<Aula[]>([])
  const [loading,     setLoading]     = useState(true)
  const [filterTheme, setFilterTheme] = useState<string>('')
  const [filterType,  setFilterType]  = useState<string>('')

  useEffect(() => {
    aulasService.getAll().then(({ data, error }) => {
      if (!error && data) setAulas(data as Aula[])
      setLoading(false)
    })
  }, [])

  const filtered = aulas.filter(a =>
    (!filterTheme || a.theme === filterTheme) &&
    (!filterType  || a.type  === filterType)
  )

  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="font-display text-2xl font-bold text-[var(--color-text)]">Aulas</h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">Textos, vídeos, PDFs e slides sobre trauma e APH</p>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-[180px]">
          <select className="input" value={filterTheme} onChange={e => setFilterTheme(e.target.value)}>
            <option value="">Todos os temas</option>
            {(Object.entries(THEMES) as [StudyTheme, string][]).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </div>
        <div className="min-w-[140px]">
          <select className="input" value={filterType} onChange={e => setFilterType(e.target.value)}>
            <option value="">Todos os tipos</option>
            <option value="article">📝 Texto</option>
            <option value="video">🎬 Vídeo</option>
            <option value="pdf">📄 PDF</option>
            <option value="slide">🖥️ Slide</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
          Carregando aulas...
        </div>
      ) : (
        <>
          <p className="text-xs text-[var(--color-text-subtle)]">{filtered.length} aula(s) encontrada(s)</p>

          <div className="grid md:grid-cols-2 gap-4">
            {filtered.map(a => (
              <Link
                key={a.id}
                to={'/aulas/' + a.id}
                className="card-p group hover:border-brand-400 transition-all flex flex-col gap-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex gap-2 flex-wrap">
                    <span className={(TYPE_COLORS[a.type] ?? 'badge-gray') + ' badge text-xs'}>
                      {TYPE_ICONS[a.type] ?? '📄'} {TYPE_LABELS[a.type] ?? a.type}
                    </span>
                    {a.theme && THEMES[a.theme as StudyTheme] && (
                      <span className="badge-blue text-xs">{THEMES[a.theme as StudyTheme]}</span>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-[var(--color-text)] group-hover:text-brand-600 transition-colors leading-snug">
                    {a.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)] mt-1.5 line-clamp-2">{a.description}</p>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-[var(--color-text-muted)]">
              <p className="text-4xl mb-3">📚</p>
              <p>Nenhuma aula encontrada.</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
