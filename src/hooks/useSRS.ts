/**
 * Implementação do algoritmo SM-2 (SuperMemo 2) para repetição espaçada.
 * Referência: https://www.supermemo.com/en/archives1990-2015/english/ol/sm2
 *
 * Qualidades de resposta:
 *   0 = Errei totalmente
 *   1 = Difícil (errou mas lembrou)
 *   2 = Bom (acertou com dificuldade)
 *   3 = Fácil (acertou com facilidade)
 */

export type SRSQuality = 0 | 1 | 2 | 3

export interface SRSCard {
  ease_factor: number    // EF: fator de facilidade (mínimo 1.3)
  interval: number       // dias até próxima revisão
  repetitions: number    // acertos consecutivos
  due_date: string       // ISO date
}

/**
 * Calcula o próximo estado SM-2 dado o estado atual e a qualidade da resposta.
 * Retorna o novo estado do card.
 */
export function calculateSM2(card: SRSCard, quality: SRSQuality): SRSCard {
  let { ease_factor, interval, repetitions } = card

  // Errou: reinicia repetições e intervalo
  if (quality === 0) {
    repetitions = 0
    interval = 1
  } else if (quality === 1) {
    // Difícil: mantém repetições mas reinicia intervalo
    repetitions = 0
    interval = 1
  } else {
    // Acertou (qualidade >= 2)
    if (repetitions === 0) {
      interval = 1
    } else if (repetitions === 1) {
      interval = 6
    } else {
      interval = Math.round(interval * ease_factor)
    }
    repetitions += 1
  }

  // Ajusta EF: EF' = EF + (0.1 - (3 - q) * (0.08 + (3 - q) * 0.02))
  const q = quality
  ease_factor = ease_factor + (0.1 - (3 - q) * (0.08 + (3 - q) * 0.02))
  ease_factor = Math.max(1.3, ease_factor) // EF mínimo = 1.3

  const due_date = new Date()
  due_date.setDate(due_date.getDate() + interval)

  return {
    ease_factor,
    interval,
    repetitions,
    due_date: due_date.toISOString().split('T')[0],
  }
}

/**
 * Inicializa um novo card SRS (nunca revisado).
 */
export function initSRSCard(): SRSCard {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return {
    ease_factor: 2.5,
    interval: 1,
    repetitions: 0,
    due_date: tomorrow.toISOString().split('T')[0],
  }
}

/**
 * Verifica se um card está pendente de revisão hoje.
 */
export function isDue(card: SRSCard): boolean {
  const today = new Date().toISOString().split('T')[0]
  return card.due_date <= today
}
