import { useState, useEffect, useMemo } from 'react'
import { useAuthContext } from '@/contexts/AuthContext'
import { useTimer } from '@/hooks/useTimer'
import { MOCK_QUESTIONS } from '@/data/mockData'
import { THEMES, StudyTheme, Difficulty, Question } from '@/services/supabaseClient'

type HistoricoMap = Record<string, { selecionada: string; acertou: boolean; em: string }>

interface Props {
  historico: HistoricoMap
  setHistorico: (fn: (h: HistoricoMap) => HistoricoMap) => void
}

export function BancoPage({ historico, setHistorico }: Props) {
  const { user } = useAuthContext()
  const timer = useTimer()

  const [filtroTemas,  setFiltroTemas]  = useState<Set<StudyTheme>>(new Set())
  const [filtroNiveis, setFiltroNiveis] = useState<Set<string>>(new Set())
  const [filtroRes,    setFiltroRes]    = useState('todas')
  const [idx,          setIdx]          = useState(0)
  const [feedback,     setFeedback]     = useState(false)
  const [sel,          setSel]          = useState<string | null>(null)
  const [timerOn,      setTimerOn]      = useState(false)
  const [comentario,   setComentario]   = useState('')
  const [comentarios,  setComentarios]  = useState<{ id: string; texto: string; em: string }[]>([])

  const toggleSet = <T,>(s: Set<T>, item: T): Set<T> => {
    const n = new Set(s); n.has(item) ? n.delete(item) : n.add(item); return n
  }

  const filtradas = useMemo(() => MOCK_QUESTIONS.filter(q => {
    if (filtroRes === 'respondidas'    && !historico[q.id])            return false
    if (filtroRes === 'nao_respondidas' && historico[q.id])            return false
    if (filtroRes === 'erradas'        && (!historico[q.id] || historico[q.id].acertou)) return false
    if (filtroTemas.size > 0  && !filtroTemas.has(q.theme))  return false
    if (filtroNiveis.size > 0 && !filtroNiveis.has(q.difficulty)) return false
    return true
  }), [filtroTemas, filtroNiveis, filtroRes, historico])

  useEffect(() => { setIdx(0); setFeedback(false); setSel(null) }, [filtroTemas, filtroNiveis, filtroRes])
  useEffect(() => { setSel(null); setFeedback(false) }, [idx])

  const total = filtradas.length
  const q     = filtradas[idx] ?? null
  const acertos  = Object.values(historico).filter(h => h.acertou).length
  const resp     = Object.keys(historico).length

  const confirmar = () => {
    if (!q || !sel || feedback) return
    const ok = sel === q.correct_key
    setHistorico(h => ({
      ...h,
      [q.id]: {
        selecionada: sel,
        acertou: h[q.id] ? h[q.id].acertou : ok,
        em: h[q.id]?.em || new Date().toISOString(),
      },
    }))
    setFeedback(true)
  }

  const addComentario = () => {
    if (!comentario.trim()) return
    setComentarios(prev => [...prev, { id: Date.now().toString(), texto: comentario.trim(), em: new Date().toLocaleString('pt-BR') }])
    setComentario('')
  }

  return (
    <section style={{ padding: '3rem 2rem', background: '#0D0D0D' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '1.75rem' }}>
          <div className="accent-bar" />
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-d)', fontSize: '2rem', color: 'white', marginBottom: '.35rem' }}>Banco de Questões</h2>
              <p style={{ fontSize: '.88rem', color: 'rgba(240,240,240,.5)' }}>ATLS · TCCC · PHTLS · {MOCK_QUESTIONS.length} questões</p>
            </div>
            {/* Timer */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
              <label style={{ fontSize: '.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '.4rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={timerOn} onChange={e => { setTimerOn(e.target.checked); e.target.checked ? timer.start() : timer.stop() }}
                  style={{ accentColor: 'var(--red)' }} />
                Cronômetro
              </label>
              {timerOn && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', background: 'rgba(192,57,43,.1)', border: '1px solid var(--border)', padding: '.35rem .75rem' }}>
                  <span style={{ fontFamily: 'var(--font-d)', fontSize: '1.2rem', color: '#E53935', fontWeight: 700, letterSpacing: '.05em' }}>{timer.formatted}</span>
                  <button onClick={timer.toggle} style={{ background: 'none', border: 'none', color: '#E53935', cursor: 'pointer', fontSize: '.8rem' }}>{timer.running ? '⏸' : '▶'}</button>
                  <button onClick={timer.reset} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '.8rem' }}>↺</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Desemp strip */}
        {resp > 0 && (
          <div className="desemp-strip">
            {[
              { val: acertos,                            lbl: 'Acertos'       },
              { val: resp - acertos,                     lbl: 'Erros'         },
              { val: resp,                               lbl: 'Respondidas'   },
              { val: Math.round(acertos / resp * 100) + '%', lbl: 'Aproveitamento' },
            ].map((d, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div className="desemp-val">{d.val}</div>
                <div className="desemp-lbl">{d.lbl}</div>
              </div>
            ))}
          </div>
        )}

        <div className="banco-grid">
          {/* Filtros */}
          <aside className="filtros-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div className="filtros-title" style={{ margin: 0, padding: 0, border: 'none' }}>Filtros</div>
              <button className="btn-ghost" style={{ fontSize: '.7rem', padding: '.3rem .7rem' }}
                onClick={() => { setFiltroTemas(new Set()); setFiltroNiveis(new Set()); setFiltroRes('todas') }}>
                Limpar
              </button>
            </div>

            <div className="filtro-label">Status</div>
            {[
              { val: 'todas',          lbl: '📋 Todas',           count: MOCK_QUESTIONS.length },
              { val: 'nao_respondidas',lbl: '🆕 Não respondidas', count: MOCK_QUESTIONS.length - Object.keys(historico).length },
              { val: 'respondidas',    lbl: '✓ Respondidas',      count: Object.keys(historico).length },
              { val: 'erradas',        lbl: '❌ Erradas',          count: Object.values(historico).filter(h => !h.acertou).length },
            ].map(({ val, lbl, count }) => (
              <button key={val} onClick={() => setFiltroRes(val)}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '.5rem .75rem', marginBottom: '.35rem', border: '1px solid', borderColor: filtroRes === val ? 'var(--red)' : 'var(--border)', background: filtroRes === val ? 'var(--red)' : 'transparent', cursor: 'pointer', fontSize: '.82rem', color: 'var(--text)' }}>
                <span>{lbl}</span>
                <span className="count-badge" style={filtroRes === val ? { background: 'rgba(255,255,255,.2)', color: 'white' } : {}}>{count}</span>
              </button>
            ))}

            <div className="filtro-label">Temas</div>
            {(Object.entries(THEMES) as [StudyTheme, string][]).map(([k, v]) => (
              <button key={k} className={`tema-btn ${filtroTemas.has(k) ? 'active' : ''}`}
                onClick={() => setFiltroTemas(s => toggleSet(s, k))}>
                <span style={{ fontSize: '.8rem' }}>{v}</span>
                <span className="count-badge">{MOCK_QUESTIONS.filter(q => q.theme === k).length}</span>
              </button>
            ))}

            <div className="filtro-label">Dificuldade</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {[{ val: 'facil', lbl: 'Fácil' }, { val: 'medio', lbl: 'Médio' }, { val: 'dificil', lbl: 'Difícil' }].map(({ val, lbl }) => (
                <button key={val}
                  className={`nivel-chip ${filtroNiveis.has(val) ? 'active-' + val[0] : ''}`}
                  onClick={() => setFiltroNiveis(s => toggleSet(s, val))}>
                  {lbl}
                </button>
              ))}
            </div>

            <div className="filtro-label">Navegação ({total})</div>
            <div className="q-grid-container">
              {filtradas.map((q, i) => {
                const h = historico[q.id]
                let cls = 'q-nav-dot'
                if (i === idx) cls += ' current'
                else if (h) cls += h.acertou ? ' answered-correct' : ' answered-wrong'
                return (
                  <button key={q.id} className={cls} title={`Q${i + 1}`} onClick={() => setIdx(i)}>{i + 1}</button>
                )
              })}
              {total === 0 && <span style={{ fontSize: '.75rem', color: 'var(--text-dim)' }}>Nenhuma</span>}
            </div>
          </aside>

          {/* Questão */}
          <div>
            {!q ? (
              <div className="questao-card" style={{ textAlign: 'center', padding: '4rem' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔍</div>
                <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.2rem', color: '#E53935' }}>Nenhuma questão encontrada</div>
                <p style={{ color: 'var(--text-muted)', fontSize: '.88rem', marginTop: '.5rem' }}>Ajuste os filtros.</p>
              </div>
            ) : (
              <>
                <div className="questao-card">
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${((idx + 1) / total) * 100}%` }} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: 8 }}>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      <span className="tag-pill">{THEMES[q.theme]}</span>
                      <span className={`tag-pill ${q.difficulty === 'facil' ? 'tag-green' : ''}`}>
                        {q.difficulty === 'facil' ? 'Fácil' : q.difficulty === 'medio' ? 'Médio' : 'Difícil'}
                      </span>
                    </div>
                    <span style={{ fontSize: '.78rem', color: 'var(--text-muted)' }}>Q {idx + 1}/{total}</span>
                  </div>

                  <p className="enunciado">{q.statement}</p>

                  <div>
                    {q.alternatives.map(alt => {
                      let cls = 'alt-btn'
                      if (feedback) {
                        if (alt.key === q.correct_key) cls += ' correct'
                        else if (alt.key === sel && alt.key !== q.correct_key) cls += ' wrong'
                      } else if (sel === alt.key) cls += ' selected-pending'
                      return (
                        <button key={alt.key} className={cls} onClick={() => !feedback && setSel(alt.key)} disabled={feedback}>
                          <span className="alt-letter">{alt.key}</span>
                          <span>{alt.text}</span>
                          {feedback && alt.key === q.correct_key && <span style={{ marginLeft: 'auto', fontSize: '.85rem' }}>✓</span>}
                          {feedback && alt.key === sel && alt.key !== q.correct_key && <span style={{ marginLeft: 'auto', fontSize: '.85rem' }}>✗</span>}
                        </button>
                      )
                    })}
                  </div>

                  {sel && !feedback && (
                    <div style={{ marginTop: '1rem' }}>
                      <button onClick={confirmar} className="btn-red" style={{ width: '100%', fontWeight: 700 }}>
                        Confirmar resposta
                      </button>
                    </div>
                  )}

                  {feedback && (
                    <div style={{ marginTop: '.75rem', display: 'flex', alignItems: 'center', gap: 10, padding: '.6rem .9rem', background: historico[q.id]?.acertou ? 'rgba(47,122,63,.15)' : 'rgba(178,59,59,.15)', border: `1px solid ${historico[q.id]?.acertou ? '#2f7a3f' : '#b23b3b'}` }}>
                      {historico[q.id]?.acertou
                        ? <span style={{ fontSize: '.9rem', color: '#4ade80', fontWeight: 700 }}>✓ Correto!</span>
                        : <span style={{ fontSize: '.9rem', color: '#f87171', fontWeight: 700 }}>✗ Incorreto</span>
                      }
                    </div>
                  )}

                  {feedback && q.explanation && (
                    <div className="explicacao-box" style={{ marginTop: '1rem' }}>
                      <div className="explicacao-label">📋 Comentário</div>
                      <p style={{ fontSize: '.88rem', color: 'var(--text)', lineHeight: 1.75 }}>{q.explanation}</p>
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)', gap: 8 }}>
                    <button className="btn-ghost" onClick={() => setIdx(i => Math.max(0, i - 1))} disabled={idx === 0} style={{ opacity: idx === 0 ? .35 : 1 }}>
                      ← Anterior
                    </button>
                    <button className="btn-red" onClick={() => setIdx(i => Math.min(total - 1, i + 1))} disabled={idx === total - 1} style={{ opacity: idx === total - 1 ? .35 : 1 }}>
                      Próxima →
                    </button>
                  </div>
                </div>

                {/* Comentários */}
                <div className="card-dark" style={{ padding: '1.5rem', marginTop: '1rem' }}>
                  <div style={{ fontFamily: 'var(--font-d)', fontSize: '1rem', color: '#E53935', marginBottom: '1rem', fontWeight: 600 }}>
                    Comentários ({comentarios.length})
                  </div>

                  {comentarios.length === 0 && (
                    <p style={{ fontSize: '.82rem', color: 'var(--text-dim)', marginBottom: '1rem' }}>Nenhum comentário ainda. Seja o primeiro!</p>
                  )}

                  {comentarios.map(c => (
                    <div key={c.id} style={{ padding: '.6rem 0', borderBottom: '1px solid rgba(192,57,43,.1)' }}>
                      <div style={{ fontSize: '.75rem', color: 'var(--text-dim)', marginBottom: '.25rem' }}>{c.em}</div>
                      <p style={{ fontSize: '.85rem', color: 'var(--text)', lineHeight: 1.6 }}>{c.texto}</p>
                    </div>
                  ))}

                  {user ? (
                    <div style={{ display: 'flex', gap: '.5rem', marginTop: '1rem' }}>
                      <input
                        value={comentario}
                        onChange={e => setComentario(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && addComentario()}
                        placeholder="Escreva um comentário..."
                        style={{ flex: 1, padding: '.6rem .85rem', border: '1px solid var(--border)', background: 'var(--bg-surface)', color: 'var(--text)', fontFamily: 'var(--font-s)', fontSize: '.85rem', outline: 'none' }}
                      />
                      <button onClick={addComentario} disabled={!comentario.trim()} className="btn-red" style={{ padding: '.6rem 1rem' }}>
                        Enviar
                      </button>
                    </div>
                  ) : (
                    <p style={{ fontSize: '.8rem', color: 'var(--text-dim)', marginTop: '.75rem' }}>
                      Entre para comentar.
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
