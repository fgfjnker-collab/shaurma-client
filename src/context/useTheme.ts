import { useContext } from 'react'
import { ThemeContext } from './themeContext'

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme должен вызываться внутри <ThemeProvider>')
  return ctx
}
