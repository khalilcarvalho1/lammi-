import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuthContext } from '@/contexts/AuthContext'
import { useOfflineHandler } from '@/hooks/useOfflineHandler'

interface NavbarProps {
  darkMode: boolean
  setDarkMode: (fn: (d: boolean) => boolean) => void
}

const NAV_ITEMS = [
  { id: 'home',       path: '/',           label: 'Início'     },
  { id: 'banco',      path: '/banco',      label: 'Banco'      },
  { id: 'flashcards', path: '/flashcards', label: 'Cards'      },
  { id: 'simulado',   path: '/simulado',   label: 'Simulado'   },
  { id: 'aulas',      path: '/aulas',      label: 'Aulas'      },
  { id: 'casos',      path: '/casos',      label: 'Casos'      },
  { id: 'diretrizes', path: '/diretrizes', label: 'Diretrizes' },
  { id: 'ranking',    path: '/ranking',    label: 'Ranking'    },
  { id: 'dashboard',  path: '/dashboard',  label: 'Stats'      },
  { id: 'sobre',      path: '/sobre',      label: 'Sobre'      },
]
 

export function Navbar({ darkMode, setDarkMode }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, profile, signOut, isAdmin } = useAuthContext()
  const { isOnline } = useOfflineHandler()
  const navigate  = useNavigate()
  const location  = useLocation()

  const go = (path: string) => { navigate(path); setMenuOpen(false) }
  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)

  return (
    <header className="nav bg-mil">
      <div className="nav-inner">
        {/* Brand */}
        <button onClick={() => go('/')} className="nav-brand">
          <LogoIcon size={40} />
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.15rem', color: 'white', fontWeight: 700, letterSpacing: '.06em', lineHeight: 1.1 }}>LAMMI</div>
            <div style={{ fontSize: '.6rem', textTransform: 'uppercase', letterSpacing: '.2em', color: '#E53935' }}>Liga · Medicina Militar</div>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="nav-desktop">
          {NAV_ITEMS.map(item => (
            <button
              key={item.path}
              className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => go(item.path)}
            >
              {item.label}
            </button>
          ))}
          {isAdmin && (
            <button
              className={`nav-link ${isActive('/admin') ? 'active' : ''}`}
              onClick={() => go('/admin')}
              style={{ color: '#E53935' }}
            >
              Admin
            </button>
          )}
        </nav>

        {/* Offline badge */}
        {!isOnline && (
          <span style={{ fontSize: '.7rem', background: '#b23b3b', color: '#fff', padding: '2px 8px', fontWeight: 600 }}>OFFLINE</span>
        )}

        {/* Dark mode toggle */}
        <button
          onClick={() => setDarkMode(d => !d)}
          title={darkMode ? 'Modo claro' : 'Modo escuro'}
          style={{ background: 'transparent', border: '1px solid rgba(192,57,43,.4)', color: '#E53935', width: 36, height: 36, borderRadius: '50%', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s', flexShrink: 0 }}
        >
          {darkMode ? '☀' : '🌙'}
        </button>

        {/* Auth button */}
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
            <span style={{ fontSize: '.8rem', color: 'var(--text-muted)' }}>{typeof profile?.display_name === 'string' ? profile.display_name.split(' ')[0] : ''}</span>
            <button className="btn-ghost" style={{ fontSize: '.75rem', padding: '.35rem .7rem' }} onClick={() => signOut()}>Sair</button>
          </div>
        ) : (
          <button className="btn-red" style={{ padding: '.4rem 1rem', fontSize: '.75rem' }} onClick={() => go('/login')}>
            Entrar
          </button>
        )}

        {/* Burger */}
        <button className="nav-burger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
          <span style={{ transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? 'rotate(-45deg) translate(6px,-6px)' : 'none' }} />
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <nav className="nav-mobile-drawer" style={{ display: 'flex' }}>
          {NAV_ITEMS.map(item => (
            <button
              key={item.path}
              className={`nav-link-mobile ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => go(item.path)}
            >
              {item.label}
            </button>
          ))}
          {isAdmin && (
            <button
              className={`nav-link-mobile ${isActive('/admin') ? 'active' : ''}`}
              onClick={() => go('/admin')}
              style={{ color: '#E53935' }}
            >
              Admin
            </button>
          )}
          <div style={{ height: 1, background: 'rgba(192,57,43,.2)', margin: '.5rem 0' }} />
          {user
            ? <button className="nav-link-mobile" onClick={() => { signOut(); setMenuOpen(false) }}>Sair</button>
            : <button className="nav-link-mobile" onClick={() => go('/login')}>Entrar</button>
          }
          <button className="nav-link-mobile" onClick={() => setDarkMode(d => !d)}>
            {darkMode ? '☀ Modo claro' : '🌙 Modo escuro'}
          </button>
        </nav>
      )}
    </header>
  )
}

export function LogoIcon({ size = 44 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: 'rgba(192,57,43,.15)', border: '1px solid rgba(192,57,43,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 20 20" fill="none">
        <rect x="8" y="2" width="4" height="16" rx="1" fill="#E53935" />
        <rect x="2" y="8" width="16" height="4" rx="1" fill="#E53935" />
      </svg>
    </div>
  )
}

export function MilDecor() {
  return (
    <svg className="ecg-decor" width="700" height="180" viewBox="0 0 700 180">
      <path d="M0 90 L100 90 L118 70 L136 110 L154 30 L172 150 L190 90 L310 90 L328 70 L346 110 L364 30 L382 150 L400 90 L520 90 L538 70 L556 110 L574 30 L592 150 L610 90 L700 90"
        fill="none" stroke="#C0392B" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  )
}
