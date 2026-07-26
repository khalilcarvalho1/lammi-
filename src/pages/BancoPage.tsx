import { useState, useMemo, useEffect, useCallback, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAuthContext } from '@/contexts/AuthContext'
import { useStudyContext } from '@/contexts/StudyContext'
import { THEMES, StudyTheme, Question } from '@/services/supabaseClient'
import { temaLabel, resolverFiltroURL, filtroOrigemLabel, temaIdsDeArea } from '@/utils/temaFilters'
import { questionsService } from '@/services/questionsService'
import { studyLogService } from '@/services/studyLogService'
import { supabase } from '@/services/supabaseClient'
import { loadQuestionsForFilter, getQuestionThemeCounts, getManifest } from '@/services/contentService'

const TEMA_ICONS: Record<string, string> = {
  avaliacao_cena: '🩺', cinetica_trauma: '💥', atls_inicial: '⚕️',
  atls_via_aerea: '🫁', atls_face: '😶', atls_pescoco: '🔴',
  atls_toracico: '🫀', atls_choque: '🩸', atls_abdominal: '🟥',
  atls_genitourinario: '🔵', atls_cranioencefalico: '🧠', atls_coluna: '🦴',
}
const NIVEL_LABELS: Record<string, string> = {
  facil: '✦ Fácil', medio: '✦✦ Médio', dificil: '✦✦✦ Difícil',
}
function toggleSet<T>(s: Set<T>, item: T): Set<T> {
  const n = new Set(s); n.has(item) ? n.delete(item) : n.add(item); return n
}

// ─── Modal de reportar erro ────────────────────────────────────────────────
function ReportarErroModal({
  questionId,
  onClose,
}: {
  questionId: string
  onClose: () => void
}) {
  const { user } = useAuthContext()
  const [tipo, setTipo] = useState('gabarito_errado')
  const [descricao, setDescricao] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)

  const enviar = async () => {
    if (!descricao.trim()) return
    setEnviando(true)
    try {
      await supabase.from('question_reports').insert({
        question_id: questionId,
        user_id: user?.id ?? null,
        tipo,
        descricao: descricao.trim(),
      })
      setEnviado(true)
      setTimeout(onClose, 1500)
    } catch {
      // falha silenciosa — relatório é não crítico
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
    }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div style={{
        background: 'var(--bg-surface)', border: '1px solid var(--border)',
        padding: '1.5rem', maxWidth: 420, width: '100%',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ fontFamily: 'var(--font-d)', fontSize: '1rem', color: 'var(--text)', fontWeight: 700 }}>
            🚩 Reportar erro nesta questão
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem', color: 'var(--text-muted)' }}>✕</button>
        </div>

        {enviado ? (
          <div style={{ textAlign: 'center', padding: '1rem 0', color: '#4ade80', fontWeight: 700 }}>
            ✓ Relatório enviado. Obrigado!
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '.75rem' }}>
              <div style={{ fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--text-muted)', marginBottom: '.4rem' }}>Tipo de erro</div>
              <select value={tipo} onChange={e => setTipo(e.target.value)}
                style={{ width: '100%', padding: '.5rem .75rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-s)', fontSize: '.85rem', outline: 'none' }}>
                <option value="gabarito_errado">Gabarito errado</option>
                <option value="enunciado_incompleto">Enunciado incompleto ou cortado</option>
                <option value="alternativa_errada">Alternativa incorreta ou faltando</option>
                <option value="comentario_errado">Comentário / explicação incorreta</option>
                <option value="questao_duplicada">Questão duplicada</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--text-muted)', marginBottom: '.4rem' }}>Descreva o problema</div>
              <textarea
                value={descricao}
                onChange={e => setDescricao(e.target.value)}
                onKeyDown={e => e.stopPropagation()}
                placeholder="Ex: o gabarito correto deveria ser B, pois..."
                rows={3}
                style={{ width: '100%', padding: '.6rem .85rem', resize: 'vertical', background: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-s)', fontSize: '.85rem', lineHeight: 1.6, outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '.5rem' }}>
              <button
                onClick={enviar}
                disabled={enviando || !descricao.trim()}
                className="btn-red"
                style={{ flex: 1, opacity: !descricao.trim() ? .5 : 1 }}
              >
                {enviando ? 'Enviando...' : '📤 Enviar relatório'}
              </button>
              <button onClick={onClose} className="btn-ghost" style={{ padding: '.5rem 1rem' }}>Cancelar</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ─── Anotação por questão ──────────────────────────────────────────────────
function AnotacaoQuestao({ questionId }: { questionId: string }) {
  const key = `lammi_nota_${questionId}`
  const [texto, setTexto] = useState(() => localStorage.getItem(key) || '')
  const [editando, setEditando] = useState(false)
  const [draft, setDraft] = useState('')
  const ref = useRef<HTMLTextAreaElement>(null)
  useEffect(() => { setTexto(localStorage.getItem(key) || ''); setEditando(false) }, [questionId])
  const abrir = () => { setDraft(texto); setEditando(true); setTimeout(() => ref.current?.focus(), 50) }
  const salvar = () => { const v = draft.trim(); localStorage.setItem(key, v); setTexto(v); setEditando(false) }
  if (editando) return (
    <div style={{ marginTop: '.75rem', background: 'rgba(192,57,43,.06)', border: '1px solid rgba(192,57,43,.2)', padding: '1rem' }}>
      <div style={{ fontSize: '.68rem', textTransform: 'uppercase', letterSpacing: '.1em', color: 'rgba(229,57,53,.7)', fontWeight: 700, marginBottom: '.5rem' }}>✏️ Minha anotação</div>
      <textarea ref={ref} value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => e.stopPropagation()}
        placeholder="Escreva sua anotação pessoal sobre esta questão..." rows={3}
        style={{ width: '100%', padding: '.6rem .85rem', resize: 'vertical', background: 'var(--bg-surface)', border: '1px solid rgba(192,57,43,.25)', color: 'var(--text)', fontFamily: 'var(--font-s)', fontSize: '.85rem', lineHeight: 1.6, outline: 'none', boxSizing: 'border-box' }} />
      <div style={{ display: 'flex', gap: '.5rem', marginTop: '.5rem' }}>
        <button onClick={salvar} className="btn-red" style={{ fontSize: '.78rem', padding: '.35rem .9rem' }}>💾 Salvar</button>
        <button onClick={() => setEditando(false)} className="btn-ghost" style={{ fontSize: '.78rem', padding: '.35rem .9rem' }}>Cancelar</button>
      </div>
    </div>
  )
  if (texto) return (
    <div style={{ marginTop: '.75rem', background: 'rgba(192,57,43,.06)', border: '1px solid rgba(192,57,43,.2)', padding: '.75rem 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
        <div>
          <div style={{ fontSize: '.68rem', textTransform: 'uppercase', letterSpacing: '.1em', color: 'rgba(229,57,53,.65)', fontWeight: 700, marginBottom: '.3rem' }}>📌 Minha anotação</div>
          <div style={{ fontSize: '.85rem', color: 'var(--text)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{texto}</div>
        </div>
        <button onClick={abrir} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '.75rem', color: 'rgba(229,57,53,.5)', flexShrink: 0 }}>✏️ Editar</button>
      </div>
    </div>
  )
  return (
    <button onClick={abrir} style={{ marginTop: '.75rem', width: '100%', padding: '.5rem 1rem', border: '1px dashed rgba(192,57,43,.25)', background: 'transparent', color: 'rgba(229,57,53,.45)', fontSize: '.78rem', cursor: 'pointer', fontFamily: 'var(--font-s)', textAlign: 'left' }}>
      ✏️ Adicionar anotação pessoal...
    </button>
  )
}

// ─── Componente principal ──────────────────────────────────────────────────
export function BancoPage() {
  const { user } = useAuthContext()
  const { historico, setHistorico } = useStudyContext()

  const [marcadas, setMarcadas] = useState<Set<string>>(() => {
    try { return new Set(JSON.parse(localStorage.getItem('lammi_marcadas') || '[]')) } catch { return new Set() }
  })
  useEffect(() => { localStorage.setItem('lammi_marcadas', JSON.stringify([...marcadas])) }, [marcadas])

  // Lê ?theme=, ?tema= e ?area= da URL
  const [searchParams] = useSearchParams()
  const themeParam = searchParams.get('theme')
  const temaParam = searchParams.get('tema')
  const areaParam = searchParams.get('area')

  const [filtroTemas, setFiltroTemas] = useState<Set<StudyTheme>>(
    () => resolverFiltroURL(themeParam, temaParam, areaParam)
  )
  useEffect(() => {
    setFiltroTemas(resolverFiltroURL(themeParam, temaParam, areaParam))
  }, [themeParam, temaParam, areaParam])

  const [filtroNiveis, setFiltroNiveis] = useState<Set<string>>(new Set())
  const [filtroRes, setFiltroRes] = useState('todas')
  const [busca, setBusca] = useState('')
  const [idx, setIdx] = useState(0)
  const [feedback, setFeedback] = useState(false)
  const [sel, setSel] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(true)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900)
  const [reportando, setReportando] = useState<string | null>(null) // id da questão sendo reportada

  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth <= 900)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])

  // Contagem por tema vem do manifesto (leve — não baixa o conteúdo completo)
  const [temaCount, setTemaCount] = useState<Record<string, number>>({})
  const [totalBanco, setTotalBanco] = useState(0)
  useEffect(() => {
    getQuestionThemeCounts().then(setTemaCount).catch(() => setTemaCount({}))
    getManifest().then(m => setTotalBanco(m.totalQuestions)).catch(() => setTotalBanco(0))
  }, [])

  // Questões carregadas sob demanda: só os arquivos relevantes ao filtro ativo
  // (ou todo o conteúdo publicado, se nenhum filtro estiver selecionado).
  const [questions, setQuestions] = useState<Question[]>([])
  const [loadingQuestions, setLoadingQuestions] = useState(true)
  useEffect(() => {
    let cancelado = false
    setLoadingQuestions(true)
    loadQuestionsForFilter(filtroTemas)
      .then(qs => { if (!cancelado) setQuestions(qs) })
      .catch(() => { if (!cancelado) setQuestions([]) })
      .finally(() => { if (!cancelado) setLoadingQuestions(false) })
    return () => { cancelado = true }
  }, [filtroTemas])

  const temasVisiveis = useMemo(() => {
    const temasArea = areaParam ? temaIdsDeArea(areaParam) : null
    return (Object.entries(THEMES) as [StudyTheme, string][])
      .filter(([t]) => {
        if (temasArea) return temasArea.has(t)
        return (temaCount[t] || 0) > 0 || filtroTemas.has(t)
      })
  }, [temaCount, filtroTemas, areaParam])

  const filtradas = useMemo(() => {
    const bl = busca.trim().toLowerCase()
    return questions.filter(q => {
      if (bl && !q.statement.toLowerCase().includes(bl) && !(q.explanation ?? '').toLowerCase().includes(bl)) return false
      if (filtroRes === 'respondidas' && !historico[q.id]) return false
      if (filtroRes === 'nao_respondidas' && historico[q.id]) return false
      if (filtroRes === 'erradas' && (!historico[q.id] || historico[q.id].acertou)) return false
      if (filtroRes === 'marcadas' && !marcadas.has(q.id)) return false
      if (filtroTemas.size > 0 && !filtroTemas.has(q.theme)) return false
      if (filtroNiveis.size > 0 && !filtroNiveis.has(q.difficulty)) return false
      return true
    })
  }, [questions, filtroTemas, filtroNiveis, filtroRes, historico, marcadas, busca])

  useEffect(() => { setIdx(0); setFeedback(false); setSel(null) }, [filtroTemas, filtroNiveis, filtroRes, busca])
  useEffect(() => { setSel(null); setFeedback(false) }, [idx])

  const q = filtradas[idx] ?? null
  const total = filtradas.length
  const acertos = Object.values(historico).filter(h => h.acertou).length
  const resp = Object.keys(historico).length
  const estaMarcada = q && marcadas.has(q.id)

  const confirmar = useCallback(async () => {
    if (!q || !sel || feedback) return
    const ok = sel === q.correct_key
    setHistorico(h => ({ ...h, [q.id]: { selecionada: sel, acertou: h[q.id] ? h[q.id].acertou : ok, em: h[q.id]?.em || new Date().toISOString() } }))
    setFeedback(true)
    if (user) {
      await questionsService.recordAnswer(user.id, q.id, sel, ok)
      await studyLogService.log(user.id, 'question', 1, q.theme)
      await studyLogService.updateProfileStreak(user.id)
    }
  }, [q, sel, feedback, setHistorico, user])

  const toggleMarcada = useCallback(() => {
    if (!q) return
    setMarcadas(prev => { const n = new Set(prev); n.has(q.id) ? n.delete(q.id) : n.add(q.id); return n })
  }, [q])

  const limparFiltros = () => { setFiltroTemas(new Set()); setFiltroNiveis(new Set()); setFiltroRes('todas'); setBusca('') }

  const filtroOrigem = useMemo(
    () => filtroOrigemLabel(themeParam, temaParam, areaParam),
    [themeParam, temaParam, areaParam]
  )

  const qtdErros = Object.values(historico).filter(h => !h.acertou).length

  return (
    <section style={{ padding: isMobile ? '1.5rem 1rem' : '3rem 2rem', background: 'var(--bg)' }}>
      {reportando && (
        <ReportarErroModal questionId={reportando} onClose={() => setReportando(null)} />
      )}

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        <div style={{ marginBottom: '1.75rem' }}>
          <div className="accent-bar" />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-d)', fontSize: isMobile ? '1.5rem' : '2rem', color: 'var(--text)', marginBottom: '.35rem' }}>Banco de Questões</h2>
              <p style={{ fontSize: '.88rem', color: 'var(--text-muted)' }}>Medicina Militar · ATLS · TCCC · PHTLS · {totalBanco} questões</p>
            </div>
            {qtdErros > 0 && (
              <a href="/revisao-erros" style={{ textDecoration: 'none' }}>
                <button className="btn-ghost" style={{ fontSize: '.82rem', display: 'flex', alignItems: 'center', gap: '.4rem' }}>
                  ❌ Revisar {qtdErros} erro{qtdErros !== 1 ? 's' : ''}
                </button>
              </a>
            )}
          </div>
        </div>

        {filtroOrigem && filtroTemas.size > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.25rem', padding: '.6rem .9rem', background: 'rgba(192,57,43,.1)', border: '1px solid rgba(192,57,43,.3)' }}>
            <span style={{ fontSize: '.8rem', color: 'var(--text)' }}>🎯 Filtrando por: <strong>{filtroOrigem}</strong> · {total} questões</span>
            <button className="btn-ghost" style={{ fontSize: '.72rem', padding: '.3rem .7rem' }} onClick={() => setFiltroTemas(new Set())}>Ver todas</button>
          </div>
        )}

        {resp > 0 && (
          <div className="desemp-strip" style={{ marginBottom: '1.5rem' }}>
            {[{ val: acertos, lbl: 'Acertos', color: 'var(--red-bright)' }, { val: resp - acertos, lbl: 'Erros', color: 'var(--text-muted)' }, { val: resp, lbl: 'Respondidas', color: 'var(--text-muted)' }, { val: Math.round(acertos / resp * 100) + '%', lbl: 'Aproveitamento', color: 'var(--red-bright)' }].map((d, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div className="desemp-val" style={{ color: d.color }}>{d.val}</div>
                <div className="desemp-lbl">{d.lbl}</div>
              </div>
            ))}
          </div>
        )}

        {isMobile && (
          <button className="btn-ghost" style={{ marginBottom: '1rem', width: '100%', justifyContent: 'center' }} onClick={() => setShowFilters(v => !v)}>
            {showFilters ? '▲ Ocultar filtros' : '▼ Mostrar filtros'}
          </button>
        )}

        <div style={{ marginBottom: '1rem' }}>
          <input type="text" placeholder="🔍 Buscar por texto, palavra-chave..." value={busca}
            onChange={e => { setBusca(e.target.value); setIdx(0) }}
            style={{ width: '100%', padding: '.6rem 1rem', border: '1px solid var(--border)', background: 'var(--bg-surface)', color: 'var(--text)', fontFamily: 'var(--font-s)', fontSize: '.9rem', outline: 'none', transition: 'border .2s' }}
            onFocus={e => (e.target.style.borderColor = 'var(--red)')}
            onBlur={e => (e.target.style.borderColor = 'var(--border)')}
          />
        </div>

        <div className="banco-grid">
          {(!isMobile || showFilters) && (
            <aside className="filtros-panel">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div className="filtros-title" style={{ margin: 0, padding: 0, border: 'none' }}>Filtros</div>
                <button className="btn-ghost" style={{ fontSize: '.7rem', padding: '.3rem .7rem' }} onClick={limparFiltros}>Limpar</button>
              </div>

              <button onClick={() => setFiltroRes(v => v === 'marcadas' ? 'todas' : 'marcadas')} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '.5rem .75rem', marginBottom: '.5rem', border: '1px solid', borderColor: filtroRes === 'marcadas' ? 'var(--red)' : 'var(--border)', background: filtroRes === 'marcadas' ? 'rgba(192,57,43,.15)' : 'transparent', cursor: 'pointer', fontSize: '.82rem', color: 'var(--text)' }}>
                <span>⭐ Marcadas para revisar</span>
                <span className="count-badge">{marcadas.size}</span>
              </button>

              <div className="filtro-label">Status</div>
              {[{ val: 'todas', lbl: '📋 Todas', count: totalBanco }, { val: 'nao_respondidas', lbl: '🆕 Não respondidas', count: Math.max(0, totalBanco - resp) }, { val: 'respondidas', lbl: '✓ Já respondidas', count: resp }, { val: 'erradas', lbl: '❌ Erradas', count: Object.values(historico).filter(h => !h.acertou).length }].map(({ val, lbl, count }) => (
                <button key={val} onClick={() => setFiltroRes(val)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '.5rem .75rem', marginBottom: '.35rem', border: '1px solid', borderColor: filtroRes === val ? 'var(--red)' : 'var(--border)', background: filtroRes === val ? 'var(--red)' : 'transparent', cursor: 'pointer', fontSize: '.82rem', color: filtroRes === val ? 'white' : 'var(--text)' }}>
                  <span>{lbl}</span>
                  <span className="count-badge" style={filtroRes === val ? { background: 'rgba(255,255,255,.2)', color: 'white' } : {}}>{count}</span>
                </button>
              ))}

              <div className="filtro-label">Temas</div>
              {temasVisiveis.map(([t, label]) => (
                <button key={t} className={`tema-btn ${filtroTemas.has(t) ? 'active' : ''}`} onClick={() => setFiltroTemas(s => toggleSet(s, t))}>
                  <span style={{ fontSize: '.78rem' }}>{TEMA_ICONS[t] ?? '📋'} {label}</span>
                  <span className="count-badge">{temaCount[t] || 0}</span>
                </button>
              ))}
              {temasVisiveis.length === 0 && (
                <span style={{ fontSize: '.72rem', color: 'var(--text-dim)' }}>Nenhum tema com questões ainda</span>
              )}

              <div className="filtro-label">Dificuldade</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {(['facil', 'medio', 'dificil'] as const).map(n => (
                  <button key={n} className={`nivel-chip ${filtroNiveis.has(n) ? 'active-' + n[0] : ''}`} onClick={() => setFiltroNiveis(s => toggleSet(s, n))}>
                    {NIVEL_LABELS[n]}
                  </button>
                ))}
              </div>

              <div className="filtro-label" style={{ marginTop: '1.25rem' }}>Navegação ({total} questões)</div>
              <div className="q-grid-container">
                {filtradas.map((qt, i) => {
                  const h = historico[qt.id]
                  let cls = 'q-nav-dot'
                  if (i === idx) cls += ' current'
                  if (h) cls += h.acertou ? ' answered-correct' : ' answered-wrong'
                  return (
                    <button key={qt.id} className={cls} title={`Q${i + 1} · ${temaLabel(qt.theme)}${marcadas.has(qt.id) ? ' · ⭐' : ''}`}
                      onClick={() => setIdx(i)} style={marcadas.has(qt.id) ? { outline: '2px solid var(--red-bright)', outlineOffset: 1 } : {}}>
                      {i + 1}
                    </button>
                  )
                })}
                {total === 0 && <span style={{ fontSize: '.75rem', color: 'var(--text-dim)' }}>Nenhuma questão</span>}
              </div>
            </aside>
          )}

          <div>
            {loadingQuestions ? (
              <div className="questao-card" style={{ textAlign: 'center', padding: '4rem' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⏳</div>
                <p style={{ color: 'var(--text-muted)', fontSize: '.88rem' }}>Carregando questões...</p>
              </div>
            ) : !q ? (
              <div className="questao-card" style={{ textAlign: 'center', padding: '4rem' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔍</div>
                <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.2rem', color: 'var(--text)', marginBottom: '.5rem' }}>Nenhuma questão encontrada</div>
                <p style={{ color: 'var(--text-muted)', fontSize: '.88rem' }}>Ajuste os filtros para ver questões.</p>
              </div>
            ) : (
              <div className="questao-card">
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${((idx + 1) / total) * 100}%` }} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: 8 }}>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    <span className="tag-pill">{TEMA_ICONS[q.theme] ?? '📋'} {temaLabel(q.theme)}</span>
                    <span className={`tag-pill ${q.difficulty === 'facil' ? 'tag-green' : ''}`}>{NIVEL_LABELS[q.difficulty]}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    {/* Reportar erro — discreto, aparece sempre */}
                    <button
                      onClick={() => setReportando(q.id)}
                      title="Reportar erro nesta questão"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '.85rem', padding: '2px 4px', opacity: .35, transition: 'opacity .2s' }}
                      onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                      onMouseLeave={e => (e.currentTarget.style.opacity = '.35')}
                    >
                      🚩
                    </button>
                    <button onClick={toggleMarcada} title={estaMarcada ? 'Remover marcação' : 'Marcar para revisar'}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', padding: '2px 4px', opacity: estaMarcada ? 1 : 0.3, transform: estaMarcada ? 'scale(1.2)' : 'scale(1)', transition: 'all .2s' }}>⭐</button>
                    <span style={{ fontSize: '.78rem', color: 'var(--text-muted)', fontWeight: 500 }}>Questão {idx + 1} / {total}</span>
                  </div>
                </div>

                <p className="enunciado">{q.statement}</p>

                {q.image_url && (
                  <div style={{ margin: '0 0 1rem', textAlign: 'center' }}>
                    <img
                      src={q.image_url}
                      alt="Imagem da questão"
                      style={{ maxWidth: '100%', border: '1px solid var(--border)', borderRadius: 4 }}
                    />
                  </div>
                )}

                <div>
                  {q.alternatives.map(({ key: letra, text: texto }) => {
                    let cls = 'alt-btn'
                    if (feedback) {
                      if (letra === q.correct_key) cls += ' correct'
                      else if (letra === sel && letra !== q.correct_key) cls += ' wrong'
                    } else if (sel === letra) cls += ' selected-pending'
                    return (
                      <button key={letra} className={cls} onClick={() => { if (!feedback) setSel(letra) }}>
                        <span className="alt-letter">{letra}</span>
                        <span>{texto}</span>
                        {feedback && letra === q.correct_key && <span style={{ marginLeft: 'auto', fontSize: '.8rem' }}>✓</span>}
                        {feedback && letra === sel && letra !== q.correct_key && <span style={{ marginLeft: 'auto', fontSize: '.8rem' }}>✗</span>}
                      </button>
                    )
                  })}
                </div>

                {sel && !feedback && (
                  <button onClick={confirmar} className="btn-red" style={{ width: '100%', marginTop: '1rem', fontWeight: 700 }}>
                    Confirmar resposta
                  </button>
                )}

                {feedback && (
                  <div style={{ marginTop: '.75rem', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', padding: '.6rem .9rem', background: historico[q.id]?.acertou ? 'rgba(47,122,63,.12)' : 'rgba(178,59,59,.1)', border: `1px solid ${historico[q.id]?.acertou ? '#2f7a3f' : '#b23b3b'}` }}>
                    {historico[q.id]?.acertou
                      ? <span style={{ fontSize: '.9rem', color: '#4ade80', fontWeight: 700 }}>✓ Correto!</span>
                      : <span style={{ fontSize: '.9rem', color: '#f87171', fontWeight: 700 }}>✗ Incorreto</span>
                    }
                  </div>
                )}

                {historico[q.id] && !feedback && !sel && (
                  <div style={{ marginTop: '.5rem' }}>
                    <span style={{ fontSize: '.73rem', color: 'var(--text-dim)', fontStyle: 'italic' }}>✓ Já respondida anteriormente</span>
                  </div>
                )}

                {feedback && q.explanation && (
                  <div className="explicacao-box" style={{ marginTop: '1rem' }}>
                    <div className="explicacao-label">📋 Comentário</div>
                    <p style={{ fontSize: '.88rem', color: 'var(--text)', lineHeight: 1.75 }}>{q.explanation}</p>
                  </div>
                )}

                {feedback && <AnotacaoQuestao questionId={q.id} />}

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)', gap: 8 }}>
                  <button className="btn-ghost" onClick={() => setIdx(i => Math.max(0, i - 1))} disabled={idx === 0} style={{ opacity: idx === 0 ? .35 : 1 }}>← Anterior</button>
                  <button className="btn-ghost" onClick={() => setIdx(i => Math.min(total - 1, i + 1))} disabled={idx === total - 1} style={{ opacity: idx === total - 1 ? .35 : 1 }}>Próxima →</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}