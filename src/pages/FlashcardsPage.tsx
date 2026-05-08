import { useState, useEffect } from 'react'
import { MOCK_FLASHCARDS } from '@/data/mockData'
import { THEMES, StudyTheme } from '@/services/supabaseClient'
import { calculateSM2, initSRSCard, isDue, SRSQuality } from '@/hooks/useSRS'
import { useStudyContext } from '@/contexts/StudyContext'

export function FlashcardsPage() {
  // MIGRAÇÃO: srsData e setSrsData agora vêm do StudyContext, não de props
  const { srsData, setSrsData } = useStudyContext()

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

  const vencidos  = todos.filter(f => { const s = srsData[f.id]; return s && isDue(s) }).length
  const novos     = todos.filter(f => !srsData[f.id]).length
  const dominados = todos.filter(f => { const s = srsData[f.id]; return s && s.repetitions >= 3 }).length

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
                  { val: done.length,             lbl: 'Revisados',  col: '#E53935' },
                  { val: corretos,                lbl: 'Lembrados',  col: '#4ade80' },
                  { val: done.length - corretos,  lbl: 'Para rever', col: '#f87171' },
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

  return (
    <section style={{ padding: '4rem 2rem', background: '#0D0D0D' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div className="accent-bar" />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-d)', fontSize: '2rem', color: 'white', marginBottom: '.35rem' }}>Flashcards</h2>
            <p style={{ fontSize: '.88rem', color: 'rgba(240,240,240,.5)' }}>Repetição espaçada SM-2</p>
          </div>
          <select value={filtroTema} onChange={e => setFiltroTema(e.target.value as StudyTheme | '')}
            style={{ padding: '.65rem .9rem', border: '1px solid var(--border)', background: 'var(--bg-surface)', color: 'var(--text)', fontFamily: 'var(--font-s)', fontSize: '.88rem', outline: 'none', minWidth: 220 }}>
            <option value="">Todos os temas</option>
            {(Object.entries(THEMES) as [StudyTheme, string][]).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { lbl: 'Para hoje', val: due.length,  col: '#E53935' },
            { lbl: 'Novos',     val: novos,        col: 'var(--text)' },
            { lbl: 'Vencidos',  val: vencidos,     col: '#f87171' },
            { lbl: 'Dominados', val: dominados,    col: '#4ade80' },
          ].map((s, i) => (
            <div key={i} className="dash-card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--text-muted)', marginBottom: '.25rem' }}>{s.lbl}</div>
              <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.75rem', fontWeight: 700, color: s.col }}>{s.val}</div>
            </div>
          ))}
        </div>

        {/* Card */}
        {current ? (
          <>
            <div
              onClick={() => setFlipped(f => !f)}
              className="card-dark"
              style={{ padding: '3rem', minHeight: 260, cursor: 'pointer', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '1rem', userSelect: 'none', transition: 'all .2s', border: '1px solid rgba(192,57,43,.3)' }}
            >
              <div style={{ fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.15em', color: '#E53935', fontWeight: 700 }}>
                {flipped ? 'Verso (resposta)' : 'Frente (pergunta)'}
              </div>
              <div className="tag-pill" style={{ fontSize: '.72rem' }}>{THEMES[current.theme]}</div>
              <p style={{ fontSize: '1.15rem', color: 'white', lineHeight: 1.65, maxWidth: 560 }}>
                {flipped ? current.back : current.front}
              </p>
              <p style={{ fontSize: '.72rem', color: 'var(--text-dim)', marginTop: '.5rem' }}>
                {flipped ? '← Clique para ver a pergunta' : 'Clique para ver a resposta →'}
              </p>
            </div>

            {flipped && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '.75rem', marginTop: '1.25rem' }}>
                {[
                  { q: 0 as SRSQuality, lbl: 'Errei',   col: '#b23b3b', bg: 'rgba(178,59,59,.12)' },
                  { q: 1 as SRSQuality, lbl: 'Difícil',  col: '#f87171', bg: 'rgba(248,113,113,.1)' },
                  { q: 2 as SRSQuality, lbl: 'Bom',      col: '#60a5fa', bg: 'rgba(96,165,250,.1)'  },
                  { q: 3 as SRSQuality, lbl: 'Fácil',    col: '#4ade80', bg: 'rgba(74,222,128,.1)'  },
                ].map(b => (
                  <button key={b.q} onClick={() => responder(b.q)}
                    style={{ padding: '.9rem', border: `1px solid ${b.col}`, background: b.bg, color: b.col, fontFamily: 'var(--font-s)', fontWeight: 700, fontSize: '.88rem', cursor: 'pointer', transition: 'all .15s' }}>
                    {b.lbl}
                  </button>
                ))}
              </div>
            )}
            {!flipped && (
              <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                <span style={{ fontSize: '.75rem', color: 'var(--text-dim)' }}>
                  Card {idx + 1} de {due.length} · Clique no card para revelar
                </span>
              </div>
            )}
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem', background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎴</div>
            <p style={{ color: 'var(--text-muted)' }}>Nenhum flashcard disponível para este tema.</p>
          </div>
        )}
      </div>
    </section>
  )
}
