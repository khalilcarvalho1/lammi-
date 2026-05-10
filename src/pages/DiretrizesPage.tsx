import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { THEMES, StudyTheme } from '@/services/supabaseClient'

export const MOCK_DIR = [
  { id:'d1', title:'ATLS 10ª Ed — Atendimento Inicial', fonte:'ATLS 10ª Ed.', resumo:'Sequência ABCDE, avaliação primária e secundária, damage control, critérios de transferência.', tema:'atls_inicial' as StudyTheme,
    conteudo:[
      'Via aérea e proteção cervical sempre como primeira prioridade absoluta.',
      'Jaw thrust é a manobra de escolha em pacientes com suspeita de lesão cervical.',
      'Glasgow ≤ 8 indica necessidade de via aérea definitiva imediata.',
      'Pneumotórax hipertensivo: descompressão imediata no 2° EIC, linha hemiclavicular.',
      'Hemotórax maciço: drenagem intercostal no 5° EIC, linha axilar anterior.',
      'Hipotensão permissiva: alvo PAM 50 mmHg em trauma penetrante sem TCE.',
      'Reposição 1:1:1 de plasma:plaquetas:concentrado de hemácias no choque hemorrágico grave.',
      'Tríade da morte: acidose + coagulopatia + hipotermia — prevenção ativa.',
    ]},
  { id:'d2', title:'Protocolo TCCC — Tactical Combat Casualty Care', fonte:'TCCC 2023', resumo:'MARCH: Massive hemorrhage, Airway, Respiration, Circulation, Hypothermia.', tema:'avaliacao_cena' as StudyTheme,
    conteudo:[
      'Fase 1 — Care Under Fire: retorno ao fogo + torniquete imediato em hemorragia de membro.',
      'Fase 2 — Tactical Field Care: MARCH completo, hemostasia definitiva, acesso IO se necessário.',
      'Fase 3 — TACEVAC: monitorização, reavaliação e comunicação com hospital receptor.',
      'Torniquete: posicionar 5–7 cm acima da lesão, apertar até cessar o sangramento.',
      'Curativo hemostático: comprimir por 3 minutos mínimos após aplicação.',
      'Hipotermia: cobrir o paciente após controle de hemorragia.',
      'Acesso IO: úmero proximal ou tíbia proximal se acesso venoso impossível em 90 segundos.',
    ]},
  { id:'d3', title:'Damage Control Resuscitation (DCR)', fonte:'SCCM / ATLS', resumo:'Hipotensão permissiva, hemostasia cirúrgica precoce, reversão da tríade da morte.', tema:'atls_choque' as StudyTheme,
    conteudo:[
      'DCR = controle de dano + reanimação hemostática + cirurgia de controle de dano.',
      'Meta PAS: 80–90 mmHg em trauma contuso; 50–60 mmHg em penetrante sem TCE.',
      'Ácido tranexâmico: dose máxima efetiva nas primeiras 3 horas do trauma.',
      'Evitar grandes volumes de cristaloides — aumentam coagulopatia dilucional.',
      'Razão 1:1:1 de hemoderivados reduz mortalidade em choque hemorrágico grave.',
      'Cirurgia abreviada: laparotomia de controle, packing e fechamento temporário.',
    ]},
  { id:'d4', title:'TCE Grave — Brain Trauma Foundation', fonte:'BTF 2016', resumo:'Metas de PIC, PAM e PPC. Neuroproteção e indicações cirúrgicas.', tema:'atls_cranioencefalico' as StudyTheme,
    conteudo:[
      'PPC alvo: 60–70 mmHg (PPC = PAM – PIC).',
      'PIC > 22 mmHg: iniciar tratamento — osmoterapia (manitol 1 g/kg) ou salina hipertônica.',
      'Hiperventilação profilática (PCO₂ < 35): apenas como medida de resgate.',
      'Hematoma epidural > 30 cm³ ou espessura > 15 mm: evacuação cirúrgica.',
      'Hipotensão (PAS < 90) + hipóxia (SpO₂ < 90%): combinação mais letal no TCE.',
      'TC crânio em todos com GCS < 15 após trauma.',
    ]},
  { id:'d5', title:'Trauma Torácico — Lesões Imediatas', fonte:'ATLS', resumo:'Pneumotórax aberto, hemotórax maciço, tamponamento, lesões da aorta.', tema:'atls_toracico' as StudyTheme,
    conteudo:[
      'Pneumotórax hipertensivo: desvio de traqueia, ausência de murmúrio, hipotensão — descomprimir imediatamente.',
      'Curativo de três pontas: pneumotórax aberto — não ocluir completamente.',
      'Hemotórax maciço (> 1500 mL ou > 200 mL/h por 4h): toracotomia.',
      'Tamponamento cardíaco (Tríade de Beck): hipotensão + abafamento + distensão jugular.',
      'Contusão miocárdica: arritmias no ECG pós-trauma torácico anterior.',
      'Rotura de aorta: widening mediastinal > 8 cm, fratura de 1ª/2ª costela.',
    ]},
  { id:'d6', title:'Choque Hemorrágico — Classificação ATLS', fonte:'ATLS 10ª Ed.', resumo:'Classes I–IV, reposição volêmica e hemostasia cirúrgica.', tema:'atls_choque' as StudyTheme,
    conteudo:[
      'Classe I (< 15%, < 750 mL): compensado, FC normal, reposição cristaloide.',
      'Classe II (15–30%, 750–1500 mL): taquicardia, ansiedade, cristaloide + avaliar hemoderivados.',
      'Classe III (30–40%, 1500–2000 mL): hipotensão, confusão, hemoderivados 1:1:1.',
      'Classe IV (> 40%, > 2000 mL): risco de vida, cirurgia hemostática imediata.',
      'Hipotensão permissiva: PAS 80–90 em trauma contuso antes da hemostasia definitiva.',
      'Não aguardar EB/BD para iniciar transfusão — decisão clínica baseada na cena.',
    ]},
]

const TEMA_ICONS: Record<string,string> = {
  avaliacao_cena:'🩺', cinetica_trauma:'💥', atls_inicial:'⚕️',
  atls_via_aerea:'🫁', atls_face:'😶', atls_pescoco:'🔴',
  atls_toracico:'🫀', atls_choque:'🩸', atls_abdominal:'🟥',
  atls_genitourinario:'🔵', atls_cranioencefalico:'🧠', atls_coluna:'🦴',
}

export function DiretrizesPage() {
  const navigate = useNavigate()
  const [filtroTema, setFiltroTema] = useState<string>('')

  const filtradas = filtroTema
    ? MOCK_DIR.filter(d => d.tema === filtroTema)
    : MOCK_DIR

  return (
    <section style={{padding:'4rem 2rem',background:'var(--bg)'}}>
      <div style={{maxWidth:1200,margin:'0 auto'}}>
        <div className="accent-bar"/>
        <h2 style={{fontFamily:'var(--font-d)',fontSize:'2rem',color:'var(--text)',marginBottom:'.4rem'}}>Resumo de Diretrizes</h2>
        <p style={{color:'var(--text-muted)',fontSize:'.88rem',marginBottom:'2rem'}}>
          Pontos-chave para consulta rápida — ATLS · TCCC · BTF · Medicina Operacional
        </p>

        {/* Filtro de tema */}
        <div style={{marginBottom:'2.5rem',display:'flex',gap:'.5rem',flexWrap:'wrap'}}>
          <button className={`tema-btn ${filtroTema===''?'active':''}`} style={{width:'auto',padding:'.45rem .9rem'}} onClick={()=>setFiltroTema('')}>
            Todos
          </button>
          {(Object.entries(THEMES) as [StudyTheme,string][]).filter(([k])=>MOCK_DIR.some(d=>d.tema===k)).map(([k,v])=>(
            <button key={k} className={`tema-btn ${filtroTema===k?'active':''}`} style={{width:'auto',padding:'.45rem .9rem'}} onClick={()=>setFiltroTema(k)}>
              {TEMA_ICONS[k]??'📋'} {v}
            </button>
          ))}
        </div>

        <div style={{display:'grid',gap:'1.5rem'}}>
          {filtradas.map(g=>(
            <div key={g.id} className="diretriz-card" style={{cursor:'pointer'}} onClick={()=>navigate(`/diretrizes/${g.id}`)}>
              <div style={{display:'flex',alignItems:'center',gap:'1rem',marginBottom:'1.25rem',paddingBottom:'.75rem',borderTop:'none',borderBottom:'1px solid var(--border)'}}>
                <span style={{fontFamily:'var(--font-d)',fontSize:'1.3rem',fontWeight:700,color:'var(--text)'}}>
                  {TEMA_ICONS[g.tema]??'📋'} {g.title}
                </span>
                <span className="tag-pill" style={{marginLeft:'auto',whiteSpace:'nowrap'}}>{g.fonte}</span>
              </div>
              <p style={{color:'var(--text-muted)',fontSize:'.84rem',marginBottom:'1rem',lineHeight:1.55}}>{g.resumo}</p>
              {g.conteudo.map((p,i)=>(
                <div key={i} className="diretriz-ponto">{p}</div>
              ))}
              <div style={{marginTop:'1rem',paddingTop:'.75rem',borderTop:'1px solid var(--border)',display:'flex',justifyContent:'flex-end'}}>
                <span style={{fontSize:'.78rem',color:'var(--red-bright)',fontWeight:600}}>Ver detalhes →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
