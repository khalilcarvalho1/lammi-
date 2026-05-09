/**
 * StudyContext
 * -----------
 * Gerencia historico de questões e srsData com sincronização Supabase.
 *
 * Estratégia de dados:
 *   - localStorage é o cache imediato (UX instantânea, funciona offline)
 *   - Supabase é a fonte de verdade (sincronizado ao logar/deslogar)
 *
 * Fluxo ao LOGAR:
 *   1. Carrega user_question_progress do Supabase
 *   2. Supabase ganha sobre localStorage (dados mais confiáveis)
 *   3. Atualiza localStorage com os dados do servidor
 *
 * Fluxo ao DESLOGAR:
 *   - Limpa historico e localStorage (progresso fica no Supabase)
 *
 * Gravação de respostas:
 *   - BancoPage já chama questionsService.recordAnswer() diretamente
 *   - StudyContext só mantém o estado local e o ciclo de vida de auth
 */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react'
import { User } from '@supabase/supabase-js'
import { SRSCard } from '@/hooks/useSRS'
import { questionsService } from '@/services/questionsService'

// ─── Tipos ────────────────────────────────────────────────────

export type HistoricoEntry = {
  selecionada: string
  acertou: boolean
  em: string
}

export type HistoricoMap = Record<string, HistoricoEntry>

interface StudyContextType {
  historico:     HistoricoMap
  setHistorico:  React.Dispatch<React.SetStateAction<HistoricoMap>>
  srsData:       Record<string, SRSCard>
  setSrsData:    React.Dispatch<React.SetStateAction<Record<string, SRSCard>>>
  syncLoading:   boolean
  resetProgress: () => void
}

// ─── Helpers de localStorage ──────────────────────────────────

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback
  } catch {
    return fallback
  }
}

function saveToStorage(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Silencioso — quota exceeded ou modo privado
  }
}

// ─── Contexto ─────────────────────────────────────────────────

const StudyContext = createContext<StudyContextType | null>(null)

// ─── Provider ─────────────────────────────────────────────────

interface StudyProviderProps {
  children: ReactNode
  user: User | null
}

export function StudyProvider({ children, user }: StudyProviderProps) {
  const [historico, setHistorico] = useState<HistoricoMap>(() =>
    loadFromStorage('lammi_historico', {})
  )
  const [srsData, setSrsData] = useState<Record<string, SRSCard>>(() =>
    loadFromStorage('lammi_srs', {})
  )
  const [syncLoading, setSyncLoading] = useState(false)

  // ── Persistir no localStorage sempre que mudar ──────────────
  useEffect(() => {
    saveToStorage('lammi_historico', historico)
  }, [historico])

  useEffect(() => {
    saveToStorage('lammi_srs', srsData)
  }, [srsData])

  // ── Sincronizar com Supabase ao logar ───────────────────────
  const syncFromSupabase = useCallback(async (userId: string) => {
    setSyncLoading(true)
    try {
      const { data, error } = await questionsService.getUserProgress(userId)
      if (error || !data) return

      if (data.length === 0) {
        // Usuário novo ou sem progresso no servidor — manter localStorage
        return
      }

      // Converter array do Supabase em HistoricoMap
      // Supabase ganha: sobrescreve o localStorage
      const fromServer: HistoricoMap = {}
      for (const row of data) {
        fromServer[row.question_id] = {
          selecionada: row.chosen_key,
          acertou: row.correct,
          em: row.answered_at,
        }
      }

      setHistorico(fromServer)
      saveToStorage('lammi_historico', fromServer)
    } catch (err) {
      // Falha silenciosa — mantém dados locais
      console.warn('[StudyContext] Falha ao sincronizar progresso:', err)
    } finally {
      setSyncLoading(false)
    }
  }, [])

  // ── Reagir a mudanças de autenticação ───────────────────────
  useEffect(() => {
    if (user) {
      // Usuário logou → sincroniza do Supabase
      syncFromSupabase(user.id)
    } else {
      // Usuário deslogou → limpa tudo
      setHistorico({})
      setSrsData({})
      saveToStorage('lammi_historico', {})
      saveToStorage('lammi_srs', {})
    }
  }, [user?.id]) // eslint-disable-line react-hooks/exhaustive-deps
  // Dependência intencional: só dispara quando o ID muda (login/logout)

  // ── Reset de progresso (chamado pelo Navbar no Bloco 2) ─────
  const resetProgress = useCallback(() => {
    setHistorico({})
    setSrsData({})
    saveToStorage('lammi_historico', {})
    saveToStorage('lammi_srs', {})
  }, [])

  return (
    <StudyContext.Provider
      value={{
        historico,
        setHistorico,
        srsData,
        setSrsData,
        syncLoading,
        resetProgress,
      }}
    >
      {children}
    </StudyContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────

export function useStudyContext() {
  const ctx = useContext(StudyContext)
  if (!ctx) throw new Error('useStudyContext must be used inside StudyProvider')
  return ctx
}
