import { useState } from 'react'
import { MOCK_CASES } from '@/data/mockData'
import { THEMES, StudyTheme, ClinicalCase, CaseStep } from '@/services/supabaseClient'

type Fase = 'lista' | 'jogando' | 'fim'

export function CasosPage() {
  const [fase,       setFase]       = useState<Fase>('lista')
  const [caso,       setCaso]       = useState<ClinicalCase | null>(null)
  const [stepId,     setStepId]     = useState('')
  const [historico,  setHistorico]  = useState<{ step: CaseStep; optId: string }[]>([])
  const [acertos,    setAcertos]    = useState(0)
  const [filtro,     setFiltro]     = useState<StudyTheme | ''>('')

  const filtrados = MOCK_CASES.filter(c => !filtro || c.theme === filtro)
  const stepAtual = caso?.steps.find(s => s.id === stepId) ?? null

  const iniciar = (c: ClinicalCase) => {
    setCaso(c); setStepId(c.steps[0].id)
    setHistorico([]); setAcertos(0); setFase('jogando')
  }

  const escolher = (optId: string) => {
    if (!stepAtual || !caso) return
    const opt = stepAtual.options.find(o => o.id === optId)
    if (!opt) return
    setHistorico(h => [...h, { step: stepAtual, optId }])
    if (opt.is_correct) setAcertos(a => a + 1)
    if (!opt.next_step_id || opt.next_step_id === 'final') {
      const fin = caso.steps.find(s => s.id === 'final')
      fin ? setStepId('final') : setFase('fim')
    } else {
      setStepId(opt.next_step_id)
    }
  }

  const reiniciar = () => { setFase('lista'); setCaso(null); setStepId('') }

  // ─── FIM ───────────────────────────────────────────────
  if (fase === 'fim') {
    const total = historico.length
    const pct   = total ? Math.round(acertos / total * 100) : 0
    return (
      <section style={{ padding: '4rem 2rem', background: '#0D0D0D' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div className="card-dark" style={{ padding: '2.5rem', textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{ fontFamily: 'var(--font-d)', fontSize: '4.5rem', fontWeight: 700, color: pct >= 70 ? '#4ade80' : pct >= 50 ? '#EF5350' : '#f87171', lineHeight: 1 }}>{pct}%</div>
            <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.4rem', color: 'white', margin: '.5rem 0' }}>Caso concluído!</div>
            <p style={{ color: 'var(--text-muted)', fontSize: '.88rem' }}>{caso?.title}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', margin: '1.75rem 0' }}>
              {[{ v: total, l: 'Decisões', c: '#E53935' }, { v: acertos, l: 'Corretas', c: '#4ade80' }, { v: total-acertos, l: 'Incorretas', c: '#f87171' }].map((d, i) => (
                <div key={i} className="card-dark" style={{ padding: '1rem' }}>
                  <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.75rem', fontWeight: 700, color: d.c }}>{d.v}</div>
                  <div style={{ fontSize: '.68rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: '.2rem' }}>{d.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Histórico */}
          <div className="card-dark" style={{ padding: '1.75rem', marginBottom: '1.5rem' }}>
            <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.1rem', color: '#E53935', marginBottom: '1.25rem', fontWeight: 600 }}>Revisão das decisões</div>
            {historico.map((h, i) => {
              const opt = h.step.options.find(o => o.id === h.optId)!
              return (
                <div key={i} style={{ padding: '1rem', border: '1px solid', borderColor: opt.is_correct ? '#2f7a3f' : '#b23b3b', background: opt.is_correct ? 'rgba(47,122,63,.08)' : 'rgba(178,59,59,.08)', marginBottom: '.75rem' }}>
                  <p style={{ fontSize: '.85rem', color: 'var(--text-muted)', marginBottom: '.4rem', lineHeight: 1.5 }}>{h.step.content}</p>
                  <p style={{ fontSize: '.85rem', fontWeight: 700, color: opt.is_correct ? '#4ade80' : '#f87171' }}>
                    {opt.is_correct ? '✓' : '✗'} {opt.text}
                  </p>
                  <p style={{ fontSize: '.8rem', color: 'var(--text-muted)', marginTop: '.3rem', fontStyle: 'italic' }}>{opt.feedback}</p>
                </div>
              )
            })}
          </div>
          <button className="btn-red" style={{ width: '100%' }} onClick={reiniciar}>← Voltar aos casos</button>
        </div>
      </section>
    )
  }

  // ─── JOGANDO ───────────────────────────────────────────
  if (fase === 'jogando' && stepAtual && caso) {
    const isFinal = stepAtual.options.length === 0
    return (
      <section style={{ padding: '4rem 2rem', background: '#0D0D0D' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <button className="btn-ghost" onClick={reiniciar} style={{ fontSize: '.8rem', padding: '.4rem .8rem' }}>←</button>
            <div>
              <p style={{ fontSize: '.72rem', textTransform: 'uppercase', color: 'var(--text-dim)', letterSpacing: '.1em' }}>{caso.title}</p>
              <p style={{ fontSize: '.75rem', color: 'var(--text-muted)' }}>Decisão {historico.length + 1} · {THEMES[caso.theme]}</p>
            </div>
          </div>

          {/* Feedback do histórico */}
          {historico.slice(-1).map((h, i) => {
            const opt = h.step.options.find(o => o.id === h.optId)!
            return (
              <div key={i} style={{ padding: '.75rem 1rem', border: '1px solid', borderColor: opt.is_correct ? '#2f7a3f' : '#b23b3b', background: opt.is_correct ? 'rgba(47,122,63,.1)' : 'rgba(178,59,59,.1)', marginBottom: '1rem', fontSize: '.82rem' }}>
                <span style={{ fontWeight: 700, color: opt.is_correct ? '#4ade80' : '#f87171' }}>{opt.is_correct ? '✓ ' : '✗ '}</span>
                <span style={{ color: 'var(--text)' }}>{opt.feedback}</span>
              </div>
            )
          })}

          <div className="questao-card">
            <p className="enunciado" style={{ marginTop: 0 }}>{stepAtual.content}</p>

            {isFinal ? (
              <button className="btn-red" style={{ width: '100%', marginTop: '1rem' }} onClick={() => setFase('fim')}>
                Ver resultado final →
              </button>
            ) : (
              <div style={{ marginTop: '.5rem' }}>
                <div style={{ fontSize: '.68rem', textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--text-dim)', fontWeight: 700, marginBottom: '.75rem' }}>Qual sua conduta?</div>
                {stepAtual.options.map(opt => (
                  <button key={opt.id} className="alt-btn" onClick={() => escolher(opt.id)}>
                    <span className="alt-letter" style={{ width: 20, height: 20, fontSize: '.65rem' }}>→</span>
                    <span>{opt.text}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  // ─── LISTA ─────────────────────────────────────────────
  return (
    <section style={{ padding: '4rem 2rem', background: '#0D0D0D' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div className="accent-bar" />
        <h2 style={{ fontFamily: 'var(--font-d)', fontSize: '2rem', color: 'white', marginBottom: '.4rem' }}>Casos Clínicos</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '.88rem', marginBottom: '2rem' }}>Árvore de decisão interativa — tome condutas e receba feedback imediato</p>

        <div style={{ marginBottom: '1.5rem', maxWidth: 340 }}>
          <select value={filtro} onChange={e => setFiltro(e.target.value as StudyTheme | '')}
            style={{ width: '100%', padding: '.7rem .9rem', border: '1px solid var(--border)', background: 'var(--bg-surface)', color: 'var(--text)', fontFamily: 'var(--font-s)', fontSize: '.9rem', outline: 'none' }}>
            <option value="">Todos os temas</option>
            {(Object.entries(THEMES) as [StudyTheme, string][]).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(360px,1fr))', gap: '1.25rem' }}>
          {filtrados.map(c => (
            <div key={c.id} className="feature-card" style={{ cursor: 'default' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '.75rem' }}>
                <span className="tag-pill">{THEMES[c.theme]}</span>
                <span style={{ fontSize: '.72rem', color: 'var(--text-dim)' }}>{c.steps.length} etapas</span>
              </div>
              <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.1rem', color: 'white', fontWeight: 600, marginBottom: '.5rem', lineHeight: 1.25 }}>{c.title}</div>
              <p style={{ fontSize: '.84rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.25rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{c.description}</p>
              <button className="btn-red" style={{ width: '100%' }} onClick={() => iniciar(c)}>Iniciar caso →</button>
            </div>
          ))}
        </div>

        {filtrados.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🏥</div>
            <p>Nenhum caso encontrado para esse tema.</p>
          </div>
        )}
      </div>
    </section>
  )
}
