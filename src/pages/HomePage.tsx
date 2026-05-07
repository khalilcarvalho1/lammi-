import { MilDecor } from '@/components/layout/Navbar'
import { THEMES } from '@/services/supabaseClient'
import { MOCK_QUESTIONS, MOCK_FLASHCARDS } from '@/data/mockData'

const TEMA_ICONS: Record<string, string> = {
  avaliacao_cena:'🩺', cinetica_trauma:'💥', atls_inicial:'⚕️',
  atls_via_aerea:'🫁', atls_face:'😶', atls_pescoco:'🔴',
  atls_toracico:'🫀', atls_choque:'🩸', atls_abdominal:'🟥',
  atls_genitourinario:'🔵', atls_cranioencefalico:'🧠', atls_coluna:'🦴',
}

interface HomePageProps {
  setPage: (p: string) => void
  acertos: number
  respondidas: number
}

export function HomePage({ setPage, acertos, respondidas }: HomePageProps) {
  const total = MOCK_QUESTIONS.length
  const pct = respondidas > 0 ? Math.round(acertos / respondidas * 100) : 0

  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-mil" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="noise" />
        <MilDecor />
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '5rem 2rem 4rem', position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}
            className="hero-grid">
            <div className="fade-up">
              <div className="ornament" style={{ maxWidth: 300, marginBottom: '1.75rem' }}>Irecê · Bahia · 2024</div>
              <h1 style={{ fontFamily: 'var(--font-d)', fontSize: 'clamp(2.4rem,5vw,4rem)', color: 'white', lineHeight: 1.08, fontWeight: 700, marginBottom: '1.25rem' }}>
                Medicina Militar<br />com <span style={{ fontStyle: 'italic', color: '#E53935' }}>precisão e preparo</span>
              </h1>
              <p style={{ color: 'rgba(240,240,240,.75)', fontSize: '1.05rem', lineHeight: 1.75, maxWidth: 520, marginBottom: '2.5rem' }}>
                Banco de questões da <strong style={{ color: '#E53935' }}>LAMMI</strong>. Protocolos ATLS, TCCC, PHTLS e Medicina Operacional. Raciocínio clínico tático em primeiro plano.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button className="btn-red" onClick={() => setPage('banco')}>Começar a Estudar</button>
                <button className="btn-outline-red" onClick={() => setPage('simulado')}>Fazer Simulado</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '2rem', marginTop: '3.5rem', paddingTop: '2.5rem', borderTop: '1px solid rgba(192,57,43,.25)' }}>
                {[
                  { val: total,                          lbl: 'Questões'       },
                  { val: Object.keys(THEMES).length,     lbl: 'Temas ATLS'     },
                  { val: pct ? pct + '%' : '—',          lbl: 'Aproveitamento' },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="stat-val">{s.val}</div>
                    <div className="stat-lbl">{s.lbl}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card lateral */}
            <div className="fade-up delay-2" style={{ position: 'relative' }}>
              <div className="card-mil" style={{ padding: '2.5rem' }}>
                <div className="accent-bar" />
                <h3 style={{ fontFamily: 'var(--font-d)', fontSize: '1.4rem', color: 'white', marginBottom: '.4rem' }}>Banco de Questões</h3>
                <div style={{ fontSize: '.7rem', textTransform: 'uppercase', letterSpacing: '.18em', color: '#E53935', marginBottom: '1.5rem' }}>
                  {total} questões · ATLS · TCCC · PHTLS
                </div>
                {Object.entries(THEMES).slice(0, 6).map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '.6rem 0', borderBottom: '1px solid rgba(192,57,43,.15)' }}>
                    <span style={{ color: 'rgba(240,240,240,.8)', fontSize: '.88rem' }}>{TEMA_ICONS[k] ?? '📋'} {v}</span>
                    <span style={{ color: '#E53935', fontFamily: 'var(--font-d)', fontSize: '1.1rem', fontWeight: 600 }}>
                      {MOCK_QUESTIONS.filter(q => q.theme === k).length}
                    </span>
                  </div>
                ))}
                <button className="btn-red" style={{ marginTop: '1.75rem', width: '100%' }} onClick={() => setPage('banco')}>
                  Acessar Banco →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding: '5rem 2rem', background: '#0D0D0D' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="ornament" style={{ maxWidth: 240, margin: '0 auto 3rem' }}>Funcionalidades</div>
          <h2 style={{ fontFamily: 'var(--font-d)', fontSize: 'clamp(1.8rem,3vw,2.6rem)', textAlign: 'center', color: 'white', marginBottom: '3rem' }}>
            Tudo para dominar a <span style={{ color: '#E53935' }}>Medicina Militar</span>
          </h2>
          <div className="features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.25rem' }}>
            {FEATURES.map((f, i) => (
              <div className="feature-card" key={i}>
                <div className="feature-icon">{f.icon}</div>
                <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.05rem', fontWeight: 600, color: '#EF5350', marginBottom: '.5rem' }}>{f.title}</div>
                <div style={{ fontSize: '.87rem', color: 'rgba(240,240,240,.65)', lineHeight: 1.65 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-mil" style={{ padding: '4rem 2rem', position: 'relative', overflow: 'hidden' }}>
        <div className="noise" />
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <div className="accent-bar" style={{ margin: '0 auto 1.5rem' }} />
          <h2 style={{ fontFamily: 'var(--font-d)', fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'white', marginBottom: '.75rem' }}>
            Pronto para o campo?
          </h2>
          <p style={{ color: 'rgba(240,240,240,.55)', marginBottom: '2rem', fontSize: '.97rem' }}>
            {total} questões · ATLS · TCE · Trauma · Medicina Operacional
          </p>
          <button className="btn-red" onClick={() => setPage('banco')}>Iniciar agora →</button>
        </div>
      </section>
    </>
  )
}

const FEATURES = [
  { icon: '📋', title: 'Questões Táticas',    desc: 'Questões baseadas em protocolos ATLS, TCCC, PHTLS e manuais do Exército Brasileiro.' },
  { icon: '🎴', title: 'Flashcards SRS',       desc: 'Cards com repetição espaçada SM-2 para memorizar protocolos críticos com eficiência.' },
  { icon: '💡', title: 'Gabarito Comentado',   desc: 'Cada questão com comentário baseado nas diretrizes mais atuais de medicina tática.' },
  { icon: '🎚️', title: 'Filtros por Módulo',  desc: 'Filtre por tema, subtema e dificuldade para estudo direcionado por déficit.' },
  { icon: '⏱️', title: 'Modo Simulado',        desc: 'Provas cronometradas simulando condições de avaliação real com análise de desempenho.' },
  { icon: '📊', title: 'Dashboard',            desc: 'Acompanhe seu progresso por módulo e identifique pontos de melhoria.' },
]
