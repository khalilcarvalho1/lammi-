import { useNavigate } from 'react-router-dom'
import { MilDecor } from '@/components/layout/Navbar'
import { THEMES } from '@/services/supabaseClient'
import { MOCK_QUESTIONS } from '@/data/mockData'
import { useStudyContext } from '@/contexts/StudyContext'

const TEMA_ICONS: Record<string,string> = {
  avaliacao_cena:'🩺', cinetica_trauma:'💥', atls_inicial:'⚕️',
  atls_via_aerea:'🫁', atls_face:'😶', atls_pescoco:'🔴',
  atls_toracico:'🫀', atls_choque:'🩸', atls_abdominal:'🟥',
  atls_genitourinario:'🔵', atls_cranioencefalico:'🧠', atls_coluna:'🦴',
}

const FEATURES = [
  { icon:'📋', title:'Questões de Residência', desc:'Questões extraídas de provas reais e protocolos ATLS/TCCC/PHTLS, organizadas por tema e dificuldade.' },
  { icon:'🏥', title:'Casos Clínicos', desc:'Raciocínio diagnóstico em etapas — Anamnese → Exame → Exames → Conduta, com árvore de decisão.' },
  { icon:'📖', title:'Diretrizes Resumidas', desc:'Pontos-chave ATLS, TCCC, BTF e Medicina Operacional para consulta rápida em campo.' },
  { icon:'🎴', title:'Flashcards SRS', desc:'Sistema de repetição espaçada (SM-2) para memorização de conceitos críticos de medicina de emergência.' },
  { icon:'⏱️', title:'Modo Simulado', desc:'Provas cronometradas com navegação livre, revisão antes de entregar e gabarito comentado.' },
  { icon:'📊', title:'Dashboard de Desempenho', desc:'Acompanhe seu progresso por tema, sequência de estudos e identifique pontos de melhoria.' },
]

export function HomePage() {
  const navigate = useNavigate()
  const { historico } = useStudyContext()

  const total      = MOCK_QUESTIONS.length
  const respondidas = Object.keys(historico).length
  const acertos    = Object.values(historico).filter(h => h.acertou).length
  const pct        = respondidas > 0 ? Math.round(acertos / respondidas * 100) : 0

  const temaCount: Record<string,number> = {}
  for (const q of MOCK_QUESTIONS) temaCount[q.theme] = (temaCount[q.theme] || 0) + 1

  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-mil" style={{position:'relative',overflow:'hidden'}}>
        <div className="noise"/>
        <MilDecor/>
        <div style={{maxWidth:1200,margin:'0 auto',padding:'5rem 2rem 4rem',position:'relative'}}>
          <div className="hero-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'4rem',alignItems:'center'}}>
            <div className="fade-up">
              <div className="ornament" style={{maxWidth:300,marginBottom:'1.75rem'}}>Irecê · Bahia · 2025</div>
              <h1 style={{fontFamily:'var(--font-d)',fontSize:'clamp(2.4rem,5vw,4rem)',color:'white',lineHeight:1.08,fontWeight:700,marginBottom:'1.25rem'}}>
                Medicina Militar<br/>com <span style={{fontStyle:'italic',color:'var(--red-bright)'}}>precisão e preparo</span>
              </h1>
              <p style={{color:'rgba(240,240,240,.75)',fontSize:'1.05rem',lineHeight:1.75,maxWidth:520,marginBottom:'2.5rem'}}>
                Banco de questões da <strong style={{color:'var(--red-bright)'}}>LAMMI</strong>. Protocolos ATLS, TCCC, PHTLS e Medicina Operacional baseados nas diretrizes mais recentes.
              </p>
              <div style={{display:'flex',gap:'1rem',flexWrap:'wrap'}}>
                <button className="btn-red" onClick={()=>navigate('/banco')}>Começar a Estudar</button>
                <button className="btn-outline-red" onClick={()=>navigate('/simulado')}>Fazer Simulado</button>
              </div>

              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'2rem',marginTop:'3.5rem',paddingTop:'2.5rem',borderTop:'1px solid rgba(192,57,43,.25)'}}>
                {[
                  { val: total, lbl: 'Questões' },
                  { val: Object.keys(THEMES).length, lbl: 'Temas ATLS' },
                  { val: pct ? pct + '%' : '—', lbl: 'Aproveitamento' },
                ].map((s,i)=>(
                  <div key={i}>
                    <div className="stat-val">{s.val}</div>
                    <div className="stat-lbl">{s.lbl}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card lateral */}
            <div className="fade-up delay-2" style={{position:'relative'}}>
              <div className="card-mil" style={{padding:'2.5rem'}}>
                <div className="accent-bar"/>
                <h3 style={{fontFamily:'var(--font-d)',fontSize:'1.4rem',color:'white',marginBottom:'.4rem'}}>Banco de Questões</h3>
                <div style={{fontSize:'.7rem',textTransform:'uppercase',letterSpacing:'.18em',color:'var(--red-bright)',marginBottom:'1.5rem'}}>
                  {total} questões · ATLS · TCCC · PHTLS
                </div>
                {Object.entries(THEMES).map(([k,v])=>(
                  <div key={k} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'.6rem 0',borderBottom:'1px solid rgba(192,57,43,.15)'}}>
                    <span style={{color:'rgba(240,240,240,.8)',fontSize:'.88rem'}}>{TEMA_ICONS[k]??'📋'} {v}</span>
                    <span style={{color:'var(--red-bright)',fontFamily:'var(--font-d)',fontSize:'1.1rem',fontWeight:600}}>
                      {temaCount[k]||0}
                    </span>
                  </div>
                ))}
                <button className="btn-red" style={{marginTop:'1.75rem',width:'100%'}} onClick={()=>navigate('/banco')}>
                  Acessar Banco →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{padding:'5rem 2rem',background:'var(--bg)'}}>
        <div style={{maxWidth:1200,margin:'0 auto'}}>
          <div className="ornament" style={{maxWidth:280,margin:'0 auto 3rem'}}>Funcionalidades</div>
          <h2 style={{fontFamily:'var(--font-d)',fontSize:'clamp(1.8rem,3vw,2.6rem)',textAlign:'center',color:'var(--text)',marginBottom:'3rem'}}>
            Tudo para dominar a Medicina Militar
          </h2>
          <div className="features-grid" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1.25rem'}}>
            {FEATURES.map((f,i)=>(
              <div className="feature-card" key={i}>
                <div className="feature-icon">{f.icon}</div>
                <div style={{fontFamily:'var(--font-d)',fontSize:'1.05rem',fontWeight:600,color:'var(--text)',marginBottom:'.5rem'}}>{f.title}</div>
                <div style={{fontSize:'.87rem',color:'var(--text-muted)',lineHeight:1.65}}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section style={{padding:'4rem 2rem',background:'#060606',position:'relative',overflow:'hidden'}}>
        <div className="noise"/>
        <div style={{maxWidth:700,margin:'0 auto',textAlign:'center',position:'relative'}}>
          <div className="accent-bar" style={{margin:'0 auto 1.5rem'}}/>
          <h2 style={{fontFamily:'var(--font-d)',fontSize:'clamp(1.6rem,3vw,2.4rem)',color:'white',marginBottom:'.75rem'}}>
            Pronto para testar seu conhecimento?
          </h2>
          <p style={{color:'rgba(240,240,240,.6)',marginBottom:'2rem',fontSize:'.97rem'}}>
            {total} questões · ATLS · TCCC · PHTLS · Gabarito comentado · Estilo residência
          </p>
          <button className="btn-red" onClick={()=>navigate('/banco')}>Iniciar agora →</button>
        </div>
      </section>
    </>
  )
}
