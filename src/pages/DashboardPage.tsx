import { useMemo } from 'react'
import { MOCK_QUESTIONS, MOCK_STUDY_HEATMAP, MOCK_THEME_STATS } from '@/data/mockData'
import { THEMES } from '@/services/supabaseClient'
import { Heatmap } from '@/components/common/Heatmap'
import { useStudyContext } from '@/contexts/StudyContext'

// Calcula streak de dias consecutivos a partir de um array de datas ISO
function computeStreak(dates: string[]): number {
  if (!dates.length) return 0
  const sorted = [...new Set(dates.map(d => d.split('T')[0]))].sort().reverse()
  let streak = 0
  let expected = new Date().toISOString().split('T')[0]
  for (const date of sorted) {
    if (date === expected) {
      streak++
      const d = new Date(expected)
      d.setDate(d.getDate() - 1)
      expected = d.toISOString().split('T')[0]
    } else break
  }
  return streak
}

export function DashboardPage() {
  // MIGRAÇÃO: historico agora vem do StudyContext, não de props
  const { historico } = useStudyContext()

  const respondidas = Object.keys(historico).length
  const acertos     = Object.values(historico).filter((h: any) => h.acertou).length
  const pct         = respondidas > 0 ? Math.round(acertos / respondidas * 100) : 0

  const porTema = useMemo(() => {
    const r: Record<string, { total: number; acertos: number; totalTema: number; pct: number }> = {}
    for (const t of Object.keys(THEMES)) {
      const arr = Object.entries(historico).filter(([id]) => {
        const q = MOCK_QUESTIONS.find(q => String(q.id) === String(id))
        return q?.theme === t
      })
      const total = arr.length
      const ac    = arr.filter(([, h]: any) => h.acertou).length
      r[t] = { total, acertos: ac, totalTema: MOCK_QUESTIONS.filter(q => q.theme === t).length, pct: total > 0 ? Math.round(ac / total * 100) : 0 }
    }
    return r
  }, [historico])

  const streak = computeStreak(MOCK_STUDY_HEATMAP)

  return (
    <section style={{ padding: '4rem 2rem', background: '#0D0D0D' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <div className="accent-bar" />
        <h2 style={{ fontFamily: 'var(--font-d)', fontSize: '2rem', color: 'white', marginBottom: '.4rem' }}>Dashboard</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '.88rem', marginBottom: '2rem' }}>
          {respondidas} de {MOCK_QUESTIONS.length} questões respondidas
        </p>

        {respondidas === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📊</div>
            <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.2rem', color: '#E53935' }}>Nenhuma questão respondida ainda</div>
            <p style={{ color: 'var(--text-muted)', fontSize: '.88rem', marginTop: '.5rem' }}>Acesse o Banco de Questões para começar.</p>
          </div>
        ) : (
          <>
            {/* Cards de stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
              {[
                { lbl: 'Respondidas', val: respondidas,           color: '#E53935' },
                { lbl: 'Acertos',     val: acertos,               color: '#4ade80' },
                { lbl: 'Erros',       val: respondidas - acertos, color: '#f87171' },
                { lbl: 'Aproveit.',   val: pct + '%',             color: pct >= 70 ? '#4ade80' : pct >= 50 ? '#EF5350' : '#f87171' },
              ].map((d, i) => (
                <div key={i} className="dash-card" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '.7rem', textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--text-muted)', marginBottom: '.5rem', fontWeight: 700 }}>{d.lbl}</div>
                  <div style={{ fontFamily: 'var(--font-d)', fontSize: '2.25rem', fontWeight: 700, color: d.color, lineHeight: 1 }}>{d.val}</div>
                </div>
              ))}
            </div>

            {/* Aproveitamento geral + streak */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div className="dash-card" style={{ background: '#080808', textAlign: 'center', padding: '2rem' }}>
                <div style={{ fontSize: '.75rem', textTransform: 'uppercase', letterSpacing: '.15em', color: 'var(--text-muted)', marginBottom: '.5rem' }}>Aproveitamento Geral</div>
                <div style={{ fontFamily: 'var(--font-d)', fontSize: '4.5rem', fontWeight: 700, lineHeight: 1, color: pct >= 70 ? '#4ade80' : pct >= 50 ? '#EF5350' : '#f87171' }}>{pct}%</div>
                <div style={{ marginTop: '1rem', background: 'rgba(192,57,43,.15)', height: 8, maxWidth: 300, margin: '1rem auto 0' }}>
                  <div style={{ height: '100%', width: pct + '%', transition: 'width .6s', background: pct >= 70 ? '#4ade80' : pct >= 50 ? '#EF5350' : '#f87171' }} />
                </div>
              </div>
              <div className="dash-card" style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{ fontSize: '.75rem', textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--text-muted)', marginBottom: '.5rem' }}>Streak</div>
                <div style={{ fontFamily: 'var(--font-d)', fontSize: '3rem', fontWeight: 700, color: '#E53935' }}>{streak}</div>
                <div style={{ fontSize: '.72rem', color: 'var(--text-dim)', marginTop: '.25rem' }}>dias consecutivos</div>
              </div>
            </div>

            {/* Heatmap */}
            <div className="dash-card" style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.1rem', color: '#E53935', marginBottom: '1.25rem', fontWeight: 600 }}>Atividade de Estudo</div>
              <Heatmap data={MOCK_STUDY_HEATMAP} weeks={52} />
            </div>

            {/* Por tema */}
            <div className="dash-card">
              <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.1rem', color: '#E53935', marginBottom: '1.25rem', fontWeight: 600 }}>Por Tema</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
                {(Object.entries(THEMES) as [string, string][]).map(([k, v]) => {
                  const d = porTema[k]
                  if (!d || d.total === 0) return null
                  return (
                    <div key={k}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.3rem', fontSize: '.83rem', color: 'var(--text)' }}>
                        <span>{v}</span>
                        <span style={{ color: d.pct >= 70 ? '#4ade80' : d.pct >= 50 ? '#EF5350' : '#f87171', fontWeight: 700 }}>{d.pct}%</span>
                      </div>
                      <div style={{ height: 6, background: 'rgba(192,57,43,.12)' }}>
                        <div style={{ height: '100%', width: d.pct + '%', background: d.pct >= 70 ? '#4ade80' : d.pct >= 50 ? '#EF5350' : '#f87171', transition: 'width .5s' }} />
                      </div>
                      <div style={{ fontSize: '.7rem', color: 'var(--text-dim)', marginTop: '.2rem' }}>
                        {d.acertos}/{d.total} acertos · {d.totalTema} questões no tema
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
