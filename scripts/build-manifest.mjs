// Gera public/data/manifest.json a partir dos JSONs em public/data/questions e
// public/data/flashcards. Rodar sempre que conteúdo novo for adicionado/editado:
//   npm run build:manifest
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const DATA_DIR = path.join(ROOT, 'public', 'data')

function listAreaSlugFiles(typeDir) {
  const base = path.join(DATA_DIR, typeDir)
  if (!fs.existsSync(base)) return []
  const areas = fs.readdirSync(base, { withFileTypes: true }).filter(d => d.isDirectory())
  const files = []
  for (const area of areas) {
    const areaDir = path.join(base, area.name)
    for (const file of fs.readdirSync(areaDir)) {
      if (!file.endsWith('.json')) continue
      files.push({ area: area.name, slug: file.replace(/\.json$/, ''), fullPath: path.join(areaDir, file) })
    }
  }
  return files
}

function addCount(target, key, n = 1) {
  target[key] = (target[key] ?? 0) + n
}

function readThemeCounts(fullPath, key) {
  try {
    const raw = fs.readFileSync(fullPath, 'utf8')
    const json = JSON.parse(raw)
    const arr = Array.isArray(json[key]) ? json[key] : []
    const themeCounts = {}
    for (const item of arr) {
      if (item.theme) addCount(themeCounts, item.theme)
    }
    return { count: arr.length, themeCounts }
  } catch (err) {
    console.error(`Falha ao ler ${fullPath}:`, err.message)
    return { count: 0, themeCounts: {} }
  }
}

const questionFiles = listAreaSlugFiles('questions')
const flashcardFiles = listAreaSlugFiles('flashcards')

const entriesMap = new Map() // key `${area}/${slug}` -> entry
const questionThemeCounts = {}
const flashcardThemeCounts = {}

function newEntry(area, slug) {
  return { area, slug, themes: [], questionsCount: 0, flashcardsCount: 0 }
}

for (const f of questionFiles) {
  const { count, themeCounts } = readThemeCounts(f.fullPath, 'questions')
  const key = `${f.area}/${f.slug}`
  const entry = entriesMap.get(key) ?? newEntry(f.area, f.slug)
  entry.questionsCount = count
  entry.themes = [...new Set([...entry.themes, ...Object.keys(themeCounts)])]
  entriesMap.set(key, entry)
  for (const [theme, n] of Object.entries(themeCounts)) addCount(questionThemeCounts, theme, n)
}

for (const f of flashcardFiles) {
  const { count, themeCounts } = readThemeCounts(f.fullPath, 'flashcards')
  const key = `${f.area}/${f.slug}`
  const entry = entriesMap.get(key) ?? newEntry(f.area, f.slug)
  entry.flashcardsCount = count
  entry.themes = [...new Set([...entry.themes, ...Object.keys(themeCounts)])]
  entriesMap.set(key, entry)
  for (const [theme, n] of Object.entries(themeCounts)) addCount(flashcardThemeCounts, theme, n)
}

const entries = [...entriesMap.values()].sort((a, b) => (a.area + a.slug).localeCompare(b.area + b.slug))
const areas = [...new Set(entries.map(e => e.area))].sort()

const manifest = {
  generatedAt: new Date().toISOString(),
  areas,
  totalQuestions: entries.reduce((s, e) => s + e.questionsCount, 0),
  totalFlashcards: entries.reduce((s, e) => s + e.flashcardsCount, 0),
  questionThemeCounts,
  flashcardThemeCounts,
  entries,
}

const outPath = path.join(DATA_DIR, 'manifest.json')
fs.writeFileSync(outPath, JSON.stringify(manifest, null, 2) + '\n')

console.log(`manifest.json gerado: ${entries.length} arquivos catalogados`)
console.log(`  questoes: ${manifest.totalQuestions} | flashcards: ${manifest.totalFlashcards}`)
console.log(`  arquivos com conteudo: ${entries.filter(e => e.questionsCount > 0 || e.flashcardsCount > 0).length}`)
