import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { useAuthContext } from '@/contexts/AuthContext'
import { useStudyContext } from '@/contexts/StudyContext'
import { useTimer } from '@/hooks/useTimer'
import { MOCK_QUESTIONS } from '@/data/mockData'
import { THEMES, StudyTheme, Difficulty, Question } from '@/services/supabaseClient'
import { questionsService } from '@/services/questionsService'
import { studyLogService } from '@/services/studyLogService'

// ─── Anotação pessoal por questão ─────────────────────────────
function AnotacaoQuestao({ questionId }: { questionId: string }) {
  const key = `lammi_nota_${questionId}`
  const [texto,    setTexto]    = useState(() => localStorage.getItem(key) || '')
  const [editando, setEditando] = useState(false)
  const [draft,    setDraft]    = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setTexto(localStorage.getItem(`lammi_nota_${questionId}`) || '')
    setEditando(false)
  }, [questionId])

  const abrirEditor = () => {
    setDraft(texto)
    setEditando(true)
    setTimeout(() => textareaRef.current?.focus(), 50)
  }

  const salvar = () => {
    const valor = draft.trim()
    localStorage.setItem(key, valor)
    setTexto(valor)
    setEditando(false)
  }

  // stopPropagation: evita que atalhos do BancoPage disparem dentro do textarea
  const stopPropagation = (e: React.KeyboardEvent) => e.stopPropagation()

  if (editando) return (
    <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(201,169,97,.06)', border: '1px solid rgba(201,169,97,.2)' }}>
      <div style={{ fontSize: '.68rem', textTransform: 'uppercase', letterSpacing: '.1em', color: 'rgba(201,169,97,.7)', fontWeight: 700, marginBottom: '.5rem' }}>
        ✏️ Minha anotação
      </div>
      <textarea
        ref={textareaRef}
        value={draft}
        onChange={e => setDraft(e.target.value)}
        onKeyDown={stopPropagation}
        placeholder="Escreva sua anotação pessoal sobre esta questão..."
        rows={4}
        style={{
          width: '100%', padding: '.65rem .85rem', resize: 'vertical',
          background: 'var(--bg-surface)', border: '1px solid rgba(201,169,97,.25)',
          color: 'var(--text)', fontFamily: 'var(--font-s)', fontSize: '.85rem',
          lineHeight: 1.6, outline: 'none', boxSizing: 'border-box',
        }}
      />
      <div style={{ display: 'flex', gap: '.5rem', marginTop: '.5rem' }}>
        <button className="btn-red" style={{ fontSize: '.78rem', padding: '.4rem 1rem' }} onClick={salvar}>Salvar</button>
        <button className="btn-ghost" style={{ fontSize: '.78rem', padding: '.4rem 1rem' }} onClick={() => setEditando(false)}>Cancelar</button>
      </div>
    </div>
  )

  if (texto) return (
    <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(201,169,97,.06)', border: '1px solid rgba(201,169,97,.2)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '.4rem' }}>
        <div style={{ fontSize: '.68rem', textTransform: 'uppercase', letterSpacing: '.1em', color: 'rgba(201,169,97,.7)', fontWeight: 700 }}>
          📝 Minha anotação
        </div>
        <button onClick={abrirEditor} style={{ background: 'none', border: 'none', color: 'rgba(201,169,97,.6)', cursor: 'pointer', fontSize: '.75rem', padding: '0 .25rem' }}>
          ✏️ Editar
        </button>
      </div>
      <p style={{ fontSize: '.85rem', color: 'var(--text)', lineHeight: 1.65, whiteSpace: 'pre-wrap', margin: 0 }}>{texto}</p>
    </div>
  )

  return (
    <button onClick={abrirEditor}
      style={{
        marginTop: '1rem', width: '100%', padding: '.6rem 1rem',
        border: '1px dashed rgba(201,169,97,.25)', background: 'transparent',
        color: 'rgba(201,169,97,.45)', fontSize: '.78rem', cursor: 'pointer',
        textAlign: 'left', fontFamily: 'var(--font-s)', transition: 'border-color .15s',
      }}>
      ✏️ Adicionar anotação pessoal...
    </button>
  )
}


interface Comentario {
  id: string
  content: string
  created_at: string
  profiles?: { display_name: string; nickname: string }
}

export function BancoPage() {
  const { user } = useAuthContext()
  const { historico, setHistorico } = useStudyContext()
  const timer = useTimer()

  // Marcadas para revisão — persistidas em localStorage
  const [marcadas, setMarcadas] = useState<Set<string>>(() => {
    try { return new Set(JSON.parse(localStorage.getItem('lammi_marcadas') || '[]')) }
    catch { return new Set() }
  })
  useEffect(() => {
    localStorage.setItem('lammi_marcadas', JSON.stringify([...marcadas]))
  }, [marcadas])
  const toggleMarcada = (id: string) => {
    setMarcadas(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })
  }

  // ─── Filtros ───────────────────────────────────────────────
  const [filtroTemas,  setFiltroTemas]  = useState<Set<StudyTheme>>(new Set())
  const [filtroNiveis, setFiltroNiveis] = useState<Set<string>>(new Set())
  const [filtroRes,    setFiltroRes]    = useState('todas')
  const [busca,        setBusca]        = useState('')
  const [idx,          setIdx]          = useState(0)
  const [feedback,     setFeedback]     = useState(false)
  const [sel,          setSel]          = useState<string | null>(null)
  const [timerOn,      setTimerOn]      = useState(false)

  // ─── Comentários ───────────────────────────────────────────
  const [comentarios,  setComentarios]  = useState<Comentario[]>([])
  const [novoComent,   setNovoComent]   = useState('')
  const [loadingComent, setLoadingComent] = useState(false)

  // ─── Questões ──────────────────────────────────────────────
  // Usa mock localmente; quando o Supabase tiver questões, basta trocar MOCK_QUESTIONS
  // pela chamada questionsService.getPage(page, filters)
  const filtradas = useMemo(() => {
    const buscaLower = busca.trim().toLowerCase()
    return MOCK_QUESTIONS.filter(q => {
      if (buscaLower && !q.statement.toLowerCase().includes(buscaLower) && !(q.explanation ?? '').toLowerCase().includes(buscaLower)) return false
    if (filtroRes === 'respondidas'     && !historico[q.id])                              return false
    if (filtroRes === 'nao_respondidas' && historico[q.id])                               return false
    if (filtroRes === 'erradas'         && (!historico[q.id] || historico[q.id].acertou)) return false
    if (filtroRes === 'marcadas'        && !marcadas.has(q.id))                           return false
    if (filtroTemas.size > 0  && !filtroTemas.has(q.theme))       return false
    if (filtroNiveis.size > 0 && !filtroNiveis.has(q.difficulty)) return false
    return true
    })
  }, [filtroTemas, filtroNiveis, filtroRes, historico, marcadas, busca])

  useEffect(() => { setIdx(0); setFeedback(false); setSel(null); }, [filtroTemas, filtroNiveis, filtroRes, busca])
  useEffect(() => { setSel(null); setFeedback(false); setComentarios([]) }, [idx])

  const q        = filtradas[idx] ?? null
  const total    = filtradas.length
  const acertos  = Object.values(historico).filter(h => h.acertou).length
  const resp     = Object.keys(historico).length

  const toggleSet = <T,>(s: Set<T>, item: T): Set<T> => {
    const n = new Set(s); n.has(item) ? n.delete(item) : n.add(item); return n
  }

  // ─── Carregar comentários da questão atual ─────────────────
  const carregarComentarios = useCallback(async (questionId: string) => {
    const { data } = await questionsService.getComments(questionId)
    if (data) setComentarios(data as Comentario[])
  }, [])

  useEffect(() => {
    if (q) carregarComentarios(q.id)
  }, [q, carregarComentarios])

  // ─── Confirmar resposta + gravar no Supabase ───────────────
  const confirmar = async () => {
    if (!q || !sel || feedback) return
    const ok = sel === q.correct_key

    // 1. Atualiza historico local (StudyContext → localStorage)
    setHistorico(h => ({
      ...h,
      [q.id]: {
        selecionada: sel,
        acertou: h[q.id] ? h[q.id].acertou : ok,
        em: h[q.id]?.em || new Date().toISOString(),
      },
    }))
    setFeedback(true)

    // 2. Grava progresso no Supabase (apenas se logado)
    if (user) {
      await questionsService.recordAnswer(user.id, q.id, sel, ok)
      // 3. Registra no study_log para heatmap e streak
      await studyLogService.log(user.id, 'question', 1, q.theme)
      await studyLogService.updateProfileStreak(user.id)
    }
  }

  // ─── Adicionar comentário ──────────────────────────────────
  const addComentario = async () => {
    if (!novoComent.trim() || !user || !q) return
    setLoadingComent(true)
    const { data } = await questionsService.addComment(q.id, user.id, novoComent.trim())
    if (data) setComentarios(prev => [...prev, data as Comentario])
    setNovoComent('')
    setLoadingComent(false)
  }

  // ─── Deletar comentário próprio ────────────────────────────
  const deletarComentario = async (commentId: string) => {
    await questionsService.deleteComment(commentId)
    setComentarios(prev => prev.filter(c => c.id !== commentId))
  }

  const renderEmpty = () => (
    <div style={{ textAlign: 'center', padding: '4rem', background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔍</div>
      <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.2rem', color: '#E53935' }}>Nenhuma questão encontrada</div>
      <p style={{ color: 'var(--text-muted)', fontSize: '.88rem', marginTop: '.5rem' }}>Tente ajustar os filtros.</p>
    </div>
  )

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
            <button
              className={timerOn ? 'btn-red' : 'btn-ghost'}
              style={{ fontSize: '.78rem' }}
              onClick={() => {
                if (!timerOn) { timer.reset(); timer.start() } else timer.stop()
                setTimerOn(t => !t)
              }}
            >
              ⏱ {timerOn
                ? `${String(Math.floor(timer.seconds / 60)).padStart(2,'0')}:${String(timer.seconds % 60).padStart(2,'0')}`
                : 'Cronômetro'}
            </button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { lbl: 'Total',       val: MOCK_QUESTIONS.length, col: '#E53935' },
            { lbl: 'Respondidas', val: resp,                  col: 'var(--text)' },
            { lbl: 'Acertos',     val: acertos,               col: '#4ade80' },
            { lbl: 'Aproveit.',   val: resp > 0 ? Math.round(acertos / resp * 100) + '%' : '—', col: '#4ade80' },
          ].map((s, i) => (
            <div key={i} className="dash-card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--text-muted)', marginBottom: '.25rem' }}>{s.lbl}</div>
              <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.6rem', fontWeight: 700, color: s.col }}>{s.val}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>

          {/* ── Busca por texto ── */}
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              value={busca}
              onChange={e => setBusca(e.target.value)}
              placeholder="🔍 Buscar no enunciado..."
              style={{
                width: '100%', padding: '.55rem .85rem',
                background: 'var(--bg-surface)', border: '1px solid rgba(192,57,43,.25)',
                color: 'var(--text)', fontFamily: 'var(--font-s)', fontSize: '.83rem',
                outline: 'none', boxSizing: 'border-box',
              }}
              onFocus={e => e.currentTarget.style.borderColor = '#E53935'}
              onBlur={e  => e.currentTarget.style.borderColor = 'rgba(192,57,43,.25)'}
            />
            {busca.trim() && (
              <div style={{ fontSize: '.72rem', color: 'var(--text-muted)', marginTop: '.35rem' }}>
                {filtradas.length} resultado{filtradas.length !== 1 ? 's' : ''} para "{busca}"
              </div>
            )}
          </div>

          {/* ── Filtros ── */}
          <aside className="card-dark" style={{ padding: '1.5rem', position: 'sticky', top: '1rem' }}>
            <div style={{ fontSize: '.7rem', textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '1rem' }}>Filtros</div>

            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '.68rem', color: 'var(--text-dim)', marginBottom: '.5rem', textTransform: 'uppercase', letterSpacing: '.1em' }}>Status</div>
              {[
                ['todas',           'Todas'],
                ['respondidas',     'Respondidas'],
                ['nao_respondidas', 'Não respondidas'],
                ['erradas',         'Erradas'],
                ['marcadas',        `🔖 Marcadas (${marcadas.size})`],
              ].map(([val, lbl]) => (
                <button key={val} onClick={() => setFiltroRes(val)}
                  style={{ display: 'block', width: '100%', textAlign: 'left', padding: '.45rem .7rem', marginBottom: 2, background: filtroRes === val ? 'rgba(192,57,43,.2)' : 'transparent', border: filtroRes === val ? '1px solid rgba(192,57,43,.4)' : '1px solid transparent', color: filtroRes === val ? '#E53935' : 'var(--text-muted)', fontSize: '.82rem', cursor: 'pointer', transition: 'all .15s' }}>
                  {lbl}
                </button>
              ))}
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '.68rem', color: 'var(--text-dim)', marginBottom: '.5rem', textTransform: 'uppercase', letterSpacing: '.1em' }}>Dificuldade</div>
              {(['facil','medio','dificil'] as Difficulty[]).map(n => (
                <label key={n} style={{ display: 'flex', alignItems: 'center', gap: '.5rem', padding: '.4rem 0', cursor: 'pointer', fontSize: '.82rem', color: filtroNiveis.has(n) ? '#E53935' : 'var(--text-muted)' }}>
                  <input type="checkbox" checked={filtroNiveis.has(n)} onChange={() => setFiltroNiveis(s => toggleSet(s, n))} style={{ accentColor: '#E53935' }} />
                  {n.charAt(0).toUpperCase() + n.slice(1)}
                </label>
              ))}
            </div>

            <div>
              <div style={{ fontSize: '.68rem', color: 'var(--text-dim)', marginBottom: '.5rem', textTransform: 'uppercase', letterSpacing: '.1em' }}>Tema</div>
              {(Object.entries(THEMES) as [StudyTheme, string][]).map(([k, v]) => (
                <label key={k} style={{ display: 'flex', alignItems: 'flex-start', gap: '.5rem', padding: '.3rem 0', cursor: 'pointer', fontSize: '.75rem', color: filtroTemas.has(k) ? '#E53935' : 'var(--text-muted)', lineHeight: 1.4 }}>
                  <input type="checkbox" checked={filtroTemas.has(k)} onChange={() => setFiltroTemas(s => toggleSet(s, k))} style={{ accentColor: '#E53935', flexShrink: 0, marginTop: 2 }} />
                  {v}
                </label>
              ))}
            </div>
          </aside>

          {/* ── Questão ── */}
          <div>
            {!q ? renderEmpty() : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '.5rem' }}>
                  <span style={{ fontSize: '.8rem', color: 'var(--text-muted)' }}>{idx + 1} / {total}</span>
                  <div style={{ display: 'flex', gap: '.5rem' }}>
                    <button className="btn-ghost" style={{ fontSize: '.78rem' }} disabled={idx === 0} onClick={() => setIdx(i => i - 1)}>← Anterior</button>
                    <button className="btn-ghost" style={{ fontSize: '.78rem' }} disabled={idx >= total - 1} onClick={() => setIdx(i => i + 1)}>Próxima →</button>
                  </div>
                </div>

                <div className="card-dark" style={{ padding: '2rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                    <span className="tag-pill">{THEMES[q.theme]}</span>
                    <span className="tag-pill" style={{ textTransform: 'capitalize' }}>{q.difficulty}</span>
                    {historico[q.id] && (
                      <span className="tag-pill" style={{ background: historico[q.id].acertou ? 'rgba(47,122,63,.2)' : 'rgba(178,59,59,.2)', color: historico[q.id].acertou ? '#4ade80' : '#f87171' }}>
                        {historico[q.id].acertou ? '✓ Acertou' : '✗ Errou'}
                      </span>
                    )}
                    <button onClick={() => toggleMarcada(q.id)}
                      style={{ background: marcadas.has(q.id) ? 'rgba(192,57,43,.2)' : 'transparent', border: `1px solid ${marcadas.has(q.id) ? '#E53935' : 'var(--border)'}`, color: marcadas.has(q.id) ? '#E53935' : 'var(--text-dim)', padding: '2px 10px', borderRadius: 999, fontSize: '.7rem', cursor: 'pointer', transition: 'all .15s' }}>
                      🔖 {marcadas.has(q.id) ? 'Marcada' : 'Marcar'}
                    </button>
                    {!user && (
                      <span className="tag-pill" style={{ background: 'rgba(192,57,43,.1)', color: 'var(--text-dim)' }}>
                        Sem login — progresso local
                      </span>
                    )}
                  </div>

                  <p style={{ fontSize: '1rem', color: 'var(--text)', lineHeight: 1.75, marginBottom: '1.5rem' }}>{q.statement}</p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
                    {q.alternatives.map(alt => {
                      const isSelected = sel === alt.key
                      const isCorrect  = feedback && alt.key === q.correct_key
                      const isWrong    = feedback && isSelected && alt.key !== q.correct_key
                      return (
                        <button key={alt.key} onClick={() => !feedback && setSel(alt.key)}
                          style={{
                            display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem 1.25rem',
                            border: `1px solid ${isCorrect ? '#2f7a3f' : isWrong ? '#b23b3b' : isSelected ? 'rgba(192,57,43,.6)' : 'var(--border)'}`,
                            background: isCorrect ? 'rgba(47,122,63,.1)' : isWrong ? 'rgba(178,59,59,.1)' : isSelected ? 'rgba(192,57,43,.1)' : 'transparent',
                            cursor: feedback ? 'default' : 'pointer', textAlign: 'left', width: '100%', transition: 'all .15s',
                          }}>
                          <span style={{ fontFamily: 'var(--font-d)', color: isCorrect ? '#4ade80' : isWrong ? '#f87171' : isSelected ? '#E53935' : 'var(--text-dim)', fontWeight: 700, fontSize: '1rem', flexShrink: 0, minWidth: 20 }}>
                            {alt.key}
                          </span>
                          <span style={{ fontSize: '.9rem', color: 'var(--text)', lineHeight: 1.55 }}>{alt.text}</span>
                        </button>
                      )
                    })}
                  </div>

                  <div style={{ marginTop: '1.25rem' }}>
                    {!feedback ? (
                      <button className="btn-red" style={{ width: '100%' }} disabled={!sel} onClick={confirmar}>
                        Confirmar resposta
                      </button>
                    ) : (
                      <div>
                        <div style={{ padding: '1rem 1.25rem', background: 'rgba(192,57,43,.08)', border: '1px solid rgba(192,57,43,.25)', marginBottom: '1rem' }}>
                          <div style={{ fontSize: '.7rem', textTransform: 'uppercase', letterSpacing: '.1em', color: '#E53935', marginBottom: '.5rem', fontWeight: 700 }}>Explicação</div>
                          <p style={{ fontSize: '.88rem', color: 'var(--text)', lineHeight: 1.7 }}>{q.explanation}</p>
                        </div>
                        <button className="btn-ghost" style={{ width: '100%' }} onClick={() => setIdx(i => Math.min(i + 1, total - 1))}>
                          Próxima questão →
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* ── Anotação pessoal ── */}
                {feedback && <AnotacaoQuestao questionId={q.id} />}

                {/* ── Comentários (Supabase) ── */}
                <div className="card-dark" style={{ padding: '1.5rem' }}>
                  <div style={{ fontSize: '.78rem', textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '1rem' }}>
                    Comentários ({comentarios.length})
                  </div>

                  {comentarios.length === 0 && (
                    <p style={{ fontSize: '.82rem', color: 'var(--text-dim)', marginBottom: '1rem' }}>
                      Nenhum comentário ainda. Seja o primeiro!
                    </p>
                  )}

                  {comentarios.map(c => (
                    <div key={c.id} style={{ padding: '.75rem', background: 'rgba(192,57,43,.06)', border: '1px solid var(--border)', marginBottom: '.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                        <div>
                          <p style={{ fontSize: '.75rem', color: '#E53935', fontWeight: 600, marginBottom: '.25rem' }}>
                            {c.profiles?.nickname || c.profiles?.display_name || 'Anônimo'}
                          </p>
                          <p style={{ fontSize: '.85rem', color: 'var(--text)', lineHeight: 1.6 }}>{c.content}</p>
                        </div>
                        {/* Botão deletar só para comentários do próprio usuário */}
                        {user && (
                          <button onClick={() => deletarComentario(c.id)}
                            style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', fontSize: '.75rem', flexShrink: 0, padding: '0 .25rem' }}
                            title="Deletar comentário">
                            ✕
                          </button>
                        )}
                      </div>
                      <p style={{ fontSize: '.7rem', color: 'var(--text-dim)', marginTop: '.3rem' }}>
                        {new Date(c.created_at).toLocaleString('pt-BR')}
                      </p>
                    </div>
                  ))}

                  {user ? (
                    <div style={{ display: 'flex', gap: '.5rem', marginTop: '1rem' }}>
                      <input
                        value={novoComent}
                        onChange={e => setNovoComent(e.target.value)}
                        placeholder="Adicionar comentário..."
                        onKeyDown={e => e.key === 'Enter' && addComentario()}
                        style={{ flex: 1, padding: '.6rem .9rem', border: '1px solid var(--border)', background: 'var(--bg-surface)', color: 'var(--text)', fontFamily: 'var(--font-s)', fontSize: '.88rem', outline: 'none' }}
                      />
                      <button className="btn-red" style={{ padding: '.6rem 1rem', fontSize: '.82rem' }} disabled={loadingComent} onClick={addComentario}>
                        {loadingComent ? '...' : 'Enviar'}
                      </button>
                    </div>
                  ) : (
                    <p style={{ fontSize: '.78rem', color: 'var(--text-dim)', marginTop: '1rem' }}>
                      <a href="/login" style={{ color: '#E53935' }}>Faça login</a> para comentar.
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
