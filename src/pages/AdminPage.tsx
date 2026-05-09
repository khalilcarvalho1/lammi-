import { useState } from 'react'
import { useAuthContext } from '@/contexts/AuthContext'
import { THEMES, StudyTheme, Difficulty } from '@/services/supabaseClient'
import { MOCK_QUESTIONS, MOCK_FLASHCARDS } from '@/data/mockData'
import clsx from 'clsx'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

type AdminTab = 'overview' | 'members' | 'questions' | 'flashcards' | 'cases' | 'export'

export function AdminPage() {
  const { profile } = useAuthContext()
  const [tab, setTab] = useState<AdminTab>('overview')

  const tabs: { id: AdminTab; label: string; icon: string }[] = [
    { id: 'overview',  label: 'Visão Geral', icon: '📊' },
    { id: 'members',   label: 'Membros',    icon: '👥' },
    { id: 'questions', label: 'Questões',   icon: '📋' },
    { id: 'flashcards',label: 'Flashcards', icon: '🃏' },
    { id: 'cases',     label: 'Casos',      icon: '🏥' },
    { id: 'export',    label: 'Exportar',   icon: '📊' },
  ]

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white text-lg">⚙️</div>
        <div>
          <h1 className="font-display text-2xl font-bold text-[var(--color-text)]">Painel do Admin</h1>
          <p className="text-xs text-[var(--color-text-muted)]">Logado como {profile?.display_name} · role: admin</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto pb-1 border-b border-[var(--color-border)]">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={clsx('flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-t-lg whitespace-nowrap transition-colors flex-shrink-0', {
              'bg-brand-600 text-white': tab === t.id,
              'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-2)]': tab !== t.id,
            })}
          >
            <span>{t.icon}</span> {t.label}
          </button>
        ))}
      </div>

      {/* Conteúdo da tab */}
      {tab === 'overview'   && <OverviewTab />}
      {tab === 'members'    && <MembersTab />}
      {tab === 'questions'  && <QuestionsTab />}
      {tab === 'flashcards' && <FlashcardsTab />}
      {tab === 'cases'      && <CasesTab />}
      {tab === 'export'     && <ExportTab />}
    </div>
  )
}


// ─── ABA: VISÃO GERAL ─────────────────────────────────────────────────────────

function OverviewTab() {
  const total    = MOCK_MEMBERS.length
  const ativos   = MOCK_MEMBERS.filter(m => m.active).length
  const admins   = MOCK_MEMBERS.filter(m => m.role === 'admin').length
  const scoreAvg = Math.round(MOCK_MEMBERS.reduce((a, m) => a + m.score, 0) / total)
  const streakAvg = Math.round(MOCK_MEMBERS.reduce((a, m) => a + m.study_streak, 0) / total)
  const top5 = [...MOCK_MEMBERS].sort((a, b) => b.score - a.score).slice(0, 5)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem' }}>
        {[
          { lbl: 'Total de Membros',  val: total,    col: 'var(--color-text)'  },
          { lbl: 'Membros Ativos',    val: ativos,   col: '#4ade80'            },
          { lbl: 'Admins',            val: admins,   col: '#E53935'            },
          { lbl: 'Score Médio',       val: scoreAvg.toLocaleString(), col: '#facc15' },
          { lbl: 'Streak Médio',      val: streakAvg + 'd', col: '#fb923c'     },
        ].map(k => (
          <div key={k.lbl} className="card-p" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--color-text-muted)', marginBottom: '.5rem', fontWeight: 700 }}>{k.lbl}</div>
            <div style={{ fontFamily: 'var(--font-d)', fontSize: '2rem', fontWeight: 700, color: k.col, lineHeight: 1 }}>{k.val}</div>
          </div>
        ))}
      </div>

      {/* Top 5 usuários */}
      <div className="card">
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--color-border)', fontWeight: 700, fontSize: '.85rem', color: 'var(--color-text)' }}>
          🏆 Top 5 Usuários
        </div>
        {top5.map((m, i) => (
          <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '.85rem 1.25rem', borderBottom: '1px solid var(--color-border)' }}>
            <div style={{ fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: '1.1rem', color: i === 0 ? '#FBB724' : i === 1 ? '#9CA3AF' : i === 2 ? '#A16207' : 'var(--color-text-muted)', width: 28 }}>
              #{i + 1}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: '.88rem', color: 'var(--color-text)' }}>{m.display_name}</div>
              <div style={{ fontSize: '.72rem', color: 'var(--color-text-muted)' }}>{m.email}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--color-text)' }}>{m.score.toLocaleString()}</div>
              <div style={{ fontSize: '.7rem', color: 'var(--color-text-muted)' }}>🔥 {m.study_streak}d</div>
            </div>
          </div>
        ))}
      </div>

      {/* Distribuição de roles */}
      <div className="card-p">
        <div style={{ fontWeight: 700, fontSize: '.85rem', color: 'var(--color-text)', marginBottom: '1rem' }}>Distribuição</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
          {[
            { lbl: 'Membros ativos',   val: ativos,        total, col: '#4ade80' },
            { lbl: 'Membros inativos', val: total - ativos, total, col: '#f87171' },
            { lbl: 'Admins',           val: admins,        total, col: '#E53935'  },
          ].map(b => (
            <div key={b.lbl}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.8rem', marginBottom: '.25rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>{b.lbl}</span>
                <span style={{ color: b.col, fontWeight: 700 }}>{b.val}/{b.total}</span>
              </div>
              <div style={{ height: 6, background: 'rgba(192,57,43,.1)' }}>
                <div style={{ height: '100%', width: (b.val / b.total * 100) + '%', background: b.col, transition: 'width .5s' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── ABA: MEMBROS ─────────────────────────────────────────────────────────────

const MOCK_MEMBERS = [
  { id: 'm1', display_name: 'Ana Souza',    email: 'ana@med.br',    role: 'admin',  active: true,  score: 3420, study_streak: 21 },
  { id: 'm2', display_name: 'João Lima',    email: 'joao@med.br',   role: 'member', active: true,  score: 2980, study_streak: 15 },
  { id: 'm3', display_name: 'Maria Costa',  email: 'maria@med.br',  role: 'member', active: true,  score: 1640, study_streak: 4  },
  { id: 'm4', display_name: 'Pedro Alves',  email: 'pedro@med.br',  role: 'member', active: false, score: 890,  study_streak: 0  },
]

function MembersTab() {
  const [members, setMembers] = useState(MOCK_MEMBERS)
  const [busca, setBusca]     = useState('')
  const filtrados = busca.trim() ? members.filter(m => m.display_name.toLowerCase().includes(busca.toLowerCase()) || m.email.toLowerCase().includes(busca.toLowerCase())) : members

  const toggleRole = (id: string) => {
    setMembers(prev => prev.map(m => m.id === id
      ? { ...m, role: m.role === 'admin' ? 'member' : 'admin' } : m))
  }
  const toggleActive = (id: string) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, active: !m.active } : m))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <p className="text-sm text-[var(--color-text-muted)]">{members.length} membros cadastrados</p>
          <input
            type="text"
            value={busca}
            onChange={e => setBusca(e.target.value)}
            placeholder="🔍 Buscar por nome ou email..."
            style={{ padding: '.4rem .75rem', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', color: 'var(--color-text)', fontSize: '.82rem', outline: 'none', minWidth: 220 }}
          />
          {busca && <span style={{ fontSize: '.75rem', color: 'var(--color-text-muted)' }}>{filtrados.length} resultado(s)</span>}
        </div>
      </div>
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface-2)]">
                <th className="text-left px-4 py-3 text-[var(--color-text-muted)] font-medium">Nome</th>
                <th className="text-left px-4 py-3 text-[var(--color-text-muted)] font-medium hidden md:table-cell">E-mail</th>
                <th className="text-center px-4 py-3 text-[var(--color-text-muted)] font-medium">Papel</th>
                <th className="text-center px-4 py-3 text-[var(--color-text-muted)] font-medium">Status</th>
                <th className="text-right px-4 py-3 text-[var(--color-text-muted)] font-medium">Score</th>
                <th className="px-4 py-3 text-[var(--color-text-muted)] font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map(m => (
                <tr key={m.id} className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-surface-2)]">
                  <td className="px-4 py-3">
                    <div className="font-medium text-[var(--color-text)]">{m.display_name}</div>
                  </td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)] hidden md:table-cell">{m.email}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={clsx('badge text-xs', m.role === 'admin' ? 'badge-red' : 'badge-gray')}>
                      {m.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={clsx('badge text-xs', m.active ? 'badge-green' : 'badge-red')}>
                      {m.active ? 'ativo' : 'inativo'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-[var(--color-text)]">{m.score.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1 justify-end">
                      <button onClick={() => toggleRole(m.id)}
                        className="text-xs btn-ghost px-2 py-1 text-brand-500">
                        {m.role === 'admin' ? '↓ membro' : '↑ admin'}
                      </button>
                      <button onClick={() => toggleActive(m.id)}
                        className={clsx('text-xs btn-ghost px-2 py-1', m.active ? 'text-red-500' : 'text-green-500')}>
                        {m.active ? 'desativar' : 'reativar'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ─── ABA: QUESTÕES ────────────────────────────────────────────────────────────

function QuestionsTab() {
  const [questions, setQuestions] = useState(MOCK_QUESTIONS)
  const [editing, setEditing]     = useState<string | null>(null)
  const [showForm, setShowForm]   = useState(false)
  const [form, setForm]           = useState({
    statement: '', explanation: '',
    theme: 'atls_inicial' as StudyTheme,
    difficulty: 'medio' as Difficulty,
    correct_key: 'A',
    alt_a: '', alt_b: '', alt_c: '', alt_d: '', alt_e: '',
  })

  const resetForm = () => {
    setForm({ statement:'', explanation:'', theme:'atls_inicial', difficulty:'medio', correct_key:'A', alt_a:'', alt_b:'', alt_c:'', alt_d:'', alt_e:'' })
    setEditing(null)
    setShowForm(false)
  }

  const handleEdit = (id: string) => {
    const q = questions.find(q => q.id === id)
    if (!q) return
    setForm({
      statement: q.statement, explanation: q.explanation,
      theme: q.theme, difficulty: q.difficulty, correct_key: q.correct_key,
      alt_a: q.alternatives[0]?.text ?? '',
      alt_b: q.alternatives[1]?.text ?? '',
      alt_c: q.alternatives[2]?.text ?? '',
      alt_d: q.alternatives[3]?.text ?? '',
      alt_e: q.alternatives[4]?.text ?? '',
    })
    setEditing(id)
    setShowForm(true)
  }

  const handleSave = () => {
    const alternatives = [
      { key:'A', text:form.alt_a }, { key:'B', text:form.alt_b },
      { key:'C', text:form.alt_c }, { key:'D', text:form.alt_d },
      { key:'E', text:form.alt_e },
    ].filter(a => a.text.trim())

    if (!form.statement.trim() || alternatives.length < 2) {
      alert('Preencha o enunciado e pelo menos 2 alternativas.')
      return
    }

    if (editing) {
      setQuestions(prev => prev.map(q =>
        q.id === editing ? { ...q, statement:form.statement, alternatives, correct_key:form.correct_key, explanation:form.explanation, theme:form.theme, difficulty:form.difficulty } : q
      ))
    } else {
      const newQ = {
        id: 'q' + Date.now(), statement:form.statement, alternatives, correct_key:form.correct_key,
        explanation:form.explanation, theme:form.theme, difficulty:form.difficulty, created_at: new Date().toISOString()
      }
      setQuestions(prev => [newQ, ...prev])
    }
    resetForm()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--color-text-muted)]">{questions.length} questões</p>
        <button onClick={() => { resetForm(); setShowForm(true) }} className="btn-primary text-sm">
          + Nova questão
        </button>
      </div>

      {showForm && (
        <div className="card-p space-y-4">
          <h3 className="font-semibold text-[var(--color-text)]">{editing ? 'Editar questão' : 'Nova questão'}</h3>

          <div>
            <label className="label">Enunciado</label>
            <textarea rows={3} className="input resize-none" value={form.statement} onChange={e => setForm(f => ({...f, statement:e.target.value}))} placeholder="Digite o enunciado da questão..." />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Tema</label>
              <select className="input" value={form.theme} onChange={e => setForm(f => ({...f, theme:e.target.value as StudyTheme}))}>
                {(Object.entries(THEMES) as [StudyTheme, string][]).map(([k,v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Dificuldade</label>
              <select className="input" value={form.difficulty} onChange={e => setForm(f => ({...f, difficulty:e.target.value as Difficulty}))}>
                <option value="facil">Fácil</option>
                <option value="medio">Médio</option>
                <option value="dificil">Difícil</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="label">Alternativas</label>
            {(['A','B','C','D','E'] as const).map(k => {
              const key = ('alt_' + k.toLowerCase()) as keyof typeof form
              return (
                <div key={k} className="flex items-center gap-2">
                  <span className={clsx('w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0 cursor-pointer transition-colors', {
                    'bg-green-500 border-green-500 text-white': form.correct_key === k,
                    'border-[var(--color-border)] text-[var(--color-text-muted)]': form.correct_key !== k,
                  })} onClick={() => setForm(f => ({...f, correct_key:k}))} title="Clique para marcar como correta">
                    {k}
                  </span>
                  <input className="input" placeholder={'Alternativa ' + k + (k <= 'B' ? ' (obrigatória)' : '')}
                    value={form[key] as string} onChange={e => setForm(f => ({...f, [key]:e.target.value}))} />
                </div>
              )
            })}
            <p className="text-xs text-[var(--color-text-subtle)]">Clique no círculo da letra para marcar a alternativa correta.</p>
          </div>

          <div>
            <label className="label">Explicação / Gabarito comentado</label>
            <textarea rows={3} className="input resize-none" value={form.explanation} onChange={e => setForm(f => ({...f, explanation:e.target.value}))} placeholder="Explique a resposta correta..." />
          </div>

          <div className="flex gap-2 pt-2">
            <button onClick={handleSave} className="btn-primary">Salvar</button>
            <button onClick={resetForm} className="btn-ghost">Cancelar</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {questions.map(q => (
          <div key={q.id} className="card-p flex items-start gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex gap-2 flex-wrap mb-1">
                <span className={clsx('badge text-xs', { 'badge-green':q.difficulty==='facil','badge-amber':q.difficulty==='medio','badge-red':q.difficulty==='dificil' })}>
                  {q.difficulty}
                </span>
                <span className="badge-blue text-xs">{THEMES[q.theme]}</span>
              </div>
              <p className="text-sm text-[var(--color-text)] line-clamp-2">{q.statement}</p>
              <p className="text-xs text-[var(--color-text-subtle)] mt-1">Correta: {q.correct_key}</p>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <button onClick={() => handleEdit(q.id)} className="btn-ghost text-xs px-2">editar</button>
              <button onClick={() => setQuestions(prev => prev.filter(x => x.id !== q.id))} className="text-xs text-red-500 btn-ghost px-2">excluir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── ABA: FLASHCARDS ─────────────────────────────────────────────────────────

function FlashcardsTab() {
  const [cards, setCards]       = useState(MOCK_FLASHCARDS)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing]   = useState<string | null>(null)
  const [form, setForm]         = useState({ front:'', back:'', theme:'atls_inicial' as StudyTheme })

  const resetForm = () => { setForm({ front:'', back:'', theme:'atls_inicial' }); setEditing(null); setShowForm(false) }

  const handleEdit = (id: string) => {
    const c = cards.find(c => c.id === id)
    if (!c) return
    setForm({ front:c.front, back:c.back, theme:c.theme })
    setEditing(id); setShowForm(true)
  }

  const handleSave = () => {
    if (!form.front.trim() || !form.back.trim()) { alert('Preencha frente e verso.'); return }
    if (editing) {
      setCards(prev => prev.map(c => c.id === editing ? { ...c, front:form.front, back:form.back, theme:form.theme } : c))
    } else {
      setCards(prev => [...prev, { id:'f'+Date.now(), front:form.front, back:form.back, theme:form.theme, created_at:new Date().toISOString() }])
    }
    resetForm()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--color-text-muted)]">{cards.length} flashcards</p>
        <button onClick={() => { resetForm(); setShowForm(true) }} className="btn-primary text-sm">+ Novo flashcard</button>
      </div>

      {showForm && (
        <div className="card-p space-y-4">
          <h3 className="font-semibold text-[var(--color-text)]">{editing ? 'Editar flashcard' : 'Novo flashcard'}</h3>
          <div>
            <label className="label">Tema</label>
            <select className="input" value={form.theme} onChange={e => setForm(f => ({...f, theme:e.target.value as StudyTheme}))}>
              {(Object.entries(THEMES) as [StudyTheme, string][]).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Frente (pergunta)</label>
            <textarea rows={2} className="input resize-none" value={form.front} onChange={e => setForm(f => ({...f, front:e.target.value}))} placeholder="Pergunta ou conceito..." />
          </div>
          <div>
            <label className="label">Verso (resposta)</label>
            <textarea rows={3} className="input resize-none" value={form.back} onChange={e => setForm(f => ({...f, back:e.target.value}))} placeholder="Resposta completa..." />
          </div>
          <div className="flex gap-2">
            <button onClick={handleSave} className="btn-primary">Salvar</button>
            <button onClick={resetForm} className="btn-ghost">Cancelar</button>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-3">
        {cards.map(c => (
          <div key={c.id} className="card-p space-y-2">
            <span className="badge-blue text-xs">{THEMES[c.theme]}</span>
            <p className="text-sm font-medium text-[var(--color-text)] line-clamp-2">{c.front}</p>
            <p className="text-xs text-[var(--color-text-muted)] line-clamp-2">{c.back}</p>
            <div className="flex gap-1 pt-1">
              <button onClick={() => handleEdit(c.id)} className="btn-ghost text-xs px-2">editar</button>
              <button onClick={() => setCards(prev => prev.filter(x => x.id !== c.id))} className="text-xs text-red-500 btn-ghost px-2">excluir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── ABA: CASOS ───────────────────────────────────────────────────────────────

function CasesTab() {
  return (
    <div className="card-p space-y-4">
      <h3 className="font-semibold text-[var(--color-text)]">Gestão de Casos Clínicos</h3>
      <p className="text-sm text-[var(--color-text-muted)]">
        Os casos clínicos são estruturas de árvore de decisão com etapas e opções. Use o editor abaixo para criar e editar casos.
      </p>
      <div className="bg-[var(--color-surface-2)] rounded-lg p-6 text-center">
        <p className="text-3xl mb-2">🏥</p>
        <p className="text-sm font-medium text-[var(--color-text)]">Editor de casos clínicos</p>
        <p className="text-xs text-[var(--color-text-muted)] mt-1 mb-4">
          Adicione título, descrição, tema e monte as etapas com opções de conduta e feedback.
        </p>
        <button className="btn-primary text-sm">+ Novo caso clínico</button>
      </div>
      <p className="text-xs text-[var(--color-text-subtle)]">
        * O editor completo de árvore de decisão será implementado via interface drag-and-drop. Os dados são salvos no campo <code>steps</code> (JSONB) do Supabase.
      </p>
    </div>
  )
}

// ─── ABA: EXPORTAR PDF ───────────────────────────────────────────────────────

function ExportTab() {
  const { profile } = useAuthContext()
  const [generating, setGenerating] = useState(false)
  const [selectedUser, setSelectedUser] = useState(MOCK_MEMBERS[0].id)

  const generatePDF = () => {
    setGenerating(true)
    const user = MOCK_MEMBERS.find(m => m.id === selectedUser)!

    // Instancia jsPDF
    const doc = new jsPDF()

    // ─── Cabeçalho ───────────────────────────────────────────
    doc.setFillColor(31, 56, 245)
    doc.rect(0, 0, 210, 35, 'F')

    doc.setTextColor(255, 255, 255)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(18)
    doc.text('LAMMI – Relatório de Desempenho', 14, 15)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text('Liga Acadêmica de Medicina Militar de Irecê', 14, 22)
    doc.text('Gerado em: ' + new Date().toLocaleDateString('pt-BR'), 14, 28)

    // ─── Dados do membro ─────────────────────────────────────
    doc.setTextColor(30, 30, 30)
    doc.setFontSize(13)
    doc.setFont('helvetica', 'bold')
    doc.text('Membro: ' + user.display_name, 14, 50)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.text('E-mail: ' + user.email, 14, 57)
    doc.text('Papel: ' + user.role, 14, 63)

    // ─── Cards de resumo ─────────────────────────────────────
    const cards = [
      { label: 'Pontuação Total', value: user.score.toLocaleString() + ' pts' },
      { label: 'Streak Atual',    value: user.study_streak + ' dias' },
      { label: 'Questões Resp.',  value: '75' },
      { label: 'Taxa de Acerto',  value: '72%' },
    ]
    cards.forEach((c, i) => {
      const x = 14 + (i % 2) * 93
      const y = 73 + Math.floor(i / 2) * 22
      doc.setFillColor(240, 244, 255)
      doc.roundedRect(x, y, 85, 16, 3, 3, 'F')
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(11)
      doc.setTextColor(31, 56, 245)
      doc.text(c.value, x + 6, y + 7)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8)
      doc.setTextColor(100, 100, 100)
      doc.text(c.label, x + 6, y + 12)
    })

    // ─── Tabela de desempenho por tema ───────────────────────
    doc.setTextColor(30, 30, 30)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
    doc.text('Desempenho por Tema', 14, 125)

    autoTable(doc, {
      startY: 130,
      head: [['Tema', 'Total', 'Corretas', 'Taxa']],
      body: [
        ['ATLS Inicial',    '24', '18', '75%'],
        ['Choque',          '15', '10', '67%'],
        ['Trauma Torácico', '12', '7',  '58%'],
        ['Via Aérea',       '10', '8',  '80%'],
        ['Cinética do Trauma','8','6',  '75%'],
      ],
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: { fillColor: [31, 56, 245], textColor: 255, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [245, 247, 255] },
    })

    // ─── Heatmap simplificado (texto) ────────────────────────
    const finalY = (doc as any).lastAutoTable.finalY + 10
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
    doc.text('Atividade Recente (últimos 7 dias)', 14, finalY)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(80, 80, 80)

    const days = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb']
    const values = [12, 24, 0, 8, 15, 30, 6]
    days.forEach((d, i) => {
      const x = 14 + i * 26
      const intensity = Math.min(values[i] / 30, 1)
      const r = Math.round(31 + (200 - 31) * (1 - intensity))
      const g = Math.round(56 + (220 - 56) * (1 - intensity))
      const b = Math.round(245 + (255 - 245) * (1 - intensity))
      doc.setFillColor(r, g, b)
      doc.roundedRect(x, finalY + 5, 20, 20, 2, 2, 'F')
      doc.setTextColor(intensity > 0.5 ? 255 : 50)
      doc.text(d, x + 4, finalY + 14)
      doc.text(values[i].toString(), x + 7, finalY + 20)
    })

    // ─── Rodapé ──────────────────────────────────────────────
    doc.setTextColor(160, 160, 160)
    doc.setFontSize(8)
    doc.text('Relatório gerado automaticamente pela plataforma LAMMI · www.lammi.med.br', 14, 285)

    doc.save(`lammi_relatorio_${user.display_name.replace(/\s+/g,'_').toLowerCase()}.pdf`)
    setGenerating(false)
  }

  return (
    <div className="max-w-lg space-y-5">
      <div className="card-p space-y-4">
        <h3 className="font-semibold text-[var(--color-text)]">Exportar Relatório de Desempenho</h3>
        <p className="text-sm text-[var(--color-text-muted)]">
          Gera um PDF com estatísticas completas de um membro: acertos por tema, simulados, streak e heatmap de atividade.
        </p>

        <div>
          <label className="label">Selecionar membro</label>
          <select className="input" value={selectedUser} onChange={e => setSelectedUser(e.target.value)}>
            {MOCK_MEMBERS.map(m => (
              <option key={m.id} value={m.id}>{m.display_name} ({m.email})</option>
            ))}
          </select>
        </div>

        <div className="bg-[var(--color-surface-2)] rounded-lg p-4 text-sm space-y-2">
          <p className="font-medium text-[var(--color-text)]">O PDF incluirá:</p>
          {['Dados do membro e pontuação total','Taxa de acerto geral e por tema','Número de simulados e média de desempenho','Streak de dias consecutivos de estudo','Heatmap de atividade recente','Tabela detalhada por tema'].map(item => (
            <div key={item} className="flex items-center gap-2 text-[var(--color-text-muted)]">
              <span className="text-green-500">✓</span> {item}
            </div>
          ))}
        </div>

        <button onClick={generatePDF} disabled={generating} className="btn-primary w-full py-3">
          {generating ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Gerando PDF...
            </span>
          ) : '📥 Exportar PDF'}
        </button>
      </div>

      <div className="card-p space-y-3">
        <h3 className="font-semibold text-[var(--color-text)] text-sm">Exportar todos os membros</h3>
        <p className="text-xs text-[var(--color-text-muted)]">Gera uma planilha CSV com dados de todos os membros para análise em Excel ou Google Sheets.</p>
        <button
          onClick={() => {
            const rows = [
              ['Nome','Email','Role','Score','Streak'],
              ...MOCK_MEMBERS.map(m => [m.display_name,m.email,m.role,m.score,m.study_streak])
            ]
            const csv = rows.map(r => r.join(',')).join('\n')
            const blob = new Blob([csv], { type:'text/csv' })
            const url  = URL.createObjectURL(blob)
            const a    = document.createElement('a')
            a.href = url; a.download = 'lammi_membros.csv'; a.click()
            URL.revokeObjectURL(url)
          }}
          className="btn-outline text-sm w-full"
        >
          📊 Exportar CSV de membros
        </button>
      </div>
    </div>
  )
}
