import { useMemo, useState, useEffect } from 'react'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { MOCK_QUESTIONS, MOCK_STUDY_HEATMAP } from '@/data/mockData'
import { THEMES, StudyTheme, SimuladoRecord } from '@/services/supabaseClient'
import { Heatmap } from '@/components/common/Heatmap'
import { useStudyContext } from '@/contexts/StudyContext'
import { useAuthContext } from '@/contexts/AuthContext'
import { simuladoService } from '@/services/simuladoService'
import { studyLogService } from '@/services/studyLogService'

type Aba = 'stats' | 'questoes' | 'historico'

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
  const [gerando, setGerando] = useState(false)

  const exportarPDF = () => {
    setGerando(true)
    try {
      const doc = new jsPDF()

      // Cabeçalho vermelho
      doc.setFillColor(192, 57, 43)
      doc.rect(0, 0, 210, 32, 'F')
      doc.setTextColor(255, 255, 255)
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(16)
      doc.text('LAMMI – Relatório de Desempenho', 14, 14)
      doc.setFontSize(9)
      doc.setFont('helvetica', 'normal')
      doc.text('Liga Acadêmica de Medicina Militar de Irecê', 14, 21)
      doc.text('Gerado em: ' + new Date().toLocaleDateString('pt-BR'), 14, 27)

      // Nome
      doc.setTextColor(30, 30, 30)
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(12)
      doc.text('Membro: ' + (profile?.display_name ?? user?.email ?? '—'), 14, 46)

      // KPIs
      const kpis = [
        { lbl: 'Respondidas', val: String(respondidas) },
        { lbl: 'Acertos',     val: String(acertos)     },
        { lbl: 'Erros',       val: String(respondidas - acertos) },
        { lbl: 'Aproveit.',   val: respondidas > 0 ? pct + '%' : '—' },
      ]
      kpis.forEach((k, i) => {
        const x = 14 + (i % 2) * 93
        const y = 54 + Math.floor(i / 2) * 20
        doc.setFillColor(245, 245, 245)
        doc.roundedRect(x, y, 85, 14, 2, 2, 'F')
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(11)
        doc.setTextColor(192, 57, 43)
        doc.text(k.val, x + 6, y + 6)
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(7)
        doc.setTextColor(100, 100, 100)
        doc.text(k.lbl, x + 6, y + 11)
      })

      // Tabela por tema
      doc.setTextColor(30, 30, 30)
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(11)
      doc.text('Desempenho por Tema', 14, 100)

      const rows = (Object.entries(THEMES) as [string, string][])
        .map(([k, v]) => {
          const entries = Object.entries(historico).filter(([id]) =>
            MOCK_QUESTIONS.find(q => String(q.id) === String(id))?.theme === k
          )
          const tot = entries.length
          const ac  = entries.filter(([, h]: any) => h.acertou).length
          return [v, String(tot), String(ac), tot > 0 ? Math.round(ac / tot * 100) + '%' : '—']
        })
        .filter(r => r[1] !== '0')

      autoTable(doc, {
        startY: 104,
        head: [['Tema', 'Respondidas', 'Acertos', 'Taxa']],
        body: rows,
        styles: { fontSize: 9, cellPadding: 3 },
        headStyles: { fillColor: [192, 57, 43], textColor: 255, fontStyle: 'bold' },
        alternateRowStyles: { fillColor: [250, 248, 248] },
      })

      // Rodapé
      doc.setTextColor(180, 180, 180)
      doc.setFontSize(7)
      doc.text('Relatório gerado pela plataforma LAMMI · lammi-ruddy.vercel.app', 14, 285)

      const nome = (profile?.display_name ?? 'membro').replace(/\s+/g, '_').toLowerCase()
      doc.save('lammi_desempenho_' + nome + '.pdf')
    } finally {
      setGerando(false)
    }
  }

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

  // heatmapObjects is always {date, count}[] — used for <Heatmap> component
  const heatmapObjects = heatmapData.length > 0 ? heatmapData : MOCK_STUDY_HEATMAP
  // streak uses date strings — computeStreak accepts string[]
  const streak = streakReal !== null ? streakReal : computeStreak(heatmapObjects.map(d => d.date))

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
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 style={{ fontFamily: 'var(--font-d)', fontSize: '2rem', color: 'white', marginBottom: '.4rem' }}>Dashboard</h2>
          {respondidas > 0 && (
            <button
              onClick={exportarPDF}
              disabled={gerando}
              className="btn-ghost"
              style={{ fontSize: '.78rem', padding: '.45rem 1rem', flexShrink: 0 }}
            >
              {gerando ? '⏳ Gerando...' : '📄 Exportar PDF'}
            </button>
          )}
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '.88rem', marginBottom: '1.5rem' }}>
          {respondidas} de {MOCK_QUESTIONS.length} questões respondidas
          {!user && ' · Faça login para sincronizar progresso'}
        </p>

        {/* Abas */}
        <div style={{ display: 'flex', gap: 4, marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: 1 }}>
          {[
            { id: 'stats',     lbl: 'Estatísticas' },
            { id: 'questoes',  lbl: `Questões${respondidas > 0 ? ` (${respondidas})` : ''}` },
            { id: 'historico', lbl: `Simulados${simulados.length > 0 ? ` (${simulados.length})` : ''}` },
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
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
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

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
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
                  <Heatmap data={heatmapObjects} weeks={52} />
                </div>


                <div className="dash-card" style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.1rem', color: '#E53935', marginBottom: '1.25rem', fontWeight: 600 }}>Por Dificuldade</div>
                  {(['facil', 'medio', 'dificil'] as const).map(nivel => {
                    const entries = Object.entries(historico).filter(([id]) => {
                      const q = MOCK_QUESTIONS.find(q => String(q.id) === String(id))
                      return q?.difficulty === nivel
                    })
                    const total  = entries.length
                    const ac     = entries.filter(([, h]: any) => h.acertou).length
                    const pctN   = total > 0 ? Math.round(ac / total * 100) : 0
                    const totalBanco = MOCK_QUESTIONS.filter(q => q.difficulty === nivel).length
                    const label  = nivel === 'facil' ? 'Fácil' : nivel === 'medio' ? 'Médio' : 'Difícil'
                    const col    = nivel === 'facil' ? '#4ade80' : nivel === 'medio' ? '#facc15' : '#f87171'
                    if (total === 0) return null
                    return (
                      <div key={nivel} style={{ marginBottom: '.9rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.3rem', fontSize: '.83rem', color: 'var(--text)' }}>
                          <span style={{ color: col, fontWeight: 600 }}>{label}</span>
                          <span style={{ color: col, fontWeight: 700 }}>{pctN}%</span>
                        </div>
                        <div style={{ height: 6, background: 'rgba(192,57,43,.12)' }}>
                          <div style={{ height: '100%', width: pctN + '%', background: col, transition: 'width .5s' }} />
                        </div>
                        <div style={{ fontSize: '.7rem', color: 'var(--text-dim)', marginTop: '.2rem' }}>{ac}/{total} respondidas · {totalBanco} no banco</div>
                      </div>
                    )
                  })}
                </div>

                <div className="dash-card" style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.1rem', color: '#E53935', marginBottom: '1.25rem', fontWeight: 600 }}>Metas</div>
                  {[
                    { meta: 10,   label: '10 questões respondidas'    },
                    { meta: 50,   label: '50 questões respondidas'    },
                    { meta: 100,  label: '100 questões respondidas'   },
                    { meta: 300,  label: '300 questões respondidas'   },
                    { meta: MOCK_QUESTIONS.length, label: 'Banco completo!' },
                  ].map(({ meta, label }) => {
                    const atingiu = respondidas >= meta
                    return (
                      <div key={meta} style={{ display: 'flex', alignItems: 'center', gap: '.75rem', padding: '.5rem 0', borderBottom: '1px solid rgba(192,57,43,.08)' }}>
                        <span style={{ fontSize: '1.1rem' }}>{atingiu ? '✅' : '⏳'}</span>
                        <span style={{ fontSize: '.84rem', color: atingiu ? '#4ade80' : 'var(--text-muted)', fontWeight: atingiu ? 600 : 400 }}>{label}</span>
                        {!atingiu && (
                          <span style={{ marginLeft: 'auto', fontSize: '.72rem', color: 'var(--text-dim)' }}>{respondidas}/{meta}</span>
                        )}
                      </div>
                    )
                  })}
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


        {/* ── ABA QUESTÕES ── */}
        {aba === 'questoes' && (
          <>
            {respondidas === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem', background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📝</div>
                <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.2rem', color: '#E53935' }}>Nenhuma questão respondida ainda</div>
                <p style={{ color: 'var(--text-muted)', fontSize: '.88rem', marginTop: '.5rem' }}>
                  <a href="/banco" style={{ color: '#E53935' }}>Ir ao Banco de Questões →</a>
                </p>
              </div>
            ) : (
              <div className="dash-card">
                <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.1rem', color: '#E53935', marginBottom: '1.25rem', fontWeight: 600 }}>
                  Últimas questões respondidas
                </div>
                {Object.entries(historico)
                  .sort((a, b) => new Date(b[1].em).getTime() - new Date(a[1].em).getTime())
                  .slice(0, 100)
                  .map(([id, h]: any) => {
                    const q = MOCK_QUESTIONS.find(q => String(q.id) === String(id))
                    return (
                      <div key={id} style={{ display: 'flex', alignItems: 'flex-start', gap: '.75rem', padding: '.65rem 0', borderBottom: '1px solid rgba(192,57,43,.08)' }}>
                        <div style={{ width: 24, height: 24, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.72rem', fontWeight: 700, background: h.acertou ? '#2f7a3f' : '#b23b3b', color: 'white', marginTop: 2 }}>
                          {h.acertou ? '✓' : '✗'}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: '.83rem', color: 'var(--text)', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {q?.statement ?? `Questão ${id}`}
                          </p>
                          <div style={{ display: 'flex', gap: '.5rem', marginTop: '.25rem', flexWrap: 'wrap' }}>
                            {q && <span className="tag-pill" style={{ fontSize: '.65rem' }}>{THEMES[q.theme as StudyTheme]}</span>}
                            {q && <span className="tag-pill" style={{ fontSize: '.65rem', textTransform: 'capitalize' }}>{q.difficulty}</span>}
                            <span style={{ fontSize: '.7rem', color: 'var(--text-dim)' }}>{new Date(h.em).toLocaleDateString('pt-BR')}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
              </div>
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
