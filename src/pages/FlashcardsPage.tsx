import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { THEMES, StudyTheme, Flashcard } from '@/services/supabaseClient'
import { temaLabel, resolverFiltroURL, filtroOrigemLabel, filtroOrigemCurto } from '@/utils/temaFilters'
import { calculateSM2, initSRSCard, isDue, SRSQuality, SRSCard } from '@/hooks/useSRS'
import { useStudyContext } from '@/contexts/StudyContext'
import { useAuthContext } from '@/contexts/AuthContext'
import { flashcardsService } from '@/services/flashcardsService'
import { studyLogService } from '@/services/studyLogService'
import { loadFlashcardsForFilter, getFlashcardThemeCounts } from '@/services/contentService'

export function FlashcardsPage() {
  const { srsData, setSrsData } = useStudyContext()
  const { user } = useAuthContext()

  // Lê ?theme=, ?tema= e ?area= da URL
  const [searchParams] = useSearchParams()
  const themeParam = searchParams.get('theme')
  const temaParam  = searchParams.get('tema')
  const areaParam  = searchParams.get('area')

  const [temasAtivos, setTemasAtivos] = useState<Set<StudyTheme>>(
    () => resolverFiltroURL(themeParam, temaParam, areaParam)
  )

  // Ressincroniza quando a URL muda com a página já montada
  useEffect(()=>{
    setTemasAtivos(resolverFiltroURL(themeParam, temaParam, areaParam))
  },[themeParam, temaParam, areaParam])

  const [flipped,   setFlipped]   = useState(false)
  const [idx,       setIdx]       = useState(0)
  const [done,      setDone]      = useState<string[]>([])
  const [summary,   setSummary]   = useState(false)
  // true = ignora o agendamento SM-2 e revisa todos os cards do filtro
  const [modoLivre, setModoLivre] = useState(false)
  const [syncing,   setSyncing]   = useState(false)

  // ─── Sincroniza estado SRS do Supabase na montagem ────────
  useEffect(() => {
    if (!user) return
    setSyncing(true)
    flashcardsService.getUserSRSStates(user.id).then(({ data }) => {
      if (data && data.length > 0) {
        setSrsData(local => {
          const merged: Record<string, SRSCard> = { ...local }
          data.forEach((row: any) => {
            const localCard = local[row.flashcard_id]
            if (!localCard || row.due_date >= localCard.due_date) {
              merged[row.flashcard_id] = {
                ease_factor: row.ease_factor,
                interval:    row.interval,
                repetitions: row.repetitions,
                due_date:    row.due_date,
              }
            }
          })
          return merged
        })
      }
      setSyncing(false)
    })
  }, [user])

  // Flashcards carregados sob demanda: só os arquivos relevantes ao filtro ativo
  // (ou todo o conteúdo publicado, se nenhum filtro estiver selecionado).
  const [flashcards, setFlashcards] = useState<Flashcard[]>([])
  const [loadingCards, setLoadingCards] = useState(true)
  useEffect(() => {
    let cancelado = false
    setLoadingCards(true)
    loadFlashcardsForFilter(temasAtivos)
      .then(fs => { if (!cancelado) setFlashcards(fs) })
      .catch(() => { if (!cancelado) setFlashcards([]) })
      .finally(() => { if (!cancelado) setLoadingCards(false) })
    return () => { cancelado = true }
  }, [temasAtivos])

  const todos     = flashcards.filter(f => temasAtivos.size === 0 || temasAtivos.has(f.theme))
  const pendentes = todos.filter(f => { const s = srsData[f.id]; return !s || isDue(s) })
  // No modo livre a fila é o baralho inteiro, ignorando a data de revisão
  const due       = modoLivre ? todos : pendentes

  // Trocar de tema sempre volta ao modo agendado
  useEffect(() => {
    setIdx(0); setDone([]); setSummary(false); setFlipped(false); setModoLivre(false)
  }, [temasAtivos])

  const current = due[idx] ?? null

  const iniciarSessao = (livre: boolean) => {
    setModoLivre(livre); setIdx(0); setDone([]); setSummary(false); setFlipped(false)
  }

  // Valor do <select>: '' = todos, '__multi__' = filtro de tema/área vindos da URL
  const selectValue = temasAtivos.size === 1
    ? [...temasAtivos][0]
    : temasAtivos.size > 1 ? '__multi__' : ''

  // Só lista no select temas que têm cards — contagem vem do manifesto (leve)
  const [cardThemeCounts, setCardThemeCounts] = useState<Record<string, number>>({})
  useEffect(() => {
    getFlashcardThemeCounts().then(setCardThemeCounts).catch(() => setCardThemeCounts({}))
  }, [])
  const temasComCards = useMemo(() => {
    return (Object.entries(THEMES) as [StudyTheme, string][]).filter(([k]) => (cardThemeCounts[k] || 0) > 0)
  }, [cardThemeCounts])

  const filtroOrigem = useMemo(
    ()=> filtroOrigemLabel(themeParam, temaParam, areaParam),
    [themeParam, temaParam, areaParam]
  )
  const filtroCurto = useMemo(
    ()=> filtroOrigemCurto(themeParam, temaParam, areaParam),
    [themeParam, temaParam, areaParam]
  )

  const responder = async (q: SRSQuality) => {
    if (!current) return
    const prev = srsData[current.id] ?? initSRSCard()
    const next = calculateSM2(prev, q)
    setSrsData(s => ({ ...s, [current.id]: next }))
    setDone(d => [...d, current.id])
    setFlipped(false)
    if (user) {
      flashcardsService.upsertSRSState(user.id, current.id, next)
      studyLogService.log(user.id, 'flashcard', 1, current.theme)
      studyLogService.updateProfileStreak(user.id)
    }
    setTimeout(() => {
      if (idx >= due.length - 1) setSummary(true)
      else setIdx(i => i + 1)
    }, 250)
  }

  const vencidos  = todos.filter(f => { const s = srsData[f.id]; return s && isDue(s) }).length
  const novos     = todos.filter(f => !srsData[f.id]).length
  const dominados = todos.filter(f => { const s = srsData[f.id]; return s && s.repetitions >= 3 }).length

  if (loadingCards) {
    return (
      <section style={{ padding: '4rem 2rem', background: '#0D0D0D' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⏳</div>
          <p>Carregando flashcards...</p>
        </div>
      </section>
    )
  }

  // ─── Tela de resumo ───────────────────────────────────────
  if (summary || (due.length === 0 && todos.length > 0)) {
    const corretos = done.filter(id => (srsData[id]?.repetitions ?? 0) > 0).length
    const nadaPendente = pendentes.length === 0 && done.length === 0
    return (
      <section style={{ padding: '4rem 2rem', background: '#0D0D0D' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div className="card-dark" style={{ padding: '3rem', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-d)', fontSize: '4rem', fontWeight: 700, color: '#E53935', marginBottom: '.5rem' }}>
              {nadaPendente ? '🎉' : Math.round((corretos / (done.length || 1)) * 100) + '%'}
            </div>
            <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.4rem', color: 'white', marginBottom: '.5rem' }}>
              {nadaPendente ? 'Tudo em dia!' : 'Sessão concluída'}
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '.88rem', marginBottom: '2rem' }}>
              {done.length > 0
                ? `${done.length} cards revisados · ${corretos} lembrados · SM-2 salvo ${user ? 'no servidor' : 'localmente'}`
                : `Nenhum card pendente hoje neste filtro · ${todos.length} cards no total.`}
            </p>
            {done.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', marginBottom: '2rem' }}>
                {[
                  { val: done.length,            lbl: 'Revisados',  col: '#E53935' },
                  { val: corretos,               lbl: 'Lembrados',  col: '#4ade80' },
                  { val: done.length - corretos, lbl: 'Para rever', col: '#f87171' },
                ].map((s, i) => (
                  <div key={i} className="card-dark" style={{ padding: '1rem', textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.75rem', fontWeight: 700, color: s.col }}>{s.val}</div>
                    <div style={{ fontSize: '.68rem', textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--text-muted)', marginTop: '.25rem' }}>{s.lbl}</div>
                  </div>
                ))}
              </div>
            )}
            {!user && (
              <p style={{ fontSize: '.75rem', color: 'var(--text-dim)', marginBottom: '1rem' }}>
                Progresso salvo localmente. <a href="/login" style={{ color: '#E53935' }}>Faça login</a> para sincronizar entre dispositivos.
              </p>
            )}
            {pendentes.length > 0 ? (
              <button className="btn-red" style={{ width: '100%' }} onClick={() => iniciarSessao(false)}>
                Continuar revisão ({pendentes.length} pendentes)
              </button>
            ) : (
              <button className="btn-red" style={{ width: '100%' }} onClick={() => iniciarSessao(true)} disabled={todos.length === 0}>
                Revisar todos os {todos.length} cards mesmo assim
              </button>
            )}
            {temasAtivos.size > 0 && (
              <button className="btn-ghost" style={{ width: '100%', marginTop: '.6rem', justifyContent: 'center' }}
                onClick={() => setTemasAtivos(new Set())}>
                Estudar todos os temas
              </button>
            )}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section style={{ padding: '4rem 2rem', background: '#0D0D0D' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div className="accent-bar" />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-d)', fontSize: '2rem', color: 'white', marginBottom: '.35rem' }}>Flashcards</h2>
            <p style={{ fontSize: '.88rem', color: 'rgba(240,240,240,.5)' }}>
              Repetição espaçada SM-2 {syncing ? '· sincronizando…' : user ? '· sincronizado' : '· local'}
              {modoLivre && ' · modo livre'}
            </p>
          </div>
          <select value={selectValue}
            onChange={e => {
              const v = e.target.value
              if (v === '__multi__') return
              setTemasAtivos(v ? new Set([v as StudyTheme]) : new Set())
            }}
            style={{ padding: '.65rem .9rem', border: '1px solid var(--border)', background: 'var(--bg-surface)', color: 'var(--text)', fontFamily: 'var(--font-s)', fontSize: '.88rem', outline: 'none', minWidth: 220 }}>
            <option value="">Todos os temas</option>
            {temasAtivos.size > 1 && (
              <option value="__multi__">{filtroCurto ?? 'Filtro ativo'} ({temasAtivos.size} subtemas)</option>
            )}
            {temasComCards.map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </div>

        {/* Aviso de filtro vindo do drill-down */}
        {filtroOrigem && temasAtivos.size > 0 && (
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:'1rem', flexWrap:'wrap', marginBottom:'1.5rem', padding:'.6rem .9rem', background:'rgba(192,57,43,.1)', border:'1px solid rgba(192,57,43,.3)' }}>
            <span style={{ fontSize:'.8rem', color:'var(--text)' }}>🎯 Filtrando por: <strong>{filtroOrigem}</strong> · {todos.length} cards</span>
            <button className="btn-ghost" style={{ fontSize:'.72rem', padding:'.3rem .7rem' }} onClick={()=>setTemasAtivos(new Set())}>Ver todos</button>
          </div>
        )}

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { lbl: 'Para hoje', val: pendentes.length, col: '#E53935' },
            { lbl: 'Novos',     val: novos,            col: 'var(--text)' },
            { lbl: 'Vencidos',  val: vencidos,         col: '#f87171' },
            { lbl: 'Dominados', val: dominados,        col: '#4ade80' },
          ].map((s, i) => (
            <div key={i} className="dash-card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--text-muted)', marginBottom: '.25rem' }}>{s.lbl}</div>
              <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.75rem', fontWeight: 700, color: s.col }}>{s.val}</div>
            </div>
          ))}
        </div>

        {/* Card */}
        {current ? (
          <>
            <div
              onClick={() => setFlipped(f => !f)}
              className="card-dark"
              style={{ padding: '3rem', minHeight: 260, cursor: 'pointer', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '1rem', userSelect: 'none', transition: 'all .2s', border: '1px solid rgba(192,57,43,.3)' }}
            >
              <div style={{ fontSize: '.65rem', textTransform: 'uppercase', letterSpacing: '.15em', color: '#E53935', fontWeight: 700 }}>
                {flipped ? 'Verso (resposta)' : 'Frente (pergunta)'}
              </div>
              <div className="tag-pill" style={{ fontSize: '.72rem' }}>{temaLabel(current.theme)}</div>
              <p style={{ fontSize: '1.15rem', color: 'white', lineHeight: 1.65, maxWidth: 560 }}>
                {flipped ? current.back : current.front}
              </p>
              <p style={{ fontSize: '.72rem', color: 'var(--text-dim)', marginTop: '.5rem' }}>
                {flipped ? '← Clique para ver a pergunta' : 'Clique para ver a resposta →'}
              </p>
            </div>

            {flipped && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '.75rem', marginTop: '1.25rem' }}>
                {[
                  { q: 0 as SRSQuality, lbl: 'Errei',  col: '#b23b3b', bg: 'rgba(178,59,59,.12)' },
                  { q: 1 as SRSQuality, lbl: 'Difícil', col: '#f87171', bg: 'rgba(248,113,113,.1)' },
                  { q: 2 as SRSQuality, lbl: 'Bom',     col: '#60a5fa', bg: 'rgba(96,165,250,.1)'  },
                  { q: 3 as SRSQuality, lbl: 'Fácil',   col: '#4ade80', bg: 'rgba(74,222,128,.1)'  },
                ].map(b => (
                  <button key={b.q} onClick={() => responder(b.q)}
                    style={{ padding: '.9rem', border: `1px solid ${b.col}`, background: b.bg, color: b.col, fontFamily: 'var(--font-s)', fontWeight: 700, fontSize: '.88rem', cursor: 'pointer', transition: 'all .15s' }}>
                    {b.lbl}
                  </button>
                ))}
              </div>
            )}
            {!flipped && (
              <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                <span style={{ fontSize: '.75rem', color: 'var(--text-dim)' }}>
                  Card {idx + 1} de {due.length} · Clique no card para revelar
                </span>
              </div>
            )}
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem', background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎴</div>
            <p style={{ color: 'var(--text-muted)' }}>Nenhum flashcard disponível para este tema.</p>
          </div>
        )}
      </div>
    </section>
  )
}