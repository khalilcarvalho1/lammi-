import { supabase, ClinicalCase, StudyTheme } from './supabaseClient'

export const casesService = {
  async getAll(theme?: StudyTheme) {
    let q = supabase.from('clinical_cases').select('*').order('created_at', { ascending: false })
    if (theme) q = q.eq('theme', theme)
    return q
  },

  async getById(id: string) {
    return supabase.from('clinical_cases').select('*').eq('id', id).single()
  },

  async create(c: Omit<ClinicalCase, 'id' | 'created_at'>) {
    return supabase.from('clinical_cases').insert(c).select().single()
  },

  async update(id: string, c: Partial<ClinicalCase>) {
    return supabase.from('clinical_cases').update(c).eq('id', id)
  },

  async delete(id: string) {
    return supabase.from('clinical_cases').delete().eq('id', id)
  },
}
