import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { THEMES } from '@/services/supabaseClient'
import { aulasService, Aula } from '@/services/aulasService'

function renderMarkdown(content: string) {
  return content.split('\n').map((line, i) => {
    if (line.startsWith('# '))   return <h1 key={i} style={{ fontFamily: 'var(--font-d)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-text)', marginTop: '1.5rem', marginBottom: '.5rem' }}>{line.slice(2)}</h1>
    if (line.startsWith('## '))  return <h2 key={i} style={{ fontFamily: 'var(--font-d)', fontSize: '1.25rem', fontWeight: 700, color: '#E53935', marginTop: '1.5rem', marginBottom: '.4rem', borderBottom: '1px solid rgba(192,57,43,.2)', paddingBottom: '.3rem' }}>{line.slice(3)}</h2>
    if (line.startsWith('### ')) return <h3 key={i} style={{ fontFamily: 'var(--font-d)', fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-text)', marginTop: '1.2rem', marginBottom: '.3rem' }}>{line.slice(4)}</h3>
    if (line.startsWith('---'))  return <hr key={i} style={{ border: 'none', borderTop: '1px solid rgba(192,57,43,.2)', margin: '1.5rem 0' }} />
    if (line.startsWith('- ') || line.startsWith('* ')) {
      const text = line.slice(2)
      return <li key={i} style={{ fontSize: '.88rem', color: 'var(--color-text)', lineHeight: 1.7, marginBottom: '.2rem', marginLeft: '1.25rem' }}>{renderInline(text)}</li>
    }
    if (/^\d+\. /.test(line)) {
      const text = line.replace(/^\d+\. /, '')
      return <li key={i} style={{ fontSize: '.88rem', color: 'var(--color-text)', lineHeight: 1.7, marginBottom: '.2rem', marginLeft: '1.25rem', listStyleType: 'decimal' }}>{renderInline(text)}</li>
    }
    if (line.startsWith('|')) {
      const cells = line.split('|').filter(c => c.trim() !== '')
      const isHeader = cells.every(c => c.trim().match(/^[-:]+$/))
      if (isHeader) return null
      return (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: `repeat(${cells.length}, 1fr)`, gap: '1px', background: 'rgba(192,57,43,.15)', marginBottom: 1 }}>
          {cells.map((c, j) => (
            <div key={j} style={{ padding: '.4rem .6rem', background: 'var(--color-surface)', fontSize: '.82rem', color: 'var(--color-text)' }}>{renderInline(c.trim())}</div>
          ))}
        </div>
      )
    }
    if (line === '') return <br key={i} />
    return <p key={i} style={{ fontSize: '.88rem', color: 'var(--color-text)', lineHeight: 1.75, marginBottom: '.25rem' }}>{renderInline(line)}</p>
  })
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/)
  return parts.map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) return <strong key={i} style={{ fontWeight: 700 }}>{p.slice(2, -2)}</strong>
    if (p.startsWith('*')  && p.endsWith('*'))  return <em key={i}>{p.slice(1, -1)}</em>
    if (p.startsWith('`')  && p.endsWith('`'))  return <code key={i} style={{ background: 'rgba(192,57,43,.12)', padding: '1px 4px', fontSize: '.82em', fontFamily: 'monospace' }}>{p.slice(1, -1)}</code>
    return p
  })
}

export function AulaDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [aula,    setAula]    = useState<Aula | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    aulasService.getById(id).then(({ data, error }) => {
      if (!error && data) setAula(data as Aula)
      setLoading(false)
    })
  }, [id])

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-text-muted)' }}>
      Carregando aula...
    </div>
  )

  if (!aula) return (
    <div className="text-center py-20">
      <p className="text-4xl mb-3">📚</p>
      <p className="text-[var(--color-text-muted)]">Aula não encontrada.</p>
      <Link to="/aulas" className="btn-primary mt-4 inline-flex">← Voltar</Link>
    </div>
  )

  const themeLabel = THEMES[aula.theme as keyof typeof THEMES] ?? aula.theme

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-up">
      <Link to="/aulas" className="text-sm text-brand-600 hover:underline">← Aulas</Link>

      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {themeLabel && <span className="badge-blue text-xs">{themeLabel}</span>}
          <span className="badge-gray text-xs">{aula.type?.toUpperCase()}</span>
        </div>
        <h1 className="font-display text-2xl font-bold text-[var(--color-text)] leading-snug">{aula.title}</h1>
        {aula.description && <p className="text-sm text-[var(--color-text-muted)]">{aula.description}</p>}
      </div>

      {/* Embed de vídeo */}
      {aula.type === 'video' && aula.content_url && (
        <div className="w-full aspect-video">
          <iframe src={aula.content_url} className="w-full h-full rounded-xl" allowFullScreen />
        </div>
      )}

      {/* Embed de PDF */}
      {aula.type === 'pdf' && aula.content_url && (
        <div className="w-full" style={{ height: '600px' }}>
          <iframe src={aula.content_url} className="w-full h-full rounded-xl border border-[var(--color-border)]" />
        </div>
      )}

      {/* Conteúdo em markdown */}
      {aula.content && (
        <div className="card-p" style={{ lineHeight: 1.75 }}>
          {renderMarkdown(aula.content)}
        </div>
      )}

      {!aula.content && !aula.content_url && (
        <div className="card-p text-center py-12">
          <p className="text-4xl mb-3">📚</p>
          <p className="text-[var(--color-text-muted)]">Conteúdo ainda não disponível.</p>
        </div>
      )}
    </div>
  )
}
