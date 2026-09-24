import { ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/useCart'
import { categoryById } from '../data/categories'
import type { Product } from '../data/types'
import { discountPercent } from '../lib/format'
import { buttonClass } from './button'
import { PriceTag } from './PriceTag'
import { ProductArt } from './ProductArt'
import { DiscountBadge, ProductBadge } from './ProductBadge'
import styles from './ProductCard.module.css'
import { QuantityStepper } from './QuantityStepper'

export function ProductCard({ product }: { product: Product }) {
  const cart = useCart()
  const qty = cart.qtyOf(product.id)
  const discount = discountPercent(product.price, product.oldPrice)

  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <ProductArt art={product.art} />
        <div className={styles.badges}>
          <span>{product.badge && <ProductBadge badge={product.badge} />}</span>
          {discount > 0 && <DiscountBadge percent={discount} />}
        </div>
      </div>

      <div className={styles.body}>
        <span className={styles.meta}>{categoryById[product.category].title}</span>
        <h3 className={styles.title}>
          <Link to={`/product/${product.id}`}>{product.title}</Link>
        </h3>
        <span className={styles.amount}>{product.amount}</span>
        <p className={styles.short}>{product.short}</p>

        <div className={styles.footer}>
          <PriceTag price={product.price} oldPrice={product.oldPrice} />
          {qty > 0 ? (
            <QuantityStepper
              value={qty}
              min={0}
              size="sm"
              label={`Количество «${product.title}» в корзине`}
              onChange={(v) => cart.setQty(product.id, v)}
            />
          ) : (
            <button
              type="button"
              className={buttonClass({ size: 'sm' })}
              onClick={() => cart.add(product.id)}
              aria-label={`Добавить в корзину: ${product.title}, ${product.amount}`}
            >
              <ShoppingCart size={16} />
              В корзину
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
