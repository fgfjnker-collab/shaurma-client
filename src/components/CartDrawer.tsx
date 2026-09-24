import { ArrowRight, ShoppingBag, Trash2, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/useCart'
import { formatPrice, plural } from '../lib/format'
import { buttonClass } from './button'
import styles from './CartDrawer.module.css'
import { ProductArt } from './ProductArt'
import { QuantityStepper } from './QuantityStepper'

export function CartDrawer() {
  const cart = useCart()
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (cart.isOpen && !dialog.open) dialog.showModal()
    if (!cart.isOpen && dialog.open) dialog.close()
    document.body.style.overflow = cart.isOpen ? 'hidden' : ''
  }, [cart.isOpen])

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="cart-title"
      onClose={cart.close}
      // клик по затемнению вокруг панели закрывает корзину
      onClick={(e) => e.target === e.currentTarget && cart.close()}
    >
      <div className={styles.head}>
        <h2 id="cart-title">
          Корзина {cart.count > 0 && <span>· {cart.count}</span>}
        </h2>
        <button type="button" className={buttonClass({ variant: 'ghost', icon: true })} onClick={cart.close} aria-label="Закрыть корзину">
          <X size={22} />
        </button>
      </div>

      {cart.lines.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>
            <ShoppingBag size={32} />
          </div>
          <h3>Корзина пуста</h3>
          <p>Загляните в каталог — там киты, шалкеры и снаряжение.</p>
          <Link to="/catalog" className={buttonClass()} onClick={cart.close}>
            Перейти в каталог
          </Link>
        </div>
      ) : (
        <>
          <ul className={styles.lines}>
            {cart.lines.map(({ product, qty, total }) => (
              <li key={product.id} className={styles.line}>
                <ProductArt art={product.art} size="sm" />
                <div className={styles.info}>
                  <Link to={`/product/${product.id}`} onClick={cart.close}>
                    {product.title}
                  </Link>
                  <span className={styles.amount}>
                    {product.amount} · {formatPrice(product.price)}
                  </span>
                  <div className={styles.controls}>
                    <QuantityStepper
                      value={qty}
                      size="sm"
                      label={`Количество «${product.title}»`}
                      onChange={(v) => cart.setQty(product.id, v)}
                    />
                    <button
                      type="button"
                      className={buttonClass({ variant: 'ghost', size: 'sm', icon: true, className: styles.remove })}
                      onClick={() => cart.remove(product.id)}
                      aria-label={`Удалить «${product.title}» из корзины`}
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>
                <span className={styles.lineTotal}>{formatPrice(total)}</span>
              </li>
            ))}
          </ul>

          <div className={styles.footer}>
            <div className={styles.row}>
              <span>
                {cart.count} {plural(cart.count, ['товар', 'товара', 'товаров'])}
              </span>
              <span>{formatPrice(cart.fullPrice)}</span>
            </div>
            {cart.savings > 0 && (
              <div className={`${styles.row} ${styles.savings}`}>
                <span>Скидка</span>
                <span>−{formatPrice(cart.savings)}</span>
              </div>
            )}
            <div className={styles.total}>
              <span>Итого</span>
              <strong>{formatPrice(cart.subtotal)}</strong>
            </div>
            <Link to="/checkout" className={buttonClass({ size: 'lg', block: true })} onClick={cart.close}>
              Оформить заказ <ArrowRight size={18} />
            </Link>
          </div>
        </>
      )}
    </dialog>
  )
}
