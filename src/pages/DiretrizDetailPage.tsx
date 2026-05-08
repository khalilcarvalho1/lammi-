import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { THEMES } from '@/services/supabaseClient'
import { MOCK_DIR } from './DiretrizesPage'

export function DiretrizDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const diretriz = MOCK_DIR.find(d => d.id === id)

  if (!diretriz) return <Navigate to="/diretrizes" replace />

  return (
    <section style={{ padding: '4rem 2rem', background: '#0D0D0D' }}>
      <div style={{ maxWidth: 840, margin: '0 auto' }}>
        <button className="btn-ghost" style={{ marginBottom: '1.5rem', fontSize: '.8rem' }} onClick={() => navigate('/diretrizes')}>
          ← Diretrizes
        </button>
        <div style={{ display: 'flex', gap: 6, marginBottom: '1rem', flexWrap: 'wrap' }}>
          <span className="tag-pill">{THEMES[diretriz.tema]}</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-d)', fontSize: '1.8rem', color: 'white', marginBottom: '.5rem', lineHeight: 1.25 }}>{diretriz.title}</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '.88rem', marginBottom: '2rem' }}>{diretriz.resumo}</p>
        <div className="diretriz-card">
          <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.05rem', color: '#E53935', marginBottom: '1.25rem', fontWeight: 600 }}>Pontos-chave</div>
          {diretriz.conteudo.map((ponto, i) => (
            <div key={i} className="diretriz-ponto">{ponto}</div>
          ))}
        </div>
      </div>
    </section>
  )
}
