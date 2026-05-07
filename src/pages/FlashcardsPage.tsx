import { useState, useEffect } from 'react'
import { MOCK_FLASHCARDS } from '@/data/mockData'
import { THEMES, StudyTheme } from '@/services/supabaseClient'
import { calculateSM2, initSRSCard, isDue, SRSQuality, SRSCard } from '@/hooks/useSRS'

interface Props {
  srsData: Record<string, SRSCard>
  setSrsData: (fn: (s: Record<string, SRSCard>) => Record<string, SRSCard>) => void
}

export function FlashcardsPage({ srsData, setSrsData }: Props) {
  const [filtroTema, setFiltroTema] = useState<StudyTheme | ''>('')
  const [flipped,    setFlipped]    = useState(false)
  const [idx,        setIdx]        = useState(0)
  const [done,       setDone]       = useState<string[]>([])
  const [summary,    setSummary]    = useState(false)

  const todos = MOCK_FLASHCARDS.filter(f => !filtroTema || f.theme === filtroTema)
  const due   = todos.filter(f => {
    const s = srsData[f.id]
    return !s || isDue(s)
  })

  useEffect(() => { setIdx(0); setDone([]); setSummary(false); setFlipped(false) }, [filtroTema])

  const current = due[idx] ?? null

  const responder = (q: SRSQuality) => {
    if (!current) return
    const prev = srsData[current.id] ?? initSRSCard()
    const next = calculateSM2(prev, q)
    setSrsData(s => ({ ...s, [current.id]: next }))
    setDone(d => [...d, current.id])
    setFlipped(false)
    setTimeout(() => {
      if (idx >= due.length - 1) setSummary(true)
      else setIdx(i => i + 1)
    }, 250)
  }

  const vencidos   = todos.filter(f => { const s = srsData[f.id]; return s && isDue(s) }).length
  const novos      = todos.filter(f => !srsData[f.id]).length
  const dominados  = todos.filter(f => { const s = srsData[f.id]; return s && s.repetitions >= 3 }).length
  const futuros    = todos.length - vencidos - novos - dominados

  // ─── Summary ──────────────────────────────────────────────
  if (summary || (due.length === 0 && todos.length > 0)) {
    const corretos = done.filter(id => (srsData[id]?.repetitions ?? 0) > 0).length
    return (
      <section style={{ padding: '4rem 2rem', background: '#0D0D0D' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div className="card-dark" style={{ padding: '3rem', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-d)', fontSize: '4rem', fontWeight: 700, color: '#E53935', marginBottom: '.5rem' }}>
              {due.length === 0 && done.length === 0 ? '🎉' : Math.round((corretos / (done.length || 1)) * 100) + '%'}
            </div>
            <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.4rem', color: 'white', marginBottom: '.5rem' }}>
              {due.length === 0 && done.length === 0 ? 'Tudo em dia!' : 'Sessão concluída'}
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '.88rem', marginBottom: '2rem' }}>
              {done.length > 0
                ? `${done.length} cards revisados · ${corretos} lembrados · algoritmo SM-2 atualizado`
                : 'Nenhum card pendente para este tema hoje.'}
            </p>
            {done.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', marginBottom: '2rem' }}>
                {[
                  { val: done.length,          lbl: 'Revisados',   col: '#E53935' },
                  { val: corretos,             lbl: 'Lembrados',   col: '#4ade80' },
                  { val: done.length - corretos, lbl: 'Para rever', col: '#f87171' },
                ].map((s, i) => (
                  <div key={i} className="card-dark" style={{ padding: '1rem', textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.75rem', fontWeight: 700, color: s.col }}>{s.val}</div>
                    <div style={{ fontSize: '.68rem', textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--text-muted)', marginTop: '.25rem' }}>{s.lbl}</div>
                  </div>
                ))}
              </div>
            )}
            <button className="btn-red" style={{ width: '100%' }} onClick={() => { setIdx(0); setDone([]); setSummary(false); setFlipped(false) }}>
              Nova sessão
            </button>
          </div>
        </div>
      </section>
    )
  }

  const pct = (idx / (due.length || 1)) * 100

  return (
    <section style={{ padding: '3rem 2rem', background: '#0D0D0D' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div className="accent-bar" />
        <h2 style={{ fontFamily: 'var(--font-d)', fontSize: '2rem', color: 'white', marginBottom: '.4rem' }}>Flashcards SRS</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '.85rem', marginBottom: '2rem' }}>Repetição espaçada · Algoritmo SM-2</p>

        {/* Resumo SRS */}
        <div className="srs-resumo">
          {[
            { val: vencidos,  lbl: 'Vencidos',  cls: 'srs-vencidos'  },
            { val: novos,     lbl: 'Novos',      cls: 'srs-novos'     },
            { val: futuros,   lbl: 'Futuros',    cls: 'srs-futuros'   },
            { val: dominados, lbl: 'Dominados',  cls: 'srs-dominados' },
          ].map((s, i) => (
            <div key={i} className={`srs-card ${s.cls}`}>
              <div className="srs-num">{s.val}</div>
              <div className="srs-lbl">{s.lbl}</div>
            </div>
          ))}
        </div>

        {/* Filtro */}
        <div style={{ marginBottom: '1.5rem' }}>
          <select
            value={filtroTema}
            onChange={e => setFiltroTema(e.target.value as StudyTheme | '')}
            style={{ width: '100%', padding: '.7rem .9rem', border: '1px solid var(--border)', background: 'var(--bg-surface)', color: 'var(--text)', fontFamily: 'var(--font-s)', fontSize: '.9rem', outline: 'none' }}>
            <option value="">Todos os temas ({due.length} pendentes)</option>
            {(Object.entries(THEMES) as [StudyTheme, string][]).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </div>

        {/* Progress */}
        <div className="progress-track" style={{ marginBottom: '1.25rem' }}>
          <div className="progress-fill" style={{ width: pct + '%' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          <span>Card {idx + 1} de {due.length}</span>
          <span>{Math.round(pct)}% concluído</span>
        </div>

        {/* Flashcard */}
        {current && (
          <>
            <div className="flashcard-wrapper" onClick={() => setFlipped(f => !f)}>
              <div className={`flashcard ${flipped ? 'flipped' : ''}`}>
                {/* Frente */}
                <div className="flashcard-face flashcard-front">
                  <div className="flashcard-tema-tag">📋 {THEMES[current.theme]}</div>
                  <div className="flashcard-label">Pergunta</div>
                  <div className="flashcard-texto">{current.front}</div>
                  <div className="flashcard-hint">Toque para revelar a resposta</div>
                </div>
                {/* Verso */}
                <div className="flashcard-face flashcard-back">
                  <div className="flashcard-tema-tag">✓ Resposta</div>
                  <div className="flashcard-label">Resposta</div>
                  <div className="flashcard-texto">{current.back}</div>
                  <div className="flashcard-hint">Avalie sua memória abaixo</div>
                </div>
              </div>
            </div>

            {/* Botões SM-2 */}
            {flipped ? (
              <div style={{ marginTop: '1.5rem' }}>
                <div style={{ textAlign: 'center', fontSize: '.75rem', color: 'var(--text-muted)', marginBottom: '.75rem', textTransform: 'uppercase', letterSpacing: '.1em' }}>
                  Como você se saiu?
                </div>
                <div className="srs-respostas">
                  {[
                    { q: 0 as SRSQuality, lbl: 'Errei',   int: '+ 1 dia',   cls: 'srs-denovo'  },
                    { q: 1 as SRSQuality, lbl: 'Difícil', int: '+ 2 dias',   cls: 'srs-dificil' },
                    { q: 2 as SRSQuality, lbl: 'Bom',     int: '+ 5 dias',   cls: 'srs-bom'     },
                    { q: 3 as SRSQuality, lbl: 'Fácil',   int: '+ 10 dias',  cls: 'srs-facil'   },
                  ].map(({ q, lbl, int, cls }) => (
                    <button key={q} className={`srs-resp-btn ${cls}`} onClick={() => responder(q)}>
                      <span className="srs-resp-lbl">{lbl}</span>
                      <span className="srs-resp-int">{int}</span>
                    </button>
                  ))}
                </div>
                <p style={{ textAlign: 'center', fontSize: '.7rem', color: 'var(--text-dim)', marginTop: '.75rem' }}>
                  O intervalo é calculado pelo algoritmo SM-2
                </p>
              </div>
            ) : (
              <p style={{ textAlign: 'center', fontSize: '.85rem', color: 'var(--text-muted)', marginTop: '1.25rem' }}>
                Clique no card para ver a resposta
              </p>
            )}
          </>
        )}
      </div>
    </section>
  )
}
