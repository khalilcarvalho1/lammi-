import { THEMES, StudyTheme } from '@/services/supabaseClient'
import { findTema, findSubtema } from '@/services/content-hierarchy'

// Nome legível de qualquer id (tema legado, tema novo ou subtema)
export function temaLabel(id: string): string {
  const direto = (THEMES as Record<string, string>)[id]
  if (direto) return direto
  const sub = findSubtema(id)
  if (sub) return sub.subtema.label
  const tem = findTema(id)
  if (tem) return tem.tema.label
  return id
}

// Traduz ?theme= (subtema) ou ?tema= (tema inteiro) em um Set de filtros.
// Quando vem ?tema=, inclui o proprio tema + todos os subtemas dele.
export function resolverFiltroURL(theme: string | null, tema: string | null): Set<StudyTheme> {
  if (theme) return new Set([theme as StudyTheme])
  if (tema) {
    const found = findTema(tema)
    if (found) {
      const ids = [tema, ...found.tema.subtemas.map(s => s.id)]
      return new Set(ids as StudyTheme[])
    }
    return new Set([tema as StudyTheme])
  }
  return new Set()
}

// Caminho completo do filtro vindo da URL: Area > Tema > Subtema
export function filtroOrigemLabel(theme: string | null, tema: string | null): string | null {
  if (theme) {
    const s = findSubtema(theme)
    return s ? `${s.area.emoji} ${s.area.label} › ${s.tema.label} › ${s.subtema.label}` : temaLabel(theme)
  }
  if (tema) {
    const t = findTema(tema)
    return t ? `${t.area.emoji} ${t.area.label} › ${t.tema.label}` : temaLabel(tema)
  }
  return null
}

// Versao curta, para caber em <option> / chips
export function filtroOrigemCurto(theme: string | null, tema: string | null): string | null {
  if (theme) return temaLabel(theme)
  if (tema) {
    const t = findTema(tema)
    return t ? t.tema.label : temaLabel(tema)
  }
  return null
}