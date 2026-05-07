import { useState } from 'react'
import { useAuthContext } from '@/contexts/AuthContext'
import { THEMES, StudyTheme, Difficulty } from '@/services/supabaseClient'
import { MOCK_QUESTIONS, MOCK_FLASHCARDS } from '@/data/mockData'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

type Aba = 'membros' | 'questoes' | 'flashcards' | 'casos' | 'exportar'

const MEMBROS_MOCK = [
  { id:'m1', nome:'Ana Souza',    email:'ana@med.br',   role:'admin',  ativo:true,  score:3420, streak:21 },
  { id:'m2', nome:'João Lima',    email:'joao@med.br',  role:'member', ativo:true,  score:2980, streak:15 },
  { id:'m3', nome:'Maria Costa',  email:'maria@med.br', role:'member', ativo:true,  score:1640, streak:4  },
  { id:'m4', nome:'Pedro Alves',  email:'pedro@med.br', role:'member', ativo:false, score:890,  streak:0  },
]

export function AdminPage() {
  const { profile } = useAuthContext()
  const [aba, setAba] = useState<Aba>('membros')

  const abas: { id: Aba; label: string }[] = [
    { id:'membros',    label:'👥 Membros'    },
    { id:'questoes',   label:'📋 Questões'   },
    { id:'flashcards', label:'🃏 Flashcards'  },
    { id:'casos',      label:'🏥 Casos'       },
    { id:'exportar',   label:'📊 Exportar'    },
  ]

  return (
    <section style={{ padding: '3rem 2rem', background: '#0D0D0D' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ width: 44, height: 44, background: '#b23b3b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>⚙️</div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-d)', fontSize: '1.7rem', color: 'white', lineHeight: 1 }}>Painel do Admin</h2>
            <p style={{ fontSize: '.75rem', color: 'var(--text-dim)' }}>{profile?.display_name} · role: admin</p>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, overflowX: 'auto', paddingBottom: 1, borderBottom: '1px solid var(--border)', marginBottom: '2rem' }}>
          {abas.map(a => (
            <button key={a.id} onClick={() => setAba(a.id)}
              style={{ padding: '.6rem 1.1rem', border: 'none', background: aba === a.id ? 'var(--red)' : 'transparent', color: aba === a.id ? 'white' : 'var(--text-muted)', fontFamily: 'var(--font-s)', fontSize: '.82rem', fontWeight: 600, cursor: 'pointer', transition: 'all .15s', whiteSpace: 'nowrap' }}>
              {a.label}
            </button>
          ))}
        </div>

        {aba === 'membros'    && <AbaMembros />}
        {aba === 'questoes'   && <AbaQuestoes />}
        {aba === 'flashcards' && <AbaFlashcards />}
        {aba === 'casos'      && <AbaCasos />}
        {aba === 'exportar'   && <AbaExportar />}
      </div>
    </section>
  )
}

/* ── ABA MEMBROS ─────────────────────────────────────── */
function AbaMembros() {
  const [membros, setMembros] = useState(MEMBROS_MOCK)
  const toggleRole   = (id: string) => setMembros(prev => prev.map(m => m.id === id ? { ...m, role: m.role === 'admin' ? 'member' : 'admin' } : m))
  const toggleAtivo  = (id: string) => setMembros(prev => prev.map(m => m.id === id ? { ...m, ativo: !m.ativo } : m))

  const Th = ({ children }: { children: string }) => (
    <th style={{ textAlign: 'left', padding: '.7rem 1rem', fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--text-dim)', fontWeight: 700, borderBottom: '1px solid var(--border)', background: '#080808' }}>{children}</th>
  )

  return (
    <div>
      <p style={{ fontSize: '.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{membros.length} membros cadastrados</p>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
          <thead>
            <tr><Th>Nome</Th><Th>E-mail</Th><Th>Papel</Th><Th>Status</Th><Th>Score</Th><Th>Streak</Th><Th>Ações</Th></tr>
          </thead>
          <tbody>
            {membros.map((m, i) => (
              <tr key={m.id} style={{ borderBottom: '1px solid rgba(192,57,43,.1)', background: i % 2 === 0 ? 'transparent' : 'rgba(192,57,43,.02)' }}>
                <td style={{ padding: '.8rem 1rem', fontWeight: 600, color: 'var(--text)', fontSize: '.88rem' }}>{m.nome}</td>
                <td style={{ padding: '.8rem 1rem', color: 'var(--text-muted)', fontSize: '.82rem' }}>{m.email}</td>
                <td style={{ padding: '.8rem 1rem' }}>
                  <span style={{ fontSize: '.7rem', padding: '2px 8px', background: m.role === 'admin' ? 'rgba(178,59,59,.2)' : 'rgba(192,57,43,.1)', color: m.role === 'admin' ? '#f87171' : 'var(--text-muted)', border: `1px solid ${m.role === 'admin' ? '#b23b3b' : 'var(--border)'}` }}>
                    {m.role}
                  </span>
                </td>
                <td style={{ padding: '.8rem 1rem' }}>
                  <span style={{ fontSize: '.7rem', padding: '2px 8px', background: m.ativo ? 'rgba(47,122,63,.15)' : 'rgba(178,59,59,.12)', color: m.ativo ? '#4ade80' : '#f87171', border: `1px solid ${m.ativo ? '#2f7a3f' : '#b23b3b'}` }}>
                    {m.ativo ? 'ativo' : 'inativo'}
                  </span>
                </td>
                <td style={{ padding: '.8rem 1rem', fontFamily: 'var(--font-d)', color: '#E53935', fontWeight: 700 }}>{m.score.toLocaleString()}</td>
                <td style={{ padding: '.8rem 1rem', color: 'var(--text-muted)', fontSize: '.85rem' }}>🔥 {m.streak}</td>
                <td style={{ padding: '.8rem 1rem' }}>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <button onClick={() => toggleRole(m.id)} className="btn-ghost" style={{ fontSize: '.72rem', padding: '.3rem .6rem' }}>
                      {m.role === 'admin' ? '↓ membro' : '↑ admin'}
                    </button>
                    <button onClick={() => toggleAtivo(m.id)} className="btn-ghost" style={{ fontSize: '.72rem', padding: '.3rem .6rem', color: m.ativo ? '#f87171' : '#4ade80' }}>
                      {m.ativo ? 'desativar' : 'reativar'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ── ABA QUESTÕES ────────────────────────────────────── */
function AbaQuestoes() {
  const [qs, setQs]           = useState(MOCK_QUESTIONS)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId]     = useState<string | null>(null)
  const [form, setForm]         = useState({ statement:'', explanation:'', theme:'atls_inicial' as StudyTheme, difficulty:'medio' as Difficulty, correct_key:'A', a:'', b:'', c:'', d:'', e:'' })

  const reset = () => { setForm({ statement:'', explanation:'', theme:'atls_inicial', difficulty:'medio', correct_key:'A', a:'', b:'', c:'', d:'', e:'' }); setEditId(null); setShowForm(false) }

  const editar = (id: string) => {
    const q = qs.find(q => q.id === id); if (!q) return
    setForm({ statement:q.statement, explanation:q.explanation, theme:q.theme, difficulty:q.difficulty, correct_key:q.correct_key,
      a:q.alternatives[0]?.text??'', b:q.alternatives[1]?.text??'', c:q.alternatives[2]?.text??'', d:q.alternatives[3]?.text??'', e:q.alternatives[4]?.text??'' })
    setEditId(id); setShowForm(true)
  }

  const salvar = () => {
    const alts = [{ key:'A',text:form.a },{ key:'B',text:form.b },{ key:'C',text:form.c },{ key:'D',text:form.d },{ key:'E',text:form.e }].filter(a => a.text.trim())
    if (!form.statement.trim() || alts.length < 2) { alert('Preencha enunciado e mínimo 2 alternativas.'); return }
    if (editId) setQs(prev => prev.map(q => q.id === editId ? { ...q, statement:form.statement, alternatives:alts, correct_key:form.correct_key, explanation:form.explanation, theme:form.theme, difficulty:form.difficulty } : q))
    else setQs(prev => [{ id:'q'+Date.now(), statement:form.statement, alternatives:alts, correct_key:form.correct_key, explanation:form.explanation, theme:form.theme, difficulty:form.difficulty, created_at:new Date().toISOString() }, ...prev])
    reset()
  }

  const Input = ({ label, field, type='text', rows=0 }: { label:string; field:keyof typeof form; type?:string; rows?:number }) => (
    <div style={{ marginBottom: '.9rem' }}>
      <div style={{ fontSize: '.68rem', textTransform: 'uppercase', letterSpacing: '.1em', color:'var(--text-muted)', fontWeight:700, marginBottom:'.35rem' }}>{label}</div>
      {rows > 0
        ? <textarea rows={rows} value={form[field] as string} onChange={e => setForm(f => ({...f,[field]:e.target.value}))}
            style={{ width:'100%', padding:'.65rem .85rem', border:'1px solid var(--border)', background:'var(--bg-surface)', color:'var(--text)', fontFamily:'var(--font-s)', fontSize:'.88rem', outline:'none', resize:'vertical' }} />
        : <input type={type} value={form[field] as string} onChange={e => setForm(f => ({...f,[field]:e.target.value}))}
            style={{ width:'100%', padding:'.65rem .85rem', border:'1px solid var(--border)', background:'var(--bg-surface)', color:'var(--text)', fontFamily:'var(--font-s)', fontSize:'.88rem', outline:'none' }} />
      }
    </div>
  )

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.25rem' }}>
        <p style={{ fontSize:'.85rem', color:'var(--text-muted)' }}>{qs.length} questões</p>
        <button className="btn-red" style={{ fontSize:'.8rem', padding:'.5rem 1rem' }} onClick={() => { reset(); setShowForm(true) }}>+ Nova questão</button>
      </div>

      {showForm && (
        <div className="card-dark" style={{ padding:'2rem', marginBottom:'1.5rem' }}>
          <div style={{ fontFamily:'var(--font-d)', fontSize:'1.1rem', color:'#E53935', marginBottom:'1.5rem' }}>{editId ? 'Editar' : 'Nova'} questão</div>
          <Input label="Enunciado" field="statement" rows={3} />
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
            <div style={{ marginBottom:'.9rem' }}>
              <div style={{ fontSize:'.68rem', textTransform:'uppercase', letterSpacing:'.1em', color:'var(--text-muted)', fontWeight:700, marginBottom:'.35rem' }}>Tema</div>
              <select value={form.theme} onChange={e => setForm(f=>({...f,theme:e.target.value as StudyTheme}))} style={{ width:'100%', padding:'.65rem .85rem', border:'1px solid var(--border)', background:'var(--bg-surface)', color:'var(--text)', fontFamily:'var(--font-s)', fontSize:'.85rem', outline:'none' }}>
                {(Object.entries(THEMES) as [StudyTheme,string][]).map(([k,v])=><option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            <div style={{ marginBottom:'.9rem' }}>
              <div style={{ fontSize:'.68rem', textTransform:'uppercase', letterSpacing:'.1em', color:'var(--text-muted)', fontWeight:700, marginBottom:'.35rem' }}>Dificuldade</div>
              <select value={form.difficulty} onChange={e => setForm(f=>({...f,difficulty:e.target.value as Difficulty}))} style={{ width:'100%', padding:'.65rem .85rem', border:'1px solid var(--border)', background:'var(--bg-surface)', color:'var(--text)', fontFamily:'var(--font-s)', fontSize:'.85rem', outline:'none' }}>
                <option value="facil">Fácil</option><option value="medio">Médio</option><option value="dificil">Difícil</option>
              </select>
            </div>
          </div>
          <div style={{ marginBottom:'.9rem' }}>
            <div style={{ fontSize:'.68rem', textTransform:'uppercase', letterSpacing:'.1em', color:'var(--text-muted)', fontWeight:700, marginBottom:'.6rem' }}>Alternativas <span style={{ color:'var(--text-dim)' }}>(clique na letra para marcar como correta)</span></div>
            {(['A','B','C','D','E'] as const).map(k => (
              <div key={k} style={{ display:'flex', alignItems:'center', gap:'.5rem', marginBottom:'.4rem' }}>
                <button onClick={() => setForm(f=>({...f,correct_key:k}))}
                  style={{ width:28, height:28, borderRadius:'50%', border:'1px solid', borderColor: form.correct_key===k ? 'var(--red)' : 'var(--border)', background: form.correct_key===k ? 'var(--red)' : 'transparent', color: form.correct_key===k ? 'white' : '#E53935', fontSize:'.75rem', fontWeight:700, cursor:'pointer', flexShrink:0 }}>{k}</button>
                <input value={form[(''+k.toLowerCase()) as keyof typeof form] as string} onChange={e => setForm(f=>({...f,[k.toLowerCase()]:e.target.value}))}
                  placeholder={`Alternativa ${k}${k<='B'?' (obrigatória)':''}`}
                  style={{ flex:1, padding:'.55rem .8rem', border:'1px solid var(--border)', background:'var(--bg-surface)', color:'var(--text)', fontFamily:'var(--font-s)', fontSize:'.85rem', outline:'none' }} />
              </div>
            ))}
          </div>
          <Input label="Explicação / Gabarito comentado" field="explanation" rows={3} />
          <div style={{ display:'flex', gap:'.75rem', marginTop:'.5rem' }}>
            <button onClick={salvar} className="btn-red" style={{ fontSize:'.85rem' }}>Salvar</button>
            <button onClick={reset} className="btn-ghost" style={{ fontSize:'.85rem' }}>Cancelar</button>
          </div>
        </div>
      )}

      <div style={{ display:'flex', flexDirection:'column', gap:'.6rem' }}>
        {qs.map(q => (
          <div key={q.id} className="card-dark" style={{ padding:'1rem 1.25rem', display:'flex', alignItems:'flex-start', gap:'1rem' }}>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ display:'flex', gap:6, marginBottom:'.35rem', flexWrap:'wrap' }}>
                <span className="tag-pill" style={{ fontSize:'.65rem' }}>{THEMES[q.theme]}</span>
                <span className="tag-pill" style={{ fontSize:'.65rem' }}>{q.difficulty}</span>
              </div>
              <p style={{ fontSize:'.84rem', color:'var(--text)', lineHeight:1.5, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{q.statement}</p>
              <p style={{ fontSize:'.72rem', color:'var(--text-dim)', marginTop:'.2rem' }}>Correta: {q.correct_key}</p>
            </div>
            <div style={{ display:'flex', gap:4, flexShrink:0 }}>
              <button onClick={() => editar(q.id)} className="btn-ghost" style={{ fontSize:'.72rem', padding:'.3rem .6rem' }}>editar</button>
              <button onClick={() => setQs(prev => prev.filter(x => x.id !== q.id))} style={{ background:'none', border:'none', color:'#f87171', fontSize:'.75rem', cursor:'pointer', padding:'.3rem .5rem' }}>✕</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── ABA FLASHCARDS ──────────────────────────────────── */
function AbaFlashcards() {
  const [cards, setCards]   = useState(MOCK_FLASHCARDS)
  const [show, setShow]     = useState(false)
  const [editId, setEditId] = useState<string|null>(null)
  const [form, setForm]     = useState({ front:'', back:'', theme:'atls_inicial' as StudyTheme })

  const reset = () => { setForm({ front:'', back:'', theme:'atls_inicial' }); setEditId(null); setShow(false) }

  const editar = (id: string) => {
    const c = cards.find(c=>c.id===id); if (!c) return
    setForm({ front:c.front, back:c.back, theme:c.theme }); setEditId(id); setShow(true)
  }

  const salvar = () => {
    if (!form.front.trim() || !form.back.trim()) { alert('Preencha frente e verso.'); return }
    if (editId) setCards(prev => prev.map(c => c.id===editId ? {...c,...form} : c))
    else setCards(prev => [{ id:'f'+Date.now(), ...form, created_at:new Date().toISOString() }, ...prev])
    reset()
  }

  const TA = ({ label, val, set, rows=2 }: { label:string; val:string; set:(v:string)=>void; rows?:number }) => (
    <div style={{ marginBottom:'.9rem' }}>
      <div style={{ fontSize:'.68rem', textTransform:'uppercase', letterSpacing:'.1em', color:'var(--text-muted)', fontWeight:700, marginBottom:'.35rem' }}>{label}</div>
      <textarea rows={rows} value={val} onChange={e => set(e.target.value)}
        style={{ width:'100%', padding:'.65rem .85rem', border:'1px solid var(--border)', background:'var(--bg-surface)', color:'var(--text)', fontFamily:'var(--font-s)', fontSize:'.88rem', outline:'none', resize:'vertical' }} />
    </div>
  )

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.25rem' }}>
        <p style={{ fontSize:'.85rem', color:'var(--text-muted)' }}>{cards.length} flashcards</p>
        <button className="btn-red" style={{ fontSize:'.8rem', padding:'.5rem 1rem' }} onClick={() => { reset(); setShow(true) }}>+ Novo flashcard</button>
      </div>

      {show && (
        <div className="card-dark" style={{ padding:'2rem', marginBottom:'1.5rem' }}>
          <div style={{ fontFamily:'var(--font-d)', fontSize:'1.1rem', color:'#E53935', marginBottom:'1.25rem' }}>{editId ? 'Editar' : 'Novo'} flashcard</div>
          <div style={{ marginBottom:'.9rem' }}>
            <div style={{ fontSize:'.68rem', textTransform:'uppercase', letterSpacing:'.1em', color:'var(--text-muted)', fontWeight:700, marginBottom:'.35rem' }}>Tema</div>
            <select value={form.theme} onChange={e => setForm(f=>({...f,theme:e.target.value as StudyTheme}))} style={{ width:'100%', padding:'.65rem .85rem', border:'1px solid var(--border)', background:'var(--bg-surface)', color:'var(--text)', fontFamily:'var(--font-s)', fontSize:'.85rem', outline:'none' }}>
              {(Object.entries(THEMES) as [StudyTheme,string][]).map(([k,v])=><option key={k} value={k}>{v}</option>)}
            </select>
          </div>
          <TA label="Frente (pergunta)" val={form.front} set={v => setForm(f=>({...f,front:v}))} />
          <TA label="Verso (resposta)" val={form.back} set={v => setForm(f=>({...f,back:v}))} rows={3} />
          <div style={{ display:'flex', gap:'.75rem' }}>
            <button onClick={salvar} className="btn-red" style={{ fontSize:'.85rem' }}>Salvar</button>
            <button onClick={reset} className="btn-ghost" style={{ fontSize:'.85rem' }}>Cancelar</button>
          </div>
        </div>
      )}

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:'.75rem' }}>
        {cards.map(c => (
          <div key={c.id} className="card-dark" style={{ padding:'1.1rem' }}>
            <span className="tag-pill" style={{ fontSize:'.65rem', marginBottom:'.6rem', display:'inline-block' }}>{THEMES[c.theme]}</span>
            <p style={{ fontSize:'.84rem', fontWeight:600, color:'var(--text)', marginBottom:'.3rem', lineHeight:1.4 }}>{c.front}</p>
            <p style={{ fontSize:'.78rem', color:'var(--text-muted)', lineHeight:1.5, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{c.back}</p>
            <div style={{ display:'flex', gap:4, marginTop:'.75rem' }}>
              <button onClick={() => editar(c.id)} className="btn-ghost" style={{ fontSize:'.72rem', padding:'.3rem .6rem' }}>editar</button>
              <button onClick={() => setCards(prev=>prev.filter(x=>x.id!==c.id))} style={{ background:'none', border:'none', color:'#f87171', fontSize:'.75rem', cursor:'pointer', padding:'.3rem .5rem' }}>✕</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── ABA CASOS ───────────────────────────────────────── */
function AbaCasos() {
  return (
    <div className="card-dark" style={{ padding:'2.5rem', textAlign:'center' }}>
      <div style={{ fontSize:'2.5rem', marginBottom:'1rem' }}>🏥</div>
      <div style={{ fontFamily:'var(--font-d)', fontSize:'1.2rem', color:'#E53935', marginBottom:'.5rem' }}>Editor de Casos Clínicos</div>
      <p style={{ color:'var(--text-muted)', fontSize:'.88rem', maxWidth:480, margin:'0 auto 1.5rem' }}>
        Crie e edite casos clínicos com árvore de decisão. Os dados são salvos no campo <code style={{ background:'rgba(192,57,43,.15)', padding:'1px 5px', color:'#E53935' }}>steps</code> (JSONB) no Supabase.
      </p>
      <button className="btn-red" style={{ fontSize:'.85rem' }}>+ Novo caso clínico</button>
      <p style={{ fontSize:'.72rem', color:'var(--text-dim)', marginTop:'1rem' }}>Editor drag-and-drop em desenvolvimento.</p>
    </div>
  )
}

/* ── ABA EXPORTAR ────────────────────────────────────── */
function AbaExportar() {
  const [selMembro, setSelMembro] = useState(MEMBROS_MOCK[0].id)
  const [gerando,   setGerando]   = useState(false)

  const gerarPDF = () => {
    setGerando(true)
    const m = MEMBROS_MOCK.find(m => m.id === selMembro)!
    const doc = new jsPDF()

    // Header escuro
    doc.setFillColor(13, 13, 13)
    doc.rect(0, 0, 210, 40, 'F')
    doc.setFillColor(192, 57, 43)
    doc.rect(0, 38, 210, 2, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(20)
    doc.text('LAMMI', 14, 18)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(192, 57, 43)
    doc.text('Liga Acadêmica de Medicina Militar de Irecê', 14, 26)
    doc.setTextColor(160, 160, 160)
    doc.text('Relatório de Desempenho · ' + new Date().toLocaleDateString('pt-BR'), 14, 33)

    // Dados do membro
    doc.setTextColor(30, 30, 30)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(14)
    doc.text(m.nome, 14, 55)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(100, 100, 100)
    doc.text(m.email + ' · ' + m.role, 14, 62)

    // Cards de stats
    const stats = [
      { l:'Pontuação', v: m.score.toLocaleString() + ' pts' },
      { l:'Streak',    v: m.streak + ' dias' },
      { l:'Questões',  v: '75 respondidas' },
      { l:'Acerto',    v: '72%' },
    ]
    stats.forEach((s, i) => {
      const x = 14 + (i % 2) * 93
      const y = 72 + Math.floor(i / 2) * 22
      doc.setFillColor(245, 245, 245)
      doc.roundedRect(x, y, 85, 16, 2, 2, 'F')
      doc.setFillColor(192, 57, 43)
      doc.rect(x, y, 3, 16, 'F')
      doc.setTextColor(192, 57, 43)
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(12)
      doc.text(s.v, x + 8, y + 7)
      doc.setTextColor(120, 120, 120)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8)
      doc.text(s.l, x + 8, y + 12)
    })

    // Tabela por tema
    doc.setTextColor(30, 30, 30)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
    doc.text('Desempenho por Tema', 14, 125)

    autoTable(doc, {
      startY: 130,
      head: [['Tema', 'Questões', 'Corretas', 'Taxa']],
      body: [
        ['ATLS Inicial',     '24','18','75%'],
        ['Choque',           '15','10','67%'],
        ['Trauma Torácico',  '12','7', '58%'],
        ['Via Aérea',        '10','8', '80%'],
        ['Cinética',         '8', '6', '75%'],
      ],
      styles: { fontSize: 9, cellPadding: 3, textColor: [30,30,30] },
      headStyles: { fillColor: [13,13,13], textColor: [192,57,43], fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [250,248,248] },
    })

    // Rodapé
    const finalY = (doc as any).lastAutoTable.finalY + 12
    doc.setFontSize(8)
    doc.setTextColor(160,160,160)
    doc.text('Gerado automaticamente pela plataforma LAMMI · Liga Acadêmica de Medicina Militar de Irecê', 14, Math.min(finalY, 278))

    doc.save(`lammi_relatorio_${m.nome.replace(/\s+/g,'_').toLowerCase()}.pdf`)
    setGerando(false)
  }

  const gerarCSV = () => {
    const rows = [
      ['Nome','Email','Role','Score','Streak'],
      ...MEMBROS_MOCK.map(m => [m.nome,m.email,m.role,m.score,m.streak])
    ]
    const csv  = rows.map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type:'text/csv' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href = url; a.download = 'lammi_membros.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem', maxWidth:860 }}>
      <div className="card-dark" style={{ padding:'2rem' }}>
        <div style={{ fontFamily:'var(--font-d)', fontSize:'1.1rem', color:'#E53935', marginBottom:'1.25rem', fontWeight:600 }}>Relatório PDF de Membro</div>
        <p style={{ fontSize:'.84rem', color:'var(--text-muted)', lineHeight:1.65, marginBottom:'1.25rem' }}>
          Gera um PDF com estatísticas completas: acertos, streak, desempenho por tema e heatmap.
        </p>
        <div style={{ marginBottom:'1rem' }}>
          <div style={{ fontSize:'.68rem', textTransform:'uppercase', letterSpacing:'.1em', color:'var(--text-muted)', fontWeight:700, marginBottom:'.4rem' }}>Membro</div>
          <select value={selMembro} onChange={e => setSelMembro(e.target.value)} style={{ width:'100%', padding:'.65rem .85rem', border:'1px solid var(--border)', background:'var(--bg-surface)', color:'var(--text)', fontFamily:'var(--font-s)', fontSize:'.85rem', outline:'none' }}>
            {MEMBROS_MOCK.map(m => <option key={m.id} value={m.id}>{m.nome}</option>)}
          </select>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:'.35rem', fontSize:'.8rem', color:'var(--text-muted)', marginBottom:'1.25rem' }}>
          {['Pontuação total e streak','Taxa de acerto por tema','Histórico de simulados','Heatmap de atividade'].map(i => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:'.5rem' }}><span style={{ color:'#4ade80' }}>✓</span> {i}</div>
          ))}
        </div>
        <button onClick={gerarPDF} disabled={gerando} className="btn-red" style={{ width:'100%' }}>
          {gerando ? 'Gerando...' : '📥 Exportar PDF'}
        </button>
      </div>

      <div className="card-dark" style={{ padding:'2rem' }}>
        <div style={{ fontFamily:'var(--font-d)', fontSize:'1.1rem', color:'#E53935', marginBottom:'1.25rem', fontWeight:600 }}>Exportar CSV de Membros</div>
        <p style={{ fontSize:'.84rem', color:'var(--text-muted)', lineHeight:1.65, marginBottom:'1.5rem' }}>
          Gera planilha CSV com todos os membros para análise em Excel ou Google Sheets.
        </p>
        <div style={{ display:'flex', flexDirection:'column', gap:'.35rem', fontSize:'.8rem', color:'var(--text-muted)', marginBottom:'1.5rem' }}>
          {['Nome e e-mail','Papel (admin/member)','Score e streak'].map(i => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:'.5rem' }}><span style={{ color:'#4ade80' }}>✓</span> {i}</div>
          ))}
        </div>
        <button onClick={gerarCSV} className="btn-outline-red" style={{ width:'100%' }}>
          📊 Exportar CSV
        </button>
      </div>
    </div>
  )
}
