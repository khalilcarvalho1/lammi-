import { useState, useEffect } from 'react'

export function useTheme() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const stored = localStorage.getItem('lammi-theme')
    return stored ? stored === 'dark' : true // padrão dark
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
    localStorage.setItem('lammi-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  return { darkMode, setDarkMode }
}
