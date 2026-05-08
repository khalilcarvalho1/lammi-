import { useState, useEffect } from 'react'
import { useAuthContext } from '@/contexts/AuthContext'
import { THEMES, StudyTheme, Difficulty, Profile, Question, Flashcard } from '@/services/supabaseClient'
import { profileService } from '@/services/profileService'
import { questionsService } from '@/services/questionsService'
import { flashcardsService } from '@/services/flashcardsService'
import { simuladoService } from '@/services/simuladoService'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

type Aba = 'membros' | 'questoes' | 'flashcards' | 'casos' | 'exportar'

export function AdminPage() {
  const { profile } = useAuthContext()
  const [aba, setAba] = useState<Aba>('membros')
  const abas: { id: Aba; label: string }[] = [
    { id: 'membros',    label: '👥 Membros'   },
    { id: 'questoes',   label: '📋 Questões'  },
    { id: 'flashcards', label: '🃏 Flashcards' },
    { id: 'casos',      label: '🏥 Casos'      },
    { id: 'exportar',   label: '📊 Exportar'   },
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

function AbaMembros() {
  const [membros, setMembros] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [salvando, setSalvando] = useState<string | null>(null)
  useEffect(() => {
    profileService.getAllProfiles().then(({ data }) => { if (data) setMembros(data as Profile[]); setLoading(false) })
  }, [])
  const toggleRole = async (id: string, role: string) => {
    setSalvando(id)
    const novoRole = role === 'admin' ? 'member' : 'admin'
    await profileService.updateRole(id, novoRole as 'admin' | 'member')
    setMembros(prev => prev.map(m => m.id === id ? { ...m, role: novoRole as 'admin' | 'member' } : m))
    setSalvando(null)
  }
  const toggleAtivo = async (id: string, active: boolean) => {
    setSalvando(id)
    await profileService.setActive(id, !active)
    setMembros(prev => prev.map(m => m.id === id ? { ...m, active: !active } : m))
    setSalvando(null)
  }
  const Th = ({ children }: { children: string }) => (
    <th style={{ textAlign: 'left', padding: '.7rem 1rem', fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--text-dim)', fontWeight: 700, borderBottom: '1px solid var(--border)', background: '#080808' }}>{children}</th>
  )
  if (loading) return <p style={{ color: 'var(--text-muted)', padding: '2rem' }}>Carregando membros...</p>
  return (
    <div>
      <p style={{ fontSize: '.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{membros.length} membros cadastrados</p>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
          <thead><tr><Th>Nome</Th><Th>Apelido</Th><Th>Papel</Th><Th>Status</Th><Th>Score</Th><Th>Streak</Th><Th>Ações</Th></tr></thead>
          <tbody>
            {membros.map((m, i) => (
              <tr key={m.id} style={{ borderBottom: '1px solid rgba(192,57,43,.1)', background: i % 2 === 0 ? 'transparent' : 'rgba(192,57,43,.02)' }}>
                <td style={{ padding: '.8rem 1rem', fontWeight: 600, color: 'var(--text)', fontSize: '.88rem' }}>{m.display_name}</td>
                <td style={{ padding: '.8rem 1rem', color: 'var(--text-muted)', fontSize: '.82rem' }}>{m.nickname}</td>
                <td style={{ padding: '.8rem 1rem' }}>
                  <span style={{ fontSize: '.7rem', padding: '2px 8px', background: m.role === 'admin' ? 'rgba(178,59,59,.2)' : 'rgba(192,57,43,.1)', color: m.role === 'admin' ? '#f87171' : 'var(--text-muted)', border: `1px solid ${m.role === 'admin' ? '#b23b3b' : 'var(--border)'}` }}>{m.role}</span>
                </td>
                <td style={{ padding: '.8rem 1rem' }}>
                  <span style={{ fontSize: '.7rem', padding: '2px 8px', background: m.active ? 'rgba(47,122,63,.15)' : 'rgba(178,59,59,.12)', color: m.active ? '#4ade80' : '#f87171', border: `1px solid ${m.active ? '#2f7a3f' : '#b23b3b'}` }}>{m.active ? 'ativo' : 'inativo'}</span>
                </td>
                <td style={{ padding: '.8rem 1rem', fontFamily: 'var(--font-d)', color: '#E53935', fontWeight: 700 }}>{m.score.toLocaleString()}</td>
                <td style={{ padding: '.8rem 1rem', color: 'var(--text-muted)', fontSize: '.85rem' }}>🔥 {m.study_streak}</td>
                <td style={{ padding: '.8rem 1rem' }}>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <button onClick={() => toggleRole(m.id, m.role)} disabled={salvando === m.id} className="btn-ghost" style={{ fontSize: '.72rem', padding: '.3rem .6rem' }}>{m.role === 'admin' ? '↓ membro' : '↑ admin'}</button>
                    <button onClick={() => toggleAtivo(m.id, m.active)} disabled={salvando === m.id} className="btn-ghost" style={{ fontSize: '.72rem', padding: '.3rem .6rem', color: m.active ? '#f87171' : '#4ade80' }}>{m.active ? 'desativar' : 'reativar'}</button>
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

function AbaQuestoes() {
  const [qs, setQs] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [erro, setErro] = useState<string | null>(null)
  const [form, setForm] = useState({ statement: '', explanation: '', theme: 'atls_inicial' as StudyTheme, difficulty: 'medio' as Difficulty, correct_key: 'A', a: '', b: '', c: '', d: '', e: '' })
  useEffect(() => { questionsService.getPage(0).then(({ data }) => { if (data) setQs(data as Question[]); setLoading(false) }) }, [])
  const reset = () => { setForm({ statement: '', explanation: '', theme: 'atls_inicial', difficulty: 'medio', correct_key: 'A', a: '', b: '', c: '', d: '', e: '' }); setEditId(null); setShowForm(false); setErro(null) }
  const editar = (q: Question) => {
    setForm({ statement: q.statement, explanation: q.explanation, theme: q.theme, difficulty: q.difficulty, correct_key: q.correct_key, a: q.alternatives[0]?.text ?? '', b: q.alternatives[1]?.text ?? '', c: q.alternatives[2]?.text ?? '', d: q.alternatives[3]?.text ?? '', e: q.alternatives[4]?.text ?? '' })
    setEditId(q.id); setShowForm(true)
  }
  const salvar = async () => {
    const alts = [{ key: 'A', text: form.a }, { key: 'B', text: form.b }, { key: 'C', text: form.c }, { key: 'D', text: form.d }, { key: 'E', text: form.e }].filter(a => a.text.trim())
    if (!form.statement.trim() || alts.length < 2) { setErro('Preencha enunciado e mínimo 2 alternativas.'); return }
    setSalvando(true); setErro(null)
    const payload = { statement: form.statement, alternatives: alts, correct_key: form.correct_key, explanation: form.explanation, theme: form.theme, difficulty: form.difficulty }
    if (editId) {
      const { error } = await questionsService.update(editId, payload)
      if (error) { setErro('Erro ao atualizar.'); setSalvando(false); return }
      setQs(prev => prev.map(q => q.id === editId ? { ...q, ...payload } : q))
    } else {
      const { data, error } = await questionsService.create(payload as any)
      if (error || !data) { setErro('Erro ao criar questão.'); setSalvando(false); return }
      setQs(prev => [data as Question, ...prev])
    }
    setSalvando(false); reset()
  }
  const deletar = async (id: string) => { if (!confirm('Deletar esta questão?')) return; await questionsService.delete(id); setQs(prev => prev.filter(q => q.id !== id)) }
  if (loading) return <p style={{ color: 'var(--text-muted)', padding: '2rem' }}>Carregando questões...</p>
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <p style={{ fontSize: '.85rem', color: 'var(--text-muted)' }}>{qs.length} questões</p>
        <button className="btn-red" style={{ fontSize: '.8rem', padding: '.5rem 1rem' }} onClick={() => { reset(); setShowForm(true) }}>+ Nova questão</button>
      </div>
      {showForm && (
        <div className="card-dark" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
          <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.1rem', color: '#E53935', marginBottom: '1.5rem' }}>{editId ? 'Editar' : 'Nova'} questão</div>
          {erro && <div style={{ background: 'rgba(178,59,59,.15)', border: '1px solid #b23b3b', padding: '.75rem', fontSize: '.85rem', color: '#f87171', marginBottom: '1rem' }}>{erro}</div>}
          <div style={{ marginBottom: '.9rem' }}>
            <div style={{ fontSize: '.68rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '.35rem' }}>Enunciado</div>
            <textarea rows={3} value={form.statement} onChange={e => setForm(f => ({ ...f, statement: e.target.value }))} style={{ width: '100%', padding: '.65rem .85rem', border: '1px solid var(--border)', background: 'var(--bg-surface)', color: 'var(--text)', fontFamily: 'var(--font-s)', fontSize: '.88rem', outline: 'none', resize: 'vertical' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ marginBottom: '.9rem' }}>
              <div style={{ fontSize: '.68rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '.35rem' }}>Tema</div>
              <select value={form.theme} onChange={e => setForm(f => ({ ...f, theme: e.target.value as StudyTheme }))} style={{ width: '100%', padding: '.65rem .85rem', border: '1px solid var(--border)', background: 'var(--bg-surface)', color: 'var(--text)', fontFamily: 'var(--font-s)', fontSize: '.85rem', outline: 'none' }}>
                {(Object.entries(THEMES) as [StudyTheme, string][]).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: '.9rem' }}>
              <div style={{ fontSize: '.68rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '.35rem' }}>Dificuldade</div>
              <select value={form.difficulty} onChange={e => setForm(f => ({ ...f, difficulty: e.target.value as Difficulty }))} style={{ width: '100%', padding: '.65rem .85rem', border: '1px solid var(--border)', background: 'var(--bg-surface)', color: 'var(--text)', fontFamily: 'var(--font-s)', fontSize: '.85rem', outline: 'none' }}>
                <option value="facil">Fácil</option><option value="medio">Médio</option><option value="dificil">Difícil</option>
              </select>
            </div>
          </div>
          <div style={{ marginBottom: '.9rem' }}>
            <div style={{ fontSize: '.68rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '.6rem' }}>Alternativas <span style={{ color: 'var(--text-dim)' }}>(clique na letra para marcar correta)</span></div>
            {(['A','B','C','D','E'] as const).map(k => (
              <div key={k} style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '.4rem' }}>
                <button onClick={() => setForm(f => ({ ...f, correct_key: k }))} style={{ width: 28, height: 28, borderRadius: '50%', border: '1px solid', borderColor: form.correct_key === k ? 'var(--red)' : 'var(--border)', background: form.correct_key === k ? 'var(--red)' : 'transparent', color: form.correct_key === k ? 'white' : '#E53935', fontSize: '.75rem', fontWeight: 700, cursor: 'pointer', flexShrink: 0 }}>{k}</button>
                <input value={form[k.toLowerCase() as keyof typeof form] as string} onChange={e => setForm(f => ({ ...f, [k.toLowerCase()]: e.target.value }))} placeholder={`Alternativa ${k}${k <= 'B' ? ' (obrigatória)' : ''}`} style={{ flex: 1, padding: '.55rem .8rem', border: '1px solid var(--border)', background: 'var(--bg-surface)', color: 'var(--text)', fontFamily: 'var(--font-s)', fontSize: '.85rem', outline: 'none' }} />
              </div>
            ))}
          </div>
          <div style={{ marginBottom: '.9rem' }}>
            <div style={{ fontSize: '.68rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '.35rem' }}>Explicação</div>
            <textarea rows={3} value={form.explanation} onChange={e => setForm(f => ({ ...f, explanation: e.target.value }))} style={{ width: '100%', padding: '.65rem .85rem', border: '1px solid var(--border)', background: 'var(--bg-surface)', color: 'var(--text)', fontFamily: 'var(--font-s)', fontSize: '.88rem', outline: 'none', resize: 'vertical' }} />
          </div>
          <div style={{ display: 'flex', gap: '.75rem' }}>
            <button onClick={salvar} disabled={salvando} className="btn-red" style={{ fontSize: '.85rem' }}>{salvando ? 'Salvando...' : 'Salvar'}</button>
            <button onClick={reset} className="btn-ghost" style={{ fontSize: '.85rem' }}>Cancelar</button>
          </div>
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
        {qs.map(q => (
          <div key={q.id} className="card-dark" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', gap: 6, marginBottom: '.35rem', flexWrap: 'wrap' }}>
                <span className="tag-pill" style={{ fontSize: '.65rem' }}>{THEMES[q.theme]}</span>
                <span className="tag-pill" style={{ fontSize: '.65rem' }}>{q.difficulty}</span>
              </div>
              <p style={{ fontSize: '.84rem', color: 'var(--text)', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{q.statement}</p>
              <p style={{ fontSize: '.72rem', color: 'var(--text-dim)', marginTop: '.2rem' }}>Correta: {q.correct_key}</p>
            </div>
            <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
              <button onClick={() => editar(q)} className="btn-ghost" style={{ fontSize: '.72rem', padding: '.3rem .6rem' }}>editar</button>
              <button onClick={() => deletar(q.id)} style={{ background: 'none', border: 'none', color: '#f87171', fontSize: '.75rem', cursor: 'pointer', padding: '.3rem .5rem' }}>✕</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AbaFlashcards() {
  const [cards, setCards] = useState<Flashcard[]>([])
  const [loading, setLoading] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [show, setShow] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [erro, setErro] = useState<string | null>(null)
  const [form, setForm] = useState({ front: '', back: '', theme: 'atls_inicial' as StudyTheme })
  useEffect(() => { flashcardsService.getAll().then(({ data }) => { if (data) setCards(data as Flashcard[]); setLoading(false) }) }, [])
  const reset = () => { setForm({ front: '', back: '', theme: 'atls_inicial' }); setEditId(null); setShow(false); setErro(null) }
  const editar = (c: Flashcard) => { setForm({ front: c.front, back: c.back, theme: c.theme }); setEditId(c.id); setShow(true) }
  const salvar = async () => {
    if (!form.front.trim() || !form.back.trim()) { setErro('Preencha frente e verso.'); return }
    setSalvando(true); setErro(null)
    if (editId) {
      const { error } = await flashcardsService.update(editId, form)
      if (error) { setErro('Erro ao atualizar.'); setSalvando(false); return }
      setCards(prev => prev.map(c => c.id === editId ? { ...c, ...form } : c))
    } else {
      const { data, error } = await flashcardsService.create(form)
      if (error || !data) { setErro('Erro ao criar.'); setSalvando(false); return }
      setCards(prev => [data as Flashcard, ...prev])
    }
    setSalvando(false); reset()
  }
  const deletar = async (id: string) => { if (!confirm('Deletar?')) return; await flashcardsService.delete(id); setCards(prev => prev.filter(c => c.id !== id)) }
  if (loading) return <p style={{ color: 'var(--text-muted)', padding: '2rem' }}>Carregando flashcards...</p>
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <p style={{ fontSize: '.85rem', color: 'var(--text-muted)' }}>{cards.length} flashcards</p>
        <button className="btn-red" style={{ fontSize: '.8rem', padding: '.5rem 1rem' }} onClick={() => { reset(); setShow(true) }}>+ Novo flashcard</button>
      </div>
      {show && (
        <div className="card-dark" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
          <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.1rem', color: '#E53935', marginBottom: '1.25rem' }}>{editId ? 'Editar' : 'Novo'} flashcard</div>
          {erro && <div style={{ background: 'rgba(178,59,59,.15)', border: '1px solid #b23b3b', padding: '.75rem', fontSize: '.85rem', color: '#f87171', marginBottom: '1rem' }}>{erro}</div>}
          <div style={{ marginBottom: '.9rem' }}>
            <div style={{ fontSize: '.68rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '.35rem' }}>Tema</div>
            <select value={form.theme} onChange={e => setForm(f => ({ ...f, theme: e.target.value as StudyTheme }))} style={{ width: '100%', padding: '.65rem .85rem', border: '1px solid var(--border)', background: 'var(--bg-surface)', color: 'var(--text)', fontFamily: 'var(--font-s)', fontSize: '.85rem', outline: 'none' }}>
              {(Object.entries(THEMES) as [StudyTheme, string][]).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
          {[['Frente (pergunta)', 'front', 2], ['Verso (resposta)', 'back', 3]].map(([label, field, rows]) => (
            <div key={field as string} style={{ marginBottom: '.9rem' }}>
              <div style={{ fontSize: '.68rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '.35rem' }}>{label as string}</div>
              <textarea rows={rows as number} value={form[field as keyof typeof form]} onChange={e => setForm(f => ({ ...f, [field as string]: e.target.value }))} style={{ width: '100%', padding: '.65rem .85rem', border: '1px solid var(--border)', background: 'var(--bg-surface)', color: 'var(--text)', fontFamily: 'var(--font-s)', fontSize: '.88rem', outline: 'none', resize: 'vertical' }} />
            </div>
          ))}
          <div style={{ display: 'flex', gap: '.75rem' }}>
            <button onClick={salvar} disabled={salvando} className="btn-red" style={{ fontSize: '.85rem' }}>{salvando ? 'Salvando...' : 'Salvar'}</button>
            <button onClick={reset} className="btn-ghost" style={{ fontSize: '.85rem' }}>Cancelar</button>
          </div>
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '.75rem' }}>
        {cards.map(c => (
          <div key={c.id} className="card-dark" style={{ padding: '1.1rem' }}>
            <span className="tag-pill" style={{ fontSize: '.65rem', marginBottom: '.6rem', display: 'inline-block' }}>{THEMES[c.theme]}</span>
            <p style={{ fontSize: '.84rem', fontWeight: 600, color: 'var(--text)', marginBottom: '.3rem', lineHeight: 1.4 }}>{c.front}</p>
            <p style={{ fontSize: '.78rem', color: 'var(--text-muted)', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{c.back}</p>
            <div style={{ display: 'flex', gap: 4, marginTop: '.75rem' }}>
              <button onClick={() => editar(c)} className="btn-ghost" style={{ fontSize: '.72rem', padding: '.3rem .6rem' }}>editar</button>
              <button onClick={() => deletar(c.id)} style={{ background: 'none', border: 'none', color: '#f87171', fontSize: '.75rem', cursor: 'pointer', padding: '.3rem .5rem' }}>✕</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AbaCasos() {
  return (
    <div className="card-dark" style={{ padding: '2.5rem', textAlign: 'center' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🏥</div>
      <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.2rem', color: '#E53935', marginBottom: '.5rem' }}>Editor de Casos Clínicos</div>
      <p style={{ color: 'var(--text-muted)', fontSize: '.88rem', maxWidth: 480, margin: '0 auto' }}>Editor visual em desenvolvimento. Os casos são gerenciados via campo JSONB no Supabase.</p>
    </div>
  )
}

function AbaExportar() {
  const [membros, setMembros] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [selId, setSelId] = useState('')
  const [gerando, setGerando] = useState(false)
  useEffect(() => {
    profileService.getAllProfiles().then(({ data }) => {
      if (data && data.length > 0) { setMembros(data as Profile[]); setSelId((data as Profile[])[0].id) }
      setLoading(false)
    })
  }, [])
  const gerarPDF = async () => {
    setGerando(true)
    const m = membros.find(m => m.id === selId)
    if (!m) { setGerando(false); return }
    const { data: sims } = await simuladoService.getUserSimulados(m.id)
    const numSims = sims?.length ?? 0
    const mediaAcerto = sims && sims.length > 0 ? Math.round(sims.reduce((acc, s) => acc + s.correct_count / s.total_questions, 0) / sims.length * 100) : 0
    const doc = new jsPDF()
    doc.setFillColor(13, 13, 13); doc.rect(0, 0, 210, 40, 'F')
    doc.setFillColor(192, 57, 43); doc.rect(0, 38, 210, 2, 'F')
    doc.setTextColor(255, 255, 255); doc.setFont('helvetica', 'bold'); doc.setFontSize(20); doc.text('LAMMI', 14, 18)
    doc.setFontSize(10); doc.setFont('helvetica', 'normal'); doc.setTextColor(192, 57, 43); doc.text('Liga Acadêmica de Medicina Militar de Irecê', 14, 26)
    doc.setTextColor(160, 160, 160); doc.text('Relatório · ' + new Date().toLocaleDateString('pt-BR'), 14, 33)
    doc.setTextColor(30, 30, 30); doc.setFont('helvetica', 'bold'); doc.setFontSize(14); doc.text(m.display_name, 14, 55)
    doc.setFont('helvetica', 'normal'); doc.setFontSize(10); doc.setTextColor(100, 100, 100); doc.text(`${m.nickname} · ${m.role}`, 14, 62)
    const stats = [{ l: 'Pontuação', v: m.score.toLocaleString() + ' pts' }, { l: 'Streak', v: m.study_streak + ' dias' }, { l: 'Simulados', v: numSims + ' feitos' }, { l: 'Média', v: mediaAcerto + '%' }]
    stats.forEach((s, i) => {
      const x = 14 + (i % 2) * 93; const y = 72 + Math.floor(i / 2) * 22
      doc.setFillColor(245, 245, 245); doc.roundedRect(x, y, 85, 16, 2, 2, 'F')
      doc.setFillColor(192, 57, 43); doc.rect(x, y, 3, 16, 'F')
      doc.setTextColor(192, 57, 43); doc.setFont('helvetica', 'bold'); doc.setFontSize(12); doc.text(s.v, x + 8, y + 7)
      doc.setTextColor(120, 120, 120); doc.setFont('helvetica', 'normal'); doc.setFontSize(8); doc.text(s.l, x + 8, y + 12)
    })
    if (sims && sims.length > 0) {
      doc.setTextColor(30, 30, 30); doc.setFont('helvetica', 'bold'); doc.setFontSize(12); doc.text('Histórico de Simulados', 14, 125)
      autoTable(doc, { startY: 130, head: [['Data', 'Questões', 'Acertos', 'Taxa', 'Tempo']], body: sims.slice(0, 10).map(s => [new Date(s.started_at).toLocaleDateString('pt-BR'), s.total_questions, s.correct_count, Math.round(s.correct_count / s.total_questions * 100) + '%', Math.floor(s.time_seconds / 60) + 'min']), styles: { fontSize: 9, cellPadding: 3, textColor: [30, 30, 30] }, headStyles: { fillColor: [13, 13, 13], textColor: [192, 57, 43], fontStyle: 'bold' }, alternateRowStyles: { fillColor: [250, 248, 248] } })
    }
    const finalY = (doc as any).lastAutoTable?.finalY ?? 125
    doc.setFontSize(8); doc.setTextColor(160, 160, 160); doc.text('Gerado pela plataforma LAMMI', 14, Math.min(finalY + 12, 278))
    doc.save(`lammi_${m.display_name.replace(/\s+/g, '_').toLowerCase()}.pdf`)
    setGerando(false)
  }
  const gerarCSV = () => {
    const rows = [['Nome', 'Apelido', 'Role', 'Score', 'Streak', 'Ativo'], ...membros.map(m => [m.display_name, m.nickname, m.role, m.score, m.study_streak, m.active ? 'sim' : 'não'])]
    const csv = rows.map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' }); const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'lammi_membros.csv'; a.click(); URL.revokeObjectURL(url)
  }
  if (loading) return <p style={{ color: 'var(--text-muted)', padding: '2rem' }}>Carregando...</p>
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', maxWidth: 860 }}>
      <div className="card-dark" style={{ padding: '2rem' }}>
        <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.1rem', color: '#E53935', marginBottom: '1.25rem', fontWeight: 600 }}>Relatório PDF de Membro</div>
        <p style={{ fontSize: '.84rem', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '1.25rem' }}>PDF com pontuação, streak e histórico real do Supabase.</p>
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontSize: '.68rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '.4rem' }}>Membro</div>
          <select value={selId} onChange={e => setSelId(e.target.value)} style={{ width: '100%', padding: '.65rem .85rem', border: '1px solid var(--border)', background: 'var(--bg-surface)', color: 'var(--text)', fontFamily: 'var(--font-s)', fontSize: '.85rem', outline: 'none' }}>
            {membros.map(m => <option key={m.id} value={m.id}>{m.display_name}</option>)}
          </select>
        </div>
        <button onClick={gerarPDF} disabled={gerando || !selId} className="btn-red" style={{ width: '100%' }}>{gerando ? 'Gerando...' : '📥 Exportar PDF'}</button>
      </div>
      <div className="card-dark" style={{ padding: '2rem' }}>
        <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.1rem', color: '#E53935', marginBottom: '1.25rem', fontWeight: 600 }}>Exportar CSV de Membros</div>
        <p style={{ fontSize: '.84rem', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '1.5rem' }}>Planilha com todos os membros reais do Supabase.</p>
        <button onClick={gerarCSV} className="btn-outline-red" style={{ width: '100%' }}>📊 Exportar CSV ({membros.length} membros)</button>
      </div>
    </div>
  )
}