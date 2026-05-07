import { supabase, Profile } from './supabaseClient'

export const profileService = {
  async getProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    if (error) return null
    return data as Profile
  },

  async upsertProfile(profile: Partial<Profile> & { id: string }) {
    return supabase.from('profiles').upsert(profile)
  },

  async updateRole(userId: string, role: 'admin' | 'member') {
    return supabase.from('profiles').update({ role }).eq('id', userId)
  },

  async setActive(userId: string, active: boolean) {
    return supabase.from('profiles').update({ active }).eq('id', userId)
  },

  async getAllProfiles() {
    return supabase.from('profiles').select('*').order('score', { ascending: false })
  },

  async getRanking() {
    return supabase
      .from('profiles')
      .select('id, nickname, score, study_streak')
      .eq('active', true)
      .order('score', { ascending: false })
      .limit(50)
  }
}
