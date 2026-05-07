import { useState, useEffect, useRef, useCallback } from 'react'

export function useTimer(autoStart = false) {
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(autoStart)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setSeconds(s => s + 1), 1000)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [running])

  const start  = useCallback(() => setRunning(true), [])
  const stop   = useCallback(() => setRunning(false), [])
  const reset  = useCallback(() => { setRunning(false); setSeconds(0) }, [])
  const toggle = useCallback(() => setRunning(r => !r), [])

  const format = (s: number) => {
    const h = Math.floor(s / 3600)
    const m = Math.floor((s % 3600) / 60)
    const sec = s % 60
    if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  }

  return { seconds, running, formatted: format(seconds), start, stop, reset, toggle }
}
