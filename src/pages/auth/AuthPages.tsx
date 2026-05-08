import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '@/contexts/AuthContext'
import { LogoIcon } from '@/components/layout/Navbar'

/* ─── ForgotPasswordPage ──────────────────────────────── */
export function ForgotPasswordPage() {
  const { sendPasswordReset } = useAuthContext()
  const navigate = useNavigate()
  const [email,   setEmail]   = useState('')
  const [loading, setLoading] = useState(false)
  const [sent,    setSent]    = useState(false)
  const [error,   setError]   = useState<string | null>(null)

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
            <button className="btn-ghost" style={{ width: '100%' }} onClick={() => navigate('/login')}>← Voltar ao login</button>
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
            <button onClick={() => navigate('/login')}
              style={{ background: 'none', border: 'none', color: '#E53935', cursor: 'pointer', fontSize: '.82rem', marginTop: '1rem', display: 'block', textAlign: 'center', width: '100%' }}>
              ← Voltar ao login
            </button>
          </>
        )}
      </div>
    </div>
  )
}

/* ─── ResetPasswordPage ───────────────────────────────── */
export function ResetPasswordPage() {
  const { updatePassword } = useAuthContext()
  const navigate = useNavigate()
  const [password,  setPassword]  = useState('')
  const [password2, setPassword2] = useState('')
  const [loading,   setLoading]   = useState(false)
  const [error,     setError]     = useState<string | null>(null)
  const [done,      setDone]      = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (password !== password2) { setError('As senhas não coincidem.'); return }
    if (password.length < 6)    { setError('Mínimo de 6 caracteres.');  return }
    setLoading(true); setError(null)
    const { error } = await updatePassword(password)
    if (error) { setError('Erro ao redefinir senha. O link pode ter expirado.'); setLoading(false) }
    else setDone(true)
  }

  if (done) return (
    <div className="auth-screen">
      <div className="auth-card" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
        <h2 style={{ fontFamily: 'var(--font-d)', fontSize: '1.4rem', color: 'white', marginBottom: '.5rem' }}>Senha redefinida!</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '.88rem', marginBottom: '1.5rem' }}>Você já pode entrar com sua nova senha.</p>
        <button className="btn-red" style={{ width: '100%' }} onClick={() => navigate('/login')}>Ir para login</button>
      </div>
    </div>
  )

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <LogoIcon size={56} />
          <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.3rem', color: 'white', fontWeight: 700, marginTop: '.75rem' }}>Nova senha</div>
        </div>
        {error && <div style={{ background: 'rgba(178,59,59,.15)', border: '1px solid #b23b3b', padding: '.75rem 1rem', fontSize: '.85rem', color: '#f87171', marginBottom: '1rem' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="auth-field"><label>Nova senha</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mínimo 6 caracteres" required /></div>
          <div className="auth-field"><label>Confirmar senha</label><input type="password" value={password2} onChange={e => setPassword2(e.target.value)} placeholder="Repita a senha" required /></div>
          <button type="submit" disabled={loading} className="btn-red" style={{ width: '100%' }}>
            {loading ? 'Salvando...' : 'Redefinir senha'}
          </button>
        </form>
      </div>
    </div>
  )
}
