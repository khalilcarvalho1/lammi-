import { useNavigate, useParams } from 'react-router-dom'
import { findArea, countByTema } from '@/services/content-hierarchy'
import { MOCK_QUESTIONS, MOCK_FLASHCARDS } from '@/data/mockData'

export function AreaDetailPage() {
  const { areaId } = useParams<{ areaId: string }>()
  const navigate = useNavigate()
  const area = findArea(areaId ?? '')

  if (!area) {
    navigate('/areas')
    return null
  }

  return (
    <div style={{ padding: '2rem 1.5rem', maxWidth: 900, margin: '0 auto' }}>

      {/* Cabeçalho */}
      <div style={{ marginBottom: '2rem' }}>
        <button
          onClick={() => navigate('/areas')}
          style={{ background: 'none', border: 'none', color: '#c0392b', cursor: 'pointer', fontSize: '0.88rem', padding: 0, marginBottom: '0.75rem' }}
        >
          ← Áreas
        </button>
        <div style={{ width: 40, height: 4, background: '#c0392b', borderRadius: 2, marginBottom: '0.75rem' }} />
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', fontWeight: 700, color: '#e8d5b0', margin: '0 0 0.3rem' }}>
          {area.emoji} {area.label}
        </h1>
        <p style={{ color: 'rgba(200,180,140,0.55)', fontSize: '0.85rem', margin: 0 }}>
          {area.temas.length} temas disponíveis
        </p>
      </div>

      {/* Lista de temas */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {area.temas.map(tema => {
          const totalQ = countByTema(tema.id, MOCK_QUESTIONS)
          const totalF = countByTema(tema.id, MOCK_FLASHCARDS)
          const temConteudo = totalQ > 0 || totalF > 0

          return (
            <div
              key={tema.id}
              onClick={() => navigate(`/areas/${areaId}/temas/${tema.id}`)}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(192,57,43,0.2)',
                borderRadius: 12,
                padding: '1.25rem 1.5rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                transition: 'border-color .15s',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = '#c0392b'}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(192,57,43,0.2)'}
            >
              <div>
                <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '1rem', fontWeight: 700, color: '#e8d5b0', margin: '0 0 0.25rem' }}>
                  {tema.label}
                </h3>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  {temConteudo ? (
                    <>
                      {totalQ > 0 && (
                        <span style={{ fontSize: '0.75rem', color: '#c0392b' }}>📝 {totalQ} questões</span>
                      )}
                      {totalF > 0 && (
                        <span style={{ fontSize: '0.75rem', color: 'rgba(200,180,140,0.5)' }}>🃏 {totalF} cards</span>
                      )}
                      <span style={{ fontSize: '0.75rem', color: 'rgba(200,180,140,0.4)' }}>
                        {tema.subtemas.length} subtemas
                      </span>
                    </>
                  ) : (
                    <span style={{ fontSize: '0.75rem', color: 'rgba(200,180,140,0.3)' }}>Em breve</span>
                  )}
                </div>
              </div>
              <span style={{ color: '#c0392b', fontSize: '1.2rem', flexShrink: 0 }}>›</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}