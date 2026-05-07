import { useState } from 'react'
import { THEMES, StudyTheme } from '@/services/supabaseClient'

const MOCK_AULAS = [
  { id:'a1', title:'Introdução ao ATLS – Atendimento Inicial', desc:'Visão geral do protocolo ABCDE, avaliação primária e secundária, manobras essenciais.', theme:'atls_inicial' as StudyTheme, type:'video', dur:'42min', autor:'Prof. Dr. Carlos Mendes',
    conteudo:`## Protocolo ABCDE\n\n**A – Via Aérea + Colar Cervical**\nGarantir perviedade com proteção da coluna cervical. Jaw thrust em suspeita de lesão cervical.\n\n**B – Respiração e Ventilação**\nAvaliar FR, expansão torácica, SpO2. Tratar pneumotórax e hemotórax imediatamente.\n\n**C – Circulação**\nControlar hemorragias. Acesso venoso calibroso. Reposição criteriosa.\n\n**D – Neurológico**\nGlasgow, pupilas, déficits focais.\n\n**E – Exposição**\nExpor completamente. Controlar hipotermia.` },
  { id:'a2', title:'Via Aérea no Trauma – Do Básico à IOT', desc:'Manejo da VA no traumatizado: jaw thrust, cânulas, máscara laríngea e SRI.', theme:'atls_via_aerea' as StudyTheme, type:'video', dur:'38min', autor:'Prof. Dr. Ana Souza', conteudo:'Conteúdo em breve.' },
  { id:'a3', title:'Classificação e Manejo do Choque Hemorrágico', desc:'4 classes de choque, hipotensão permissiva, DCR e acesso venoso no campo.', theme:'atls_choque' as StudyTheme, type:'pdf', autor:'LAMMI', conteudo:'Conteúdo em breve.' },
  { id:'a4', title:'Trauma Torácico: Pneumotórax e Hemotórax', desc:'Diagnóstico e tratamento de pneumotórax simples, aberto e hipertensivo.', theme:'atls_toracico' as StudyTheme, type:'slide', autor:'Res. João Ferreira', conteudo:'Conteúdo em breve.' },
  { id:'a5', title:'TCE – Avaliação Neurológica e Glasgow', desc:'Escala de Coma de Glasgow, classificação do TCE, neuroproteção e TC craniana.', theme:'atls_cranioencefalico' as StudyTheme, type:'texto', autor:'LAMMI', conteudo:'Conteúdo em breve.' },
  { id:'a6', title:'Cinética do Trauma – Mecanismos de Lesão', desc:'Física do trauma, transferência de energia, colisões de alta e baixa velocidade.', theme:'cinetica_trauma' as StudyTheme, type:'video', dur:'28min', autor:'Prof. Dr. Marcos Lima', conteudo:'Conteúdo em breve.' },
]

const TIPO_ICONS: Record<string,string>  = { video:'🎬', pdf:'📄', slide:'🖥️', texto:'📝' }
const TIPO_CORES: Record<string,string>  = {
  video: 'rgba(178,59,59,.2)',
  pdf:   'rgba(192,57,43,.12)',
  slide: 'rgba(31,56,245,.15)',
  texto: 'rgba(47,122,63,.15)',
}

export function AulasPage() {
  const [filtroTema, setFiltroTema] = useState<StudyTheme | ''>('')
  const [filtroTipo, setFiltroTipo] = useState('')
  const [aulaId,     setAulaId]     = useState<string | null>(null)

  const filtradas = MOCK_AULAS.filter(a =>
    (!filtroTema || a.theme === filtroTema) && (!filtroTipo || a.type === filtroTipo)
  )

  const aula = aulaId ? MOCK_AULAS.find(a => a.id === aulaId) : null

  if (aula) return (
    <section style={{ padding: '4rem 2rem', background: '#0D0D0D' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <button className="btn-ghost" style={{ marginBottom: '1.5rem', fontSize: '.8rem' }} onClick={() => setAulaId(null)}>
          ← Aulas
        </button>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: '1rem' }}>
          <span className="tag-pill">{THEMES[aula.theme]}</span>
          <span className="tag-pill">{TIPO_ICONS[aula.type]} {aula.type.toUpperCase()}</span>
          {aula.dur && <span className="tag-pill">⏱ {aula.dur}</span>}
        </div>
        <h1 style={{ fontFamily: 'var(--font-d)', fontSize: '2rem', color: 'white', marginBottom: '.5rem', lineHeight: 1.2 }}>{aula.title}</h1>
        {aula.autor && <p style={{ color: 'var(--text-muted)', fontSize: '.85rem', marginBottom: '2rem' }}>Por {aula.autor}</p>}

        {/* Espaço para vídeo */}
        {aula.type === 'video' && (
          <div style={{ width: '100%', aspectRatio: '16/9', background: '#080808', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '.75rem' }}>🎬</div>
              <p style={{ color: 'var(--text-muted)', fontSize: '.88rem' }}>Vídeo será incorporado aqui (YouTube/Vimeo)</p>
            </div>
          </div>
        )}

        {/* Espaço para PDF */}
        {aula.type === 'pdf' && (
          <div style={{ width: '100%', height: 240, background: '#080808', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '.75rem' }}>📄</div>
              <p style={{ color: 'var(--text-muted)', fontSize: '.88rem', marginBottom: '1rem' }}>PDF será exibido aqui</p>
              <button className="btn-ghost" style={{ fontSize: '.8rem' }}>Baixar PDF</button>
            </div>
          </div>
        )}

        {/* Conteúdo */}
        <div className="card-dark" style={{ padding: '2rem' }}>
          {aula.conteudo.split('\n').map((linha, i) => {
            if (linha.startsWith('## ')) return <h2 key={i} style={{ fontFamily: 'var(--font-d)', fontSize: '1.35rem', color: '#E53935', margin: '1.5rem 0 .75rem', fontWeight: 600 }}>{linha.slice(3)}</h2>
            const partes = linha.split(/(\*\*[^*]+\*\*)/)
            if (linha === '') return <div key={i} style={{ height: '.5rem' }} />
            return (
              <p key={i} style={{ fontSize: '.9rem', color: 'var(--text)', lineHeight: 1.8, marginBottom: '.35rem' }}>
                {partes.map((p, j) => p.startsWith('**') && p.endsWith('**')
                  ? <strong key={j} style={{ color: '#E53935' }}>{p.slice(2,-2)}</strong>
                  : p
                )}
              </p>
            )
          })}
        </div>
      </div>
    </section>
  )

  return (
    <section style={{ padding: '4rem 2rem', background: '#0D0D0D' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <div className="accent-bar" />
        <h2 style={{ fontFamily: 'var(--font-d)', fontSize: '2rem', color: 'white', marginBottom: '.4rem' }}>Aulas</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '.88rem', marginBottom: '2rem' }}>Vídeos, PDFs, slides e textos sobre trauma e APH</p>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
          <select value={filtroTema} onChange={e => setFiltroTema(e.target.value as StudyTheme | '')}
            style={{ flex: 1, minWidth: 180, padding: '.65rem .9rem', border: '1px solid var(--border)', background: 'var(--bg-surface)', color: 'var(--text)', fontFamily: 'var(--font-s)', fontSize: '.88rem', outline: 'none' }}>
            <option value="">Todos os temas</option>
            {(Object.entries(THEMES) as [StudyTheme, string][]).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
          </select>
          <select value={filtroTipo} onChange={e => setFiltroTipo(e.target.value)}
            style={{ minWidth: 140, padding: '.65rem .9rem', border: '1px solid var(--border)', background: 'var(--bg-surface)', color: 'var(--text)', fontFamily: 'var(--font-s)', fontSize: '.88rem', outline: 'none' }}>
            <option value="">Todos os tipos</option>
            {['video','pdf','slide','texto'].map(t => <option key={t} value={t}>{TIPO_ICONS[t]} {t}</option>)}
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(340px,1fr))', gap: '1.25rem' }}>
          {filtradas.map(a => (
            <button key={a.id} className="aula-card" onClick={() => setAulaId(a.id)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  <span className="tag-pill">{THEMES[a.theme]}</span>
                  <span style={{ fontSize: '.7rem', padding: '3px 8px', background: TIPO_CORES[a.type], color: '#E53935', border: '1px solid rgba(192,57,43,.25)' }}>
                    {TIPO_ICONS[a.type]} {a.type.toUpperCase()}
                  </span>
                </div>
                {a.dur && <span style={{ fontSize: '.72rem', color: 'var(--text-dim)' }}>⏱ {a.dur}</span>}
              </div>
              <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.05rem', color: 'white', fontWeight: 600, marginBottom: '.4rem', lineHeight: 1.25 }}>{a.title}</div>
              <p style={{ fontSize: '.83rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '.75rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{a.desc}</p>
              {a.autor && <p style={{ fontSize: '.72rem', color: 'var(--text-dim)' }}>Por {a.autor}</p>}
            </button>
          ))}
        </div>

        {filtradas.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📚</div>
            <p>Nenhuma aula encontrada.</p>
          </div>
        )}
      </div>
    </section>
  )
}
