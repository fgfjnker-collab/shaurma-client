import { Link } from 'react-router-dom'
import { buttonClass } from '../components/button'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import styles from './NotFoundPage.module.css'

export function NotFoundPage() {
  useDocumentTitle('Страница не найдена')

  return (
    <div className={`container ${styles.page}`}>
      <span className={styles.code} aria-hidden="true">
        404
      </span>
      <h1>Такой страницы нет</h1>
      <p>Возможно, товар сняли с продажи или в ссылке опечатка. Загляните в каталог — там точно что-то найдётся.</p>
      <div className={styles.actions}>
        <Link to="/catalog" className={buttonClass()}>
          В каталог
        </Link>
        <Link to="/" className={buttonClass({ variant: 'secondary' })}>
          На главную
        </Link>
      </div>
    </div>
  )
}
