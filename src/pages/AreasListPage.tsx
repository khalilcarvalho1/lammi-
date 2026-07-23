import { useNavigate } from 'react-router-dom'
import { AREAS, countByArea } from '@/services/content-hierarchy'
import { MOCK_QUESTIONS } from '@/data/mockData'
import { MOCK_FLASHCARDS } from '@/data/mockData'

export function AreasListPage() {
  const navigate = useNavigate()

  return (
    <div style={{ padding: '2rem 1.5rem', maxWidth: 900, margin: '0 auto' }}>

      {/* Cabeçalho */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ width: 40, height: 4, background: '#c0392b', borderRadius: 2, marginBottom: '0.75rem' }} />
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', fontWeight: 700, color: '#e8d5b0', margin: '0 0 0.3rem' }}>
          Áreas Médicas
        </h1>
        <p style={{ color: 'rgba(200,180,140,0.55)', fontSize: '0.85rem', margin: 0 }}>
          Selecione uma especialidade para começar a estudar
        </p>
      </div>

      {/* Grid de áreas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '1rem'
      }}>
        {AREAS.map(area => {
          const totalQ = countByArea(area.id, MOCK_QUESTIONS)
          const totalF = countByArea(area.id, MOCK_FLASHCARDS)
          const temConteudo = totalQ > 0 || totalF > 0

          return (
            <div
              key={area.id}
              onClick={() => navigate(`/areas/${area.id}`)}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: `1px solid ${temConteudo ? 'rgba(192,57,43,0.25)' : 'rgba(255,255,255,0.06)'}`,
                borderRadius: 12,
                padding: '1.25rem',
                cursor: 'pointer',
                transition: 'all .15s',
                opacity: temConteudo ? 1 : 0.5,
              }}
              onMouseEnter={e => {
                if (temConteudo) (e.currentTarget as HTMLDivElement).style.borderColor = '#c0392b'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = temConteudo
                  ? 'rgba(192,57,43,0.25)' : 'rgba(255,255,255,0.06)'
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{area.emoji}</div>
              <h3 style={{
                fontFamily: 'Georgia, serif', fontSize: '1rem', fontWeight: 700,
                color: '#e8d5b0', margin: '0 0 0.4rem'
              }}>
                {area.label}
              </h3>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {temConteudo ? (
                  <>
                    {totalQ > 0 && (
                      <span style={{ fontSize: '0.75rem', color: '#c0392b' }}>
                        📝 {totalQ} questões
                      </span>
                    )}
                    {totalF > 0 && (
                      <span style={{ fontSize: '0.75rem', color: 'rgba(200,180,140,0.5)' }}>
                        🃏 {totalF} cards
                      </span>
                    )}
                  </>
                ) : (
                  <span style={{ fontSize: '0.75rem', color: 'rgba(200,180,140,0.3)' }}>
                    Em breve
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}