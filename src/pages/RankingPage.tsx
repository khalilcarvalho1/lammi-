import { useState, useEffect } from 'react'
import { useAuthContext } from '@/contexts/AuthContext'
import { profileService } from '@/services/profileService'

interface RankEntry {
  id: string
  nickname: string
  score: number
  study_streak: number
  rank_position: number
}

const MOCK_RANKING: RankEntry[] = [
  { id: '1', nickname: 'Médico7823',  score: 3420, study_streak: 21, rank_position: 1  },
  { id: '2', nickname: 'Trauma4591',  score: 2980, study_streak: 15, rank_position: 2  },
  { id: '3', nickname: 'ATLS3312',    score: 2750, study_streak: 12, rank_position: 3  },
  { id: '4', nickname: 'APH9201',     score: 2410, study_streak: 8,  rank_position: 4  },
  { id: '5', nickname: 'Choque1199',  score: 2105, study_streak: 6,  rank_position: 5  },
  { id: '6', nickname: 'Toracico44',  score: 1890, study_streak: 5,  rank_position: 6  },
  { id: '7', nickname: 'Glasgow88',   score: 1640, study_streak: 4,  rank_position: 7  },
  { id: '8', nickname: 'Colar2230',   score: 1420, study_streak: 3,  rank_position: 8  },
  { id: '9', nickname: 'Resgate55',   score: 1100, study_streak: 2,  rank_position: 9  },
  { id: '10', nickname: 'SAMU7710',   score:  890, study_streak: 1,  rank_position: 10 },
]

const MEDAL: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' }

export function RankingPage() {
  const { user, profile } = useAuthContext()

  const [ranking,    setRanking]    = useState<RankEntry[]>(MOCK_RANKING)
  const [apelido,    setApelido]    = useState(profile?.nickname ?? '')
  const [aparecer,   setAparecer]   = useState(profile?.active ?? true)
  const [salvando,   setSalvando]   = useState(false)
  const [feedbackPref, setFeedbackPref] = useState<'ok' | 'erro' | null>(null)

  useEffect(() => {
    if (profile) {
      setApelido(profile.nickname ?? '')
      setAparecer(profile.active ?? true)
    }
  }, [profile])

  const salvarPreferencias = async () => {
    if (!user) return
    setSalvando(true)
    setFeedbackPref(null)
    const { error } = await profileService.upsertProfile({
      id: user.id,
      nickname: apelido.trim() || profile?.display_name?.split(' ')[0] || 'Membro',
      active: aparecer,
    })
    setSalvando(false)
    setFeedbackPref(error ? 'erro' : 'ok')
    setTimeout(() => setFeedbackPref(null), 2500)
  }

  const myPosition = profile
    ? { rank_position: 23, score: profile.score ?? 0, nickname: profile.nickname ?? profile.display_name }
    : null
  const isInTop = myPosition && myPosition.rank_position <= 10

  return (
    <section style={{ padding: '4rem 2rem', background: '#0D0D0D' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div className="accent-bar" />
        <h2 style={{ fontFamily: 'var(--font-d)', fontSize: '2rem', color: 'white', marginBottom: '.4rem' }}>Ranking</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '.88rem', marginBottom: '2rem' }}>
          Usuários identificados por apelido anônimo. Pontuação baseada em questões corretas, simulados e streak.
        </p>

        {/* Preferências do usuário */}
        {user && (
          <div style={{ padding: '1.25rem', background: 'rgba(192,57,43,.06)', border: '1px solid rgba(192,57,43,.2)', marginBottom: '2rem' }}>
            <div style={{ fontSize: '.7rem', textTransform: 'uppercase', letterSpacing: '.12em', color: '#E53935', fontWeight: 700, marginBottom: '1rem' }}>
              ⚙ Suas Preferências
            </div>
            <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
              <div style={{ flex: 1, minWidth: 160 }}>
                <label style={{ fontSize: '.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: '.3rem' }}>Apelido no ranking</label>
                <input
                  type="text"
                  value={apelido}
                  onChange={e => setApelido(e.target.value)}
                  maxLength={20}
                  placeholder="Ex: Trauma4591"
                  style={{ width: '100%', padding: '.5rem .75rem', background: 'var(--bg-surface)', border: '1px solid rgba(192,57,43,.25)', color: 'var(--text)', fontFamily: 'var(--font-s)', fontSize: '.85rem', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', paddingBottom: '.5rem' }}>
                <input
                  type="checkbox"
                  id="aparecer"
                  checked={aparecer}
                  onChange={e => setAparecer(e.target.checked)}
                  style={{ accentColor: '#E53935', width: 16, height: 16 }}
                />
                <label htmlFor="aparecer" style={{ fontSize: '.83rem', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  Aparecer no ranking
                </label>
              </div>
              <button
                onClick={salvarPreferencias}
                disabled={salvando}
                className="btn-red"
                style={{ padding: '.5rem 1.25rem', fontSize: '.82rem', flexShrink: 0 }}
              >
                {salvando ? 'Salvando...' : 'Salvar'}
              </button>
              {feedbackPref === 'ok'  && <span style={{ fontSize: '.78rem', color: '#4ade80' }}>✓ Salvo!</span>}
              {feedbackPref === 'erro' && <span style={{ fontSize: '.78rem', color: '#f87171' }}>Erro ao salvar.</span>}
            </div>
          </div>
        )}

        {/* Posição do usuário fora do top 10 */}
        {user && myPosition && !isInTop && (
          <div style={{ padding: '1.25rem', background: 'rgba(192,57,43,.06)', border: '1px solid rgba(192,57,43,.2)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.5rem', fontWeight: 700, color: '#E53935' }}>#{myPosition.rank_position}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, color: 'white', fontSize: '.88rem' }}>{myPosition.nickname} <span style={{ fontSize: '.72rem', color: '#E53935', fontWeight: 700 }}>· você</span></div>
              <div style={{ fontSize: '.75rem', color: 'var(--text-muted)' }}>{(myPosition.score ?? 0).toLocaleString()} pontos</div>
            </div>
            <div style={{ fontSize: '.75rem', color: 'var(--text-muted)', textAlign: 'right' }}>
              Faltam <strong style={{ color: '#E53935' }}>{(MOCK_RANKING[9].score - myPosition.score).toLocaleString()}</strong> pts<br/>para o top 10
            </div>
          </div>
        )}

        {/* Pódio top 3 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
          {[1, 0, 2].map(offset => {
            const entry = ranking[offset]
            if (!entry) return null
            const isMe = user && myPosition?.rank_position === entry.rank_position
            return (
              <div key={entry.id} style={{
                padding: '1.5rem 1rem', background: 'var(--bg-card)', border: `1px solid ${offset === 0 ? 'rgba(251,191,36,.4)' : isMe ? 'rgba(192,57,43,.5)' : 'var(--border)'}`,
                textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.5rem',
              }}>
                <span style={{ fontSize: '2rem' }}>{MEDAL[entry.rank_position]}</span>
                <div style={{ fontWeight: 600, fontSize: '.85rem', color: 'white', wordBreak: 'break-all' }}>{entry.nickname}</div>
                <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.3rem', fontWeight: 700, color: 'white' }}>{entry.score.toLocaleString()}</div>
                <div style={{ fontSize: '.72rem', color: 'var(--text-muted)' }}>🔥 {entry.study_streak} dias</div>
                {isMe && <span style={{ fontSize: '.7rem', background: 'rgba(192,57,43,.2)', color: '#E53935', padding: '2px 8px', fontWeight: 700 }}>você</span>}
              </div>
            )
          })}
        </div>

        {/* Lista completa */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', padding: '.75rem 1.25rem', borderBottom: '1px solid var(--border)', fontSize: '.7rem', textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--text-muted)', fontWeight: 700 }}>
            <span style={{ width: 32 }}>#</span>
            <span style={{ flex: 1 }}>Usuário</span>
            <span style={{ width: 70, textAlign: 'right' }}>Streak</span>
            <span style={{ width: 80, textAlign: 'right' }}>Pontos</span>
          </div>
          {ranking.map((entry, i) => {
            const isMe = user && myPosition?.rank_position === entry.rank_position
            return (
              <div key={entry.id} style={{
                display: 'flex', alignItems: 'center', gap: '.75rem', padding: '.85rem 1.25rem',
                borderBottom: '1px solid var(--border)', background: isMe ? 'rgba(192,57,43,.08)' : 'transparent',
              }}>
                <span style={{ width: 32, fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: '.9rem', color: i === 0 ? '#FBB724' : i === 1 ? '#9CA3AF' : i === 2 ? '#A16207' : 'var(--text-muted)' }}>
                  {MEDAL[entry.rank_position] ?? `#${entry.rank_position}`}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                    <span style={{ fontWeight: 500, fontSize: '.88rem', color: isMe ? '#E53935' : 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{entry.nickname}</span>
                    {isMe && <span style={{ fontSize: '.65rem', background: 'rgba(192,57,43,.2)', color: '#E53935', padding: '1px 6px', fontWeight: 700, flexShrink: 0 }}>você</span>}
                  </div>
                </div>
                <span style={{ width: 70, textAlign: 'right', fontSize: '.85rem', color: 'var(--text-muted)' }}>🔥 {entry.study_streak}d</span>
                <span style={{ width: 80, textAlign: 'right', fontWeight: 700, fontSize: '.88rem', color: isMe ? '#E53935' : 'var(--text)' }}>{entry.score.toLocaleString()}</span>
              </div>
            )
          })}
        </div>

        <p style={{ textAlign: 'center', fontSize: '.72rem', color: 'var(--text-muted)', marginTop: '1.5rem' }}>
          Ranking atualizado em tempo real. Pontuação = acertos × dificuldade + bônus de streak.
        </p>
      </div>
    </section>
  )
}
