import type { CSSProperties } from 'react'
import type { ProductArt as Art } from '../data/types'
import { Icon } from './Icon'
import styles from './ProductArt.module.css'

const iconSize = { sm: 26, md: 64, lg: 140 }

export function ProductArt({ art, size = 'md', className }: { art: Art; size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const style = { '--from': art.from, '--to': art.to } as CSSProperties
  return (
    <div className={[styles.art, styles[size], className].filter(Boolean).join(' ')} style={style} aria-hidden="true">
      <Icon name={art.icon} size={iconSize[size]} strokeWidth={size === 'sm' ? 2 : 1.6} />
    </div>
  )
}
