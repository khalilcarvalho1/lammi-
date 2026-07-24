import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useStudyContext } from '@/contexts/StudyContext'
import { useAuthContext } from '@/contexts/AuthContext'
import { MOCK_QUESTIONS } from '@/data/mockData'
import { temaLabel } from '@/utils/temaFilters'
import { questionsService } from '@/services/questionsService'
import { studyLogService } from '@/services/studyLogService'

const NIVEL_LABELS: Record<string, string> = {
  facil: 'Facil', medio: 'Medio', dificil: 'Dificil',
}
const TEMA_ICONS: Record<string, string> = {
  avaliacao_cena:'🩺', cinetica_trauma:'💥', atls_inicial:'⚕️',
  atls_via_aerea:'🫁', atls_face:'😶', atls_pescoco:'🔴',
  atls_toracico:'🫀', atls_choque:'🩸', atls_abdominal:'🟥',
  atls_genitourinario:'🔵', atls_cranioencefalico:'🧠', atls_coluna:'🦴',
}

function AnotacaoQuestao({ questionId }: { questionId: string }) {
  const key = `lammi_nota_${questionId}`
  const [texto, setTexto] = useState(() => localStorage.getItem(key) || '')
  const [editando, setEditando] = useState(false)
  const [draft, setDraft] = useState('')
  const ref = useRef<HTMLTextAreaElement>(null)
  useEffect(() => { setTexto(localStorage.getItem(key) || ''); setEditando(false) }, [questionId])
  const abrir = () => { setDraft(texto); setEditando(true); setTimeout(() => ref.current?.focus(), 50) }
  const salvar = () => { const v = draft.trim(); localStorage.setItem(key, v); setTexto(v); setEditando(false) }
  if (editando) return (
    <div style={{marginTop:'.75rem',background:'rgba(192,57,43,.06)',border:'1px solid rgba(192,57,43,.2)',padding:'1rem'}}>
      <div style={{fontSize:'.68rem',textTransform:'uppercase',letterSpacing:'.1em',color:'rgba(229,57,53,.7)',fontWeight:700,marginBottom:'.5rem'}}>Minha anotacao</div>
      <textarea ref={ref} value={draft} onChange={e=>setDraft(e.target.value)} onKeyDown={e=>e.stopPropagation()}
        placeholder="Escreva sua anotacao pessoal sobre esta questao..." rows={3}
        style={{width:'100%',padding:'.6rem .85rem',resize:'vertical',background:'var(--bg-surface)',border:'1px solid rgba(192,57,43,.25)',color:'var(--text)',fontFamily:'var(--font-s)',fontSize:'.85rem',lineHeight:1.6,outline:'none',boxSizing:'border-box'}}/>
      <div style={{display:'flex',gap:'.5rem',marginTop:'.5rem'}}>
        <button onClick={salvar} className="btn-red" style={{fontSize:'.78rem',padding:'.35rem .9rem'}}>Salvar</button>
        <button onClick={()=>setEditando(false)} className="btn-ghost" style={{fontSize:'.78rem',padding:'.35rem .9rem'}}>Cancelar</button>
      </div>
    </div>
  )
  if (texto) return (
    <div style={{marginTop:'.75rem',background:'rgba(192,57,43,.06)',border:'1px solid rgba(192,57,43,.2)',padding:'.75rem 1rem'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:'1rem'}}>
        <div>
          <div style={{fontSize:'.68rem',textTransform:'uppercase',letterSpacing:'.1em',color:'rgba(229,57,53,.65)',fontWeight:700,marginBottom:'.3rem'}}>Minha anotacao</div>
          <div style={{fontSize:'.85rem',color:'var(--text)',lineHeight:1.6,whiteSpace:'pre-wrap'}}>{texto}</div>
        </div>
        <button onClick={abrir} style={{background:'none',border:'none',cursor:'pointer',fontSize:'.75rem',color:'rgba(229,57,53,.5)',flexShrink:0}}>Editar</button>
      </div>
    </div>
  )
  return (
    <button onClick={abrir} style={{marginTop:'.75rem',width:'100%',padding:'.5rem 1rem',border:'1px dashed rgba(192,57,43,.25)',background:'transparent',color:'rgba(229,57,53,.45)',fontSize:'.78rem',cursor:'pointer',fontFamily:'var(--font-s)',textAlign:'left'}}>
      Adicionar anotacao pessoal...
    </button>
  )
}

export function RevisaoErrosPage() {
  const { historico, setHistorico } = useStudyContext()
  const { user } = useAuthContext()

  const erradas = useMemo(() =>
    MOCK_QUESTIONS.filter(q => historico[q.id] && !historico[q.id].acertou),
    [historico]
  )

  const [idx, setIdx] = useState(0)
  const [sel, setSel] = useState<string | null>(null)
  const [feedback, setFeedback] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900)

  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth <= 900)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])

  useEffect(() => { setSel(null); setFeedback(false) }, [idx])

  const q = erradas[idx] ?? null
  const total = erradas.length

  const confirmar = useCallback(async () => {
    if (!q || !sel || feedback) return
    const ok = sel === q.correct_key
    setHistorico(h => ({ ...h, [q.id]: { selecionada: sel, acertou: ok, em: new Date().toISOString() } }))
    setFeedback(true)
    if (user) {
      await questionsService.recordAnswer(user.id, q.id, sel, ok)
      await studyLogService.log(user.id, 'question', 1, q.theme)
      await studyLogService.updateProfileStreak(user.id)
    }
  }, [q, sel, feedback, setHistorico, user])

  if (total === 0) return (
    <section style={{padding: isMobile ? '1.5rem 1rem' : '3rem 2rem', background:'var(--bg)'}}>
      <div style={{maxWidth:700,margin:'0 auto',textAlign:'center',paddingTop:'4rem'}}>
        <div style={{fontSize:'3rem',marginBottom:'1rem'}}>🎉</div>
        <h2 style={{fontFamily:'var(--font-d)',fontSize:'1.6rem',color:'var(--text)',marginBottom:'.5rem'}}>Nenhum erro para revisar</h2>
        <p style={{color:'var(--text-muted)',fontSize:'.9rem',marginBottom:'1.5rem'}}>
          Voce ainda nao respondeu questoes, ou acertou todas. Continue estudando!
        </p>
        <Link to="/banco"><button className="btn-red">Ir para o Banco de Questoes</button></Link>
      </div>
    </section>
  )

  return (
    <section style={{padding: isMobile ? '1.5rem 1rem' : '3rem 2rem', background:'var(--bg)'}}>
      <div style={{maxWidth:900,margin:'0 auto'}}>
        <div style={{marginBottom:'1.75rem'}}>
          <div className="accent-bar"/>
          <h2 style={{fontFamily:'var(--font-d)',fontSize: isMobile ? '1.5rem' : '2rem',color:'var(--text)',marginBottom:'.35rem'}}>
            Revisao de Erros
          </h2>
          <p style={{fontSize:'.88rem',color:'var(--text-muted)'}}>
            {total} questao{total !== 1 ? 's' : ''} errada{total !== 1 ? 's' : ''} para revisar
          </p>
        </div>

        <div style={{display:'flex',flexWrap:'wrap',gap:6,marginBottom:'1.5rem'}}>
          {erradas.map((qt, i) => {
            const h = historico[qt.id]
            let cls = 'q-nav-dot'
            if (i === idx) cls += ' current'
            if (h?.acertou) cls += ' answered-correct'
            else cls += ' answered-wrong'
            return (
              <button key={qt.id} className={cls} title={`Q${i+1} - ${temaLabel(qt.theme)}`}
                onClick={() => setIdx(i)}>{i+1}</button>
            )
          })}
        </div>

        {q && (
          <div className="questao-card">
            <div className="progress-track">
              <div className="progress-fill" style={{width:`${((idx+1)/total)*100}%`}}/>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1rem',flexWrap:'wrap',gap:8}}>
              <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                <span className="tag-pill">{TEMA_ICONS[q.theme] ?? '📋'} {temaLabel(q.theme)}</span>
                <span className={`tag-pill ${q.difficulty==='facil'?'tag-green':''}`}>{NIVEL_LABELS[q.difficulty]}</span>
                <span className="tag-pill" style={{background:'rgba(178,59,59,.15)',color:'#f87171',border:'1px solid rgba(178,59,59,.3)'}}>
                  Ja errei
                </span>
              </div>
              <span style={{fontSize:'.78rem',color:'var(--text-muted)',fontWeight:500}}>Questao {idx+1} / {total}</span>
            </div>
            <p className="enunciado">{q.statement}</p>
            <div>
              {q.alternatives.map(({key:letra,text:texto}) => {
                let cls='alt-btn'
                if (feedback) {
                  if (letra===q.correct_key) cls+=' correct'
                  else if (letra===sel&&letra!==q.correct_key) cls+=' wrong'
                } else if (sel===letra) cls+=' selected-pending'
                return (
                  <button key={letra} className={cls} onClick={()=>{if(!feedback)setSel(letra)}}>
                    <span className="alt-letter">{letra}</span>
                    <span>{texto}</span>
                    {feedback&&letra===q.correct_key&&<span style={{marginLeft:'auto',fontSize:'.8rem'}}>v</span>}
                    {feedback&&letra===sel&&letra!==q.correct_key&&<span style={{marginLeft:'auto',fontSize:'.8rem'}}>x</span>}
                  </button>
                )
              })}
            </div>
            {sel&&!feedback&&(
              <button onClick={confirmar} className="btn-red" style={{width:'100%',marginTop:'1rem',fontWeight:700}}>
                Confirmar resposta
              </button>
            )}
            {feedback&&(
              <div style={{marginTop:'.75rem',display:'flex',alignItems:'center',gap:10,flexWrap:'wrap',padding:'.6rem .9rem',background:historico[q.id]?.acertou?'rgba(47,122,63,.12)':'rgba(178,59,59,.1)',border:`1px solid ${historico[q.id]?.acertou?'#2f7a3f':'#b23b3b'}`}}>
                {historico[q.id]?.acertou
                  ?<span style={{fontSize:'.9rem',color:'#4ade80',fontWeight:700}}>Correto! Questao removida da lista de erros.</span>
                  :<span style={{fontSize:'.9rem',color:'#f87171',fontWeight:700}}>Incorreto - continue revisando.</span>
                }
              </div>
            )}
            {feedback&&q.explanation&&(
              <div className="explicacao-box" style={{marginTop:'1rem'}}>
                <div className="explicacao-label">Comentario</div>
                <p style={{fontSize:'.88rem',color:'var(--text)',lineHeight:1.75}}>{q.explanation}</p>
              </div>
            )}
            {feedback&&<AnotacaoQuestao questionId={q.id}/>}
            <div style={{display:'flex',justifyContent:'space-between',marginTop:'1.5rem',paddingTop:'1.25rem',borderTop:'1px solid var(--border)',gap:8}}>
              <button className="btn-ghost" onClick={()=>setIdx(i=>Math.max(0,i-1))} disabled={idx===0} style={{opacity:idx===0?.35:1}}>Anterior</button>
              <button className="btn-ghost" onClick={()=>setIdx(i=>Math.min(total-1,i+1))} disabled={idx===total-1} style={{opacity:idx===total-1?.35:1}}>Proxima</button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}