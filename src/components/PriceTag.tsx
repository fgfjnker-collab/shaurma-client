import { formatPrice } from '../lib/format'
import styles from './PriceTag.module.css'

export function PriceTag({ price, oldPrice, size = 'md' }: { price: number; oldPrice?: number; size?: 'md' | 'lg' }) {
  return (
    <div className={`${styles.price} ${size === 'lg' ? styles.lg : ''}`}>
      <span className={styles.current}>{formatPrice(price)}</span>
      {oldPrice && oldPrice > price && (
        <span className={styles.old}>
          <span className="visually-hidden">Старая цена: </span>
          {formatPrice(oldPrice)}
        </span>
      )}
    </div>
  )
}
