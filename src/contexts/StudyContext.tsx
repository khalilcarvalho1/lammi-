/**
 * StudyContext
 * -----------
 * Substitui o prop drilling de `historico` e `srsData` que passava pelo AppLayout.
 * Agora qualquer página acessa via useStudyContext() diretamente.
 */
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { SRSCard } from '@/hooks/useSRS'

type HistoricoMap = Record<string, { selecionada: string; acertou: boolean; em: string }>

interface StudyContextType {
  historico:    HistoricoMap
  setHistorico: React.Dispatch<React.SetStateAction<HistoricoMap>>
  srsData:      Record<string, SRSCard>
  setSrsData:   React.Dispatch<React.SetStateAction<Record<string, SRSCard>>>
}

const StudyContext = createContext<StudyContextType | null>(null)

function load<T>(key: string, fallback: T): T {
  try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback }
  catch { return fallback }
}

export function StudyProvider({ children }: { children: ReactNode }) {
  const [historico, setHistorico] = useState<HistoricoMap>(() => load('lammi_historico', {}))
  const [srsData,   setSrsData]   = useState<Record<string, SRSCard>>(() => load('lammi_srs', {}))

  useEffect(() => { localStorage.setItem('lammi_historico', JSON.stringify(historico)) }, [historico])
  useEffect(() => { localStorage.setItem('lammi_srs',       JSON.stringify(srsData))   }, [srsData])

  return (
    <StudyContext.Provider value={{ historico, setHistorico, srsData, setSrsData }}>
      {children}
    </StudyContext.Provider>
  )
}

export function useStudyContext() {
  const ctx = useContext(StudyContext)
  if (!ctx) throw new Error('useStudyContext must be used inside StudyProvider')
  return ctx
}
