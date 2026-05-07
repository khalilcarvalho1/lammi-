import { supabase, StudyLog } from './supabaseClient'

export const studyLogService = {
  /** Registra uma atividade de estudo no dia atual */
  async log(userId: string, activityType: StudyLog['activity_type'], count = 1, theme?: string) {
    const today = new Date().toISOString().split('T')[0]

    // Tenta incrementar registro existente do dia, senão cria
    const { data: existing } = await supabase
      .from('study_logs')
      .select('id, count')
      .eq('user_id', userId)
      .eq('activity_type', activityType)
      .eq('date', today)
      .maybeSingle()

    if (existing) {
      return supabase
        .from('study_logs')
        .update({ count: existing.count + count })
        .eq('id', existing.id)
    } else {
      return supabase.from('study_logs').insert({
        user_id: userId,
        activity_type: activityType,
        date: today,
        count,
        theme: theme ?? null,
      })
    }
  },

  /** Busca todos os logs do usuário para montar o heatmap */
  async getHeatmapData(userId: string) {
    const oneYearAgo = new Date()
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
    const from = oneYearAgo.toISOString().split('T')[0]

    const { data, error } = await supabase
      .from('study_logs')
      .select('date, count')
      .eq('user_id', userId)
      .gte('date', from)
      .order('date', { ascending: true })

    if (error || !data) return []

    // Agrupa por data
    const byDate: Record<string, number> = {}
    data.forEach(row => {
      byDate[row.date] = (byDate[row.date] ?? 0) + row.count
    })

    return Object.entries(byDate).map(([date, count]) => ({ date, count }))
  },

  /**
   * Calcula streak de dias consecutivos com estudo.
   * Retorna número de dias.
   */
  async getStreak(userId: string): Promise<number> {
    const heatmap = await studyLogService.getHeatmapData(userId)
    const set = new Set(heatmap.filter(d => d.count > 0).map(d => d.date))

    let streak = 0
    const cursor = new Date()
    cursor.setHours(0, 0, 0, 0)

    while (true) {
      const dateStr = cursor.toISOString().split('T')[0]
      if (!set.has(dateStr)) break
      streak++
      cursor.setDate(cursor.getDate() - 1)
    }

    return streak
  },

  /** Atualiza streak e last_study_date no profile do usuário */
  async updateProfileStreak(userId: string) {
    const streak = await studyLogService.getStreak(userId)
    const today  = new Date().toISOString().split('T')[0]

    return supabase.from('profiles').update({
      study_streak:    streak,
      last_study_date: today,
    }).eq('id', userId)
  },
}
