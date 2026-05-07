import { useMemo } from 'react'
import { MOCK_QUESTIONS, MOCK_STUDY_HEATMAP, MOCK_THEME_STATS } from '@/data/mockData'
import { THEMES } from '@/services/supabaseClient'
import { Heatmap } from '@/components/common/Heatmap'

interface Props { historico: Record<string, any> }

export function DashboardPage({ historico }: Props) {
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
                { lbl: 'Respondidas', val: respondidas,         color: '#E53935' },
                { lbl: 'Acertos',     val: acertos,             color: '#4ade80' },
                { lbl: 'Erros',       val: respondidas - acertos, color: '#f87171' },
                { lbl: 'Aproveit.',   val: pct + '%',           color: pct >= 70 ? '#4ade80' : pct >= 50 ? '#EF5350' : '#f87171' },
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

            {/* Por módulo */}
            <div className="dash-grid">
              <div className="dash-card">
                <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.1rem', color: '#E53935', marginBottom: '1.25rem', fontWeight: 600 }}>Por Módulo</div>
                {Object.entries(THEMES).map(([t, label]) => (
                  <div key={t} style={{ marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.4rem', fontSize: '.85rem' }}>
                      <span style={{ fontWeight: 600, color: 'var(--text)' }}>{label}</span>
                      <span style={{ color: porTema[t]?.total === 0 ? 'var(--text-dim)' : '#E53935', fontWeight: 700, fontSize: '.82rem' }}>
                        {porTema[t]?.total === 0 ? '—' : `${porTema[t].acertos}/${porTema[t].total} (${porTema[t].pct}%)`}
                      </span>
                    </div>
                    <div className="dash-bar-track">
                      <div className="dash-bar-fill" style={{ width: (porTema[t]?.pct ?? 0) + '%', background: (porTema[t]?.pct ?? 0) >= 70 ? '#4ade80' : (porTema[t]?.pct ?? 0) >= 50 ? '#EF5350' : '#f87171' }} />
                    </div>
                    <div style={{ fontSize: '.68rem', color: 'var(--text-dim)', marginTop: '.25rem' }}>{porTema[t]?.total ?? 0}/{porTema[t]?.totalTema ?? 0} questões</div>
                  </div>
                ))}
              </div>
              <div className="dash-card">
                <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.1rem', color: '#E53935', marginBottom: '1.25rem', fontWeight: 600 }}>Metas</div>
                {[
                  { meta: 3,                      lbl: '3 questões' },
                  { meta: 5,                      lbl: '5 questões' },
                  { meta: MOCK_QUESTIONS.length,  lbl: 'Banco completo!' },
                ].map(({ meta, lbl }) => (
                  <div key={meta} style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '.6rem', fontSize: '.82rem' }}>
                    <span>{respondidas >= meta ? '✅' : '⏳'}</span>
                    <span style={{ color: respondidas >= meta ? '#4ade80' : 'var(--text-muted)', fontWeight: respondidas >= meta ? 600 : 400 }}>{lbl}</span>
                  </div>
                ))}

                <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
                  <div style={{ fontFamily: 'var(--font-d)', fontSize: '1rem', color: '#E53935', marginBottom: '1rem', fontWeight: 600 }}>Histórico de Simulados</div>
                  {MOCK_SIMULADOS.map(s => (
                    <div key={s.id} style={{ padding: '.6rem 0', borderBottom: '1px solid rgba(192,57,43,.1)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.82rem' }}>
                        <span style={{ color: 'var(--text)' }}>{s.temas}</span>
                        <span style={{ fontWeight: 700, color: s.pct >= 70 ? '#4ade80' : s.pct >= 50 ? '#EF5350' : '#f87171' }}>{s.pct}%</span>
                      </div>
                      <div style={{ fontSize: '.7rem', color: 'var(--text-dim)' }}>{s.data} · {s.tempo}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

function computeStreak(data: { date: string; count: number }[]): number {
  const today = new Date().toISOString().split('T')[0]
  const set   = new Set(data.filter(d => d.count > 0).map(d => d.date))
  let streak  = 0
  const cursor = new Date(today)
  while (true) {
    const dateStr = cursor.toISOString().split('T')[0]
    if (!set.has(dateStr)) break
    streak++
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}

const MOCK_SIMULADOS = [
  { id: '1', temas: 'ATLS + Choque', data: '03/05/2026', tempo: '14min', pct: 80 },
  { id: '2', temas: 'Via Aérea + TCE', data: '01/05/2026', tempo: '22min', pct: 60 },
  { id: '3', temas: 'Trauma Torácico', data: '28/04/2026', tempo: '18min', pct: 75 },
]
