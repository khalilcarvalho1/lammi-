import { supabase, Question, StudyTheme, Difficulty } from './supabaseClient'

const PAGE_SIZE = 20

export interface QuestionFilters {
  theme?: StudyTheme
  difficulty?: Difficulty
  answered?: boolean
  wrong?: boolean
}

export const questionsService = {
  async getPage(page: number, filters: QuestionFilters = {}, userId?: string) {
    let query = supabase.from('questions').select('*', { count: 'exact' })

    if (filters.theme)      query = query.eq('theme', filters.theme)
    if (filters.difficulty) query = query.eq('difficulty', filters.difficulty)

    const from = page * PAGE_SIZE
    const to   = from + PAGE_SIZE - 1
    query = query.range(from, to).order('created_at', { ascending: false })

    return query
  },

  async getById(id: string) {
    return supabase.from('questions').select('*').eq('id', id).single()
  },

  async create(q: Omit<Question, 'id' | 'created_at'>) {
    return supabase.from('questions').insert(q).select().single()
  },

  async update(id: string, q: Partial<Question>) {
    return supabase.from('questions').update(q).eq('id', id)
  },

  async delete(id: string) {
    return supabase.from('questions').delete().eq('id', id)
  },

  // ─── Comentários ───────────────────────────────────────────
  async getComments(questionId: string) {
    return supabase
      .from('question_comments')
      .select('*, profiles(display_name, nickname)')
      .eq('question_id', questionId)
      .order('created_at', { ascending: true })
  },

  async addComment(questionId: string, userId: string, content: string) {
    return supabase.from('question_comments').insert({
      question_id: questionId,
      user_id: userId,
      content,
    }).select().single()
  },

  async updateComment(commentId: string, content: string) {
    return supabase
      .from('question_comments')
      .update({ content, updated_at: new Date().toISOString() })
      .eq('id', commentId)
  },

  async deleteComment(commentId: string) {
    return supabase.from('question_comments').delete().eq('id', commentId)
  },

  // ─── Progresso do usuário ──────────────────────────────────
  async recordAnswer(userId: string, questionId: string, chosenKey: string, correct: boolean) {
    return supabase.from('user_question_progress').upsert({
      user_id:     userId,
      question_id: questionId,
      chosen_key:  chosenKey,
      correct,
      answered_at: new Date().toISOString(),
    })
  },

  async getUserProgress(userId: string) {
    return supabase
      .from('user_question_progress')
      .select('question_id, correct, chosen_key, answered_at')
      .eq('user_id', userId)
  },

  // Apaga todo o progresso do usuário (usado no reset de progresso)
  async deleteUserProgress(userId: string) {
    return supabase
      .from('user_question_progress')
      .delete()
      .eq('user_id', userId)
  },
}
