import { useNavigate } from 'react-router-dom'

export function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', textAlign: 'center', padding: '2rem' }}>
      <div style={{ fontFamily: 'var(--font-d)', fontSize: '6rem', fontWeight: 700, color: 'var(--red)', lineHeight: 1 }}>404</div>
      <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Página não encontrada</p>
      <button className="btn-red" onClick={() => navigate('/')}>← Voltar ao início</button>
    </div>
  )
}
