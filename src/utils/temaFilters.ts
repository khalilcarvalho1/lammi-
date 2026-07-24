import { THEMES, StudyTheme } from '@/services/supabaseClient'
import { findArea, findTema, findSubtema } from '@/services/content-hierarchy'

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

// Todos os ids de tema + subtema de uma área
function idsDeArea(areaId: string): string[] {
  const found = findArea(areaId)
  if (!found) return []
  const ids: string[] = []
  for (const tema of found.temas) {
    ids.push(tema.id)
    for (const sub of tema.subtemas) ids.push(sub.id)
  }
  return ids
}

// Traduz ?area=, ?tema= ou ?theme= em um Set de filtros.
// Prioridade: theme > tema > area
export function resolverFiltroURL(
  theme: string | null,
  tema:  string | null,
  area:  string | null
): Set<StudyTheme> {
  if (theme) return new Set([theme as StudyTheme])
  if (tema) {
    const found = findTema(tema)
    if (found) {
      const ids = [tema, ...found.tema.subtemas.map(s => s.id)]
      return new Set(ids as StudyTheme[])
    }
    return new Set([tema as StudyTheme])
  }
  if (area) {
    const ids = idsDeArea(area)
    return ids.length > 0 ? new Set(ids as StudyTheme[]) : new Set()
  }
  return new Set()
}

// Ids de tema (sem subtemas) de uma área — para filtrar a sidebar
export function temaIdsDeArea(areaId: string): Set<string> | null {
  const found = findArea(areaId)
  if (!found) return null
  return new Set(found.temas.map(t => t.id))
}

// Caminho completo do filtro vindo da URL: Área › Tema › Subtema
export function filtroOrigemLabel(
  theme: string | null,
  tema:  string | null,
  area:  string | null
): string | null {
  if (theme) {
    const s = findSubtema(theme)
    return s
      ? `${s.area.emoji} ${s.area.label} › ${s.tema.label} › ${s.subtema.label}`
      : temaLabel(theme)
  }
  if (tema) {
    const t = findTema(tema)
    return t ? `${t.area.emoji} ${t.area.label} › ${t.tema.label}` : temaLabel(tema)
  }
  if (area) {
    const a = findArea(area)
    return a ? `${a.emoji} ${a.label}` : area
  }
  return null
}

// Versão curta, para caber em <option> / chips
export function filtroOrigemCurto(
  theme: string | null,
  tema:  string | null,
  area:  string | null
): string | null {
  if (theme) return temaLabel(theme)
  if (tema) {
    const t = findTema(tema)
    return t ? t.tema.label : temaLabel(tema)
  }
  if (area) {
    const a = findArea(area)
    return a ? a.label : area
  }
  return null
}