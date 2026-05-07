export function LoadingSpinner({ fullPage = false }: { fullPage?: boolean }) {
  const spinner = (
    <div style={{ width: 40, height: 40, border: '3px solid rgba(192,57,43,.2)', borderTopColor: '#C0392B', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
  )
  if (fullPage) return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
      {spinner}
      <p style={{ color: 'var(--text-muted)', fontSize: '.85rem' }}>Carregando...</p>
    </div>
  )
  return spinner
}
