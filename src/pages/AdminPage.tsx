import { useState, useEffect } from 'react'
import { useAuthContext } from '@/contexts/AuthContext'
import { THEMES, StudyTheme, Difficulty, Question, Flashcard, supabase } from '@/services/supabaseClient'
import { loadQuestionsForFilter, loadFlashcardsForFilter } from '@/services/contentService'
import clsx from 'clsx'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

type AdminTab = 'overview' | 'members' | 'questions' | 'flashcards' | 'reports' | 'export'

export function AdminPage() {
  const { profile } = useAuthContext()
  const [tab, setTab] = useState<AdminTab>('overview')

  // Conteúdo publicado (banco inteiro) — carregado uma vez e compartilhado
  // entre as abas que dependem dele (visão geral, questões, flashcards, exportar).
  const [questions, setQuestions] = useState<Question[]>([])
  const [flashcards, setFlashcards] = useState<Flashcard[]>([])
  const [loadingContent, setLoadingContent] = useState(true)
  useEffect(() => {
    Promise.all([loadQuestionsForFilter(new Set()), loadFlashcardsForFilter(new Set())])
      .then(([qs, fs]) => { setQuestions(qs); setFlashcards(fs) })
      .catch(() => { setQuestions([]); setFlashcards([]) })
      .finally(() => setLoadingContent(false))
  }, [])

  const tabs: { id: AdminTab; label: string; icon: string }[] = [
    { id: 'overview',   label: 'Visão Geral', icon: '📊' },
    { id: 'members',    label: 'Membros',     icon: '👥' },
    { id: 'questions',  label: 'Questões',    icon: '📋' },
    { id: 'flashcards', label: 'Flashcards',  icon: '🃏' },
    { id: 'reports',    label: 'Relatórios',  icon: '🚩' },
    { id: 'export',     label: 'Exportar',    icon: '📤' },
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

      <div className="flex gap-1 overflow-x-auto pb-1 border-b border-[var(--color-border)]">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={clsx('flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-t-lg whitespace-nowrap transition-colors flex-shrink-0', {
              'bg-brand-600 text-white': tab === t.id,
              'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-2)]': tab !== t.id,
            })}>
            <span>{t.icon}</span> {t.label}
          </button>
        ))}
      </div>

      {loadingContent ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>Carregando conteúdo...</div>
      ) : (
        <>
          {tab === 'overview'   && <OverviewTab questions={questions} flashcards={flashcards} />}
          {tab === 'members'    && <MembersTab />}
          {tab === 'questions'  && <QuestionsTab initialQuestions={questions} />}
          {tab === 'flashcards' && <FlashcardsTab initialFlashcards={flashcards} />}
          {tab === 'reports'    && <ReportsTab />}
          {tab === 'export'     && <ExportTab questions={questions} flashcards={flashcards} />}
        </>
      )}
    </div>
  )
}

// ─── VISÃO GERAL ──────────────────────────────────────────────────────────────

function OverviewTab({ questions, flashcards }: { questions: Question[]; flashcards: Flashcard[] }) {
  const totalQ  = questions.length
  const totalF  = flashcards.length
  const temas   = new Set(questions.map(q => q.theme)).size
  const facil   = questions.filter(q => q.difficulty === 'facil').length
  const medio   = questions.filter(q => q.difficulty === 'medio').length
  const dificil = questions.filter(q => q.difficulty === 'dificil').length

  const porTema = Object.entries(
    questions.reduce<Record<string, number>>((acc, q) => {
      acc[q.theme] = (acc[q.theme] || 0) + 1
      return acc
    }, {})
  ).sort((a, b) => b[1] - a[1]).slice(0, 6)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem' }}>
        {[
          { lbl: 'Questões',    val: totalQ,   col: 'var(--color-text)' },
          { lbl: 'Flashcards',  val: totalF,   col: '#4ade80'           },
          { lbl: 'Temas ativos',val: temas,    col: '#60a5fa'           },
          { lbl: 'Fáceis',      val: facil,    col: '#4ade80'           },
          { lbl: 'Médias',      val: medio,    col: '#facc15'           },
          { lbl: 'Difíceis',    val: dificil,  col: '#f87171'           },
        ].map(k => (
          <div key={k.lbl} className="card-p" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--color-text-muted)', marginBottom: '.5rem', fontWeight: 700 }}>{k.lbl}</div>
            <div style={{ fontFamily: 'var(--font-d)', fontSize: '2rem', fontWeight: 700, color: k.col, lineHeight: 1 }}>{k.val}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--color-border)', fontWeight: 700, fontSize: '.85rem', color: 'var(--color-text)' }}>
          📋 Questões por tema (top 6)
        </div>
        {porTema.map(([theme, count]) => (
          <div key={theme} style={{ padding: '.75rem 1.25rem', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ flex: 1, fontSize: '.85rem', color: 'var(--color-text)' }}>
              {THEMES[theme as StudyTheme] ?? theme}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
              <div style={{ width: 120, height: 6, background: 'rgba(192,57,43,.1)' }}>
                <div style={{ height: '100%', width: (count / totalQ * 100) + '%', background: 'var(--red)', transition: 'width .5s' }} />
              </div>
              <span style={{ fontSize: '.8rem', fontWeight: 700, color: 'var(--color-text)', minWidth: 24, textAlign: 'right' }}>{count}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="card-p">
        <div style={{ fontWeight: 700, fontSize: '.85rem', color: 'var(--color-text)', marginBottom: '1rem' }}>Distribuição por dificuldade</div>
        {[
          { lbl: 'Fácil',   val: facil,   col: '#4ade80' },
          { lbl: 'Médio',   val: medio,   col: '#facc15' },
          { lbl: 'Difícil', val: dificil, col: '#f87171' },
        ].map(b => (
          <div key={b.lbl} style={{ marginBottom: '.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.8rem', marginBottom: '.25rem' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>{b.lbl}</span>
              <span style={{ color: b.col, fontWeight: 700 }}>{b.val} / {totalQ}</span>
            </div>
            <div style={{ height: 6, background: 'rgba(192,57,43,.1)' }}>
              <div style={{ height: '100%', width: (b.val / totalQ * 100) + '%', background: b.col, transition: 'width .5s' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── MEMBROS ──────────────────────────────────────────────────────────────────

const MOCK_MEMBERS = [
  { id: 'm1', display_name: 'Ana Souza',   email: 'ana@med.br',   role: 'admin',  active: true,  score: 3420, study_streak: 21 },
  { id: 'm2', display_name: 'João Lima',   email: 'joao@med.br',  role: 'member', active: true,  score: 2980, study_streak: 15 },
  { id: 'm3', display_name: 'Maria Costa', email: 'maria@med.br', role: 'member', active: true,  score: 1640, study_streak: 4  },
  { id: 'm4', display_name: 'Pedro Alves', email: 'pedro@med.br', role: 'member', active: false, score: 890,  study_streak: 0  },
]

function MembersTab() {
  const [members, setMembers] = useState(MOCK_MEMBERS)
  const [busca, setBusca]     = useState('')
  const filtrados = busca.trim()
    ? members.filter(m => m.display_name.toLowerCase().includes(busca.toLowerCase()) || m.email.toLowerCase().includes(busca.toLowerCase()))
    : members

  const toggleRole   = (id: string) => setMembers(prev => prev.map(m => m.id === id ? { ...m, role: m.role === 'admin' ? 'member' : 'admin' } : m))
  const toggleActive = (id: string) => setMembers(prev => prev.map(m => m.id === id ? { ...m, active: !m.active } : m))

  return (
    <div className="space-y-4">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <p className="text-sm text-[var(--color-text-muted)]">{members.length} membros cadastrados</p>
        <input type="text" value={busca} onChange={e => setBusca(e.target.value)}
          placeholder="🔍 Buscar por nome ou email..."
          style={{ padding: '.4rem .75rem', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', color: 'var(--color-text)', fontSize: '.82rem', outline: 'none', minWidth: 220 }} />
        {busca && <span style={{ fontSize: '.75rem', color: 'var(--color-text-muted)' }}>{filtrados.length} resultado(s)</span>}
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
                  <td className="px-4 py-3 font-medium text-[var(--color-text)]">{m.display_name}</td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)] hidden md:table-cell">{m.email}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={clsx('badge text-xs', m.role === 'admin' ? 'badge-red' : 'badge-gray')}>{m.role}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={clsx('badge text-xs', m.active ? 'badge-green' : 'badge-red')}>{m.active ? 'ativo' : 'inativo'}</span>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-[var(--color-text)]">{m.score.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1 justify-end">
                      <button onClick={() => toggleRole(m.id)} className="text-xs btn-ghost px-2 py-1 text-brand-500">
                        {m.role === 'admin' ? '↓ membro' : '↑ admin'}
                      </button>
                      <button onClick={() => toggleActive(m.id)} className={clsx('text-xs btn-ghost px-2 py-1', m.active ? 'text-red-500' : 'text-green-500')}>
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

// ─── QUESTÕES ─────────────────────────────────────────────────────────────────

function QuestionsTab({ initialQuestions }: { initialQuestions: Question[] }) {
  const [questions, setQuestions] = useState(initialQuestions)
  const [editing, setEditing]     = useState<string | null>(null)
  const [showForm, setShowForm]   = useState(false)
  const [form, setForm] = useState({
    statement: '', explanation: '',
    theme: 'atls_inicial' as StudyTheme,
    difficulty: 'medio' as Difficulty,
    correct_key: 'A',
    alt_a: '', alt_b: '', alt_c: '', alt_d: '', alt_e: '',
  })

  const resetForm = () => {
    setForm({ statement:'', explanation:'', theme:'atls_inicial', difficulty:'medio', correct_key:'A', alt_a:'', alt_b:'', alt_c:'', alt_d:'', alt_e:'' })
    setEditing(null); setShowForm(false)
  }

  const handleEdit = (id: string) => {
    const q = questions.find(q => q.id === id)
    if (!q) return
    setForm({
      statement: q.statement, explanation: q.explanation,
      theme: q.theme, difficulty: q.difficulty, correct_key: q.correct_key,
      alt_a: q.alternatives[0]?.text ?? '', alt_b: q.alternatives[1]?.text ?? '',
      alt_c: q.alternatives[2]?.text ?? '', alt_d: q.alternatives[3]?.text ?? '',
      alt_e: q.alternatives[4]?.text ?? '',
    })
    setEditing(id); setShowForm(true)
  }

  const handleSave = () => {
    const alternatives = [
      { key:'A', text:form.alt_a }, { key:'B', text:form.alt_b },
      { key:'C', text:form.alt_c }, { key:'D', text:form.alt_d },
      { key:'E', text:form.alt_e },
    ].filter(a => a.text.trim())
    if (!form.statement.trim() || alternatives.length < 2) { alert('Preencha o enunciado e pelo menos 2 alternativas.'); return }
    if (editing) {
      setQuestions(prev => prev.map(q => q.id === editing ? { ...q, statement:form.statement, alternatives, correct_key:form.correct_key, explanation:form.explanation, theme:form.theme, difficulty:form.difficulty } : q))
    } else {
      setQuestions(prev => [{ id:'q'+Date.now(), statement:form.statement, alternatives, correct_key:form.correct_key, explanation:form.explanation, theme:form.theme, difficulty:form.difficulty, created_at:new Date().toISOString() }, ...prev])
    }
    resetForm()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--color-text-muted)]">{questions.length} questões</p>
        <button onClick={() => { resetForm(); setShowForm(true) }} className="btn-primary text-sm">+ Nova questão</button>
      </div>

      {showForm && (
        <div className="card-p space-y-4">
          <h3 className="font-semibold text-[var(--color-text)]">{editing ? 'Editar questão' : 'Nova questão'}</h3>
          <div>
            <label className="label">Enunciado</label>
            <textarea rows={3} className="input resize-none" value={form.statement} onChange={e => setForm(f => ({...f, statement:e.target.value}))} placeholder="Digite o enunciado..." />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Tema</label>
              <select className="input" value={form.theme} onChange={e => setForm(f => ({...f, theme:e.target.value as StudyTheme}))}>
                {(Object.entries(THEMES) as [StudyTheme,string][]).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
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
              const key = ('alt_'+k.toLowerCase()) as keyof typeof form
              return (
                <div key={k} className="flex items-center gap-2">
                  <span className={clsx('w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0 cursor-pointer transition-colors', {
                    'bg-green-500 border-green-500 text-white': form.correct_key === k,
                    'border-[var(--color-border)] text-[var(--color-text-muted)]': form.correct_key !== k,
                  })} onClick={() => setForm(f => ({...f, correct_key:k}))}>
                    {k}
                  </span>
                  <input className="input" placeholder={`Alternativa ${k}${k <= 'B' ? ' (obrigatória)' : ''}`}
                    value={form[key] as string} onChange={e => setForm(f => ({...f, [key]:e.target.value}))} />
                </div>
              )
            })}
            <p className="text-xs text-[var(--color-text-subtle)]">Clique no círculo para marcar a alternativa correta.</p>
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
                <span className={clsx('badge text-xs', { 'badge-green':q.difficulty==='facil','badge-amber':q.difficulty==='medio','badge-red':q.difficulty==='dificil' })}>{q.difficulty}</span>
                <span className="badge-blue text-xs">{THEMES[q.theme]}</span>
              </div>
              <p className="text-sm text-[var(--color-text)] line-clamp-2">{q.statement || <span className="text-[var(--color-text-muted)] italic">Sem enunciado</span>}</p>
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

// ─── FLASHCARDS ───────────────────────────────────────────────────────────────

function FlashcardsTab({ initialFlashcards }: { initialFlashcards: Flashcard[] }) {
  const [cards, setCards]       = useState(initialFlashcards)
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
      setCards(prev => prev.map(c => c.id === editing ? { ...c, ...form } : c))
    } else {
      setCards(prev => [...prev, { id:'f'+Date.now(), ...form, created_at:new Date().toISOString() }])
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
              {(Object.entries(THEMES) as [StudyTheme,string][]).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
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

// ─── RELATÓRIOS DE ERRO ───────────────────────────────────────────────────────

type Report = {
  id: string
  question_id: string
  user_id: string | null
  tipo: string
  descricao: string
  status: string
  created_at: string
}

const TIPO_LABELS: Record<string, string> = {
  gabarito_errado:       '❌ Gabarito errado',
  enunciado_incompleto:  '✂️ Enunciado incompleto',
  alternativa_errada:    '⚠️ Alternativa errada',
  comentario_errado:     '💬 Comentário errado',
  questao_duplicada:     '🔁 Duplicada',
  outro:                 '📌 Outro',
}

function ReportsTab() {
  const [reports, setReports]   = useState<Report[]>([])
  const [loading, setLoading]   = useState(true)
  const [filtro, setFiltro]     = useState<'todos' | 'pendente' | 'resolvido'>('todos')
  const [expandido, setExpandido] = useState<string | null>(null)

  const carregar = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('question_reports')
      .select('*')
      .order('created_at', { ascending: false })
    setReports((data as Report[]) ?? [])
    setLoading(false)
  }

  useEffect(() => { carregar() }, [])

  const marcarResolvido = async (id: string) => {
    await supabase.from('question_reports').update({ status: 'resolvido' }).eq('id', id)
    setReports(prev => prev.map(r => r.id === id ? { ...r, status: 'resolvido' } : r))
  }

  const excluir = async (id: string) => {
    if (!confirm('Excluir este relatório?')) return
    await supabase.from('question_reports').delete().eq('id', id)
    setReports(prev => prev.filter(r => r.id !== id))
  }

  const filtrados = reports.filter(r => filtro === 'todos' || r.status === filtro)
  const pendentes  = reports.filter(r => r.status === 'pendente').length
  const resolvidos = reports.filter(r => r.status === 'resolvido').length

  return (
    <div className="space-y-4">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {[
            { val: 'todos',     lbl: `Todos (${reports.length})` },
            { val: 'pendente',  lbl: `Pendentes (${pendentes})` },
            { val: 'resolvido', lbl: `Resolvidos (${resolvidos})` },
          ].map(f => (
            <button key={f.val}
              onClick={() => setFiltro(f.val as typeof filtro)}
              style={{
                padding: '.35rem .85rem', fontSize: '.8rem', fontWeight: 600, cursor: 'pointer',
                border: '1px solid', borderColor: filtro === f.val ? 'var(--red)' : 'var(--border)',
                background: filtro === f.val ? 'rgba(192,57,43,.15)' : 'transparent',
                color: filtro === f.val ? 'var(--red)' : 'var(--color-text-muted)',
              }}>
              {f.lbl}
            </button>
          ))}
        </div>
        <button onClick={carregar} className="btn-ghost" style={{ fontSize: '.8rem' }}>↻ Atualizar</button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)', fontSize: '.9rem' }}>
          Carregando relatórios...
        </div>
      ) : filtrados.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '.5rem' }}>🎉</div>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '.9rem' }}>Nenhum relatório {filtro !== 'todos' ? filtro : ''} encontrado.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
          {filtrados.map(r => (
            <div key={r.id} style={{
              border: '1px solid', padding: '1rem',
              borderColor: r.status === 'pendente' ? 'rgba(248,113,113,.35)' : 'var(--border)',
              background: r.status === 'pendente' ? 'rgba(178,59,59,.04)' : 'var(--bg-surface)',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', marginBottom: '.35rem' }}>
                    <span style={{
                      fontSize: '.72rem', fontWeight: 700, padding: '.2rem .55rem',
                      background: r.status === 'pendente' ? 'rgba(248,113,113,.15)' : 'rgba(74,222,128,.1)',
                      color: r.status === 'pendente' ? '#f87171' : '#4ade80',
                      border: `1px solid ${r.status === 'pendente' ? 'rgba(248,113,113,.3)' : 'rgba(74,222,128,.2)'}`,
                    }}>
                      {r.status === 'pendente' ? '⏳ pendente' : '✓ resolvido'}
                    </span>
                    <span style={{ fontSize: '.72rem', color: 'var(--color-text-muted)', padding: '.2rem .55rem', border: '1px solid var(--border)' }}>
                      {TIPO_LABELS[r.tipo] ?? r.tipo}
                    </span>
                    <span style={{ fontSize: '.72rem', color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>
                      questão: {r.question_id}
                    </span>
                  </div>
                  <p style={{ fontSize: '.85rem', color: 'var(--color-text)', lineHeight: 1.6 }}>
                    {r.descricao}
                  </p>
                  <p style={{ fontSize: '.7rem', color: 'var(--color-text-muted)', marginTop: '.3rem' }}>
                    {new Date(r.created_at).toLocaleString('pt-BR')}
                    {r.user_id && ` · user: ${r.user_id.slice(0, 8)}...`}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '.5rem', flexShrink: 0 }}>
                  {r.status === 'pendente' && (
                    <button onClick={() => marcarResolvido(r.id)} className="btn-ghost"
                      style={{ fontSize: '.75rem', padding: '.3rem .7rem', color: '#4ade80' }}>
                      ✓ Resolver
                    </button>
                  )}
                  <button onClick={() => excluir(r.id)} className="btn-ghost"
                    style={{ fontSize: '.75rem', padding: '.3rem .7rem', color: '#f87171' }}>
                    🗑
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── EXPORTAR ─────────────────────────────────────────────────────────────────

function ExportTab({ questions, flashcards }: { questions: Question[]; flashcards: Flashcard[] }) {
  const [generating, setGenerating] = useState(false)

  const exportarQuestoesCSV = () => {
    const rows = [
      ['ID','Enunciado','Tema','Dificuldade','Correta','Alternativas','Explicação'],
      ...questions.map(q => [
        q.id,
        `"${q.statement.replace(/"/g,'""')}"`,
        THEMES[q.theme] ?? q.theme,
        q.difficulty,
        q.correct_key,
        `"${q.alternatives.map(a => `${a.key}: ${a.text}`).join(' | ').replace(/"/g,'""')}"`,
        `"${(q.explanation ?? '').replace(/"/g,'""')}"`,
      ])
    ]
    const csv = rows.map(r => r.join(',')).join('\n')
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a'); a.href = url; a.download = 'lammi_questoes.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  const exportarFlashcardsCSV = () => {
    const rows = [
      ['ID','Tema','Frente','Verso'],
      ...flashcards.map(f => [
        f.id,
        THEMES[f.theme] ?? f.theme,
        `"${f.front.replace(/"/g,'""')}"`,
        `"${f.back.replace(/"/g,'""')}"`,
      ])
    ]
    const csv = rows.map(r => r.join(',')).join('\n')
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a'); a.href = url; a.download = 'lammi_flashcards.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  const exportarRelatoriosPDF = async () => {
    setGenerating(true)
    const { data } = await supabase.from('question_reports').select('*').order('created_at', { ascending: false })
    const reports = (data ?? []) as Report[]

    const doc = new jsPDF()
    doc.setFillColor(192, 57, 43)
    doc.rect(0, 0, 210, 30, 'F')
    doc.setTextColor(255,255,255)
    doc.setFont('helvetica','bold')
    doc.setFontSize(16)
    doc.text('LAMMI – Relatório de Erros Reportados', 14, 18)
    doc.setTextColor(30,30,30)
    doc.setFontSize(9)
    doc.setFont('helvetica','normal')
    doc.text(`Gerado em: ${new Date().toLocaleString('pt-BR')} · Total: ${reports.length} relatórios`, 14, 38)

    autoTable(doc, {
      startY: 44,
      head: [['Questão','Tipo','Descrição','Status','Data']],
      body: reports.map(r => [
        r.question_id,
        TIPO_LABELS[r.tipo] ?? r.tipo,
        r.descricao.slice(0, 60) + (r.descricao.length > 60 ? '...' : ''),
        r.status,
        new Date(r.created_at).toLocaleDateString('pt-BR'),
      ]),
      styles: { fontSize: 8, cellPadding: 3 },
      headStyles: { fillColor: [192, 57, 43], textColor: 255, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [250, 245, 245] },
    })

    doc.save('lammi_relatorios_erro.pdf')
    setGenerating(false)
  }

  return (
    <div style={{ maxWidth: 520, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {[
        { icon: '📋', title: 'Exportar Questões', desc: `${questions.length} questões em CSV com enunciado, alternativas, gabarito e explicação.`, fn: exportarQuestoesCSV, lbl: 'Baixar CSV de Questões' },
        { icon: '🃏', title: 'Exportar Flashcards', desc: `${flashcards.length} flashcards em CSV com frente, verso e tema.`, fn: exportarFlashcardsCSV, lbl: 'Baixar CSV de Flashcards' },
      ].map(item => (
        <div key={item.title} className="card-p" style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--color-text)', marginBottom: '.25rem' }}>{item.icon} {item.title}</div>
            <p style={{ fontSize: '.82rem', color: 'var(--color-text-muted)' }}>{item.desc}</p>
          </div>
          <button onClick={item.fn} className="btn-ghost" style={{ fontSize: '.85rem', justifyContent: 'center' }}>
            📥 {item.lbl}
          </button>
        </div>
      ))}

      <div className="card-p" style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--color-text)', marginBottom: '.25rem' }}>🚩 Exportar Relatórios de Erro</div>
          <p style={{ fontSize: '.82rem', color: 'var(--color-text-muted)' }}>PDF com todos os erros reportados pelos usuários, status e data.</p>
        </div>
        <button onClick={exportarRelatoriosPDF} disabled={generating} className="btn-ghost" style={{ fontSize: '.85rem', justifyContent: 'center' }}>
          {generating ? '⏳ Gerando...' : '📥 Baixar PDF de Relatórios'}
        </button>
      </div>
    </div>
  )
}