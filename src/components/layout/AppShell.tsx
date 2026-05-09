import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { OfflineBanner } from '@/components/common/OfflineBanner'
import { ErroDiagnostico } from '@/components/common/ErroDiagnostico'
import { useTheme } from '@/hooks/useTheme'

type ConErro = { tipo: 'timeout' | 'config' | 'http' } | null

export function AppShell() {
  const { darkMode, setDarkMode } = useTheme()
  const [conErro, setConErro] = useState<ConErro>(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  const checkConnection = async () => {
    setConErro(null)
    setChecking(true)

    const url  = import.meta.env.VITE_SUPABASE_URL
    const key  = import.meta.env.VITE_SUPABASE_ANON_KEY

    if (!url || !key) {
      setConErro({ tipo: 'config' })
      setChecking(false)
      return
    }

    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 8000)

    try {
      const res = await fetch(`${url}/auth/v1/health`, {
        headers: { apikey: key },
        signal: controller.signal,
      })
      clearTimeout(timer)
      // 4xx/5xx inesperado (não 404 que é normal)
      if (!res.ok && res.status !== 404) {
        setConErro({ tipo: 'http' })
      }
    } catch (e: any) {
      clearTimeout(timer)
      if (e.name === 'AbortError') {
        setConErro({ tipo: 'timeout' })
      }
      // Outros erros (CORS, rede) — deixa o app carregar e o Supabase lidar
    } finally {
      setChecking(false)
    }
  }

  useEffect(() => { checkConnection() }, [])

  if (checking) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0D0D0D', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ width: 32, height: 32, border: '3px solid rgba(192,57,43,.2)', borderTopColor: '#C0392B', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      <div style={{ fontSize: '.8rem', color: 'var(--text-muted)' }}>Conectando...</div>
    </div>
  )

  if (conErro) return (
    <ErroDiagnostico tipo={conErro.tipo} onRetry={checkConnection} />
  )

  return (
    <>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <OfflineBanner />
      <main style={{ minHeight: 'calc(100vh - 68px)' }}>
        <Outlet />
      </main>
      <footer className="footer">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: '.5rem' }}>
          <div style={{ width: 28, height: 1, background: 'rgba(192,57,43,.3)' }} />
          <span style={{ fontFamily: 'var(--font-d)', fontSize: '.85rem', color: 'rgba(240,240,240,.3)', letterSpacing: '.1em' }}>LAMMI</span>
          <div style={{ width: 28, height: 1, background: 'rgba(192,57,43,.3)' }} />
        </div>
        Liga Acadêmica de Medicina Militar de Irecê · Irecê, Bahia · 2024
      </footer>
    </>
  )
}
