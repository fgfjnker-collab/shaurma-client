import { ChevronRight, Menu, ShoppingBag, X } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/useCart'
import { buttonClass } from './button'
import styles from './Header.module.css'
import { Logo } from './Logo'
import { SearchForm } from './SearchForm'
import { ThemeSwitcher } from './ThemeSwitcher'

const links = [
  { to: '/catalog', label: 'Каталог' },
  { to: '/catalog?category=bundles', label: 'Наборы' },
  { to: '/catalog?category=premium', label: 'Премиум' },
  { to: '/help', label: 'Помощь' },
]

export function Header() {
  const cart = useCart()
  const location = useLocation()
  const [menuFor, setMenuFor] = useState<string | null>(null)
  // меню само закрывается при переходе на другую страницу
  const menuOpen = menuFor === location.key
  const closeMenu = () => setMenuFor(null)
  const onCatalog = location.pathname === '/catalog'

  const isActive = (to: string) => {
    const [path, query] = to.split('?')
    if (location.pathname !== path) return false
    const current = new URLSearchParams(location.search).get('category')
    return (query ? new URLSearchParams(query).get('category') : null) === current
  }

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <button
          type="button"
          className={buttonClass({ variant: 'ghost', icon: true, className: styles.burger })}
          onClick={() => setMenuFor(menuOpen ? null : location.key)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <Logo onClick={closeMenu} />

        <nav className={styles.nav} aria-label="Основная навигация">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`${styles.navLink} ${isActive(l.to) ? styles.active : ''}`}
              aria-current={isActive(l.to) ? 'page' : undefined}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {!onCatalog && (
          <div className={styles.search}>
            <SearchForm />
          </div>
        )}

        <div className={styles.actions}>
          <ThemeSwitcher />
          <button
            type="button"
            className={buttonClass({ variant: 'ghost', icon: true, className: styles.cartButton })}
            onClick={cart.open}
            aria-label={`Корзина, товаров: ${cart.count}`}
          >
            <ShoppingBag size={21} />
            {cart.count > 0 && (
              <span key={cart.pulse} className={`${styles.count} ${cart.pulse ? styles.bump : ''}`}>
                {cart.count > 99 ? '99+' : cart.count}
              </span>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-menu" className={styles.mobileMenu} aria-label="Мобильное меню">
          <SearchForm onSubmitted={closeMenu} />
          {links.map((l) => (
            <Link key={l.to} to={l.to} className={styles.mobileLink} onClick={closeMenu}>
              {l.label}
              <ChevronRight size={18} />
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
