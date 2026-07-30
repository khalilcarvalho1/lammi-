import { useState, useEffect, useMemo } from 'react'
import { StudyTheme, Question } from '@/services/supabaseClient'
import { useTimer } from '@/hooks/useTimer'
import { useAuthContext } from '@/contexts/AuthContext'
import { simuladoService } from '@/services/simuladoService'
import { studyLogService } from '@/services/studyLogService'
import { loadQuestionsForFilter, getQuestionThemeCounts } from '@/services/contentService'
import { temaLabel } from '@/utils/temaFilters'
import { SimuladoContentSelector, SelItem } from '@/components/SimuladoContentSelector'

type Fase = 'config' | 'resumo' | 'prova' | 'resultado'
type QtyMode = 'auto' | 'manual'
type TimeMode = 'total' | 'perQuestion' | 'none'

interface Resultado {
  question: Question
  escolha: string | null
  acertou: boolean
}

// Distribui `totalDesired` questões entre os itens proporcionalmente à
// disponibilidade de cada um, usando o método dos maiores restos para que a
// soma final bata exatamente com o total pedido (respeitado o teto de
// disponibilidade agregada).
function distribuirAuto(items: SelItem[], totalDesired: number): Record<string, number> {
  const totalDisponivel = items.reduce((s, i) => s + i.available, 0)
  const total = Math.max(0, Math.min(totalDesired, totalDisponivel))
  const result: Record<string, number> = {}
  if (total <= 0 || items.length === 0) { items.forEach(i => { result[i.key] = 0 }); return result }

  const partes = items.map(i => {
    const exact = totalDisponivel > 0 ? (i.available / totalDisponivel) * total : 0
    return { key: i.key, floor: Math.floor(exact), rem: exact - Math.floor(exact) }
  })
  let atribuido = partes.reduce((s, p) => s + p.floor, 0)
  let restante = total - atribuido
  partes.forEach(p => { result[p.key] = p.floor })
  const ordenado = [...partes].sort((a, b) => b.rem - a.rem)
  for (let i = 0; i < restante && i < ordenado.length; i++) result[ordenado[i].key]++
  return result
}

export function SimuladoPage() {
  const { user } = useAuthContext()

  const [fase, setFase] = useState<Fase>('config')

  // ─── Seleção hierárquica de conteúdo ───────────────────────
  const [selection, setSelection] = useState<Map<string, SelItem>>(new Map())
  const items = useMemo(() => [...selection.values()], [selection])
  const totalDisponivel = useMemo(() => items.reduce((s, i) => s + i.available, 0), [items])

  const [temaCount, setTemaCount] = useState<Record<string, number>>({})
  useEffect(() => { getQuestionThemeCounts().then(setTemaCount).catch(() => setTemaCount({})) }, [])

  const [showFilters, setShowFilters] = useState(() => sessionStorage.getItem('lammi_show_filters') !== '0')
  useEffect(() => { sessionStorage.setItem('lammi_show_filters', showFilters ? '1' : '0') }, [showFilters])

  // ─── Quantidade de questões ────────────────────────────────
  const [qtyMode, setQtyMode] = useState<QtyMode>('auto')
  const [autoTotal, setAutoTotal] = useState(20)
  const [manualQty, setManualQty] = useState<Record<string, number>>({})

  // Sincroniza manualQty com a seleção atual: adiciona itens novos com um
  // valor padrão, remove itens que saíram da seleção.
  useEffect(() => {
    setManualQty(prev => {
      const next: Record<string, number> = {}
      for (const item of items) {
        next[item.key] = prev[item.key] !== undefined ? Math.min(prev[item.key], item.available) : Math.min(item.available, 10)
      }
      return next
    })
  }, [items])

  const effectiveQty = useMemo(
    () => (qtyMode === 'manual' ? manualQty : distribuirAuto(items, autoTotal)),
    [qtyMode, manualQty, items, autoTotal]
  )
  const totalResultante = Object.values(effectiveQty).reduce((s, n) => s + n, 0)

  const setManualQtyFor = (key: string, val: number, max: number) => {
    const clamped = Math.max(0, Math.min(Number.isFinite(val) ? val : 0, max))
    setManualQty(prev => ({ ...prev, [key]: clamped }))
  }

  // ─── Tempo ──────────────────────────────────────────────────
  const [timeMode, setTimeMode] = useState<TimeMode>('total')
  const [timeTotalMin, setTimeTotalMin] = useState(15)
  const [timePerQMin, setTimePerQMin] = useState(1.5)

  const tempoEfetivoMin = timeMode === 'none'
    ? null
    : timeMode === 'total'
      ? timeTotalMin
      : +(timePerQMin * Math.max(totalResultante, 1)).toFixed(1)

  // ─── Prova em andamento ─────────────────────────────────────
  const [tempoMin, setTempoMin] = useState<number | null>(15)
  const [qs, setQs] = useState<Question[]>([])
  const [res, setRes] = useState<Resultado[]>([])
  const [idx, setIdx] = useState(0)

  const [salvando, setSalvando] = useState(false)
  const [savedId, setSavedId] = useState<string | null>(null)
  const [startedAt, setStartedAt] = useState('')
  const [gerando, setGerando] = useState(false)
  const timer = useTimer()

  const [showTags, setShowTags] = useState(true)

  const limSeg   = tempoMin == null ? null : tempoMin * 60
  const timeLeft = limSeg == null ? null : limSeg - timer.seconds
  const esgotado = timer.running && timeLeft !== null && timeLeft <= 0

  useEffect(() => { if (esgotado) finalizar() }, [esgotado])

  const podeContinuar = selection.size > 0 && totalResultante > 0

  const iniciarProva = async () => {
    setGerando(true)
    try {
      const allStudyThemes = new Set<StudyTheme>(items.flatMap(i => i.studyThemes) as StudyTheme[])
      const pool   = await loadQuestionsForFilter(allStudyThemes)
      const usedIds = new Set<string>()
      const picked: Question[] = []
      for (const item of items) {
        const want = effectiveQty[item.key] ?? 0
        if (want <= 0) continue
        const itemPool = pool.filter(q => item.studyThemes.includes(q.theme) && !usedIds.has(q.id))
        const chosen = [...itemPool].sort(() => Math.random() - .5).slice(0, want)
        chosen.forEach(q => usedIds.add(q.id))
        picked.push(...chosen)
      }
      const finalQs = [...picked].sort(() => Math.random() - .5)
      if (!finalQs.length) { alert('Nenhuma questão para os temas selecionados.'); setFase('config'); return }

      setTempoMin(
        timeMode === 'none' ? null
          : timeMode === 'total' ? timeTotalMin
            : +(timePerQMin * finalQs.length).toFixed(1)
      )
      setQs(finalQs)
      setRes(finalQs.map(q => ({ question: q, escolha: null, acertou: false })))
      setIdx(0); setSavedId(null)
      setStartedAt(new Date().toISOString())
      setFase('prova')
      timer.reset(); timer.start()
    } finally {
      setGerando(false)
    }
  }

  // Seleciona/troca a resposta da questão atual — livre até finalizar a prova,
  // sem revelar se está certa ou errada (isso só aparece na tela de resultado).
  const responder = (key: string) => {
    setRes(prev => prev.map((r, i) => i === idx ? { ...r, escolha: key } : r))
  }

  const avancar = () => {
    if (idx >= qs.length - 1) { finalizar(); return }
    setIdx(i => i + 1)
  }

  // ─── Finalizar e salvar no Supabase ───────────────────────
  const finalizar = async () => {
    timer.stop()
    // Só aqui, ao finalizar, é que se apura o gabarito de cada questão.
    const finalRes = res.map(r => ({ ...r, acertou: r.escolha === r.question.correct_key }))
    setRes(finalRes)
    setFase('resultado')

    if (!user) return // sem login, não salva

    setSalvando(true)
    const finishedAt   = new Date().toISOString()
    const acertosCount = finalRes.filter(r => r.acertou).length
    const temasList    = [...new Set(finalRes.map(r => r.question.theme))] as StudyTheme[]

    const { data } = await simuladoService.save({
      user_id:          user.id,
      themes:           temasList,
      total_questions:  finalRes.length,
      correct_count:    acertosCount,
      time_seconds:     timer.seconds,
      started_at:       startedAt,
      finished_at:      finishedAt,
      question_results: finalRes.map(r => ({
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

  const inputStyle: React.CSSProperties = {
    padding: '.6rem .8rem', border: '1px solid var(--border)', background: 'var(--bg-surface)',
    color: 'var(--text)', fontFamily: 'var(--font-s)', fontSize: '.88rem', outline: 'none',
  }

  const toggleBtn = (active: boolean): React.CSSProperties => ({
    padding: '.55rem 1.1rem', border: `1px solid ${active ? 'var(--red)' : 'var(--border)'}`,
    background: active ? 'rgba(192,57,43,.15)' : 'transparent', color: active ? '#E53935' : 'var(--text-muted)',
    fontFamily: 'var(--font-s)', fontSize: '.8rem', fontWeight: 600, cursor: 'pointer',
  })

  // ─── CONFIG ──────────────────────────────────────────────
  if (fase === 'config') return (
    <section style={{ padding: '4rem 2rem', background: '#0D0D0D' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="accent-bar" />
        <h2 style={{ fontFamily: 'var(--font-d)', fontSize: '2rem', color: 'white', marginBottom: '.4rem' }}>Novo Simulado</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '.88rem', marginBottom: '1.5rem' }}>Configure sua prova personalizada</p>

        <button
          className="btn-ghost"
          style={{ marginBottom: '1rem', fontSize: '.8rem' }}
          onClick={() => setShowFilters(v => !v)}
        >
          {showFilters ? '◀ Ocultar filtros' : '▶ Mostrar filtros'}
        </button>

        <div className="banco-grid" style={!showFilters ? { gridTemplateColumns: '1fr' } : undefined}>
          {showFilters && (
            <aside className="filtros-panel">
              <div className="filtros-title" style={{ margin: 0, marginBottom: '1rem', padding: 0, border: 'none' }}>
                Áreas e temas <span style={{ color: 'var(--text-dim)', fontWeight: 400, fontSize: '.75rem' }}>(selecione pelo menos um)</span>
              </div>
              <SimuladoContentSelector counts={temaCount} selection={selection} onChange={setSelection} />
            </aside>
          )}

          <div>
            {/* ── Quantidade de questões ── */}
            <div className="card-dark" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
              <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.05rem', color: '#E53935', marginBottom: '1rem', fontWeight: 600 }}>
                Quantidade de questões
              </div>

              <div style={{ display: 'flex', gap: '.6rem', marginBottom: '1.25rem' }}>
                <button style={toggleBtn(qtyMode === 'auto')} onClick={() => setQtyMode('auto')}>Automático</button>
                <button style={toggleBtn(qtyMode === 'manual')} onClick={() => setQtyMode('manual')}>Manual</button>
              </div>

              {items.length === 0 ? (
                <p style={{ fontSize: '.82rem', color: 'var(--text-dim)' }}>Selecione áreas ou temas ao lado para configurar a quantidade.</p>
              ) : qtyMode === 'auto' ? (
                <div>
                  <div style={{ fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '.5rem' }}>
                    Total desejado
                  </div>
                  <input
                    type="number" min={1} max={totalDisponivel} value={autoTotal}
                    onChange={e => setAutoTotal(Math.max(1, Math.min(+e.target.value || 1, totalDisponivel)))}
                    style={{ ...inputStyle, width: 140 }}
                  />
                  <p style={{ fontSize: '.75rem', color: 'var(--text-dim)', marginTop: '.5rem' }}>
                    {totalDisponivel} questões disponíveis para a seleção atual · distribuídas proporcionalmente entre os temas escolhidos
                  </p>
                </div>
              ) : (
                <div>
                  {items.map(item => (
                    <div key={item.key} style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '.6rem' }}>
                      <span style={{ flex: 1, fontSize: '.82rem', color: 'var(--text)' }}>
                        {item.emoji} {item.label}
                        {item.kind === 'tema' && <span style={{ color: 'var(--text-dim)' }}> · {item.areaLabel}</span>}
                      </span>
                      <input
                        type="number" min={0} max={item.available}
                        value={manualQty[item.key] ?? 0}
                        onChange={e => setManualQtyFor(item.key, +e.target.value, item.available)}
                        style={{ ...inputStyle, width: 70 }}
                      />
                      <span style={{ fontSize: '.72rem', color: 'var(--text-dim)', minWidth: 60 }}>/ {item.available} disp.</span>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border)', fontSize: '.9rem', color: 'var(--text)' }}>
                Total: <strong style={{ color: '#E53935' }}>{totalResultante}</strong> questões
              </div>
            </div>

            {/* ── Tempo ── */}
            <div className="card-dark" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
              <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.05rem', color: '#E53935', marginBottom: '1rem', fontWeight: 600 }}>
                Tempo
              </div>
              <div style={{ display: 'flex', gap: '.6rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                <button style={toggleBtn(timeMode === 'total')} onClick={() => setTimeMode('total')}>Tempo total</button>
                <button style={toggleBtn(timeMode === 'perQuestion')} onClick={() => setTimeMode('perQuestion')}>Minutos por questão</button>
                <button style={toggleBtn(timeMode === 'none')} onClick={() => setTimeMode('none')}>Sem limite</button>
              </div>

              {timeMode === 'total' && (
                <div>
                  <div style={{ fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '.5rem' }}>
                    Minutos para a prova toda
                  </div>
                  <input type="number" min={1} value={timeTotalMin} onChange={e => setTimeTotalMin(Math.max(1, +e.target.value || 1))} style={{ ...inputStyle, width: 140 }} />
                </div>
              )}
              {timeMode === 'perQuestion' && (
                <div>
                  <div style={{ fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '.5rem' }}>
                    Minutos por questão
                  </div>
                  <input type="number" min={0.5} step={0.5} value={timePerQMin} onChange={e => setTimePerQMin(Math.max(0.5, +e.target.value || 0.5))} style={{ ...inputStyle, width: 140 }} />
                  <p style={{ fontSize: '.75rem', color: 'var(--text-dim)', marginTop: '.5rem' }}>
                    ≈ {tempoEfetivoMin} min no total para {totalResultante} questões
                  </p>
                </div>
              )}
              {timeMode === 'none' && (
                <p style={{ fontSize: '.82rem', color: 'var(--text-dim)' }}>A prova não terá cronômetro regressivo — o tempo apenas conta a favor, sem finalização automática.</p>
              )}
            </div>

            {!user && (
              <div style={{ background: 'rgba(192,57,43,.07)', border: '1px solid rgba(192,57,43,.25)', padding: '.75rem 1rem', fontSize: '.82rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                ⚠ Sem login o resultado não será salvo no histórico.{' '}
                <a href="/login" style={{ color: '#E53935' }}>Entrar</a>
              </div>
            )}

            <button
              onClick={() => setFase('resumo')}
              disabled={!podeContinuar}
              className="btn-red"
              style={{ width: '100%', padding: '1rem', fontSize: '.95rem', opacity: podeContinuar ? 1 : .5 }}
            >
              {selection.size === 0 ? 'Selecione áreas/temas para continuar' : totalResultante === 0 ? 'Defina a quantidade de questões' : 'Continuar →'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )

  // ─── RESUMO ──────────────────────────────────────────────
  if (fase === 'resumo') return (
    <section style={{ padding: '4rem 2rem', background: '#0D0D0D' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <div className="accent-bar" />
        <h2 style={{ fontFamily: 'var(--font-d)', fontSize: '2rem', color: 'white', marginBottom: '.4rem' }}>Resumo do Simulado</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '.88rem', marginBottom: '1.5rem' }}>Confira antes de começar</p>

        <div className="card-dark" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
          <div style={{ fontFamily: 'var(--font-d)', fontSize: '1rem', color: '#E53935', marginBottom: '1rem', fontWeight: 600 }}>
            Temas selecionados
          </div>
          {items.map(item => (
            <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', padding: '.5rem 0', borderBottom: '1px solid rgba(192,57,43,.1)', fontSize: '.85rem' }}>
              <span style={{ color: 'var(--text)' }}>
                {item.emoji} {item.label}
                {item.kind === 'tema' && <span style={{ color: 'var(--text-dim)' }}> · {item.areaLabel}</span>}
              </span>
              <strong style={{ color: '#E53935' }}>{effectiveQty[item.key] ?? 0} questões</strong>
            </div>
          ))}

          <div style={{ display: 'flex', gap: '2rem', marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--text-dim)', fontWeight: 700 }}>Total de questões</div>
              <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.3rem', fontWeight: 700, color: 'white', marginTop: '.15rem' }}>{totalResultante}</div>
            </div>
            <div>
              <div style={{ fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--text-dim)', fontWeight: 700 }}>Tempo</div>
              <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.3rem', fontWeight: 700, color: 'white', marginTop: '.15rem' }}>
                {tempoEfetivoMin == null ? 'Sem limite' : `${tempoEfetivoMin} min`}
              </div>
            </div>
          </div>
        </div>

        {!user && (
          <div style={{ background: 'rgba(192,57,43,.07)', border: '1px solid rgba(192,57,43,.25)', padding: '.75rem 1rem', fontSize: '.82rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            ⚠ Sem login o resultado não será salvo no histórico.{' '}
            <a href="/login" style={{ color: '#E53935' }}>Entrar</a>
          </div>
        )}

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn-ghost" style={{ flex: 1 }} onClick={() => setFase('config')}>
            ← Voltar e ajustar
          </button>
          <button onClick={iniciarProva} disabled={gerando} className="btn-red" style={{ flex: 2, opacity: gerando ? .6 : 1 }}>
            {gerando ? '⏳ Preparando questões...' : 'Iniciar prova →'}
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
              background: timeLeft !== null && timeLeft < 60 ? 'rgba(178,59,59,.2)' : 'rgba(192,57,43,.08)',
              border: `1px solid ${timeLeft !== null && timeLeft < 60 ? '#b23b3b' : 'var(--border)'}`,
            }}>
              <span style={{ fontFamily: 'var(--font-d)', fontSize: '1.1rem', fontWeight: 700, color: timeLeft !== null && timeLeft < 60 ? '#f87171' : '#E53935', letterSpacing: '.05em' }}>
                ⏱ {timeLeft === null ? formatSeg(timer.seconds) : (timeLeft > 0 ? formatSeg(timeLeft) : 'ESGOTADO!')}
              </span>
            </div>
            <button onClick={finalizar} className="btn-ghost" style={{ fontSize: '.75rem', padding: '.35rem .75rem' }}>Finalizar</button>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: '1.25rem' }}>
            {qs.map((_, i) => {
              // Durante a prova, os quadrados só indicam "atual" ou "respondida" —
              // nunca certo/errado, para não revelar o gabarito antes de finalizar.
              let bg = 'transparent'; let col = 'var(--text-muted)'; let border = 'var(--border)'
              if (i === idx) { bg = 'var(--red)'; col = 'white'; border = 'var(--red)' }
              else if (res[i].escolha) { bg = 'rgba(192,57,43,.25)'; col = 'var(--text)'; border = 'rgba(192,57,43,.45)' }
              return (
                <button key={i} onClick={() => setIdx(i)}
                  style={{ width: 30, height: 30, border: `1px solid ${border}`, background: bg, color: col, fontSize: '.75rem', fontWeight: 700, cursor: 'pointer', transition: 'all .15s' }}>
                  {i + 1}
                </button>
              )
            })}
          </div>

          <div className="questao-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 6, marginBottom: '1.25rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {showTags && (
                  <>
                    <span className="tag-pill">{temaLabel(q.theme)}</span>
                    <span className="tag-pill">{q.difficulty === 'facil' ? 'Fácil' : q.difficulty === 'medio' ? 'Médio' : 'Difícil'}</span>
                  </>
                )}
                {q.source && <span className="tag-pill" style={{ opacity: .75 }}>📌 {q.source}</span>}
              </div>
              <button
                onClick={() => setShowTags(v => !v)}
                title={showTags ? 'Ocultar tags de tema/dificuldade' : 'Mostrar tags de tema/dificuldade'}
                className="icon-toggle-btn"
              >
                {showTags ? '👁' : '🙈'}
              </button>
            </div>
            <p className="enunciado">{q.statement}</p>
            <div>
              {q.alternatives.map(alt => {
                const escolhida = res[idx].escolha === alt.key
                return (
                  <button key={alt.key} className={`alt-btn ${escolhida ? 'selected-pending' : ''}`} onClick={() => responder(alt.key)}>
                    <span className="alt-letter">{alt.key}</span>
                    <span>{alt.text}</span>
                  </button>
                )
              })}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)' }}>
              <button className="btn-ghost" onClick={() => setIdx(i => Math.max(0, i - 1))} disabled={idx === 0}>
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
                      <span style={{ color: 'var(--text)' }}>{temaLabel(t)}</span>
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
                <div key={i}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '.75rem', padding: '.75rem 0', borderBottom: '1px solid rgba(192,57,43,.1)' }}>
                  <div style={{ width: 26, height: 26, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.78rem', fontWeight: 700, background: r.acertou ? '#2f7a3f' : '#b23b3b', color: 'white' }}>
                    {r.acertou ? '✓' : '✗'}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: '.85rem', color: 'var(--text)', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{r.question.statement}</p>
                    <p style={{ fontSize: '.72rem', color: 'var(--text-dim)', marginTop: '.2rem' }}>Sua: {r.escolha ?? '—'} · Correta: {r.question.correct_key}</p>
                  </div>

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
      </div>
    </section>
  )
}
