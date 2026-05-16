import { MOCK_AULAS, Aula } from '@/data/mockAulas'

export type { Aula }

export const aulasService = {
  async getAll(): Promise<{ data: Aula[]; error: null }> {
    return { data: MOCK_AULAS, error: null }
  },

  async getById(id: string): Promise<{ data: Aula | null; error: null }> {
    const aula = MOCK_AULAS.find(a => a.id === id) ?? null
    return { data: aula, error: null }
  },
}