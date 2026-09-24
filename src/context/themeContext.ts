import { createContext } from 'react'

export type ThemeMode = 'dark' | 'light'
export type Accent = 'violet' | 'emerald' | 'amber' | 'rose' | 'sky'

export const accents: { id: Accent; label: string; color: string }[] = [
  { id: 'violet', label: 'Фиолетовый', color: '#8b5cf6' },
  { id: 'sky', label: 'Голубой', color: '#0ea5e9' },
  { id: 'emerald', label: 'Изумрудный', color: '#10b981' },
  { id: 'amber', label: 'Янтарный', color: '#f59e0b' },
  { id: 'rose', label: 'Розовый', color: '#f43f5e' },
]

export interface ThemeState {
  mode: ThemeMode
  accent: Accent
}

export interface ThemeContextValue extends ThemeState {
  setMode: (mode: ThemeMode) => void
  setAccent: (accent: Accent) => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)
