import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

function getSystemTheme() {
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function resolveTheme(theme) {
  return theme === 'system' ? getSystemTheme() : theme
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light'
    return localStorage.getItem('ats-theme') || 'light'
  })
  const [resolvedTheme, setResolvedTheme] = useState(() => resolveTheme(theme))

  // Listen to system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (e) => {
      if (theme === 'system') {
        setResolvedTheme(e.matches ? 'dark' : 'light')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  const toggleTheme = (newTheme) => {
    setTheme(newTheme)
    localStorage.setItem('ats-theme', newTheme)
    setResolvedTheme(resolveTheme(newTheme))
  }

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', resolvedTheme)
  }, [resolvedTheme])

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
