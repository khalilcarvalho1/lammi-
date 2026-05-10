import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { THEMES, StudyTheme } from '@/services/supabaseClient'
import { aulasService, Aula } from '@/services/aulasService'

const TIPO_ICONS: Record<string,string> = { video:'🎬', pdf:'📄', slide:'🖥️', article:'📝', texto:'📝' }
const TIPO_LABELS: Record<string,string> = { video:'Vídeo', pdf:'PDF', slide:'Slide', article:'Texto', texto:'Texto' }

const TEMA_ICONS: Record<string,string> = {
  avaliacao_cena:'🩺', cinetica_trauma:'💥', atls_inicial:'⚕️',
  atls_via_aerea:'🫁', atls_face:'😶', atls_pescoco:'🔴',
  atls_toracico:'🫀', atls_choque:'🩸', atls_abdominal:'🟥',
  atls_genitourinario:'🔵', atls_cranioencefalico:'🧠', atls_coluna:'🦴',
}

export function AulasPage() {
  const [aulas,       setAulas]       = useState<Aula[]>([])
  const [loading,     setLoading]     = useState(true)
  const [filterTheme, setFilterTheme] = useState<string>('')
  const [filterType,  setFilterType]  = useState<string>('')

  useEffect(()=>{
    aulasService.getAll().then(({data,error})=>{
      if (!error&&data) setAulas(data as Aula[])
      setLoading(false)
    })
  },[])

  const filtered = aulas.filter(a=>
    (!filterTheme||a.theme===filterTheme)&&
    (!filterType||a.type===filterType)
  )

  return (
    <section style={{padding:'4rem 2rem',background:'var(--bg)'}}>
      <div style={{maxWidth:1000,margin:'0 auto'}}>
        <div className="accent-bar"/>
        <h2 style={{fontFamily:'var(--font-d)',fontSize:'2rem',color:'var(--text)',marginBottom:'.4rem'}}>Aulas Completas</h2>
        <p style={{color:'var(--text-muted)',fontSize:'.88rem',marginBottom:'2.5rem'}}>
          Conteúdo didático baseado em ATLS · TCCC · PHTLS · Medicina Operacional
        </p>

        {/* Filtros */}
        <div style={{display:'flex',gap:'1rem',flexWrap:'wrap',marginBottom:'2rem'}}>
          <select value={filterTheme} onChange={e=>setFilterTheme(e.target.value)}
            style={{flex:1,minWidth:200,padding:'.6rem .9rem',border:'1px solid var(--border)',background:'var(--bg-surface)',color:'var(--text)',fontFamily:'var(--font-s)',fontSize:'.84rem',outline:'none',cursor:'pointer'}}>
            <option value="">Todos os temas</option>
            {(Object.entries(THEMES) as [StudyTheme,string][]).map(([k,v])=>(
              <option key={k} value={k}>{TEMA_ICONS[k]??'📋'} {v}</option>
            ))}
          </select>
          <select value={filterType} onChange={e=>setFilterType(e.target.value)}
            style={{minWidth:160,padding:'.6rem .9rem',border:'1px solid var(--border)',background:'var(--bg-surface)',color:'var(--text)',fontFamily:'var(--font-s)',fontSize:'.84rem',outline:'none',cursor:'pointer'}}>
            <option value="">Todos os tipos</option>
            <option value="article">📝 Texto</option>
            <option value="video">🎬 Vídeo</option>
            <option value="pdf">📄 PDF</option>
            <option value="slide">🖥️ Slide</option>
          </select>
        </div>

        {loading ? (
          <div style={{textAlign:'center',padding:'4rem',color:'var(--text-muted)'}}>
            <div className="loading-spinner" style={{margin:'0 auto 1rem'}}/>
            Carregando aulas...
          </div>
        ):(
          <>
            <p style={{fontSize:'.75rem',color:'var(--text-dim)',marginBottom:'1.5rem'}}>
              {filtered.length} aula(s) encontrada(s)
            </p>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'1.25rem'}}>
              {filtered.map(a=>(
                <Link key={a.id} to={`/aulas/${a.id}`} style={{textDecoration:'none'}}>
                  <div className="aula-card">
                    <div style={{fontSize:'2.5rem',marginBottom:'.75rem'}}>
                      {TIPO_ICONS[a.type]??'📝'}
                    </div>
                    <div style={{fontSize:'.65rem',textTransform:'uppercase',letterSpacing:'.15em',color:'var(--red-bright)',fontWeight:700,marginBottom:'.4rem'}}>
                      {a.theme && THEMES[a.theme as StudyTheme] ? THEMES[a.theme as StudyTheme] : a.theme}
                    </div>
                    <div style={{fontFamily:'var(--font-d)',fontSize:'1.3rem',fontWeight:700,color:'var(--text)',marginBottom:'.4rem',lineHeight:1.3}}>
                      {a.title}
                    </div>
                    <div style={{fontSize:'.82rem',color:'var(--text-muted)',marginBottom:'.75rem',lineHeight:1.5,display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>
                      {a.description}
                    </div>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:'.75rem',borderTop:'1px solid var(--border)',fontSize:'.75rem',color:'var(--text-dim)'}}>
                      <span>{TIPO_ICONS[a.type]??'📝'} {TIPO_LABELS[a.type]??a.type}</span>
                      <span style={{color:'var(--red-bright)',fontWeight:600}}>Ler →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filtered.length===0&&(
              <div style={{textAlign:'center',padding:'4rem',color:'var(--text-muted)'}}>
                <p style={{fontSize:'2.5rem',marginBottom:'1rem'}}>📚</p>
                <p>Nenhuma aula encontrada com os filtros selecionados.</p>
              </div>
            )}

            <p style={{fontSize:'.78rem',color:'var(--text-dim)',textAlign:'center',marginTop:'2rem',fontStyle:'italic'}}>
              Mais aulas serão adicionadas em breve
            </p>
          </>
        )}
      </div>
    </section>
  )
}
