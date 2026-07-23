import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuthContext } from '@/contexts/AuthContext'
import { useStudyContext } from '@/contexts/StudyContext'
import { useOfflineHandler } from '@/hooks/useOfflineHandler'
import { questionsService } from '@/services/questionsService'
import { flashcardsService } from '@/services/flashcardsService'

interface NavbarProps {
  darkMode: boolean
  setDarkMode: (fn: (d: boolean) => boolean) => void
}

const NAV_ITEMS = [
  { id: 'home',       path: '/',           label: 'Início'     },
  { id: 'areas',      path: '/areas',      label: 'Áreas'      },
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
  const [menuOpen,     setMenuOpen]     = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [resetting,    setResetting]    = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const { user, profile, signOut, isAdmin } = useAuthContext()
  const { historico, resetProgress } = useStudyContext()
  const { isOnline } = useOfflineHandler()
  const navigate = useNavigate()
  const location = useLocation()

  const go = (path: string) => { navigate(path); setMenuOpen(false); setDropdownOpen(false) }
  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const respondidas  = Object.keys(historico).length
  const acertos      = Object.values(historico).filter((h: any) => h.acertou).length
  const pct          = respondidas > 0 ? Math.round(acertos / respondidas * 100) : 0
  const inicial      = profile?.display_name?.charAt(0).toUpperCase() ?? '?'
  const primeiroNome = profile?.display_name?.split(' ')[0] ?? ''

  const handleReset = async () => {
    if (!confirm('Apagar todo o seu progresso? Esta ação não pode ser desfeita.')) return
    setResetting(true)
    setDropdownOpen(false)
    resetProgress()
    if (user) {
      await questionsService.deleteUserProgress(user.id)
      await flashcardsService.deleteUserSRSStates(user.id)
    }
    setResetting(false)
  }

  return (
    <header className="nav bg-mil">
      <div className="nav-inner">
        <button onClick={() => go('/')} className="nav-brand">
          <LogoIcon size={40} />
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.15rem', color: 'white', fontWeight: 700, letterSpacing: '.06em', lineHeight: 1.1 }}>LAMMI</div>
            <div style={{ fontSize: '.6rem', textTransform: 'uppercase', letterSpacing: '.2em', color: '#E53935' }}>Liga · Medicina Militar</div>
          </div>
        </button>

        <nav className="nav-desktop">
          {NAV_ITEMS.map(item => (
            <button key={item.path} className={`nav-link ${isActive(item.path) ? 'active' : ''}`} onClick={() => go(item.path)}>
              {item.label}
            </button>
          ))}
          {isAdmin && (
            <button className={`nav-link ${isActive('/admin') ? 'active' : ''}`} onClick={() => go('/admin')} style={{ color: '#E53935' }}>
              Admin
            </button>
          )}
        </nav>

        {!isOnline && (
          <span style={{ fontSize: '.7rem', background: '#b23b3b', color: '#fff', padding: '2px 8px', fontWeight: 600 }}>OFFLINE</span>
        )}

        <button onClick={() => setDarkMode(d => !d)} title={darkMode ? 'Modo claro' : 'Modo escuro'}
          style={{ background: 'transparent', border: '1px solid rgba(192,57,43,.4)', color: '#E53935', width: 36, height: 36, borderRadius: '50%', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s', flexShrink: 0 }}>
          {darkMode ? '☀' : '🌙'}
        </button>

        {user ? (
          <div ref={dropdownRef} style={{ position: 'relative' }}>
            <button onClick={() => setDropdownOpen(o => !o)}
              style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(192,57,43,.25)', border: '1px solid rgba(192,57,43,.5)', color: 'white', fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: '.95rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
              title={profile?.display_name ?? ''}>
              {inicial}
            </button>
            {dropdownOpen && (
              <div style={{ position: 'absolute', top: 'calc(100% + 10px)', right: 0, background: 'var(--bg-card)', border: '1px solid rgba(192,57,43,.25)', minWidth: 220, zIndex: 200, boxShadow: '0 8px 32px rgba(0,0,0,.4)' }}>
                <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid rgba(192,57,43,.15)' }}>
                  <div style={{ fontWeight: 700, color: 'white', fontSize: '.9rem', marginBottom: '.15rem' }}>{profile?.display_name ?? user.email}</div>
                  <div style={{ fontSize: '.72rem', color: 'var(--text-muted)' }}>{user.email}</div>
                </div>
                <div style={{ padding: '.75rem 1.25rem', borderBottom: '1px solid rgba(192,57,43,.15)', display: 'flex', gap: '1.5rem' }}>
                  {[
                    { val: respondidas, lbl: 'Questões', col: '#E53935' },
                    { val: acertos,     lbl: 'Acertos',  col: '#4ade80' },
                    { val: respondidas > 0 ? pct + '%' : '—', lbl: 'Aproveit.', col: pct >= 70 ? '#4ade80' : '#E53935' },
                  ].map(s => (
                    <div key={s.lbl} style={{ textAlign: 'center' }}>
                      <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.1rem', fontWeight: 700, color: s.col }}>{s.val}</div>
                      <div style={{ fontSize: '.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.08em' }}>{s.lbl}</div>
                    </div>
                  ))}
                </div>
                <div style={{ padding: '.5rem 0' }}>
                  {isAdmin && (
                    <button onClick={() => go('/admin')} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '.6rem 1.25rem', background: 'transparent', border: 'none', color: '#E53935', fontSize: '.84rem', cursor: 'pointer', fontFamily: 'var(--font-s)' }}>
                      ⚙ Painel Admin
                    </button>
                  )}
                  <button onClick={handleReset} disabled={resetting} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '.6rem 1.25rem', background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '.84rem', cursor: 'pointer', fontFamily: 'var(--font-s)' }}>
                    {resetting ? '⏳ Resetando...' : '🗑 Resetar progresso'}
                  </button>
                  <div style={{ height: 1, background: 'rgba(192,57,43,.15)', margin: '.25rem 0' }} />
                  <button onClick={() => { signOut(); setDropdownOpen(false) }} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '.6rem 1.25rem', background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '.84rem', cursor: 'pointer', fontFamily: 'var(--font-s)' }}>
                    ↪ Sair
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button className="btn-red" style={{ padding: '.4rem 1rem', fontSize: '.75rem' }} onClick={() => go('/login')}>
            Entrar
          </button>
        )}

        <button className="nav-burger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
          <span style={{ transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? 'rotate(-45deg) translate(6px,-6px)' : 'none' }} />
        </button>
      </div>

      {menuOpen && (
        <nav className="nav-mobile-drawer" style={{ display: 'flex' }}>
          {user && (
            <div style={{ padding: '1rem', background: 'rgba(192,57,43,.08)', border: '1px solid rgba(192,57,43,.2)', margin: '.5rem', marginBottom: '.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '.6rem' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(192,57,43,.25)', border: '1px solid rgba(192,57,43,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-d)', fontWeight: 700, color: 'white', fontSize: '.95rem', flexShrink: 0 }}>
                  {inicial}
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: 'white', fontSize: '.85rem' }}>{primeiroNome}</div>
                  <div style={{ fontSize: '.7rem', color: 'var(--text-muted)' }}>{user.email}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {[
                  { val: respondidas, lbl: 'Questões', col: '#E53935' },
                  { val: acertos,     lbl: 'Acertos',  col: '#4ade80' },
                  { val: respondidas > 0 ? pct + '%' : '—', lbl: 'Aproveit.', col: pct >= 70 ? '#4ade80' : '#E53935' },
                ].map(s => (
                  <div key={s.lbl} style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-d)', fontSize: '1rem', fontWeight: 700, color: s.col }}>{s.val}</div>
                    <div style={{ fontSize: '.6rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{s.lbl}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {NAV_ITEMS.map(item => (
            <button key={item.path} className={`nav-link-mobile ${isActive(item.path) ? 'active' : ''}`} onClick={() => go(item.path)}>
              {item.label}
            </button>
          ))}
          {isAdmin && (
            <button className={`nav-link-mobile ${isActive('/admin') ? 'active' : ''}`} onClick={() => go('/admin')} style={{ color: '#E53935' }}>
              Admin
            </button>
          )}
          <div style={{ height: 1, background: 'rgba(192,57,43,.2)', margin: '.5rem 0' }} />
          {user ? (
            <>
              <button className="nav-link-mobile" onClick={handleReset} disabled={resetting}>
                {resetting ? '⏳ Resetando...' : '🗑 Resetar progresso'}
              </button>
              <button className="nav-link-mobile" onClick={() => { signOut(); setMenuOpen(false) }}>↪ Sair</button>
            </>
          ) : (
            <button className="nav-link-mobile" onClick={() => go('/login')}>Entrar</button>
          )}
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
    <img
      src="/logo.png"
      alt="LAMMI"
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        objectFit: 'cover',
        flexShrink: 0,
      }}
    />
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