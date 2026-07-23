import { useNavigate, useParams } from 'react-router-dom'
import { findTema } from '@/services/content-hierarchy'
import { MOCK_QUESTIONS, MOCK_FLASHCARDS } from '@/data/mockData'

export function TemaDetailPage() {
  const { areaId, temaId } = useParams<{ areaId: string; temaId: string }>()
  const navigate = useNavigate()
  const found = findTema(temaId ?? '')

  if (!found) {
    navigate('/areas')
    return null
  }

  const { area, tema } = found

  function irParaBanco(subtemaId?: string) {
    const q = subtemaId ? `?theme=${subtemaId}` : `?tema=${temaId}`
    navigate(`/banco${q}`)
  }

  function irParaCards(subtemaId?: string) {
    const q = subtemaId ? `?theme=${subtemaId}` : `?tema=${temaId}`
    navigate(`/flashcards${q}`)
  }

  return (
    <div style={{ padding: '2rem 1.5rem', maxWidth: 900, margin: '0 auto' }}>

      {/* Breadcrumb */}
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
        <button onClick={() => navigate('/areas')} style={{ background: 'none', border: 'none', color: 'rgba(200,180,140,0.4)', cursor: 'pointer', fontSize: '0.82rem', padding: 0 }}>
          Áreas
        </button>
        <span style={{ color: 'rgba(200,180,140,0.3)', fontSize: '0.82rem' }}>›</span>
        <button onClick={() => navigate(`/areas/${areaId}`)} style={{ background: 'none', border: 'none', color: 'rgba(200,180,140,0.4)', cursor: 'pointer', fontSize: '0.82rem', padding: 0 }}>
          {area.emoji} {area.label}
        </button>
        <span style={{ color: 'rgba(200,180,140,0.3)', fontSize: '0.82rem' }}>›</span>
        <span style={{ color: '#c0392b', fontSize: '0.82rem' }}>{tema.label}</span>
      </div>

      {/* Cabeçalho */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ width: 40, height: 4, background: '#c0392b', borderRadius: 2, marginBottom: '0.75rem' }} />
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '1.8rem', fontWeight: 700, color: '#e8d5b0', margin: '0 0 0.3rem' }}>
          {tema.label}
        </h1>
        <p style={{ color: 'rgba(200,180,140,0.55)', fontSize: '0.85rem', margin: 0 }}>
          {tema.subtemas.length} subtemas
        </p>
      </div>

      {/* Botão estudar todos */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => irParaBanco()}
          style={{
            background: 'rgba(192,57,43,0.15)', border: '1px solid rgba(192,57,43,0.4)',
            borderRadius: 8, padding: '0.6rem 1.25rem',
            color: '#e8d5b0', fontSize: '0.88rem', cursor: 'pointer'
          }}
        >
          📝 Questões do tema
        </button>
        <button
          onClick={() => irParaCards()}
          style={{
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(192,57,43,0.2)',
            borderRadius: 8, padding: '0.6rem 1.25rem',
            color: '#e8d5b0', fontSize: '0.88rem', cursor: 'pointer'
          }}
        >
          🃏 Flashcards do tema
        </button>
      </div>

      {/* Lista de subtemas */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {tema.subtemas.map(sub => {
          const qtdQ = MOCK_QUESTIONS.filter(q => q.theme === sub.id).length
          const qtdF = MOCK_FLASHCARDS.filter(f => f.theme === sub.id).length
          const temConteudo = qtdQ > 0 || qtdF > 0

          return (
            <div
              key={sub.id}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(192,57,43,0.12)',
                borderRadius: 10,
                padding: '1rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
              }}
            >
              <div>
                <p style={{ color: '#e8d5b0', fontSize: '0.9rem', margin: '0 0 0.2rem', fontWeight: 500 }}>
                  {sub.label}
                </p>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  {temConteudo ? (
                    <>
                      {qtdQ > 0 && <span style={{ fontSize: '0.72rem', color: '#c0392b' }}>📝 {qtdQ}</span>}
                      {qtdF > 0 && <span style={{ fontSize: '0.72rem', color: 'rgba(200,180,140,0.4)' }}>🃏 {qtdF}</span>}
                    </>
                  ) : (
                    <span style={{ fontSize: '0.72rem', color: 'rgba(200,180,140,0.25)' }}>Em breve</span>
                  )}
                </div>
              </div>

              {temConteudo && (
                <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                  {qtdQ > 0 && (
                    <button
                      onClick={() => irParaBanco(sub.id)}
                      style={{
                        background: 'rgba(192,57,43,0.15)', border: '1px solid rgba(192,57,43,0.3)',
                        borderRadius: 6, padding: '0.35rem 0.75rem',
                        color: '#e8d5b0', fontSize: '0.75rem', cursor: 'pointer'
                      }}
                    >
                      Questões
                    </button>
                  )}
                  {qtdF > 0 && (
                    <button
                      onClick={() => irParaCards(sub.id)}
                      style={{
                        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(192,57,43,0.15)',
                        borderRadius: 6, padding: '0.35rem 0.75rem',
                        color: '#e8d5b0', fontSize: '0.75rem', cursor: 'pointer'
                      }}
                    >
                      Cards
                    </button>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}