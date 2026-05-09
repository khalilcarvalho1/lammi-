import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

type PageKey =
  | 'home' | 'banco' | 'flashcards' | 'simulado' | 'aulas'
  | 'casos' | 'diretrizes' | 'ranking' | 'dashboard' | 'sobre'

type NavbarProps = {
  darkMode: boolean
  setDarkMode: (value: boolean) => void
  page?: PageKey
  setPage?: (page: PageKey) => void
}

const NAV_ITEMS: Array<{ label: string; path: string; page: PageKey }> = [
  { label: 'Início', path: '/', page: 'home' },
  { label: 'Banco', path: '/banco', page: 'banco' },
  { label: 'Flashcards', path: '/flashcards', page: 'flashcards' },
  { label: 'Simulado', path: '/simulado', page: 'simulado' },
  { label: 'Aulas', path: '/aulas', page: 'aulas' },
  { label: 'Casos', path: '/casos', page: 'casos' },
  { label: 'Diretrizes', path: '/diretrizes', page: 'diretrizes' },
  { label: 'Ranking', path: '/ranking', page: 'ranking' },
  { label: 'Dashboard', path: '/dashboard', page: 'dashboard' },
  { label: 'Sobre', path: '/sobre', page: 'sobre' },
]

function isPathActive(pathname: string, itemPath: string) {
  return pathname === itemPath || (itemPath !== '/' && pathname.startsWith(itemPath))
}

export function Navbar({ darkMode, setDarkMode, page, setPage }: NavbarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const currentPath = location.pathname

  const handleNavigation = (itemPath: string, itemPage: PageKey) => {
    setDrawerOpen(false)
    if (setPage) {
      setPage(itemPage)
    }
    navigate(itemPath)
  }

  return (
    <nav className="nav">
      <div className="nav-inner">
        <button type="button" className="nav-brand" onClick={() => handleNavigation('/', 'home')}>
          <LogoIcon size={34} />
          <span style={{ color: 'white', fontFamily: 'var(--font-d)', fontSize: '.9rem', letterSpacing: '.12em' }}>LAMMI</span>
        </button>

        <div className="nav-desktop">
          {NAV_ITEMS.map((item) => {
            const active = page ? item.page === page : isPathActive(currentPath, item.path)
            return (
              <button
                key={item.page}
                type="button"
                className={`nav-link${active ? ' active' : ''}`}
                onClick={() => handleNavigation(item.path, item.page)}
              >
                {item.label}
              </button>
            )
          })}

          <button
            type="button"
            className="btn-ghost"
            onClick={() => setDarkMode(!darkMode)}
            style={{ padding: '.55rem 1rem' }}
            aria-label="Alternar tema"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>

        <button
          type="button"
          className="nav-burger"
          aria-label={drawerOpen ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setDrawerOpen((prev) => !prev)}
        >
          <span style={{ transform: drawerOpen ? 'rotate(45deg) translate(5px, 5px)' : undefined }} />
          <span style={{ opacity: drawerOpen ? 0 : 1 }} />
          <span style={{ transform: drawerOpen ? 'rotate(-45deg) translate(5px, -5px)' : undefined }} />
        </button>
      </div>

      {drawerOpen && (
        <div className="nav-mobile-drawer">
          {NAV_ITEMS.map((item) => {
            const active = page ? item.page === page : isPathActive(currentPath, item.path)
            return (
              <button
                key={item.page}
                type="button"
                className={`nav-link-mobile${active ? ' active' : ''}`}
                onClick={() => handleNavigation(item.path, item.page)}
              >
                {item.label}
              </button>
            )
          })}
          <button
            type="button"
            className="nav-link-mobile"
            onClick={() => {
              setDarkMode(!darkMode)
              setDrawerOpen(false)
            }}
          >
            {darkMode ? '☀️ Modo claro' : '🌙 Modo escuro'}
          </button>
        </div>
      )}
    </nav>
  )
}

export function LogoIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" role="img" aria-label="Logo LAMMI">
      <defs>
        <radialGradient id="logoGradient" cx="35%" cy="35%" r="85%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor="#E53935" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="56" fill="url(#logoGradient)" />
      <path d="M45 60h30M60 45v30" stroke="#081018" strokeWidth="10" strokeLinecap="round" />
      <circle cx="60" cy="60" r="10" fill="#081018" />
    </svg>
  )
}

export function MilDecor() {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: '-50px',
          right: '4%',
          width: 220,
          height: 220,
          borderRadius: '50%',
          background: 'rgba(229,83,81,.18)',
          filter: 'blur(40px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-40px',
          left: '6%',
          width: 180,
          height: 180,
          borderRadius: '50%',
          background: 'rgba(255,255,255,.08)',
          border: '1px solid rgba(255,255,255,.08)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          width: 120,
          height: 120,
          borderRadius: '50%',
          border: '2px dashed rgba(255,255,255,.15)',
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '18%',
          left: '10%',
          width: 24,
          height: 24,
          borderRadius: '50%',
          background: 'rgba(255,255,255,.22)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '18%',
          right: '18%',
          width: 18,
          height: 18,
          borderRadius: '50%',
          background: 'rgba(255,255,255,.22)',
        }}
      />
    </>
  )
}
