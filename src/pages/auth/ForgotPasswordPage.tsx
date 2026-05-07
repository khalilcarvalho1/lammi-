import { useState, FormEvent } from 'react'
import { useAuthContext } from '@/contexts/AuthContext'
import { LogoIcon } from '@/components/layout/Navbar'

interface Props { setPage: (p: string) => void }

export function ForgotPasswordPage({ setPage }: Props) {
  const { sendPasswordReset } = useAuthContext()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); setLoading(true); setError(null)
    const { error } = await sendPasswordReset(email)
    if (error) { setError('Não foi possível enviar o e-mail.'); setLoading(false) }
    else setSent(true)
  }

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <LogoIcon size={56} />
          <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.3rem', color: 'white', fontWeight: 700, marginTop: '.75rem' }}>Recuperar senha</div>
        </div>
        {sent ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📧</div>
            <p style={{ color: 'var(--text-muted)', fontSize: '.88rem', marginBottom: '1.5rem' }}>Link enviado! Verifique sua caixa de entrada.</p>
            <button className="btn-ghost" style={{ width: '100%' }} onClick={() => setPage('login')}>← Voltar ao login</button>
          </div>
        ) : (
          <>
            {error && <div style={{ background: 'rgba(178,59,59,.15)', border: '1px solid #b23b3b', padding: '.75rem 1rem', fontSize: '.85rem', color: '#f87171', marginBottom: '1rem' }}>{error}</div>}
            <p style={{ color: 'var(--text-muted)', fontSize: '.88rem', marginBottom: '1.25rem' }}>Informe seu e-mail para receber o link de redefinição.</p>
            <form onSubmit={handleSubmit}>
              <div className="auth-field"><label>E-mail</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" required /></div>
              <button type="submit" disabled={loading} className="btn-red" style={{ width: '100%' }}>
                {loading ? 'Enviando...' : 'Enviar link'}
              </button>
            </form>
            <button onClick={() => setPage('login')} style={{ background: 'none', border: 'none', color: '#E53935', cursor: 'pointer', fontSize: '.82rem', marginTop: '1rem', display: 'block', textAlign: 'center', width: '100%' }}>
              ← Voltar ao login
            </button>
          </>
        )}
      </div>
    </div>
  )
}
