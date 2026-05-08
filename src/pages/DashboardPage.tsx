import { useMemo, useState, useEffect } from 'react'
import { MOCK_QUESTIONS, MOCK_STUDY_HEATMAP } from '@/data/mockData'
import { THEMES, StudyTheme, SimuladoRecord } from '@/services/supabaseClient'
import { Heatmap } from '@/components/common/Heatmap'
import { useStudyContext } from '@/contexts/StudyContext'
import { useAuthContext } from '@/contexts/AuthContext'
import { simuladoService } from '@/services/simuladoService'
import { studyLogService } from '@/services/studyLogService'

type Aba = 'stats' | 'historico'

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

function formatDuracao(segundos: number) {
  const m = Math.floor(segundos / 60)
  const s = segundos % 60
  return `${m}min ${s}s`
}

export function DashboardPage() {
  const { historico } = useStudyContext()
  const { user }      = useAuthContext()

  const [aba,          setAba]          = useState<Aba>('stats')
  const [simulados,    setSimulados]    = useState<SimuladoRecord[]>([])
  const [loadingSimul, setLoadingSimul] = useState(false)
  const [heatmapData,  setHeatmapData]  = useState<{ date: string; count: number }[]>([])
  const [streakReal,   setStreakReal]    = useState<number | null>(null)
  const [simuladoAberto, setSimuladoAberto] = useState<SimuladoRecord | null>(null)

  const respondidas = Object.keys(historico).length
  const acertos     = Object.values(historico).filter((h: any) => h.acertou).length
  const pct         = respondidas > 0 ? Math.round(acertos / respondidas * 100) : 0

  // ─── Carrega dados do Supabase se logado ──────────────────
  useEffect(() => {
    if (!user) return

    // Histórico de simulados
    setLoadingSimul(true)
    simuladoService.getUserSimulados(user.id).then(({ data }) => {
      if (data) setSimulados(data as SimuladoRecord[])
      setLoadingSimul(false)
    })

    // Heatmap real
    studyLogService.getHeatmapData(user.id).then(data => {
      if (data.length > 0) setHeatmapData(data)
    })

    // Streak real
    studyLogService.getStreak(user.id).then(s => setStreakReal(s))
  }, [user])

  const heatmap = heatmapData.length > 0 ? heatmapData.map(d => d.date) : MOCK_STUDY_HEATMAP
  const streak  = streakReal !== null ? streakReal : computeStreak(heatmap)

  const porTema = useMemo(() => {
    const r: Record<string, { total: number; acertos: number; totalTema: number; pct: number }> = {}
    for (const t of Object.keys(THEMES)) {
      const arr   = Object.entries(historico).filter(([id]) => MOCK_QUESTIONS.find(q => String(q.id) === String(id))?.theme === t)
      const total = arr.length
      const ac    = arr.filter(([, h]: any) => h.acertou).length
      r[t] = { total, acertos: ac, totalTema: MOCK_QUESTIONS.filter(q => q.theme === t).length, pct: total > 0 ? Math.round(ac / total * 100) : 0 }
    }
    return r
  }, [historico])

  // ─── Detalhe de um simulado ────────────────────────────────
  if (simuladoAberto) {
    const acertosS = simuladoAberto.correct_count
    const totalS   = simuladoAberto.total_questions
    const pctS     = Math.round(acertosS / totalS * 100)
    return (
      <section style={{ padding: '4rem 2rem', background: '#0D0D0D' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <button className="btn-ghost" style={{ marginBottom: '1.5rem', fontSize: '.8rem' }} onClick={() => setSimuladoAberto(null)}>
            ← Histórico
          </button>
          <div className="card-dark" style={{ padding: '2rem', marginBottom: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-d)', fontSize: '4rem', fontWeight: 700, color: pctS >= 70 ? '#4ade80' : pctS >= 50 ? '#EF5350' : '#f87171' }}>{pctS}%</div>
            <p style={{ color: 'var(--text-muted)', fontSize: '.88rem', marginTop: '.5rem' }}>
              {acertosS} de {totalS} corretas · {formatDuracao(simuladoAberto.time_seconds)}
            </p>
            <p style={{ color: 'var(--text-dim)', fontSize: '.75rem', marginTop: '.25rem' }}>
              {new Date(simuladoAberto.started_at).toLocaleString('pt-BR')}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', marginTop: '1rem' }}>
              {simuladoAberto.themes.map(t => (
                <span key={t} className="tag-pill" style={{ fontSize: '.7rem' }}>{THEMES[t]}</span>
              ))}
            </div>
          </div>

          <div className="card-dark" style={{ padding: '1.75rem' }}>
            <div style={{ fontFamily: 'var(--font-d)', fontSize: '1rem', color: '#E53935', marginBottom: '1.25rem', fontWeight: 600 }}>Questões</div>
            {simuladoAberto.question_results.map((qr, i) => {
              const questao = MOCK_QUESTIONS.find(q => q.id === qr.question_id)
              return (
                <div key={i} style={{ display: 'flex', gap: '.75rem', padding: '.75rem 0', borderBottom: '1px solid rgba(192,57,43,.1)', alignItems: 'flex-start' }}>
                  <div style={{ width: 26, height: 26, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.75rem', fontWeight: 700, background: qr.correct ? '#2f7a3f' : '#b23b3b', color: 'white' }}>
                    {qr.correct ? '✓' : '✗'}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: '.85rem', color: 'var(--text)', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {questao?.statement ?? `Questão ${i + 1}`}
                    </p>
                    <p style={{ fontSize: '.72rem', color: 'var(--text-dim)', marginTop: '.2rem' }}>
                      Sua: {qr.chosen_key || '—'} · Correta: {questao?.correct_key ?? '?'}
                    </p>
                    {questao?.explanation && (
                      <p style={{ fontSize: '.78rem', color: 'var(--text-muted)', marginTop: '.4rem', fontStyle: 'italic', lineHeight: 1.5 }}>
                        {questao.explanation}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section style={{ padding: '4rem 2rem', background: '#0D0D0D' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <div className="accent-bar" />
        <h2 style={{ fontFamily: 'var(--font-d)', fontSize: '2rem', color: 'white', marginBottom: '.4rem' }}>Dashboard</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '.88rem', marginBottom: '1.5rem' }}>
          {respondidas} de {MOCK_QUESTIONS.length} questões respondidas
          {!user && ' · Faça login para sincronizar progresso'}
        </p>

        {/* Abas */}
        <div style={{ display: 'flex', gap: 4, marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: 1 }}>
          {[
            { id: 'stats',     lbl: 'Estatísticas' },
            { id: 'historico', lbl: `Histórico de Simulados${simulados.length > 0 ? ` (${simulados.length})` : ''}` },
          ].map(a => (
            <button key={a.id} onClick={() => setAba(a.id as Aba)}
              style={{ padding: '.6rem 1.1rem', border: 'none', background: aba === a.id ? 'var(--red)' : 'transparent', color: aba === a.id ? 'white' : 'var(--text-muted)', fontFamily: 'var(--font-s)', fontSize: '.82rem', fontWeight: 600, cursor: 'pointer', transition: 'all .15s' }}>
              {a.lbl}
            </button>
          ))}
        </div>

        {/* ── ABA STATS ── */}
        {aba === 'stats' && (
          <>
            {respondidas === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem', background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📊</div>
                <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.2rem', color: '#E53935' }}>Nenhuma questão respondida ainda</div>
                <p style={{ color: 'var(--text-muted)', fontSize: '.88rem', marginTop: '.5rem' }}>Acesse o Banco de Questões para começar.</p>
              </div>
            ) : (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                  {[
                    { lbl: 'Respondidas', val: respondidas,           color: '#E53935' },
                    { lbl: 'Acertos',     val: acertos,               color: '#4ade80' },
                    { lbl: 'Erros',       val: respondidas - acertos, color: '#f87171' },
                    { lbl: 'Aproveit.',   val: pct + '%',             color: pct >= 70 ? '#4ade80' : '#f87171' },
                  ].map((d, i) => (
                    <div key={i} className="dash-card" style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '.7rem', textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--text-muted)', marginBottom: '.5rem', fontWeight: 700 }}>{d.lbl}</div>
                      <div style={{ fontFamily: 'var(--font-d)', fontSize: '2.25rem', fontWeight: 700, color: d.color, lineHeight: 1 }}>{d.val}</div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div className="dash-card" style={{ textAlign: 'center', padding: '2rem' }}>
                    <div style={{ fontSize: '.75rem', textTransform: 'uppercase', letterSpacing: '.15em', color: 'var(--text-muted)', marginBottom: '.5rem' }}>Aproveitamento Geral</div>
                    <div style={{ fontFamily: 'var(--font-d)', fontSize: '4.5rem', fontWeight: 700, lineHeight: 1, color: pct >= 70 ? '#4ade80' : '#f87171' }}>{pct}%</div>
                    <div style={{ marginTop: '1rem', background: 'rgba(192,57,43,.15)', height: 8, maxWidth: 300, margin: '1rem auto 0' }}>
                      <div style={{ height: '100%', width: pct + '%', transition: 'width .6s', background: pct >= 70 ? '#4ade80' : '#f87171' }} />
                    </div>
                  </div>
                  <div className="dash-card" style={{ textAlign: 'center', padding: '2rem' }}>
                    <div style={{ fontSize: '.75rem', textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--text-muted)', marginBottom: '.5rem' }}>Streak</div>
                    <div style={{ fontFamily: 'var(--font-d)', fontSize: '3rem', fontWeight: 700, color: '#E53935' }}>{streak}</div>
                    <div style={{ fontSize: '.72rem', color: 'var(--text-dim)', marginTop: '.25rem' }}>dias consecutivos</div>
                  </div>
                </div>

                <div className="dash-card" style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.1rem', color: '#E53935', marginBottom: '1.25rem', fontWeight: 600 }}>Atividade de Estudo</div>
                  <Heatmap data={heatmap} weeks={52} />
                </div>

                <div className="dash-card">
                  <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.1rem', color: '#E53935', marginBottom: '1.25rem', fontWeight: 600 }}>Por Tema</div>
                  {(Object.entries(THEMES) as [string, string][]).map(([k, v]) => {
                    const d = porTema[k]
                    if (!d || d.total === 0) return null
                    return (
                      <div key={k} style={{ marginBottom: '.9rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.3rem', fontSize: '.83rem', color: 'var(--text)' }}>
                          <span>{v}</span>
                          <span style={{ color: d.pct >= 70 ? '#4ade80' : '#f87171', fontWeight: 700 }}>{d.pct}%</span>
                        </div>
                        <div style={{ height: 6, background: 'rgba(192,57,43,.12)' }}>
                          <div style={{ height: '100%', width: d.pct + '%', background: d.pct >= 70 ? '#4ade80' : '#f87171', transition: 'width .5s' }} />
                        </div>
                        <div style={{ fontSize: '.7rem', color: 'var(--text-dim)', marginTop: '.2rem' }}>{d.acertos}/{d.total} · {d.totalTema} no tema</div>
                      </div>
                    )
                  })}
                </div>
              </>
            )}
          </>
        )}

        {/* ── ABA HISTÓRICO ── */}
        {aba === 'historico' && (
          <>
            {!user ? (
              <div style={{ textAlign: 'center', padding: '4rem', background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔒</div>
                <p style={{ color: 'var(--text-muted)' }}>Faça <a href="/login" style={{ color: '#E53935' }}>login</a> para ver seu histórico de simulados.</p>
              </div>
            ) : loadingSimul ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Carregando...</div>
            ) : simulados.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem', background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📋</div>
                <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.2rem', color: '#E53935' }}>Nenhum simulado feito ainda</div>
                <p style={{ color: 'var(--text-muted)', fontSize: '.88rem', marginTop: '.5rem' }}>
                  <a href="/simulado" style={{ color: '#E53935' }}>Fazer primeiro simulado →</a>
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
                {simulados.map(s => {
                  const pctS = Math.round(s.correct_count / s.total_questions * 100)
                  const col  = pctS >= 70 ? '#4ade80' : pctS >= 50 ? '#EF5350' : '#f87171'
                  return (
                    <button key={s.id} onClick={() => setSimuladoAberto(s)}
                      style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '1.25rem 1.5rem', cursor: 'pointer', textAlign: 'left', transition: 'all .2s', width: '100%' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#E53935' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)' }}>
                      <div style={{ fontFamily: 'var(--font-d)', fontSize: '2rem', fontWeight: 700, color: col, minWidth: 70 }}>
                        {pctS}%
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '.85rem', color: 'var(--text)', fontWeight: 600, marginBottom: '.3rem' }}>
                          {s.correct_count}/{s.total_questions} corretas · {formatDuracao(s.time_seconds)}
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: '.3rem' }}>
                          {s.themes.slice(0, 3).map(t => (
                            <span key={t} className="tag-pill" style={{ fontSize: '.65rem' }}>{THEMES[t]}</span>
                          ))}
                          {s.themes.length > 3 && <span className="tag-pill" style={{ fontSize: '.65rem' }}>+{s.themes.length - 3}</span>}
                        </div>
                        <div style={{ fontSize: '.72rem', color: 'var(--text-dim)' }}>
                          {new Date(s.started_at).toLocaleString('pt-BR')}
                        </div>
                      </div>
                      <span style={{ color: '#E53935', flexShrink: 0 }}>ver →</span>
                    </button>
                  )
                })}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
