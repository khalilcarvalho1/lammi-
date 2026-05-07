import { supabase, SimuladoRecord, StudyTheme } from './supabaseClient'

export const simuladoService = {
  async save(record: Omit<SimuladoRecord, 'id'>) {
    return supabase.from('simulados').insert(record).select().single()
  },

  async getUserSimulados(userId: string) {
    return supabase
      .from('simulados')
      .select('*')
      .eq('user_id', userId)
      .order('started_at', { ascending: false })
  },

  async getById(id: string) {
    return supabase.from('simulados').select('*').eq('id', id).single()
  },
}
