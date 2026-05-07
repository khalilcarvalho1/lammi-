import { createClient } from '@supabase/supabase-js'

const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})

export type UserRole = 'admin' | 'member'

export type StudyTheme =
  | 'avaliacao_cena'
  | 'cinetica_trauma'
  | 'atls_inicial'
  | 'atls_via_aerea'
  | 'atls_face'
  | 'atls_pescoco'
  | 'atls_toracico'
  | 'atls_choque'
  | 'atls_abdominal'
  | 'atls_genitourinario'
  | 'atls_cranioencefalico'
  | 'atls_coluna'

export const THEMES: Record<StudyTheme, string> = {
  avaliacao_cena:        'Avaliação da Cena e Atendimento Inicial',
  cinetica_trauma:       'Cinética do Trauma',
  atls_inicial:          'ATLS: Atendimento Inicial ao Politraumatizado',
  atls_via_aerea:        'ATLS: Via Aérea',
  atls_face:             'ATLS: Trauma de Face',
  atls_pescoco:          'ATLS: Trauma de Pescoço',
  atls_toracico:         'ATLS: Trauma Torácico',
  atls_choque:           'ATLS: Choque',
  atls_abdominal:        'ATLS: Trauma Abdominal',
  atls_genitourinario:   'ATLS: Trauma Genitourinário',
  atls_cranioencefalico: 'ATLS: Trauma Cranioencefálico',
  atls_coluna:           'ATLS: Trauma de Coluna e Raquimedular (TRM)',
}

export type Difficulty = 'facil' | 'medio' | 'dificil'

export interface Profile {
  id: string
  email: string
  display_name: string
  nickname: string
  avatar_url: string | null
  role: UserRole
  active: boolean
  score: number
  study_streak: number
  last_study_date: string | null
  created_at: string
}

export interface Question {
  id: string
  statement: string
  alternatives: { key: string; text: string }[]
  correct_key: string
  explanation: string
  theme: StudyTheme
  difficulty: Difficulty
  created_at: string
}

export interface Flashcard {
  id: string
  front: string
  back: string
  theme: StudyTheme
  created_at: string
}

export interface ClinicalCase {
  id: string
  title: string
  description: string
  theme: StudyTheme
  steps: CaseStep[]
  created_at: string
}

export interface CaseStep {
  id: string
  content: string
  options: {
    id: string
    text: string
    next_step_id: string | null
    feedback: string
    is_correct: boolean
  }[]
}

export interface SimuladoRecord {
  id: string
  user_id: string
  themes: StudyTheme[]
  total_questions: number
  correct_count: number
  time_seconds: number
  started_at: string
  finished_at: string
  question_results: { question_id: string; chosen_key: string; correct: boolean }[]
}

export interface StudyLog {
  id: string
  user_id: string
  activity_type: 'question' | 'flashcard' | 'simulado' | 'case'
  theme: StudyTheme | null
  date: string
  count: number
}
