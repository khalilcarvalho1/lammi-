export function ErrorMessage({ message = 'Algo deu errado.', onRetry }: { message?: string; onRetry?: () => void }) {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⚠️</div>
      <p style={{ color: 'var(--text-muted)', fontSize: '.9rem', marginBottom: onRetry ? '1.25rem' : 0 }}>{message}</p>
      {onRetry && <button className="btn-red" style={{ fontSize: '.85rem' }} onClick={onRetry}>Tentar novamente</button>}
    </div>
  )
}
