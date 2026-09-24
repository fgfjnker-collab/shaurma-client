import { Check, ChevronRight, Compass, Headphones, ShieldCheck, ShoppingCart } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { buttonClass } from '../components/button'
import { Icon } from '../components/Icon'
import { PriceTag } from '../components/PriceTag'
import { ProductArt } from '../components/ProductArt'
import { DiscountBadge, ProductBadge } from '../components/ProductBadge'
import { ProductGrid } from '../components/ProductGrid'
import { QuantityStepper } from '../components/QuantityStepper'
import { Section } from '../components/Section'
import { useCart } from '../context/useCart'
import { categoryById } from '../data/categories'
import { productById, products } from '../data/products'
import type { Product } from '../data/types'
import { filterProducts } from '../lib/catalog'
import { discountPercent } from '../lib/format'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import { NotFoundPage } from './NotFoundPage'
import styles from './ProductPage.module.css'

export function ProductPage() {
  const { id = '' } = useParams()
  const product = productById.get(id)
  if (!product) return <NotFoundPage />
  // key сбрасывает выбранное количество при переходе на другой товар
  return <ProductDetails key={product.id} product={product} />
}

function ProductDetails({ product }: { product: Product }) {
  const cart = useCart()
  const navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const [justAdded, setJustAdded] = useState(false)
  const category = categoryById[product.category]
  const discount = discountPercent(product.price, product.oldPrice)
  const inCart = cart.qtyOf(product.id)

  const related = filterProducts(
    products.filter((p) => p.id !== product.id),
    { category: product.category },
  ).slice(0, 4)

  useDocumentTitle(`${product.title} — ${product.amount}`)

  useEffect(() => {
    if (!justAdded) return
    const t = setTimeout(() => setJustAdded(false), 1600)
    return () => clearTimeout(t)
  }, [justAdded])

  const addToCart = () => {
    cart.add(product.id, qty)
    setJustAdded(true)
  }

  const buyNow = () => {
    cart.add(product.id, qty)
    navigate('/checkout')
  }

  return (
    <>
      <div className={`container ${styles.page}`}>
        <nav className={styles.crumbs} aria-label="Хлебные крошки">
          <Link to="/">Главная</Link>
          <ChevronRight size={14} />
          <Link to="/catalog">Каталог</Link>
          <ChevronRight size={14} />
          <Link to={`/catalog?category=${category.id}`}>{category.title}</Link>
          <ChevronRight size={14} />
          <span aria-current="page">{product.title}</span>
        </nav>

        <div className={styles.layout}>
          <div className={styles.media}>
            <ProductArt art={product.art} size="lg" />
            <div className={styles.badges}>
              <span>{product.badge && <ProductBadge badge={product.badge} />}</span>
              {discount > 0 && <DiscountBadge percent={discount} />}
            </div>
          </div>

          <div className={styles.info}>
            <Link to={`/catalog?category=${category.id}`} className={styles.category}>
              <Icon name={category.icon} size={16} /> {category.title}
            </Link>
            <h1>{product.title}</h1>
            <p className={styles.amount}>{product.amount}</p>
            <p className={styles.short}>{product.short}</p>

            <div className={styles.buy}>
              <PriceTag price={product.price} oldPrice={product.oldPrice} size="lg" />
              <div className={styles.buyRow}>
                <QuantityStepper value={qty} onChange={setQty} />
                <button type="button" className={buttonClass({ size: 'lg' })} onClick={addToCart}>
                  {justAdded ? <Check size={18} /> : <ShoppingCart size={18} />}
                  {justAdded ? 'Добавлено' : 'В корзину'}
                </button>
                <button type="button" className={buttonClass({ variant: 'secondary', size: 'lg' })} onClick={buyNow}>
                  Купить сейчас
                </button>
              </div>
              {inCart > 0 && (
                <p className={styles.inCart} aria-live="polite">
                  Уже в корзине: {inCart} шт. ·{' '}
                  <button type="button" onClick={cart.open}>
                    Открыть корзину
                  </button>
                </p>
              )}
            </div>

            <ul className={styles.perks}>
              <li>
                <Compass size={18} /> Доставка в игре
              </li>
              <li>
                <ShieldCheck size={18} /> Пароль не нужен
              </li>
              <li>
                <Headphones size={18} /> Поддержка каждый день
              </li>
            </ul>

            <div className={styles.block}>
              <h2>Что входит</h2>
              <ul className={styles.includes}>
                {product.includes.map((item) => (
                  <li key={item}>
                    <Check size={22} strokeWidth={3} /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.block}>
              <h2>Описание</h2>
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <Section title="Похожие товары" link={{ to: `/catalog?category=${category.id}`, label: 'Смотреть все' }}>
          <ProductGrid products={related} />
        </Section>
      )}
    </>
  )
}
