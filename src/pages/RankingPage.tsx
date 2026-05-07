import { useState } from 'react'

const RANKING_MOCK = [
  { pos:1, nome:'Maj. Silva',    pontos:2840, questoes:156, acertos:134, badge:'🏆' },
  { pos:2, nome:'Cap. Ferreira', pontos:2650, questoes:142, acertos:118, badge:'🥈' },
  { pos:3, nome:'Ten. Oliveira', pontos:2480, questoes:138, acertos:112, badge:'🥉' },
  { pos:4, nome:'Sgt. Costa',    pontos:2210, questoes:125, acertos:98,  badge:''   },
  { pos:5, nome:'Cb. Santos',    pontos:1980, questoes:115, acertos:89,  badge:''   },
  { pos:6, nome:'Sd. Lima',      pontos:1750, questoes:98,  acertos:72,  badge:''   },
  { pos:7, nome:'Ten. Rocha',    pontos:1620, questoes:90,  acertos:65,  badge:''   },
  { pos:8, nome:'Sgt. Alves',    pontos:1440, questoes:82,  acertos:58,  badge:''   },
]

export function RankingPage() {
  return (
    <section style={{ padding: '4rem 2rem', background: '#0D0D0D' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div className="accent-bar" />
        <h2 style={{ fontFamily: 'var(--font-d)', fontSize: '2rem', color: 'white', marginBottom: '.35rem' }}>Ranking</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '.88rem', marginBottom: '2rem' }}>Classificação anônima por desempenho no banco de questões</p>

        {/* Pódio top 3 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[RANKING_MOCK[1], RANKING_MOCK[0], RANKING_MOCK[2]].map((r, i) => (
            <div key={r.pos} className="card-dark" style={{
              padding: '1.5rem', textAlign: 'center',
              borderColor: r.pos === 1 ? 'rgba(229,57,53,.6)' : 'var(--border)',
              background: r.pos === 1 ? 'rgba(192,57,43,.1)' : 'var(--bg-card)',
              order: r.pos === 1 ? 0 : undefined,
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '.5rem' }}>{r.badge || `#${r.pos}`}</div>
              <div style={{ fontFamily: 'var(--font-d)', fontSize: '1rem', color: 'white', fontWeight: 600 }}>{r.nome}</div>
              <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.6rem', color: '#E53935', fontWeight: 700, margin: '.35rem 0' }}>{r.pontos.toLocaleString()}</div>
              <div style={{ fontSize: '.7rem', color: 'var(--text-dim)' }}>{r.acertos}/{r.questoes} corretas</div>
            </div>
          ))}
        </div>

        {/* Tabela */}
        <div className="card-dark">
          <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr auto auto auto', gap: '1rem', padding: '.75rem 1.25rem', borderBottom: '1px solid var(--border)', fontSize: '.68rem', textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--text-dim)', fontWeight: 700 }}>
            <span>#</span><span>Nome</span><span>Questões</span><span>Acertos</span><span>Pontos</span>
          </div>
          {RANKING_MOCK.map((r, i) => (
            <div key={r.pos} style={{
              display: 'grid', gridTemplateColumns: '40px 1fr auto auto auto', gap: '1rem',
              padding: '.9rem 1.25rem', borderBottom: i < RANKING_MOCK.length - 1 ? '1px solid rgba(192,57,43,.1)' : 'none',
              alignItems: 'center',
              background: i === 0 ? 'rgba(192,57,43,.07)' : 'transparent',
            }}>
              <span style={{ fontFamily: 'var(--font-d)', fontWeight: 700, fontSize: '1.1rem', color: i < 3 ? '#E53935' : 'var(--text-dim)' }}>
                {r.badge || r.pos}
              </span>
              <span style={{ fontWeight: 600, color: 'var(--text)' }}>{r.nome}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '.85rem' }}>{r.questoes}</span>
              <span style={{ color: '#4ade80', fontSize: '.85rem', fontWeight: 600 }}>{r.acertos}</span>
              <span style={{ fontFamily: 'var(--font-d)', color: '#E53935', fontWeight: 700, fontSize: '1.05rem' }}>{r.pontos.toLocaleString()}</span>
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', fontSize: '.75rem', color: 'var(--text-dim)', marginTop: '1.5rem' }}>
          Ranking atualizado em tempo real · Pontuação baseada em questões corretas e dificuldade
        </p>
      </div>
    </section>
  )
}
