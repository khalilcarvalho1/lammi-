import { useOfflineHandler } from '@/hooks/useOfflineHandler'

export function OfflineBanner() {
  const { isOnline, wasOffline } = useOfflineHandler()
  if (isOnline && !wasOffline) return null
  if (!isOnline) return (
    <div style={{ background: '#b23b3b', color: '#fff', padding: '.6rem 2rem', fontSize: '.82rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
      <span>⚠ Você está offline. Algumas funções podem não estar disponíveis.</span>
      <button onClick={() => window.location.reload()} style={{ background: 'rgba(255,255,255,.2)', border: 'none', color: '#fff', padding: '.25rem .75rem', fontSize: '.75rem', cursor: 'pointer', fontWeight: 600 }}>
        Tentar novamente
      </button>
    </div>
  )
  return (
    <div style={{ background: '#2f7a3f', color: '#fff', padding: '.5rem 2rem', fontSize: '.82rem' }}>
      ✓ Conexão restabelecida
    </div>
  )
}
