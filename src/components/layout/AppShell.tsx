import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { OfflineBanner } from '@/components/common/OfflineBanner'
import { useTheme } from '@/hooks/useTheme'
import { useStudyContext } from '@/contexts/StudyContext'

export function AppShell() {
  const { darkMode, setDarkMode } = useTheme()
  const { syncLoading } = useStudyContext()

  // Aplica atributo data-theme no <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  return (
    <>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <OfflineBanner />

      {/* Banner de sincronização — aparece brevemente ao logar */}
      {syncLoading && (
        <div style={{
          background: 'rgba(192,57,43,.12)',
          borderBottom: '1px solid rgba(192,57,43,.25)',
          padding: '.45rem 2rem',
          fontSize: '.75rem',
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          gap: '.5rem',
        }}>
          <div style={{
            width: 10, height: 10,
            border: '2px solid rgba(192,57,43,.3)',
            borderTopColor: '#C0392B',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            flexShrink: 0,
          }} />
          Sincronizando progresso...
        </div>
      )}

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
