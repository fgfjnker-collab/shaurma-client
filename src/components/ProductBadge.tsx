import { Flame, Percent, Sparkles } from 'lucide-react'
import type { ProductBadge as Badge } from '../data/types'
import styles from './ProductBadge.module.css'

const badges: Record<Badge, { label: string; icon: typeof Flame }> = {
  hit: { label: 'Хит', icon: Flame },
  new: { label: 'Новинка', icon: Sparkles },
  sale: { label: 'Акция', icon: Percent },
}

export function ProductBadge({ badge }: { badge: Badge }) {
  const { label, icon: BadgeIcon } = badges[badge]
  return (
    <span className={`${styles.badge} ${styles[badge]}`}>
      <BadgeIcon size={13} strokeWidth={2.4} aria-hidden="true" />
      {label}
    </span>
  )
}

export function DiscountBadge({ percent }: { percent: number }) {
  return <span className={`${styles.badge} ${styles.discount}`}>−{percent}%</span>
}
