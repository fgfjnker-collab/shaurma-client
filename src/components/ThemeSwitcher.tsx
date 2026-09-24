import { Check, Moon, Palette, Sun } from 'lucide-react'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { accents } from '../context/themeContext'
import { useTheme } from '../context/useTheme'
import { buttonClass } from './button'
import styles from './ThemeSwitcher.module.css'

export function ThemeSwitcher() {
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className={styles.root} ref={rootRef}>
      <button
        type="button"
        className={buttonClass({ variant: 'ghost', icon: true })}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="Оформление"
        title="Оформление"
      >
        <Palette size={20} />
      </button>

      {open && (
        <div className={styles.panel} role="dialog" aria-label="Оформление">
          <span className={styles.label}>Тема</span>
          <div className={styles.segmented}>
            <button type="button" aria-pressed={theme.mode === 'dark'} onClick={() => theme.setMode('dark')}>
              <Moon size={16} /> Тёмная
            </button>
            <button type="button" aria-pressed={theme.mode === 'light'} onClick={() => theme.setMode('light')}>
              <Sun size={16} /> Светлая
            </button>
          </div>

          <span className={styles.label}>Акцент</span>
          <div className={styles.swatches}>
            {accents.map((a) => (
              <button
                key={a.id}
                type="button"
                className={styles.swatch}
                style={{ '--swatch': a.color } as CSSProperties}
                aria-pressed={theme.accent === a.id}
                aria-label={a.label}
                title={a.label}
                onClick={() => theme.setAccent(a.id)}
              >
                {theme.accent === a.id && <Check size={16} strokeWidth={3} />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
