import { Link } from 'react-router-dom'
import { site } from '../config/site'
import styles from './Logo.module.css'

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link to="/" className={styles.logo} onClick={onClick} aria-label={`${site.name} — на главную`}>
      <span className={styles.mark} aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 1.8 18.2 10 10 18.2 1.8 10Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M10 6.4 13.6 10 10 13.6 6.4 10Z" fill="currentColor" />
        </svg>
      </span>
      {site.name}
    </Link>
  )
}
