import { useNavigate } from 'react-router-dom'
import { MilDecor } from '@/components/layout/Navbar'
import { MOCK_QUESTIONS } from '@/data/mockData'
import { MOCK_FLASHCARDS } from '@/data/mockData'
import { useStudyContext } from '@/contexts/StudyContext'
import { AREAS } from '@/services/content-hierarchy'

const FEATURES = [
  { icon:'📋', title:'Questões de Residência', desc:'Questões extraídas de provas reais, organizadas por especialidade, tema e dificuldade.' },
  { icon:'🏥', title:'Casos Clínicos', desc:'Raciocínio diagnóstico em etapas com árvore de decisão interativa.' },
  { icon:'📖', title:'Diretrizes Resumidas', desc:'Pontos-chave das principais diretrizes para consulta rápida.' },
  { icon:'🎴', title:'Flashcards SRS', desc:'Sistema de repetição espaçada (SM-2 / Anki) para memorização de longo prazo.' },
  { icon:'⏱️', title:'Modo Simulado', desc:'Provas cronometradas com gabarito comentado no estilo residência.' },
  { icon:'📊', title:'Dashboard de Desempenho', desc:'Acompanhe seu progresso por área e identifique pontos de melhoria.' },
]

export function HomePage() {
  const navigate = useNavigate()
  const { historico } = useStudyContext()

  const total       = MOCK_QUESTIONS.length
  const totalCards  = MOCK_FLASHCARDS.length
  const respondidas = Object.keys(historico).length
  const acertos     = Object.values(historico).filter(h => h.acertou).length
  const pct         = respondidas > 0 ? Math.round(acertos / respondidas * 100) : 0

  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-mil" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="noise"/>
        <MilDecor/>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '5rem 2rem 4rem', position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div className="fade-up">
              <div className="ornament" style={{ maxWidth: 300, marginBottom: '1.75rem' }}>Irecê · Bahia · 2025</div>
              <h1 style={{ fontFamily: 'var(--font-d)', fontSize: 'clamp(2.4rem,5vw,4rem)', color: 'white', lineHeight: 1.08, fontWeight: 700, marginBottom: '1.25rem' }}>
                Medicina Militar<br/>com <span style={{ fontStyle: 'italic', color: 'var(--red-bright)' }}>precisão e preparo</span>
              </h1>
              <p style={{ color: 'rgba(240,240,240,.75)', fontSize: '1.05rem', lineHeight: 1.75, maxWidth: 520, marginBottom: '2.5rem' }}>
                Plataforma de estudos médicos com <strong style={{ color: 'var(--red-bright)' }}>25 especialidades</strong>, banco de questões, flashcards, casos clínicos e diretrizes atualizadas.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button className="btn-red" onClick={() => navigate('/areas')}>Explorar Áreas</button>
                <button className="btn-outline-red" onClick={() => navigate('/simulado')}>Fazer Simulado</button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '2rem', marginTop: '3.5rem', paddingTop: '2.5rem', borderTop: '1px solid rgba(192,57,43,.25)' }}>
                {[
                  { val: total,      lbl: 'Questões'      },
                  { val: totalCards, lbl: 'Flashcards'    },
                  { val: pct ? pct + '%' : '—', lbl: 'Aproveitamento' },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="stat-val">{s.val}</div>
                    <div className="stat-lbl">{s.lbl}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card lateral — 25 áreas */}
            <div className="fade-up delay-2">
              <div className="card-mil" style={{ padding: '2rem' }}>
                <div className="accent-bar"/>
                <h3 style={{ fontFamily: 'var(--font-d)', fontSize: '1.3rem', color: 'white', marginBottom: '.4rem' }}>
                  Áreas Médicas
                </h3>
                <div style={{ fontSize: '.7rem', textTransform: 'uppercase', letterSpacing: '.18em', color: 'var(--red-bright)', marginBottom: '1.25rem' }}>
                  {AREAS.length} especialidades disponíveis
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', maxHeight: 340, overflowY: 'auto' }}>
                  {AREAS.map(area => (
                    <button
                      key={area.id}
                      onClick={() => navigate(`/areas/${area.id}`)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(192,57,43,0.15)',
                        borderRadius: 8, padding: '0.5rem 0.75rem',
                        color: 'rgba(240,240,240,0.8)', fontSize: '0.78rem',
                        cursor: 'pointer', textAlign: 'left', transition: 'all .15s'
                      }}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = '#c0392b')}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(192,57,43,0.15)')}
                    >
                      <span>{area.emoji}</span>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{area.label}</span>
                    </button>
                  ))}
                </div>
                <button className="btn-red" style={{ marginTop: '1.25rem', width: '100%' }} onClick={() => navigate('/areas')}>
                  Ver todas as áreas →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding: '5rem 2rem', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="ornament" style={{ maxWidth: 280, margin: '0 auto 3rem' }}>Funcionalidades</div>
          <h2 style={{ fontFamily: 'var(--font-d)', fontSize: 'clamp(1.8rem,3vw,2.6rem)', textAlign: 'center', color: 'var(--text)', marginBottom: '3rem' }}>
            Tudo para dominar a Medicina
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.25rem' }}>
            {FEATURES.map((f, i) => (
              <div className="feature-card" key={i}>
                <div className="feature-icon">{f.icon}</div>
                <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.05rem', fontWeight: 600, color: 'var(--text)', marginBottom: '.5rem' }}>{f.title}</div>
                <div style={{ fontSize: '.87rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section style={{ padding: '4rem 2rem', background: '#060606', position: 'relative', overflow: 'hidden' }}>
        <div className="noise"/>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <div className="accent-bar" style={{ margin: '0 auto 1.5rem' }}/>
          <h2 style={{ fontFamily: 'var(--font-d)', fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'white', marginBottom: '.75rem' }}>
            Pronto para testar seu conhecimento?
          </h2>
          <p style={{ color: 'rgba(240,240,240,.6)', marginBottom: '2rem', fontSize: '.97rem' }}>
            {total} questões · {totalCards} flashcards · 25 especialidades · Gabarito comentado
          </p>
          <button className="btn-red" onClick={() => navigate('/areas')}>Explorar agora →</button>
        </div>
      </section>
    </>
  )
}