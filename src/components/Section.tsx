import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styles from './Section.module.css'

interface Props {
  eyebrow?: string
  title: string
  link?: { to: string; label: string }
  children: ReactNode
}

export function Section({ eyebrow, title, link, children }: Props) {
  return (
    <section className={`container ${styles.section}`}>
      <div className={styles.head}>
        <div>
          {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
          <h2 className={styles.title}>{title}</h2>
        </div>
        {link && (
          <Link to={link.to} className={styles.link}>
            {link.label} <ArrowRight size={18} />
          </Link>
        )}
      </div>
      {children}
    </section>
  )
}
