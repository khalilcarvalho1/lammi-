import { useState, useEffect } from 'react'
import { MOCK_QUESTIONS } from '@/data/mockData'
import { THEMES, StudyTheme, Question } from '@/services/supabaseClient'
import { useTimer } from '@/hooks/useTimer'
import { useAuthContext } from '@/contexts/AuthContext'
import { simuladoService } from '@/services/simuladoService'
import { studyLogService } from '@/services/studyLogService'

type Fase = 'config' | 'prova' | 'resultado'

interface Resultado {
  question: Question
  escolha: string | null
  acertou: boolean
}

export function SimuladoPage() {
  const { user } = useAuthContext()

  const [fase,      setFase]      = useState<Fase>('config')
  const [temas,     setTemas]     = useState<Set<StudyTheme>>(new Set())
  const [qtd,       setQtd]       = useState(10)
  const [tempoMin,  setTempoMin]  = useState(15)
  const [qs,        setQs]        = useState<Question[]>([])
  const [res,       setRes]       = useState<Resultado[]>([])
  const [idx,       setIdx]       = useState(0)
  const [sel,       setSel]       = useState<string | null>(null)
  const [detalhe,   setDetalhe]   = useState<Resultado | null>(null)
  const [salvando,  setSalvando]  = useState(false)
  const [savedId,   setSavedId]   = useState<string | null>(null)
  const [startedAt, setStartedAt] = useState('')
  const timer = useTimer()

  const limSeg   = tempoMin * 60
  const timeLeft = limSeg - timer.seconds
  const esgotado = timer.running && timeLeft <= 0

  useEffect(() => { if (esgotado) finalizar() }, [esgotado])

  const toggleTema = (t: StudyTheme) =>
    setTemas(prev => { const n = new Set(prev); n.has(t) ? n.delete(t) : n.add(t); return n })

  const iniciar = () => {
    const pool    = MOCK_QUESTIONS.filter(q => temas.size === 0 || temas.has(q.theme))
    const shuffle = [...pool].sort(() => Math.random() - .5).slice(0, qtd)
    if (!shuffle.length) { alert('Nenhuma questão para os temas selecionados.'); return }
    setQs(shuffle)
    setRes(shuffle.map(q => ({ question: q, escolha: null, acertou: false })))
    setIdx(0); setSel(null); setSavedId(null)
    setStartedAt(new Date().toISOString())
    setFase('prova')
    timer.reset(); timer.start()
  }

  const responder = (key: string) => {
    if (sel || res[idx].escolha) return
    setSel(key)
    const acertou = key === qs[idx].correct_key
    setRes(prev => prev.map((r, i) => i === idx ? { ...r, escolha: key, acertou } : r))
  }

  const avancar = () => {
    if (idx >= qs.length - 1) { finalizar(); return }
    setIdx(i => i + 1); setSel(null)
  }

  // ─── Finalizar e salvar no Supabase ───────────────────────
  const finalizar = async () => {
    timer.stop()
    setFase('resultado')

    if (!user) return // sem login, não salva

    setSalvando(true)
    const finishedAt   = new Date().toISOString()
    const acertosCount = res.filter(r => r.acertou).length
    const temasList    = [...new Set(res.map(r => r.question.theme))] as StudyTheme[]

    const { data } = await simuladoService.save({
      user_id:          user.id,
      themes:           temasList,
      total_questions:  res.length,
      correct_count:    acertosCount,
      time_seconds:     timer.seconds,
      started_at:       startedAt,
      finished_at:      finishedAt,
      question_results: res.map(r => ({
        question_id: r.question.id,
        chosen_key:  r.escolha ?? '',
        correct:     r.acertou,
      })),
    })

    if (data) setSavedId(data.id)

    // Registra no study_log para heatmap e streak
    await studyLogService.log(user.id, 'simulado', 1)
    await studyLogService.updateProfileStreak(user.id)

    setSalvando(false)
  }

  const formatSeg = (s: number) => {
    const abs = Math.abs(s)
    return `${String(Math.floor(abs / 60)).padStart(2, '0')}:${String(abs % 60).padStart(2, '0')}`
  }

  // ─── CONFIG ──────────────────────────────────────────────
  if (fase === 'config') return (
    <section style={{ padding: '4rem 2rem', background: '#0D0D0D' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div className="accent-bar" />
        <h2 style={{ fontFamily: 'var(--font-d)', fontSize: '2rem', color: 'white', marginBottom: '.4rem' }}>Novo Simulado</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '.88rem', marginBottom: '2rem' }}>Configure sua prova personalizada</p>

        <div className="card-dark" style={{ padding: '2.5rem', marginBottom: '1.5rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '.9rem' }}>
              Temas <span style={{ color: 'var(--text-dim)' }}>(vazio = todos)</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem' }}>
              {(Object.entries(THEMES) as [StudyTheme, string][]).map(([k, v]) => (
                <button key={k} onClick={() => toggleTema(k)}
                  style={{ padding: '.45rem .9rem', border: '1px solid', borderColor: temas.has(k) ? 'var(--red)' : 'var(--border)', background: temas.has(k) ? 'var(--red)' : 'transparent', color: 'var(--text)', fontSize: '.8rem', cursor: 'pointer', transition: 'all .15s', fontFamily: 'var(--font-s)' }}>
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
            {[
              { label: 'Nº de questões', val: qtd,      set: setQtd,      opts: [5, 10, 15, 20, 30] },
              { label: 'Tempo limite',   val: tempoMin, set: setTempoMin, opts: [10, 15, 20, 30, 45, 60], suffix: ' min' },
            ].map(({ label, val, set, opts, suffix }) => (
              <div key={label}>
                <div style={{ fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '.5rem' }}>{label}</div>
                <select value={val} onChange={e => set(+e.target.value)}
                  style={{ width: '100%', padding: '.7rem .9rem', border: '1px solid var(--border)', background: 'var(--bg-surface)', color: 'var(--text)', fontFamily: 'var(--font-s)', fontSize: '.92rem', outline: 'none' }}>
                  {opts.map(o => <option key={o} value={o}>{o}{suffix ?? ''}</option>)}
                </select>
              </div>
            ))}
          </div>

          <div style={{ background: 'rgba(192,57,43,.07)', border: '1px solid var(--border)', padding: '1rem 1.25rem', marginBottom: '2rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {[
              { lbl: 'Questões', val: qtd },
              { lbl: 'Tempo',    val: tempoMin + ' min' },
              { lbl: 'Temas',    val: temas.size === 0 ? 'Todos' : temas.size + ' selecionado(s)' },
              { lbl: 'Tempo/Q',  val: (tempoMin / qtd).toFixed(1) + ' min' },
            ].map(({ lbl, val }) => (
              <div key={lbl}>
                <div style={{ fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--text-dim)', fontWeight: 700 }}>{lbl}</div>
                <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.15rem', fontWeight: 700, color: '#E53935', marginTop: '.15rem' }}>{val}</div>
              </div>
            ))}
          </div>

          {!user && (
            <div style={{ background: 'rgba(192,57,43,.07)', border: '1px solid rgba(192,57,43,.25)', padding: '.75rem 1rem', fontSize: '.82rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              ⚠ Sem login o resultado não será salvo no histórico.{' '}
              <a href="/login" style={{ color: '#E53935' }}>Entrar</a>
            </div>
          )}

          <button onClick={iniciar} className="btn-red" style={{ width: '100%', padding: '1rem', fontSize: '.95rem' }}>
            Iniciar Simulado →
          </button>
        </div>
      </div>
    </section>
  )

  // ─── PROVA ───────────────────────────────────────────────
  if (fase === 'prova') {
    const q           = qs[idx]
    const respondidas = res.filter(r => r.escolha !== null).length

    return (
      <section style={{ padding: '3rem 2rem', background: '#0D0D0D' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div className="card-dark" style={{ padding: '1rem 1.5rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: '1rem', color: 'white' }}>
              Questão {idx + 1}/{qs.length}
            </span>
            <div style={{ flex: 1, background: 'rgba(192,57,43,.12)', height: 4, minWidth: 80 }}>
              <div style={{ height: '100%', width: (respondidas / qs.length * 100) + '%', background: 'var(--red)', transition: 'width .3s' }} />
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '.5rem', padding: '.35rem .85rem',
              background: timeLeft < 60 ? 'rgba(178,59,59,.2)' : 'rgba(192,57,43,.08)',
              border: `1px solid ${timeLeft < 60 ? '#b23b3b' : 'var(--border)'}`,
            }}>
              <span style={{ fontFamily: 'var(--font-d)', fontSize: '1.1rem', fontWeight: 700, color: timeLeft < 60 ? '#f87171' : '#E53935', letterSpacing: '.05em' }}>
                ⏱ {timeLeft > 0 ? formatSeg(timeLeft) : 'ESGOTADO!'}
              </span>
            </div>
            <button onClick={finalizar} className="btn-ghost" style={{ fontSize: '.75rem', padding: '.35rem .75rem' }}>Finalizar</button>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: '1.25rem' }}>
            {qs.map((_, i) => {
              let bg = 'transparent'; let col = 'var(--text-muted)'; let border = 'var(--border)'
              if (i === idx) { bg = 'var(--red)'; col = 'white'; border = 'var(--red)' }
              else if (res[i].acertou && res[i].escolha) { bg = '#2f7a3f'; col = 'white'; border = '#2f7a3f' }
              else if (res[i].escolha && !res[i].acertou) { bg = '#b23b3b'; col = 'white'; border = '#b23b3b' }
              return (
                <button key={i} onClick={() => { setIdx(i); setSel(res[i].escolha) }}
                  style={{ width: 30, height: 30, border: `1px solid ${border}`, background: bg, color: col, fontSize: '.75rem', fontWeight: 700, cursor: 'pointer', transition: 'all .15s' }}>
                  {i + 1}
                </button>
              )
            })}
          </div>

          <div className="questao-card">
            <div style={{ display: 'flex', gap: 6, marginBottom: '1.25rem', flexWrap: 'wrap' }}>
              <span className="tag-pill">{THEMES[q.theme]}</span>
              <span className="tag-pill">{q.difficulty === 'facil' ? 'Fácil' : q.difficulty === 'medio' ? 'Médio' : 'Difícil'}</span>
            </div>
            <p className="enunciado">{q.statement}</p>
            <div>
              {q.alternatives.map(alt => {
                const escolha = res[idx].escolha
                let cls = 'alt-btn'
                if (escolha) {
                  if (alt.key === q.correct_key) cls += ' correct'
                  else if (alt.key === escolha) cls += ' wrong'
                } else if (sel === alt.key) cls += ' selected-pending'
                return (
                  <button key={alt.key} className={cls} onClick={() => responder(alt.key)} disabled={!!escolha}>
                    <span className="alt-letter">{alt.key}</span>
                    <span>{alt.text}</span>
                  </button>
                )
              })}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)' }}>
              <button className="btn-ghost" onClick={() => { setIdx(i => Math.max(0, i - 1)); setSel(res[Math.max(0, idx - 1)].escolha) }} disabled={idx === 0}>
                ← Anterior
              </button>
              <button className="btn-red" onClick={avancar}>
                {idx === qs.length - 1 ? 'Finalizar Simulado' : 'Próxima →'}
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // ─── RESULTADO ───────────────────────────────────────────
  const acertos = res.filter(r => r.acertou).length
  const pct     = Math.round(acertos / res.length * 100)

  const porTema: Record<string, { total: number; acertos: number }> = {}
  res.forEach(r => {
    const t = r.question.theme
    if (!porTema[t]) porTema[t] = { total: 0, acertos: 0 }
    porTema[t].total++
    if (r.acertou) porTema[t].acertos++
  })

  return (
    <section style={{ padding: '4rem 2rem', background: '#0D0D0D' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        {detalhe ? (
          <div className="card-dark" style={{ padding: '2rem' }}>
            <button className="btn-ghost" style={{ marginBottom: '1.5rem' }} onClick={() => setDetalhe(null)}>← Voltar</button>
            <p className="enunciado">{detalhe.question.statement}</p>
            {detalhe.question.alternatives.map(alt => {
              const isCorr = alt.key === detalhe.question.correct_key
              const isEsc  = alt.key === detalhe.escolha
              let cls = 'alt-btn'
              if (isCorr) cls += ' correct'
              else if (isEsc) cls += ' wrong'
              return (
                <div key={alt.key} className={cls} style={{ cursor: 'default' }}>
                  <span className="alt-letter">{alt.key}</span>
                  <span>{alt.text}</span>
                </div>
              )
            })}
            {detalhe.question.explanation && (
              <div className="explicacao-box">
                <div className="explicacao-label">Comentário</div>
                <p style={{ fontSize: '.88rem', color: 'var(--text)', lineHeight: 1.75 }}>{detalhe.question.explanation}</p>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="bg-mil" style={{ padding: '3rem', textAlign: 'center', position: 'relative', overflow: 'hidden', marginBottom: '1.5rem' }}>
              <div className="noise" />
              <div style={{ position: 'relative' }}>
                <div style={{ fontFamily: 'var(--font-d)', fontSize: '5rem', fontWeight: 700, lineHeight: 1, color: pct >= 70 ? '#4ade80' : pct >= 50 ? '#EF5350' : '#f87171' }}>
                  {pct}%
                </div>
                <p style={{ color: 'rgba(240,240,240,.65)', marginTop: '.5rem', fontSize: '.95rem' }}>
                  {acertos} de {res.length} corretas · {formatSeg(timer.seconds)}
                </p>
                {/* Status de salvamento */}
                <p style={{ fontSize: '.75rem', color: 'var(--text-dim)', marginTop: '.5rem' }}>
                  {salvando ? '💾 Salvando resultado...' : savedId ? '✅ Resultado salvo no histórico' : !user ? '⚠ Faça login para salvar' : ''}
                </p>
                <div className="desemp-strip" style={{ marginTop: '1.5rem', marginBottom: 0 }}>
                  {[
                    { val: acertos,              lbl: 'Acertos' },
                    { val: res.length - acertos, lbl: 'Erros'   },
                    { val: pct + '%',            lbl: 'Taxa'    },
                    { val: formatSeg(timer.seconds), lbl: 'Tempo' },
                  ].map((d, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                      <div className="desemp-val">{d.val}</div>
                      <div className="desemp-lbl">{d.lbl}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card-dark" style={{ padding: '1.75rem', marginBottom: '1.5rem' }}>
              <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.1rem', color: '#E53935', marginBottom: '1.25rem', fontWeight: 600 }}>Desempenho por tema</div>
              {Object.entries(porTema).map(([t, s]) => {
                const p   = Math.round(s.acertos / s.total * 100)
                const col = p >= 70 ? '#4ade80' : p >= 50 ? '#EF5350' : '#f87171'
                return (
                  <div key={t} style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.84rem', marginBottom: '.35rem' }}>
                      <span style={{ color: 'var(--text)' }}>{THEMES[t as StudyTheme]}</span>
                      <span style={{ fontWeight: 700, color: col }}>{s.acertos}/{s.total} ({p}%)</span>
                    </div>
                    <div style={{ height: 6, background: 'rgba(192,57,43,.12)' }}>
                      <div style={{ height: '100%', width: p + '%', background: col, transition: 'width .5s' }} />
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="card-dark" style={{ padding: '1.75rem', marginBottom: '1.5rem' }}>
              <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.1rem', color: '#E53935', marginBottom: '1.25rem', fontWeight: 600 }}>Revisão</div>
              {res.map((r, i) => (
                <div key={i} onClick={() => setDetalhe(r)}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '.75rem', padding: '.75rem 0', borderBottom: '1px solid rgba(192,57,43,.1)', cursor: 'pointer' }}>
                  <div style={{ width: 26, height: 26, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.78rem', fontWeight: 700, background: r.acertou ? '#2f7a3f' : '#b23b3b', color: 'white' }}>
                    {r.acertou ? '✓' : '✗'}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: '.85rem', color: 'var(--text)', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{r.question.statement}</p>
                    <p style={{ fontSize: '.72rem', color: 'var(--text-dim)', marginTop: '.2rem' }}>Sua: {r.escolha ?? '—'} · Correta: {r.question.correct_key}</p>
                  </div>
                  <span style={{ color: '#E53935', fontSize: '.8rem', flexShrink: 0 }}>ver →</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button className="btn-red" style={{ flex: 1 }} onClick={() => setFase('config')}>
                Novo Simulado
              </button>
              {user && (
                <a href="/dashboard" className="btn-ghost" style={{ flex: 1, textAlign: 'center', padding: '.75rem', textDecoration: 'none', display: 'block' }}>
                  Ver histórico →
                </a>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
