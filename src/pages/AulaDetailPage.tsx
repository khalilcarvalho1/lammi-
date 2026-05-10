import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { THEMES } from '@/services/supabaseClient'
import { aulasService, Aula } from '@/services/aulasService'

// Parseia markdown em seções usando ## como divisor
function parseSecoes(content: string) {
  const lines = content.split('\n')
  const secoes: { titulo: string; conteudo: string }[] = []
  let current: { titulo: string; linhas: string[] } | null = null
  for (const line of lines) {
    if (line.startsWith('## ')) {
      if (current) secoes.push({ titulo: current.titulo, conteudo: current.linhas.join('\n').trim() })
      current = { titulo: line.slice(3).trim(), linhas: [] }
    } else if (line.startsWith('# ') && secoes.length === 0 && !current) {
      current = { titulo: line.slice(2).trim(), linhas: [] }
    } else if (current) {
      current.linhas.push(line)
    }
  }
  if (current) secoes.push({ titulo: current.titulo, conteudo: current.linhas.join('\n').trim() })
  if (secoes.length === 0 && content.trim()) {
    secoes.push({ titulo: 'Conteúdo', conteudo: content.trim() })
  }
  return secoes
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/)
  return parts.map((p,i)=>{
    if (p.startsWith('**')&&p.endsWith('**')) return <strong key={i} style={{color:'var(--red-bright)',fontWeight:700}}>{p.slice(2,-2)}</strong>
    if (p.startsWith('*')&&p.endsWith('*')) return <em key={i}>{p.slice(1,-1)}</em>
    if (p.startsWith('`')&&p.endsWith('`')) return <code key={i} style={{background:'rgba(192,57,43,.12)',padding:'1px 5px',fontSize:'.82em',fontFamily:'monospace',color:'var(--red-bright)'}}>{p.slice(1,-1)}</code>
    return p
  })
}

function renderMarkdown(text: string) {
  const lines = text.split('\n')
  const out: React.ReactNode[] = []
  let inList = false
  let listItems: React.ReactNode[] = []

  const flushList = () => {
    if (inList) { out.push(<ul key={`ul-${out.length}`} style={{listStyle:'none',padding:0,margin:'.25rem 0 1.25rem'}}>{listItems}</ul>); listItems=[]; inList=false }
  }

  lines.forEach((raw,i)=>{
    const line = raw.trimEnd()
    const t = line.trim()
    if (t.startsWith('### ')) { flushList(); out.push(<h3 key={i} style={{fontFamily:'var(--font-d)',fontSize:'1.15rem',fontWeight:700,color:'var(--text)',marginTop:'1.5rem',marginBottom:'.4rem'}}>{t.slice(4)}</h3>); return }
    if (t.startsWith('---')) { flushList(); out.push(<hr key={i} style={{border:'none',borderTop:'1px solid var(--border)',margin:'1.5rem 0'}}/>); return }
    if (t.startsWith('- ')||t.startsWith('• ')) {
      if (!inList) inList=true
      listItems.push(
        <li key={i} style={{position:'relative',padding:'.3rem 0 .3rem 1.5rem',fontFamily:'var(--font-d)',fontSize:'1rem',lineHeight:1.7,color:'var(--text)'}}>
          <span style={{position:'absolute',left:0,top:'.35rem',color:'var(--red)',fontSize:'.7rem'}}>◆</span>
          {renderInline(t.replace(/^[-•]\s*/,''))}
        </li>
      )
      return
    }
    flushList()
    if (t.startsWith('|')) {
      const cells = t.split('|').filter(c=>c.trim()!=='')
      const isSep = cells.every(c=>c.trim().match(/^[-:]+$/))
      if (!isSep) {
        out.push(
          <div key={i} style={{display:'grid',gridTemplateColumns:`repeat(${cells.length},1fr)`,gap:'1px',background:'var(--border)',marginBottom:1,overflowX:'auto'}}>
            {cells.map((c,j)=>(
              <div key={j} style={{padding:'.4rem .65rem',background:'var(--bg-card)',fontSize:'.84rem',color:'var(--text)'}}>{renderInline(c.trim())}</div>
            ))}
          </div>
        )
      }
      return
    }
    if (t==='') { out.push(<div key={i} style={{height:'.75rem'}}/>); return }
    out.push(<p key={i} style={{fontFamily:'var(--font-d)',fontSize:'1.02rem',lineHeight:1.8,color:'var(--text)',margin:'0 0 .75rem'}}>{renderInline(t)}</p>)
  })
  flushList()
  return out
}

export function AulaDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [aula,    setAula]    = useState<Aula|null>(null)
  const [loading, setLoading] = useState(true)
  const [secaoIdx,setSecaoIdx]= useState(0)

  useEffect(()=>{
    if (!id) return
    aulasService.getById(id).then(({data,error})=>{
      if (!error&&data) setAula(data as Aula)
      setLoading(false)
    })
  },[id])

  if (loading) return (
    <div style={{textAlign:'center',padding:'4rem',color:'var(--text-muted)'}}>
      <div className="loading-spinner" style={{margin:'0 auto 1rem'}}/>
      Carregando aula...
    </div>
  )
  if (!aula) return (
    <div style={{textAlign:'center',padding:'4rem'}}>
      <p style={{fontSize:'2.5rem',marginBottom:'1rem'}}>📚</p>
      <p style={{color:'var(--text-muted)',marginBottom:'1.5rem'}}>Aula não encontrada.</p>
      <Link to="/aulas" className="btn-ghost">← Voltar às aulas</Link>
    </div>
  )

  const secoes = aula.content ? parseSecoes(aula.content) : []
  const temSecoes = secoes.length > 1
  const secao = temSecoes ? secoes[secaoIdx] : null
  const progressoPct = temSecoes ? Math.round(((secaoIdx+1)/secoes.length)*100) : 100
  const themeLabel = THEMES[aula.theme as keyof typeof THEMES] ?? aula.theme

  return (
    <section style={{padding:'3rem 2rem 4rem',background:'var(--bg)'}}>
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <Link to="/aulas" style={{textDecoration:'none'}}>
          <button className="btn-ghost" style={{marginBottom:'1rem',fontSize:'.85rem'}}>← Voltar às aulas</button>
        </Link>

        <div style={{marginBottom:'1.5rem'}}>
          <div style={{fontSize:'.65rem',textTransform:'uppercase',letterSpacing:'.18em',color:'var(--red-bright)',fontWeight:700}}>
            {themeLabel}
          </div>
          <h2 style={{fontFamily:'var(--font-d)',fontSize:'2rem',color:'var(--text)',marginTop:'.3rem'}}>{aula.title}</h2>
          {aula.description&&<p style={{color:'var(--text-muted)',fontSize:'.88rem',marginTop:'.3rem'}}>{aula.description}</p>}
        </div>

        {/* Barra de progresso (só se tiver seções) */}
        {temSecoes&&(
          <div className="progress-track" style={{marginBottom:'1.5rem'}}>
            <div className="progress-fill" style={{width:progressoPct+'%'}}/>
          </div>
        )}

        {/* Embed vídeo */}
        {aula.type==='video'&&aula.content_url&&(
          <div style={{width:'100%',aspectRatio:'16/9',marginBottom:'1.5rem'}}>
            <iframe src={aula.content_url} style={{width:'100%',height:'100%',border:'1px solid var(--border)'}} allowFullScreen/>
          </div>
        )}
        {/* Embed PDF */}
        {aula.type==='pdf'&&aula.content_url&&(
          <div style={{width:'100%',height:600,marginBottom:'1.5rem'}}>
            <iframe src={aula.content_url} style={{width:'100%',height:'100%',border:'1px solid var(--border)'}}/>
          </div>
        )}

        {/* Layout duas colunas se tiver seções */}
        {temSecoes ? (
          <div className="aula-layout">
            {/* Sumário lateral */}
            <aside className="aula-sumario">
              <div className="filtros-title" style={{border:'none',padding:0,marginBottom:'.75rem'}}>Sumário</div>
              {secoes.map((s,i)=>(
                <button key={i} className={`aula-sumario-item ${i===secaoIdx?'active':''}`}
                  onClick={()=>{setSecaoIdx(i);window.scrollTo(0,0)}}>
                  <span className="aula-sumario-num">{i+1}</span>
                  <span>{s.titulo}</span>
                </button>
              ))}
            </aside>

            {/* Conteúdo da seção */}
            <article className="aula-conteudo">
              <div style={{fontSize:'.75rem',color:'var(--text-dim)',marginBottom:'.35rem',textTransform:'uppercase',letterSpacing:'.1em',fontWeight:700}}>
                Seção {secaoIdx+1} de {secoes.length}
              </div>
              <h3 style={{fontFamily:'var(--font-d)',fontSize:'1.6rem',color:'var(--text)',marginBottom:'1.5rem',fontWeight:700}}>{secao!.titulo}</h3>
              <div>{renderMarkdown(secao!.conteudo)}</div>

              <div style={{display:'flex',justifyContent:'space-between',marginTop:'2.5rem',paddingTop:'1.5rem',borderTop:'1px solid var(--border)',gap:8,flexWrap:'wrap'}}>
                <button className="btn-ghost" onClick={()=>{setSecaoIdx(i=>Math.max(0,i-1));window.scrollTo(0,0)}} disabled={secaoIdx===0} style={{opacity:secaoIdx===0?.35:1}}>← Anterior</button>
                {secaoIdx===secoes.length-1?(
                  <Link to="/aulas"><button className="btn-red">✓ Aula concluída</button></Link>
                ):(
                  <button className="btn-red" onClick={()=>{setSecaoIdx(i=>i+1);window.scrollTo(0,0)}}>Próxima seção →</button>
                )}
              </div>
            </article>
          </div>
        ):(
          /* Sem seções: exibição simples */
          aula.content ? (
            <div className="aula-conteudo" style={{maxWidth:800}}>
              {renderMarkdown(aula.content)}
            </div>
          ):(
            <div className="aula-conteudo" style={{textAlign:'center',padding:'4rem'}}>
              <p style={{fontSize:'2rem',marginBottom:'1rem'}}>📚</p>
              <p style={{color:'var(--text-muted)'}}>Conteúdo ainda não disponível.</p>
            </div>
          )
        )}
      </div>
    </section>
  )
}
