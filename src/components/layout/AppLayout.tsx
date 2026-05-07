import { useState, useEffect } from 'react'
import { Navbar } from './Navbar'
import { OfflineBanner } from '@/components/common/OfflineBanner'
import { AuthProvider } from '@/contexts/AuthContext'

// Pages
import { HomePage }        from '@/pages/HomePage'
import { BancoPage }       from '@/pages/BancoPage'
import { FlashcardsPage }  from '@/pages/FlashcardsPage'
import { SimuladoPage }    from '@/pages/SimuladoPage'
import { AulasPage }       from '@/pages/AulasPage'
import { CasosPage }       from '@/pages/CasosPage'
import { DiretrizesPage }  from '@/pages/DiretrizesPage'
import { RankingPage }     from '@/pages/RankingPage'
import { DashboardPage }   from '@/pages/DashboardPage'
import { SobrePage }       from '@/pages/SobrePage'
import { AdminPage }       from '@/pages/AdminPage'
import { LoginPage }       from '@/pages/auth/LoginPage'
import { RegisterPage }    from '@/pages/auth/RegisterPage'
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage'

type Page =
  | 'home' | 'banco' | 'flashcards' | 'simulado' | 'aulas'
  | 'casos' | 'diretrizes' | 'ranking' | 'dashboard' | 'sobre'
  | 'admin' | 'login' | 'register' | 'forgot-password'

// Estado global de estudo persistido em localStorage
function loadHistorico() {
  try { return JSON.parse(localStorage.getItem('lammi_historico') || '{}') } catch { return {} }
}
function loadSRS() {
  try { return JSON.parse(localStorage.getItem('lammi_srs') || '{}') } catch { return {} }
}

export function AppLayout() {
  const [page, setPage]       = useState<Page>('home')
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('lammi-theme')
    return stored ? stored === 'dark' : true // padrão dark
  })
  const [historico, setHistorico] = useState<Record<string, any>>(loadHistorico)
  const [srsData, setSrsData]     = useState<Record<string, any>>(loadSRS)

  // Persiste historico
  useEffect(() => {
    localStorage.setItem('lammi_historico', JSON.stringify(historico))
  }, [historico])

  // Persiste SRS
  useEffect(() => {
    localStorage.setItem('lammi_srs', JSON.stringify(srsData))
  }, [srsData])

  // Aplica tema
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
    localStorage.setItem('lammi-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  const acertos = Object.values(historico).filter((h: any) => h.acertou).length
  const respondidas = Object.keys(historico).length

  const renderPage = () => {
    switch (page) {
      case 'home':             return <HomePage setPage={setPage as any} acertos={acertos} respondidas={respondidas} />
      case 'banco':            return <BancoPage historico={historico} setHistorico={setHistorico} />
      case 'flashcards':       return <FlashcardsPage srsData={srsData} setSrsData={setSrsData} />
      case 'simulado':         return <SimuladoPage />
      case 'aulas':            return <AulasPage />
      case 'casos':            return <CasosPage />
      case 'diretrizes':       return <DiretrizesPage />
      case 'ranking':          return <RankingPage />
      case 'dashboard':        return <DashboardPage historico={historico} />
      case 'sobre':            return <SobrePage />
      case 'admin':            return <AdminPage />
      case 'login':            return <LoginPage setPage={setPage as any} />
      case 'register':         return <RegisterPage setPage={setPage as any} />
      case 'forgot-password':  return <ForgotPasswordPage setPage={setPage as any} />
      default:                 return <HomePage setPage={setPage as any} acertos={acertos} respondidas={respondidas} />
    }
  }

  const isAuthPage = ['login','register','forgot-password'].includes(page)

  return (
    <AuthProvider>
      {!isAuthPage && (
        <Navbar page={page} setPage={setPage as any} darkMode={darkMode} setDarkMode={setDarkMode} />
      )}
      <OfflineBanner />
      <main style={{ minHeight: 'calc(100vh - 68px)' }}>
        {renderPage()}
      </main>
      {!isAuthPage && (
        <footer className="footer">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: '.5rem' }}>
            <div style={{ width: 28, height: 1, background: 'rgba(192,57,43,.3)' }} />
            <span style={{ fontFamily: 'var(--font-d)', fontSize: '.85rem', color: 'rgba(240,240,240,.3)', letterSpacing: '.1em' }}>LAMMI</span>
            <div style={{ width: 28, height: 1, background: 'rgba(192,57,43,.3)' }} />
          </div>
          Liga Acadêmica de Medicina Militar de Irecê · Irecê, Bahia · 2024
        </footer>
      )}
    </AuthProvider>
  )
}
