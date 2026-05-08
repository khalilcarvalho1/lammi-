import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '@/contexts/AuthContext'
import { LogoIcon } from '@/components/layout/Navbar'

export function RegisterPage() {
  const { signUpWithEmail } = useAuthContext()
  const navigate = useNavigate()
  const [name,     setName]     = useState('')
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState<string | null>(null)
  const [success,  setSuccess]  = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (password.length < 6) { setError('Senha mínima de 6 caracteres.'); return }
    setLoading(true); setError(null)
    const { error } = await signUpWithEmail(email, password, name)
    if (error) { setError('Erro ao criar conta. Tente novamente.'); setLoading(false) }
    else setSuccess(true)
  }

  if (success) return (
    <div className="auth-screen">
      <div className="auth-card" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
        <h2 style={{ fontFamily: 'var(--font-d)', fontSize: '1.4rem', color: 'white', marginBottom: '.5rem' }}>Conta criada!</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '.88rem', marginBottom: '1.5rem' }}>Verifique seu e-mail antes de entrar.</p>
        <button className="btn-red" style={{ width: '100%' }} onClick={() => navigate('/login')}>Ir para login</button>
      </div>
    </div>
  )

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <LogoIcon size={56} />
          <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.4rem', color: 'white', fontWeight: 700, marginTop: '.75rem' }}>Criar conta</div>
          <div style={{ fontSize: '.7rem', textTransform: 'uppercase', letterSpacing: '.15em', color: '#E53935', marginTop: '.25rem' }}>LAMMI · Medicina Militar</div>
        </div>
        {error && <div style={{ background: 'rgba(178,59,59,.15)', border: '1px solid #b23b3b', padding: '.75rem 1rem', fontSize: '.85rem', color: '#f87171', marginBottom: '1rem' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="auth-field"><label>Nome completo</label><input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Seu nome" required /></div>
          <div className="auth-field"><label>E-mail</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" required /></div>
          <div className="auth-field"><label>Senha</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mínimo 6 caracteres" required /></div>
          <button type="submit" disabled={loading} className="btn-red" style={{ width: '100%' }}>
            {loading ? 'Criando...' : 'Criar conta'}
          </button>
        </form>
        <p style={{ textAlign: 'center', fontSize: '.82rem', color: 'var(--text-muted)', marginTop: '1.5rem' }}>
          Já tem conta?{' '}
          <button onClick={() => navigate('/login')} style={{ background: 'none', border: 'none', color: '#E53935', cursor: 'pointer', fontWeight: 600 }}>Entrar</button>
        </p>
      </div>
    </div>
  )
}
