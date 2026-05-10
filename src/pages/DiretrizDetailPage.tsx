import { useState } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { THEMES } from '@/services/supabaseClient'
import { MOCK_DIR } from './DiretrizesPage'

const TEMA_ICONS: Record<string,string> = {
  avaliacao_cena:'🩺', cinetica_trauma:'💥', atls_inicial:'⚕️',
  atls_via_aerea:'🫁', atls_face:'😶', atls_pescoco:'🔴',
  atls_toracico:'🫀', atls_choque:'🩸', atls_abdominal:'🟥',
  atls_genitourinario:'🔵', atls_cranioencefalico:'🧠', atls_coluna:'🦴',
}

export function DiretrizDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [pontoAtivo, setPontoAtivo] = useState<number|null>(null)
  const diretriz = MOCK_DIR.find(d => d.id === id)

  if (!diretriz) return <Navigate to="/diretrizes" replace/>

  const themeLabel = THEMES[diretriz.tema] ?? diretriz.tema

  return (
    <section style={{padding:'3rem 2rem 4rem',background:'var(--bg)'}}>
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <button className="btn-ghost" style={{marginBottom:'1.5rem',fontSize:'.85rem'}} onClick={()=>navigate('/diretrizes')}>
          ← Diretrizes
        </button>

        <div style={{marginBottom:'1.5rem'}}>
          <div style={{fontSize:'.65rem',textTransform:'uppercase',letterSpacing:'.18em',color:'var(--red-bright)',fontWeight:700,marginBottom:'.4rem'}}>
            {TEMA_ICONS[diretriz.tema]??'📋'} {themeLabel}
          </div>
          <h1 style={{fontFamily:'var(--font-d)',fontSize:'1.9rem',color:'var(--text)',marginBottom:'.5rem',lineHeight:1.25}}>{diretriz.title}</h1>
          <p style={{color:'var(--text-muted)',fontSize:'.88rem',lineHeight:1.6}}>{diretriz.resumo}</p>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'260px 1fr',gap:'2rem',alignItems:'start'}}>
          {/* Sumário lateral */}
          <aside className="aula-sumario">
            <div className="filtros-title" style={{border:'none',padding:0,marginBottom:'.75rem'}}>Pontos-chave</div>
            <div style={{marginBottom:'1rem',padding:'.6rem .85rem',background:'rgba(192,57,43,.08)',border:'1px solid var(--border)',fontSize:'.78rem',color:'var(--text-muted)'}}>
              <span className="tag-pill">{diretriz.fonte}</span>
            </div>
            {diretriz.conteudo.map((_,i)=>(
              <button key={i} className={`aula-sumario-item ${pontoAtivo===i?'active':''}`}
                onClick={()=>{setPontoAtivo(i===pontoAtivo?null:i);document.getElementById(`ponto-${i}`)?.scrollIntoView({behavior:'smooth',block:'center'})}}>
                <span className="aula-sumario-num">{i+1}</span>
                <span style={{fontSize:'.78rem',lineHeight:1.3}}>Ponto {i+1}</span>
              </button>
            ))}
          </aside>

          {/* Conteúdo */}
          <div className="aula-conteudo">
            <div style={{fontSize:'.75rem',color:'var(--text-dim)',marginBottom:'1.25rem',textTransform:'uppercase',letterSpacing:'.1em',fontWeight:700}}>
              {diretriz.conteudo.length} pontos críticos
            </div>

            {diretriz.conteudo.map((ponto,i)=>(
              <div key={i} id={`ponto-${i}`}
                onClick={()=>setPontoAtivo(i===pontoAtivo?null:i)}
                style={{
                  display:'flex',gap:'1rem',padding:'1rem 1.25rem',marginBottom:'.75rem',
                  border:'1px solid',
                  borderColor:pontoAtivo===i?'var(--red)':'var(--border)',
                  background:pontoAtivo===i?'rgba(192,57,43,.08)':'var(--bg-card)',
                  cursor:'pointer',transition:'all .2s',
                }}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'center',minWidth:28,height:28,background:pontoAtivo===i?'var(--red)':'rgba(192,57,43,.15)',color:pontoAtivo===i?'#fff':'var(--red-bright)',fontWeight:700,fontSize:'.8rem',borderRadius:'50%',flexShrink:0,alignSelf:'flex-start',marginTop:2}}>
                  {i+1}
                </div>
                <div style={{fontSize:'.92rem',color:'var(--text)',lineHeight:1.7,fontFamily:'var(--font-d)'}}>{ponto}</div>
              </div>
            ))}

            <div style={{marginTop:'2rem',paddingTop:'1.5rem',borderTop:'1px solid var(--border)',display:'flex',justifyContent:'space-between',gap:8}}>
              <button className="btn-ghost" onClick={()=>navigate('/diretrizes')}>← Todas as diretrizes</button>
              <div style={{display:'flex',gap:'.5rem'}}>
                {MOCK_DIR.findIndex(d=>d.id===id)>0&&(
                  <button className="btn-ghost" onClick={()=>navigate(`/diretrizes/${MOCK_DIR[MOCK_DIR.findIndex(d=>d.id===id)-1].id}`)}>← Anterior</button>
                )}
                {MOCK_DIR.findIndex(d=>d.id===id)<MOCK_DIR.length-1&&(
                  <button className="btn-red" onClick={()=>navigate(`/diretrizes/${MOCK_DIR[MOCK_DIR.findIndex(d=>d.id===id)+1].id}`)}>Próxima →</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
