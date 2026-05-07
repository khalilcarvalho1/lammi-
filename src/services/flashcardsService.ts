import { supabase, Flashcard, StudyTheme } from './supabaseClient'
import { SRSCard } from '@/hooks/useSRS'

export const flashcardsService = {
  async getAll(theme?: StudyTheme) {
    let q = supabase.from('flashcards').select('*').order('created_at', { ascending: false })
    if (theme) q = q.eq('theme', theme)
    return q
  },

  async create(card: Omit<Flashcard, 'id' | 'created_at'>) {
    return supabase.from('flashcards').insert(card).select().single()
  },

  async update(id: string, card: Partial<Flashcard>) {
    return supabase.from('flashcards').update(card).eq('id', id)
  },

  async delete(id: string) {
    return supabase.from('flashcards').delete().eq('id', id)
  },

  // ─── SRS ──────────────────────────────────────────────────
  async getUserSRSStates(userId: string) {
    return supabase
      .from('user_flashcards')
      .select('*')
      .eq('user_id', userId)
  },

  async upsertSRSState(userId: string, flashcardId: string, state: SRSCard) {
    return supabase.from('user_flashcards').upsert({
      user_id:      userId,
      flashcard_id: flashcardId,
      ease_factor:  state.ease_factor,
      interval:     state.interval,
      repetitions:  state.repetitions,
      due_date:     state.due_date,
    })
  },
}
