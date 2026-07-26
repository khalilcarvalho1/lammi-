import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { findArea, countByTema } from '@/services/content-hierarchy'
import { getManifest } from '@/services/contentService'

export function AreaDetailPage() {
  const { areaId } = useParams<{ areaId: string }>()
  const navigate = useNavigate()
  const area = findArea(areaId ?? '')

  const [qCounts, setQCounts] = useState<Record<string, number>>({})
  const [fCounts, setFCounts] = useState<Record<string, number>>({})
  useEffect(() => {
    getManifest().then(m => { setQCounts(m.questionThemeCounts); setFCounts(m.flashcardThemeCounts) }).catch(() => {})
  }, [])

  if (!area) {
    navigate('/areas')
    return null
  }

  const totalQArea = area.temas.reduce((acc, t) => acc + countByTema(t.id, qCounts), 0)
  const totalFArea = area.temas.reduce((acc, t) => acc + countByTema(t.id, fCounts), 0)

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
        <p style={{ color: 'rgba(200,180,140,0.55)', fontSize: '0.85rem', margin: '0 0 1.25rem' }}>
          {area.temas.length} temas disponíveis
        </p>

        {/* Botões de ação da área inteira */}
        {(totalQArea > 0 || totalFArea > 0) && (
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {totalQArea > 0 && (
              <button
                onClick={() => navigate(`/banco?area=${areaId}`)}
                style={{
                  padding: '0.5rem 1.1rem',
                  background: 'rgba(192,57,43,0.15)',
                  border: '1px solid rgba(192,57,43,0.4)',
                  color: '#c0392b',
                  cursor: 'pointer',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  borderRadius: 6,
                  transition: 'background .15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(192,57,43,0.28)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(192,57,43,0.15)')}
              >
                📝 {totalQArea} questões da área
              </button>
            )}
            {totalFArea > 0 && (
              <button
                onClick={() => navigate(`/flashcards?area=${areaId}`)}
                style={{
                  padding: '0.5rem 1.1rem',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(200,180,140,0.2)',
                  color: 'rgba(200,180,140,0.65)',
                  cursor: 'pointer',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  borderRadius: 6,
                  transition: 'background .15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.09)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
              >
                🃏 {totalFArea} flashcards da área
              </button>
            )}
          </div>
        )}
      </div>

      {/* Lista de temas */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {area.temas.map(tema => {
          const totalQ = countByTema(tema.id, qCounts)
          const totalF = countByTema(tema.id, fCounts)
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