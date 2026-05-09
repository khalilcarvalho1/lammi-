interface Props {
  tipo: 'timeout' | 'config' | 'http'
  onRetry: () => void
}

export function ErroDiagnostico({ tipo, onRetry }: Props) {
  const msgs: Record<string, { titulo: string; detalhe: string }> = {
    timeout: {
      titulo: 'Servidor não respondeu a tempo',
      detalhe: 'A conexão com o servidor demorou mais de 8 segundos.',
    },
    config: {
      titulo: 'Configuração inválida',
      detalhe: 'As variáveis de ambiente do Supabase não estão configuradas.',
    },
    http: {
      titulo: 'Erro de comunicação',
      detalhe: 'O servidor retornou uma resposta inesperada.',
    },
  }
  const { titulo, detalhe } = msgs[tipo] ?? msgs.http

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0D0D0D', padding: '2rem' }}>
      <div style={{ maxWidth: 480, width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
          <div style={{ fontFamily: 'var(--font-d)', fontSize: '1.4rem', color: '#E53935', marginBottom: '.5rem' }}>
            Falha de Conexão
          </div>
          <div style={{ fontWeight: 600, color: 'white', marginBottom: '.5rem' }}>{titulo}</div>
          <div style={{ fontSize: '.85rem', color: 'var(--text-muted)' }}>{detalhe}</div>
        </div>

        <div style={{ background: 'rgba(201,169,97,.08)', border: '1px solid rgba(201,169,97,.2)', padding: '1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '.75rem', textTransform: 'uppercase', letterSpacing: '.1em', color: 'rgba(201,169,97,.8)', fontWeight: 700, marginBottom: '.75rem' }}>
            Verifique:
          </div>
          {[
            'Sua conexão com a internet está ativa?',
            'O projeto no Supabase está pausado? (plano gratuito pausa após inatividade)',
            'As variáveis VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY estão configuradas no Vercel?',
            'O URL do Supabase está correto no arquivo .env.local?',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '.6rem', marginBottom: '.4rem', fontSize: '.83rem', color: 'var(--text-muted)', alignItems: 'flex-start' }}>
              <span style={{ color: 'rgba(201,169,97,.6)', flexShrink: 0 }}>→</span>
              <span>{item}</span>
            </div>
          ))}
        </div>

        <button
          onClick={onRetry}
          className="btn-red"
          style={{ width: '100%', padding: '.75rem', fontSize: '.9rem' }}
        >
          🔄 Tentar novamente
        </button>
      </div>
    </div>
  )
}
