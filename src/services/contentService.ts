// Fetch + cache dos JSONs estáticos em public/data/ (servidos pela CDN da Vercel).
// Supabase guarda apenas dados do usuário (progresso, SRS, auth, rankings) — o
// conteúdo (questões e flashcards) vive inteiramente aqui, carregado sob demanda.
import { Question, Flashcard, StudyTheme } from './supabaseClient'

export interface ManifestEntry {
  area: string
  slug: string
  themes: string[]
  questionsCount: number
  flashcardsCount: number
}

export interface Manifest {
  generatedAt: string
  areas: string[]
  totalQuestions: number
  totalFlashcards: number
  questionThemeCounts: Record<string, number>
  flashcardThemeCounts: Record<string, number>
  entries: ManifestEntry[]
}

// Cache em memória — cada arquivo só é buscado uma vez por sessão da página.
const jsonCache = new Map<string, Promise<any>>()

function fetchJSON<T>(path: string): Promise<T> {
  let pending = jsonCache.get(path)
  if (!pending) {
    pending = fetch(path).then(res => {
      if (!res.ok) throw new Error(`Falha ao buscar ${path}: HTTP ${res.status}`)
      return res.json()
    })
    jsonCache.set(path, pending)
  }
  return pending as Promise<T>
}

let manifestPromise: Promise<Manifest> | null = null

export function getManifest(): Promise<Manifest> {
  if (!manifestPromise) manifestPromise = fetchJSON<Manifest>('/data/manifest.json')
  return manifestPromise
}

export async function getQuestions(area: string, slug: string): Promise<Question[]> {
  const data = await fetchJSON<{ questions: Question[] }>(`/data/questions/${area}/${slug}.json`)
  return data.questions ?? []
}

export async function getFlashcards(area: string, slug: string): Promise<Flashcard[]> {
  const data = await fetchJSON<{ flashcards: Flashcard[] }>(`/data/flashcards/${area}/${slug}.json`)
  return data.flashcards ?? []
}

// Resolve quais arquivos do manifesto atendem a um conjunto de temas/subtemas.
// Conjunto vazio ("todas") -> todo arquivo com conteúdo real (>0), evitando
// buscar os centenas de stubs vazios ainda não escritos.
function resolveEntries(manifest: Manifest, temas: Set<string>): ManifestEntry[] {
  if (temas.size === 0) {
    return manifest.entries.filter(e => e.questionsCount > 0 || e.flashcardsCount > 0)
  }
  return manifest.entries.filter(e => e.themes.some(t => temas.has(t)))
}

export async function loadQuestionsForFilter(temas: Set<StudyTheme>): Promise<Question[]> {
  const manifest = await getManifest()
  const entries = resolveEntries(manifest, temas).filter(e => e.questionsCount > 0)
  const batches = await Promise.all(entries.map(e => getQuestions(e.area, e.slug)))
  return batches.flat()
}

export async function loadFlashcardsForFilter(temas: Set<StudyTheme>): Promise<Flashcard[]> {
  const manifest = await getManifest()
  const entries = resolveEntries(manifest, temas).filter(e => e.flashcardsCount > 0)
  const batches = await Promise.all(entries.map(e => getFlashcards(e.area, e.slug)))
  return batches.flat()
}

// Contagens por tema direto do manifesto — leve, sem baixar o conteúdo completo.
// Usado para popular a barra lateral de filtros (números de cada tema).
export async function getQuestionThemeCounts(): Promise<Record<string, number>> {
  const manifest = await getManifest()
  return manifest.questionThemeCounts
}

export async function getFlashcardThemeCounts(): Promise<Record<string, number>> {
  const manifest = await getManifest()
  return manifest.flashcardThemeCounts
}
