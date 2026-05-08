import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { OfflineBanner } from '@/components/common/OfflineBanner'
import { useTheme } from '@/hooks/useTheme'

// Estado global de estudo persistido em localStorage.
// Mantido aqui para ser compartilhado entre BancoPage e DashboardPage via Context
// (ver StudyContext). Se preferir, substitua por Zustand/Context futuramente.

export function AppShell() {
  const { darkMode, setDarkMode } = useTheme()

  // Aplica atributo data-theme no <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  return (
    <>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <OfflineBanner />
      <main style={{ minHeight: 'calc(100vh - 68px)' }}>
        {/* Outlet renderiza a rota filha ativa */}
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
