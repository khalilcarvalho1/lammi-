import { useState } from 'react'
import { MOCK_CASES } from '@/data/mockData'
import { THEMES, StudyTheme, ClinicalCase, CaseStep } from '@/services/supabaseClient'

const TEMA_ICONS: Record<string,string> = {
  avaliacao_cena:'🩺', cinetica_trauma:'💥', atls_inicial:'⚕️',
  atls_via_aerea:'🫁', atls_face:'😶', atls_pescoco:'🔴',
  atls_toracico:'🫀', atls_choque:'🩸', atls_abdominal:'🟥',
  atls_genitourinario:'🔵', atls_cranioencefalico:'🧠', atls_coluna:'🦴',
}

type Fase = 'lista' | 'jogando' | 'fim'

function renderMd(txt: string) {
  return txt.split('\n').map((line, i) => {
    const t = line.trim()
    if (!t) return <div key={i} style={{height:'.5rem'}}/>
    const bold = (s: string) => {
      const parts = s.split(/(\*\*[^*]+\*\*)/)
      return parts.map((p,j) => p.startsWith('**')&&p.endsWith('**')
        ? <strong key={j} style={{color:'var(--red-bright)',fontWeight:700}}>{p.slice(2,-2)}</strong>
        : p)
    }
    if (t.startsWith('- ')||t.startsWith('• ')) return <li key={i} style={{marginBottom:'.35rem',marginLeft:'1.25rem'}}>{bold(t.replace(/^[-•]\s/,''))}</li>
    return <p key={i} style={{margin:'0 0 .5rem'}}>{bold(t)}</p>
  })
}

export function CasosPage() {
  const [fase,      setFase]      = useState<Fase>('lista')
  const [caso,      setCaso]      = useState<ClinicalCase|null>(null)
  const [stepId,    setStepId]    = useState('')
  const [historico, setHistorico] = useState<{step:CaseStep;optId:string}[]>([])
  const [acertos,   setAcertos]   = useState(0)
  const [filtro,    setFiltro]    = useState<StudyTheme|''>('')

  const filtrados = MOCK_CASES.filter(c => !filtro || c.theme === filtro)
  const stepAtual = caso?.steps.find(s => s.id === stepId) ?? null

  const iniciar = (c: ClinicalCase) => {
    setCaso(c); setStepId(c.steps[0].id)
    setHistorico([]); setAcertos(0); setFase('jogando')
  }

  const escolher = (optId: string) => {
    if (!stepAtual||!caso) return
    const opt = stepAtual.options.find(o => o.id === optId)
    if (!opt) return
    setHistorico(h => [...h, { step: stepAtual, optId }])
    if (opt.is_correct) setAcertos(a => a+1)
    if (!opt.next_step_id || opt.next_step_id === 'final') {
      const fim = caso.steps.find(s => s.id === 'final')
      fim ? setStepId('final') : setFase('fim')
    } else {
      setStepId(opt.next_step_id)
    }
  }

  const reiniciar = () => { setFase('lista'); setCaso(null); setStepId('') }

  // ── TELA FIM ──
  if (fase==='fim') {
    const total = historico.length
    const pct   = total ? Math.round(acertos/total*100) : 0
    return (
      <section style={{padding:'4rem 2rem',background:'var(--bg)'}}>
        <div style={{maxWidth:700,margin:'0 auto',textAlign:'center'}}>
          <div style={{fontSize:'4rem',marginBottom:'1rem'}}>{pct>=70?'🏆':pct>=50?'✅':'📚'}</div>
          <h2 style={{fontFamily:'var(--font-d)',fontSize:'2rem',color:'var(--text)'}}>Caso concluído!</h2>
          <div style={{fontFamily:'var(--font-d)',fontSize:'3rem',fontWeight:700,color:'var(--red-bright)',margin:'1rem 0'}}>{pct}%</div>
          <p style={{color:'var(--text-muted)',marginBottom:'2rem'}}>
            {acertos} de {total} decisões corretas
          </p>

          {/* Histórico de respostas */}
          {historico.length>0&&(
            <div style={{textAlign:'left',marginBottom:'2rem'}}>
              {historico.map((h,i)=>{
                const opt = h.step.options.find(o=>o.id===h.optId)
                return (
                  <div key={i} style={{display:'flex',gap:'.75rem',padding:'.75rem 1rem',marginBottom:'.5rem',background:'var(--bg-card)',border:`1px solid ${opt?.is_correct?'#2f7a3f':'#b23b3b'}`,alignItems:'flex-start'}}>
                    <span style={{fontSize:'1rem',flexShrink:0}}>{opt?.is_correct?'✓':'✗'}</span>
                    <div>
                      <div style={{fontSize:'.78rem',color:'var(--text-muted)',marginBottom:'.2rem'}}>Decisão {i+1}</div>
                      <div style={{fontSize:'.88rem',color:'var(--text)',lineHeight:1.5}}>{opt?.text}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          <div style={{display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap'}}>
            <button className="btn-ghost" onClick={()=>{if(caso)iniciar(caso)}}>Refazer o caso</button>
            <button className="btn-red" onClick={reiniciar}>Outros casos</button>
          </div>
        </div>
      </section>
    )
  }

  // ── TELA JOGANDO ──
  if (fase==='jogando'&&caso&&stepAtual) {
    const stepIdx  = caso.steps.findIndex(s=>s.id===stepId)
    const total    = caso.steps.filter(s=>s.id!=='final').length
    const progPct  = Math.min(100, Math.round(((stepIdx+1)/total)*100))

    return (
      <section style={{padding:'3rem 2rem',background:'var(--bg)'}}>
        <div style={{maxWidth:1000,margin:'0 auto'}}>
          <button className="btn-ghost" style={{marginBottom:'1rem',fontSize:'.85rem'}} onClick={reiniciar}>← Casos clínicos</button>

          <div style={{marginBottom:'1.5rem'}}>
            <div style={{fontSize:'.65rem',textTransform:'uppercase',letterSpacing:'.15em',color:'var(--red-bright)',fontWeight:700}}>
              {TEMA_ICONS[caso.theme]??'🩺'} {THEMES[caso.theme as StudyTheme]??caso.theme}
            </div>
            <h2 style={{fontFamily:'var(--font-d)',fontSize:'1.75rem',color:'var(--text)',margin:'.25rem 0'}}>{caso.title}</h2>
          </div>

          {/* Barra de progresso */}
          <div className="progress-track" style={{marginBottom:'1.5rem'}}>
            <div className="progress-fill" style={{width:progPct+'%'}}/>
          </div>

          {/* Indicadores de etapas */}
          <div style={{display:'flex',gap:'.5rem',marginBottom:'1.5rem',flexWrap:'wrap'}}>
            {caso.steps.filter(s=>s.id!=='final').map((s,i)=>{
              const respondida = historico.find(h=>h.step.id===s.id)
              const acertou    = respondida?.step.options.find(o=>o.id===respondida.optId)?.is_correct
              const atual      = s.id===stepId
              return (
                <div key={s.id} style={{display:'flex',alignItems:'center',gap:'.4rem',padding:'.45rem .9rem',border:'1px solid',
                  borderColor:atual?'var(--red)':respondida?(acertou?'#2f7a3f':'#b23b3b'):'var(--border)',
                  background:atual?'var(--red)':respondida?(acertou?'rgba(47,122,63,.12)':'rgba(178,59,59,.1)'):'transparent',
                  color:atual?'white':respondida?(acertou?'#4ade80':'#f87171'):'var(--text-muted)',
                  fontSize:'.78rem',fontWeight:600}}>
                  {respondida?(acertou?'✓':'✗'):String(i+1)}
                  <span style={{fontSize:'.72rem',opacity:.85}}>Etapa</span>
                </div>
              )
            })}
          </div>

          <div className="questao-card">
            {/* Header etapa */}
            <div style={{display:'flex',alignItems:'center',gap:'.75rem',marginBottom:'1.25rem',paddingBottom:'1rem',borderBottom:'1px solid var(--border)'}}>
              <div>
                <div style={{fontFamily:'var(--font-d)',fontSize:'1.1rem',color:'var(--text)',fontWeight:700}}>{stepAtual.content.split('\n')[0]?.replace(/^#+\s*/,'') || 'Etapa'}</div>
                <div style={{fontSize:'.72rem',color:'var(--text-dim)',textTransform:'uppercase',letterSpacing:'.1em'}}>Etapa {stepIdx+1} de {total}</div>
              </div>
            </div>

            {/* Conteúdo */}
            <div style={{fontFamily:'var(--font-d)',fontSize:'.98rem',lineHeight:1.75,color:'var(--text)',marginBottom:'1.5rem'}}>
              {renderMd(stepAtual.content)}
            </div>

            {/* Alternativas */}
            <div style={{marginBottom:'1rem'}}>
              {stepAtual.options.map(opt=>(
                <button key={opt.id} className="alt-btn" onClick={()=>escolher(opt.id)}>
                  <span className="alt-letter">→</span>
                  <span>{opt.text}</span>
                </button>
              ))}
            </div>

            {/* Histórico desta etapa */}
            {historico.length>0&&historico[historico.length-1].step.id!==stepId&&(
              <div style={{paddingTop:'1rem',borderTop:'1px solid var(--border)',display:'flex',justifyContent:'flex-start'}}>
                <button className="btn-ghost" style={{fontSize:'.8rem'}} onClick={()=>setFase('fim')}>
                  Ver resultado →
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  // ── LISTA DE CASOS ──
  return (
    <section style={{padding:'4rem 2rem',background:'var(--bg)'}}>
      <div style={{maxWidth:900,margin:'0 auto'}}>
        <div className="accent-bar"/>
        <h2 style={{fontFamily:'var(--font-d)',fontSize:'2rem',color:'var(--text)',marginBottom:'.4rem'}}>🏥 Casos Clínicos</h2>
        <p style={{color:'var(--text-muted)',fontSize:'.88rem',marginBottom:'2.5rem'}}>
          Raciocínio clínico em etapas — Anamnese → Exame → Diagnóstico → Conduta
        </p>

        {/* Filtro de tema */}
        <div style={{display:'flex',gap:'.5rem',flexWrap:'wrap',marginBottom:'2rem'}}>
          <button className={`tema-btn ${filtro===''?'active':''}`} style={{width:'auto',padding:'.45rem .9rem'}} onClick={()=>setFiltro('')}>
            Todos os temas
          </button>
          {(Object.entries(THEMES) as [StudyTheme,string][]).filter(([k])=>MOCK_CASES.some(c=>c.theme===k)).map(([k,v])=>(
            <button key={k} className={`tema-btn ${filtro===k?'active':''}`} style={{width:'auto',padding:'.45rem .9rem'}} onClick={()=>setFiltro(k)}>
              {TEMA_ICONS[k]??'📋'} {v}
            </button>
          ))}
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))',gap:'1.25rem'}}>
          {filtrados.map(c=>(
            <button key={c.id} className="aula-card" onClick={()=>iniciar(c)}>
              <div style={{fontSize:'2rem',marginBottom:'.5rem'}}>{TEMA_ICONS[c.theme as string]??'🩺'}</div>
              <div style={{fontSize:'.65rem',textTransform:'uppercase',letterSpacing:'.15em',color:'var(--red-bright)',fontWeight:700,marginBottom:'.3rem'}}>
                {THEMES[c.theme as StudyTheme]??c.theme}
              </div>
              <div style={{fontFamily:'var(--font-d)',fontSize:'1.2rem',color:'var(--text)',fontWeight:700,marginBottom:'.5rem',lineHeight:1.3}}>
                {c.title}
              </div>
              <p style={{fontSize:'.82rem',color:'var(--text-muted)',lineHeight:1.5,marginBottom:'.75rem',display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>
                {c.description}
              </p>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:'.75rem',borderTop:'1px solid var(--border)',fontSize:'.75rem',color:'var(--text-dim)'}}>
                <span>📋 {c.steps.filter(s=>s.id!=='final').length} etapas</span>
                <span style={{color:'var(--red-bright)',fontWeight:600}}>Iniciar →</span>
              </div>
            </button>
          ))}
        </div>

        {filtrados.length===0&&(
          <div style={{textAlign:'center',padding:'4rem',color:'var(--text-muted)'}}>
            <p style={{fontSize:'2rem',marginBottom:'1rem'}}>🔍</p>
            <p>Nenhum caso encontrado para este tema.</p>
          </div>
        )}

        <p style={{fontSize:'.78rem',color:'var(--text-dim)',textAlign:'center',marginTop:'2rem',fontStyle:'italic'}}>
          Mais casos clínicos serão adicionados em breve
        </p>
      </div>
    </section>
  )
}
