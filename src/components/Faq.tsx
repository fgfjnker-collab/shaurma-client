import { Plus } from 'lucide-react'
import { faq } from '../data/faq'
import styles from './Faq.module.css'

export function Faq({ limit }: { limit?: number }) {
  return (
    <div className={styles.list}>
      {faq.slice(0, limit).map((item) => (
        <details key={item.q} className={styles.item} name="faq">
          <summary>
            {item.q}
            <Plus size={20} aria-hidden="true" />
          </summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  )
}
