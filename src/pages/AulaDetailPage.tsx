import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { THEMES } from '@/services/supabaseClient'
import { MOCK_AULAS } from './AulasPage'

const TIPO_ICONS: Record<string,string> = { video:'🎬', pdf:'📄', slide:'🖥️', texto:'📝' }

export function AulaDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const aula = MOCK_AULAS.find(a => a.id === id)

  // ID inválido → redireciona para lista
  if (!aula) return <Navigate to="/aulas" replace />

  return (
    <section style={{ padding: '4rem 2rem', background: '#0D0D0D' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        {/* MIGRAÇÃO: navigate(-1) volta para lista com URL correta */}
        <button className="btn-ghost" style={{ marginBottom: '1.5rem', fontSize: '.8rem' }} onClick={() => navigate('/aulas')}>
          ← Aulas
        </button>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: '1rem' }}>
          <span className="tag-pill">{THEMES[aula.theme]}</span>
          <span className="tag-pill">{TIPO_ICONS[aula.type]} {aula.type.toUpperCase()}</span>
          {aula.dur && <span className="tag-pill">⏱ {aula.dur}</span>}
        </div>
        <h1 style={{ fontFamily: 'var(--font-d)', fontSize: '2rem', color: 'white', marginBottom: '.5rem', lineHeight: 1.2 }}>{aula.title}</h1>
        {aula.autor && <p style={{ color: 'var(--text-muted)', fontSize: '.85rem', marginBottom: '2rem' }}>Por {aula.autor}</p>}

        {/* Espaço para vídeo */}
        {aula.type === 'video' && (
          <div style={{ width: '100%', aspectRatio: '16/9', background: '#080808', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '.75rem' }}>🎬</div>
              <p style={{ color: 'var(--text-muted)', fontSize: '.88rem' }}>Vídeo será incorporado aqui (YouTube/Vimeo)</p>
            </div>
          </div>
        )}

        {/* Espaço para PDF */}
        {aula.type === 'pdf' && (
          <div style={{ width: '100%', height: 240, background: '#080808', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '.75rem' }}>📄</div>
              <p style={{ color: 'var(--text-muted)', fontSize: '.88rem', marginBottom: '1rem' }}>PDF será exibido aqui</p>
              <button className="btn-ghost" style={{ fontSize: '.8rem' }}>Baixar PDF</button>
            </div>
          </div>
        )}

        {/* Conteúdo em markdown simples */}
        <div className="card-dark" style={{ padding: '2rem' }}>
          {aula.conteudo.split('\n').map((linha, i) => {
            if (linha.startsWith('## ')) return <h2 key={i} style={{ fontFamily: 'var(--font-d)', fontSize: '1.35rem', color: '#E53935', margin: '1.5rem 0 .75rem', fontWeight: 600 }}>{linha.slice(3)}</h2>
            const partes = linha.split(/(\*\*[^*]+\*\*)/)
            if (linha === '') return <div key={i} style={{ height: '.5rem' }} />
            return (
              <p key={i} style={{ fontSize: '.9rem', color: 'var(--text)', lineHeight: 1.8, marginBottom: '.35rem' }}>
                {partes.map((p, j) => p.startsWith('**') && p.endsWith('**')
                  ? <strong key={j} style={{ color: '#E53935' }}>{p.slice(2,-2)}</strong>
                  : p
                )}
              </p>
            )
          })}
        </div>
      </div>
    </section>
  )
}
