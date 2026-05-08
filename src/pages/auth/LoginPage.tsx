import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '@/contexts/AuthContext'
import { LogoIcon } from '@/components/layout/Navbar'

export function LoginPage() {
  const { signInWithEmail, signInWithGoogle } = useAuthContext()
  const navigate = useNavigate()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); setLoading(true); setError(null)
    const { error } = await signInWithEmail(email, password)
    if (error) { setError('E-mail ou senha inválidos.'); setLoading(false) }
    else navigate('/')
  }

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <LogoIcon size={56} />
          <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.6rem', color: 'white', fontWeight: 700, marginTop: '.75rem' }}>LAMMI</div>
          <div style={{ fontSize: '.7rem', textTransform: 'uppercase', letterSpacing: '.2em', color: '#E53935', marginTop: '.25rem' }}>Liga · Medicina Militar</div>
        </div>

        {error && (
          <div style={{ background: 'rgba(178,59,59,.15)', border: '1px solid #b23b3b', padding: '.75rem 1rem', fontSize: '.85rem', color: '#f87171', marginBottom: '1rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <label>E-mail</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" required />
          </div>
          <div className="auth-field">
            <label>Senha</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
          </div>
          <button type="button" onClick={() => navigate('/forgot-password')}
            style={{ background: 'none', border: 'none', color: '#E53935', fontSize: '.78rem', cursor: 'pointer', marginBottom: '1rem', padding: 0 }}>
            Esqueci minha senha
          </button>
          <button type="submit" disabled={loading} className="btn-red" style={{ width: '100%' }}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '1.25rem 0' }}>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          <span style={{ fontSize: '.75rem', color: 'var(--text-dim)' }}>ou</span>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>

        <button onClick={() => signInWithGoogle()} className="btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>
          <GoogleIcon /> Entrar com Google
        </button>

        <p style={{ textAlign: 'center', fontSize: '.82rem', color: 'var(--text-muted)', marginTop: '1.5rem' }}>
          Não tem conta?{' '}
          <button onClick={() => navigate('/register')} style={{ background: 'none', border: 'none', color: '#E53935', cursor: 'pointer', fontWeight: 600 }}>
            Criar conta
          </button>
        </p>
      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" style={{ marginRight: 8 }}>
      <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z"/>
      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z"/>
      <path fill="#FBBC05" d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332Z"/>
      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58Z"/>
    </svg>
  )
}
