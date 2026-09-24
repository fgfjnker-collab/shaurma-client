import { Minus, Plus } from 'lucide-react'
import { MAX_QTY } from '../lib/cart'
import styles from './QuantityStepper.module.css'

interface Props {
  value: number
  onChange: (value: number) => void
  /** Минимум: 0 — кнопка «−» на единице удаляет товар, 1 — не даёт опуститься ниже одного */
  min?: 0 | 1
  size?: 'sm' | 'md'
  block?: boolean
  label?: string
}

export function QuantityStepper({ value, onChange, min = 1, size = 'md', block, label = 'Количество' }: Props) {
  return (
    <div
      className={[styles.stepper, size === 'sm' && styles.sm, block && styles.block].filter(Boolean).join(' ')}
      role="group"
      aria-label={label}
    >
      <button type="button" onClick={() => onChange(value - 1)} disabled={value <= min} aria-label="Уменьшить">
        <Minus size={16} />
      </button>
      <span className={styles.value} aria-live="polite">
        {value}
      </span>
      <button type="button" onClick={() => onChange(value + 1)} disabled={value >= MAX_QTY} aria-label="Увеличить">
        <Plus size={16} />
      </button>
    </div>
  )
}
