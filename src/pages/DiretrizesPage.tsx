import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { THEMES, StudyTheme } from '@/services/supabaseClient'

// Exportado para uso em DiretrizDetailPage
export const MOCK_DIR = [
  { id:'d1', title:'ATLS 10ª Edição – Atendimento Inicial', resumo:'Sequência ABCDE, avaliação primária e secundária, damage control, critérios de transferência.', tema:'atls_inicial' as StudyTheme,
    conteudo:[
      'Via aérea e proteção cervical sempre como primeira prioridade absoluta.',
      'Jaw thrust é a manobra de escolha em pacientes com suspeita de lesão cervical.',
      'Glasgow ≤ 8 indica necessidade de via aérea definitiva imediata.',
      'Pneumotórax hipertensivo: descompressão imediata no 2º EIC, linha hemiclavicular.',
      'Hemotórax maciço: drenagem intercostal no 5º EIC, linha axilar anterior.',
      'Hipotensão permissiva: alvo PAM 50 mmHg em trauma penetrante sem TCE.',
      'Reposição 1:1:1 — plasma:plaquetas:concentrado de hemácias no choque hemorrágico grave.',
      'Tríade da morte: acidose + coagulopatia + hipotermia — prevenção ativa.',
    ]},
  { id:'d2', title:'Protocolo TCCC – Tactical Combat Casualty Care', resumo:'MARCH: Massive hemorrhage, Airway, Respiration, Circulation, Hypothermia.', tema:'avaliacao_cena' as StudyTheme,
    conteudo:[
      'Fase 1 — Care Under Fire: retorno ao fogo + torniquete imediato em hemorragia de membro.',
      'Fase 2 — Tactical Field Care: MARCH completo, hemostasia definitiva, acesso IO se necessário.',
      'Fase 3 — TACEVAC: monitorização, reavaliação e comunicação com hospital receptor.',
      'Torniquete: posicionar 5–7 cm acima da lesão, apertar até cessar o sangramento.',
      'Curativo hemostático: comprimir por 3 minutos mínimos após aplicação.',
      'Hipotermia: cobrir o paciente após controle de hemorragia.',
      'Acesso IO: úmero proximal ou tíbia proximal se acesso venoso impossível em 90 segundos.',
    ]},
  { id:'d3', title:'Damage Control Resuscitation (DCR)', resumo:'Hipotensão permissiva, hemostasia cirúrgica precoce, reversão da tríade da morte.', tema:'atls_choque' as StudyTheme,
    conteudo:[
      'DCR = controle de dano + reanimação hemostática + cirurgia de controle de dano.',
      'Meta PAS: 80–90 mmHg em trauma contuso; 50–60 mmHg em penetrante sem TCE.',
      'Ácido tranexâmico: dose máxima efetiva nas primeiras 3 horas do trauma.',
      'Evitar grandes volumes de cristaloides — aumentam coagulopatia dilucional.',
      'Razão 1:1:1 de hemoderivados reduz mortalidade em choque hemorrágico grave.',
      'Cirurgia abreviada: laparotomia de controle, packing e fechamento temporário.',
    ]},
  { id:'d4', title:'TCE Grave – Brain Trauma Foundation', resumo:'Metas de PIC, PAM e PPC. Neuroproteção e indicações de TC.', tema:'atls_cranioencefalico' as StudyTheme,
    conteudo:[
      'TCE grave: Glasgow ≤ 8 — intubação orotraqueal com sequência rápida.',
      'Meta de PPC ≥ 60 mmHg e PIC < 20 mmHg após craniectomia/monitorização.',
      'Evitar hipotensão (PAS < 90 mmHg) e hipoxemia (SpO2 < 95%).',
      'Hiperventilação controlada (PaCO2 35–40 mmHg) — somente como medida temporária.',
      'Manitol 20%: 0,25–1 g/kg em bolus para crises de hipertensão intracraniana.',
      'Solução salina hipertônica (SSH 3%): alternativa ao manitol, especialmente em hipotensão.',
    ]},
  { id:'d5', title:'TRM – Imobilização e Transporte', resumo:'Indicações de colar cervical, RME e cuidados no APH.', tema:'atls_coluna' as StudyTheme,
    conteudo:[
      'Imobilização seletiva: aplicar em trauma de alto mecanismo + sintomas neurológicos.',
      'Colar cervical não deve ser usado em isolamento — associar à prancha ou dispositivo de resgate.',
      'NEXUS criteria: ausência de dor à palpação + sem déficit neurológico = liberação clínica.',
      'Log roll controlado para inspeção posterior — mínimo 4 socorristas treinados.',
      'Sedação e analgesia antes do transporte em suspeita de fratura instável.',
      'Comunicação clara e documentação da neurologia pré-hospitalar para o centro de trauma.',
    ]},
]

export function DiretrizesPage() {
  const navigate = useNavigate()
  const [filtro, setFiltro] = useState<StudyTheme | ''>('')
  const [busca,  setBusca]  = useState('')

  const filtradas = MOCK_DIR.filter(d =>
    (!filtro || d.tema === filtro) &&
    (!busca || d.title.toLowerCase().includes(busca.toLowerCase()) || d.resumo.toLowerCase().includes(busca.toLowerCase()))
  )

  return (
    <section style={{ padding: '4rem 2rem', background: '#0D0D0D' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div className="accent-bar" />
        <h2 style={{ fontFamily: 'var(--font-d)', fontSize: '2rem', color: 'white', marginBottom: '.4rem' }}>Diretrizes</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '.88rem', marginBottom: '2rem' }}>Protocolos ATLS, TCCC, BTF e referências atualizadas</p>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
          <input value={busca} onChange={e => setBusca(e.target.value)} placeholder="Buscar diretriz..."
            style={{ flex: 1, minWidth: 180, padding: '.65rem .9rem', border: '1px solid var(--border)', background: 'var(--bg-surface)', color: 'var(--text)', fontFamily: 'var(--font-s)', fontSize: '.88rem', outline: 'none' }} />
          <select value={filtro} onChange={e => setFiltro(e.target.value as StudyTheme | '')}
            style={{ minWidth: 200, padding: '.65rem .9rem', border: '1px solid var(--border)', background: 'var(--bg-surface)', color: 'var(--text)', fontFamily: 'var(--font-s)', fontSize: '.88rem', outline: 'none' }}>
            <option value="">Todos os temas</option>
            {(Object.entries(THEMES) as [StudyTheme, string][]).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
          {filtradas.map(d => (
            /* MIGRAÇÃO: navigate para /diretrizes/:id em vez de setSel */
            <button key={d.id} onClick={() => navigate(`/diretrizes/${d.id}`)}
              style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '1.25rem 1.5rem', cursor: 'pointer', textAlign: 'left', transition: 'all .2s', width: '100%' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#E53935'; (e.currentTarget as HTMLElement).style.background = 'rgba(192,57,43,.06)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.background = 'var(--bg-card)' }}>
              <div style={{ width: 44, height: 44, background: 'rgba(192,57,43,.1)', border: '1px solid rgba(192,57,43,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>📄</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: '.3rem' }}>
                  <span style={{ fontFamily: 'var(--font-d)', fontSize: '1rem', color: 'white', fontWeight: 600 }}>{d.title}</span>
                  <span className="tag-pill" style={{ fontSize: '.65rem' }}>{THEMES[d.tema]}</span>
                </div>
                <p style={{ fontSize: '.82rem', color: 'var(--text-muted)', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{d.resumo}</p>
                <p style={{ fontSize: '.7rem', color: 'var(--text-dim)', marginTop: '.3rem' }}>{d.conteudo.length} pontos-chave</p>
              </div>
              <span style={{ color: '#E53935', fontSize: '1rem', flexShrink: 0 }}>→</span>
            </button>
          ))}
        </div>

        {filtradas.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📄</div>
            <p>Nenhuma diretriz encontrada.</p>
          </div>
        )}
      </div>
    </section>
  )
}
