import { Link } from 'react-router-dom'
import { site } from '../config/site'
import { categories } from '../data/categories'
import styles from './Footer.module.css'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.about}>
          <Logo />
          <p>
            {site.tagline}. Валюта, ресурсы, наборы и премиум — с быстрой выдачей и без передачи пароля от аккаунта.
          </p>
        </div>

        <div className={styles.col}>
          <h3>Магазин</h3>
          <ul>
            {categories.slice(0, 4).map((c) => (
              <li key={c.id}>
                <Link to={`/catalog?category=${c.id}`}>{c.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <h3>Помощь</h3>
          <ul>
            <li>
              <Link to="/help">Как купить</Link>
            </li>
            <li>
              <Link to="/help#faq">Вопросы и ответы</Link>
            </li>
            <li>
              <Link to="/checkout">Оформление заказа</Link>
            </li>
          </ul>
        </div>

        <div className={styles.col}>
          <h3>Поддержка</h3>
          <ul>
            <li>
              <a href={site.support.telegram} target="_blank" rel="noreferrer">
                Telegram {site.support.telegramHandle}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.support.email}`}>{site.support.email}</a>
            </li>
            <li>{site.support.hours}</li>
          </ul>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <span>Не является официальным магазином {site.game}. Все товарные знаки принадлежат их владельцам.</span>
      </div>
    </footer>
  )
}
