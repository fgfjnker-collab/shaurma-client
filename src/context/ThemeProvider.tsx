import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { readStorage, writeStorage } from '../lib/storage'
import { ThemeContext, accents, type ThemeState } from './themeContext'

// Тот же ключ читает скрипт в index.html до загрузки React
const STORAGE_KEY = 'shaurma:theme'
const DEFAULT_THEME: ThemeState = { mode: 'dark', accent: 'violet' }

function loadTheme(): ThemeState {
  const saved = readStorage<Partial<ThemeState> | null>(STORAGE_KEY, null)
  return {
    mode: saved?.mode === 'light' ? 'light' : 'dark',
    accent: accents.find((a) => a.id === saved?.accent)?.id ?? DEFAULT_THEME.accent,
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState(loadTheme)

  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = theme.mode
    root.dataset.accent = theme.accent
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme.mode === 'dark' ? '#09090d' : '#f6f6f9')
    writeStorage(STORAGE_KEY, theme)
  }, [theme])

  const value = useMemo(
    () => ({
      ...theme,
      setMode: (mode: ThemeState['mode']) => setTheme((t) => ({ ...t, mode })),
      setAccent: (accent: ThemeState['accent']) => setTheme((t) => ({ ...t, accent })),
    }),
    [theme],
  )

  return <ThemeContext value={value}>{children}</ThemeContext>
}
