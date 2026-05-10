import { supabase } from './supabaseClient'

export interface Aula {
  id: string
  title: string
  description: string
  theme: string
  type: string
  content_url?: string
  content?: string
  created_at?: string
}

export const aulasService = {
  async getAll() {
    return supabase
      .from('aulas')
      .select('*')
      .order('created_at', { ascending: true })
  },

  async getById(id: string) {
    return supabase
      .from('aulas')
      .select('*')
      .eq('id', id)
      .single()
  },
}