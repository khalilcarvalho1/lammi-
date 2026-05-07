/**
 * Heatmap de atividade estilo GitHub Contributions.
 * Recebe array de { date: 'YYYY-MM-DD', count: number }
 * e renderiza uma grade de semanas × dias.
 */
import { useMemo } from 'react'

interface HeatmapProps {
  data: { date: string; count: number }[]
  weeks?: number   // quantas semanas exibir (default 52)
}

const DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
const MONTHS = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']

function getLevel(count: number): number {
  if (count === 0) return 0
  if (count < 5)  return 1
  if (count < 15) return 2
  if (count < 25) return 3
  return 4
}

export function Heatmap({ data, weeks = 52 }: HeatmapProps) {
  // Monta mapa date → count
  const countMap = useMemo(() => {
    const m: Record<string, number> = {}
    data.forEach(d => { m[d.date] = d.count })
    return m
  }, [data])

  // Gera grid de semanas (da mais antiga para a mais recente)
  const grid = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Vai até o início da semana atual e recua `weeks` semanas
    const startDay = new Date(today)
    startDay.setDate(startDay.getDate() - startDay.getDay()) // início da semana atual
    startDay.setDate(startDay.getDate() - (weeks - 1) * 7)   // recua `weeks` semanas

    const weeksArr: { date: string; count: number; dayOfWeek: number }[][] = []

    let cursor = new Date(startDay)
    for (let w = 0; w < weeks; w++) {
      const week: { date: string; count: number; dayOfWeek: number }[] = []
      for (let d = 0; d < 7; d++) {
        const dateStr = cursor.toISOString().split('T')[0]
        week.push({
          date: dateStr,
          count: countMap[dateStr] ?? 0,
          dayOfWeek: d,
        })
        cursor.setDate(cursor.getDate() + 1)
      }
      weeksArr.push(week)
    }
    return weeksArr
  }, [countMap, weeks])

  // Meses para label superior
  const monthLabels = useMemo(() => {
    const labels: { month: string; weekIndex: number }[] = []
    let lastMonth = -1
    grid.forEach((week, wi) => {
      const d = new Date(week[0].date)
      if (d.getMonth() !== lastMonth) {
        labels.push({ month: MONTHS[d.getMonth()], weekIndex: wi })
        lastMonth = d.getMonth()
      }
    })
    return labels
  }, [grid])

  const totalDays  = data.filter(d => d.count > 0).length
  const totalCount = data.reduce((acc, d) => acc + d.count, 0)

  return (
    <div className="space-y-2">
      {/* Estatística rápida */}
      <div className="flex gap-4 text-xs text-[var(--color-text-muted)]">
        <span><strong className="text-[var(--color-text)]">{totalDays}</strong> dias estudados</span>
        <span><strong className="text-[var(--color-text)]">{totalCount}</strong> atividades no ano</span>
      </div>

      {/* Grade scrollável horizontalmente em mobile */}
      <div className="overflow-x-auto pb-2">
        <div className="inline-block min-w-max">
          {/* Labels de meses */}
          <div className="flex mb-1 ml-6" style={{ gap: '2px' }}>
            {grid.map((_, wi) => {
              const label = monthLabels.find(l => l.weekIndex === wi)
              return (
                <div key={wi} style={{ width: 12 }} className="text-[9px] text-[var(--color-text-subtle)] overflow-visible whitespace-nowrap">
                  {label ? label.month : ''}
                </div>
              )
            })}
          </div>

          {/* Grade principal */}
          <div className="flex gap-0.5">
            {/* Labels de dias da semana */}
            <div className="flex flex-col gap-0.5 mr-1">
              {DAYS.map((d, i) => (
                <div key={d} style={{ height: 12, lineHeight: '12px' }}
                  className="text-[9px] text-[var(--color-text-subtle)] w-5 text-right">
                  {i % 2 === 1 ? d.charAt(0) : ''}
                </div>
              ))}
            </div>

            {/* Semanas */}
            {grid.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-0.5">
                {week.map(cell => (
                  <div
                    key={cell.date}
                    className="heatmap-cell rounded-sm transition-all hover:opacity-80 cursor-default"
                    data-level={getLevel(cell.count)}
                    title={`${cell.date}: ${cell.count} atividade(s)`}
                    style={{ width: 12, height: 12 }}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Legenda */}
          <div className="flex items-center gap-1.5 mt-2 ml-6 text-[9px] text-[var(--color-text-subtle)]">
            <span>Menos</span>
            {[0,1,2,3,4].map(l => (
              <div key={l} className="heatmap-cell rounded-sm" data-level={l} style={{ width: 12, height: 12 }} />
            ))}
            <span>Mais</span>
          </div>
        </div>
      </div>
    </div>
  )
}
