import { useState, useEffect } from 'react'
import { useAuthContext } from '@/contexts/AuthContext'
import { profileService } from '@/services/profileService'

interface RankingEntry {
  id: string
  nickname: string
  score: number
  study_streak: number
}

const BADGES = ['🏆', '🥈', '🥉']

export function RankingPage() {
  const { user } = useAuthContext()
  const [ranking,  setRanking]  = useState<RankingEntry[]>([])
  const [loading,  setLoading]  = useState(true)
  const [minhaPos, setMinhaPos] = useState<number | null>(null)

  useEffect(() => {
    profileService.getRanking().then(({ data }) => {
      if (data) {
        setRanking(data as RankingEntry[])
        if (user) {
          const pos = (data as RankingEntry[]).findIndex(r => r.id === user.id)
          setMinhaPos(pos >= 0 ? pos + 1 : null)
        }
      }
      setLoading(false)
    })
  }, [user])

  const top3 = ranking.slice(0, 3)
  const userEntry   = user ? ranking.find(r => r.id === user.id) : null
  const userNoTop10 = minhaPos !== null && minhaPos > 10

  if (loading) return (
    <section style={{ padding: '4rem 2rem', background: '#0D0D0D', textAlign: 'center' }}>
      <p style={{ color: 'var(--text-muted)' }}>Carregando ranking...</p>
    </section>
  )

  return (
    <section style={{ padding: '4rem 2rem', background: '#0D0D0D' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div className="accent-bar" />
        <h2 style={{ fontFamily: 'var(--font-d)', fontSize: '2rem', color: 'white', marginBottom: '.35rem' }}>Ranking</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '.88rem', marginBottom: '2rem' }}>
          Classificação anônima por pontuação · {ranking.length} membros ativos
        </p>

        {ranking.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🏆</div>
            <p style={{ color: 'var(--text-muted)' }}>Nenhum membro com pontuação ainda. Seja o primeiro!</p>
          </div>
        ) : (
          <>
            {top3.length >= 3 && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                {[top3[1], top3[0], top3[2]].map((r) => {
                  const pos    = ranking.indexOf(r) + 1
                  const isUser = user?.id === r.id
                  return (
                    <div key={r.id} className="card-dark" style={{
                      padding: '1.5rem', textAlign: 'center',
                      borderColor: pos === 1 ? 'rgba(229,57,53,.6)' : 'var(--border)',
                      background: isUser ? 'rgba(192,57,43,.1)' : 'var(--bg-card)',
                    }}>
                      <div style={{ fontSize: '2rem', marginBottom: '.5rem' }}>{BADGES[pos - 1]}</div>
                      <div style={{ fontFamily: 'var(--font-d)', fontSize: '1rem', color: isUser ? '#E53935' : 'white', fontWeight: 600 }}>
                        {r.nickname}{isUser ? ' (você)' : ''}
                      </div>
                      <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.6rem', color: '#E53935', fontWeight: 700, margin: '.35rem 0' }}>
                        {r.score.toLocaleString()}
                      </div>
                      <div style={{ fontSize: '.7rem', color: 'var(--text-dim)' }}>🔥 {r.study_streak} dias</div>
                    </div>
                  )
                })}
              </div>
            )}

            <div className="card-dark" style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr auto auto', gap: '1rem', padding: '.75rem 1.25rem', borderBottom: '1px solid var(--border)', fontSize: '.68rem', textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--text-dim)', fontWeight: 700 }}>
                <span>#</span><span>Apelido</span><span>Streak</span><span>Pontos</span>
              </div>
              {ranking.slice(0, 50).map((r, i) => {
                const isUser = user?.id === r.id
                return (
                  <div key={r.id} style={{
                    display: 'grid', gridTemplateColumns: '40px 1fr auto auto', gap: '1rem',
                    padding: '.9rem 1.25rem',
                    borderBottom: i < ranking.length - 1 ? '1px solid rgba(192,57,43,.1)' : 'none',
                    alignItems: 'center',
                    background: isUser ? 'rgba(192,57,43,.08)' : 'transparent',
                  }}>
                    <span style={{ fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: '1rem', color: i < 3 ? '#E53935' : 'var(--text-dim)' }}>
                      {BADGES[i] || i + 1}
                    </span>
                    <span style={{ fontWeight: isUser ? 700 : 500, color: isUser ? '#E53935' : 'var(--text)', fontSize: '.88rem' }}>
                      {r.nickname}{isUser ? ' (você)' : ''}
                    </span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '.82rem' }}>🔥 {r.study_streak}</span>
                    <span style={{ fontFamily: 'var(--font-d)', color: '#E53935', fontWeight: 700, fontSize: '1rem' }}>
                      {r.score.toLocaleString()}
                    </span>
                  </div>
                )
              })}
            </div>

            {userNoTop10 && userEntry && (
              <div style={{ border: '1px solid rgba(192,57,43,.4)', background: 'rgba(192,57,43,.08)', padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '.7rem', textTransform: 'uppercase', letterSpacing: '.1em', color: '#E53935', fontWeight: 700, marginBottom: '.5rem' }}>Sua posição</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'var(--font-d)', fontSize: '1.6rem', fontWeight: 700, color: '#E53935' }}>#{minhaPos}</span>
                  <span style={{ color: 'var(--text)', fontWeight: 600 }}>{userEntry.nickname}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '.85rem' }}>🔥 {userEntry.study_streak} streak</span>
                  <span style={{ fontFamily: 'var(--font-d)', color: '#E53935', fontWeight: 700 }}>{userEntry.score.toLocaleString()} pts</span>
                  {ranking[minhaPos - 2] && (
                    <span style={{ fontSize: '.78rem', color: 'var(--text-dim)' }}>
                      faltam {(ranking[minhaPos - 2].score - userEntry.score).toLocaleString()} pts para subir
                    </span>
                  )}
                </div>
              </div>
            )}

            {!user && (
              <p style={{ textAlign: 'center', fontSize: '.82rem', color: 'var(--text-dim)' }}>
                <a href="/login" style={{ color: '#E53935' }}>Faça login</a> para ver sua posição.
              </p>
            )}
          </>
        )}
      </div>
    </section>
  )
}
