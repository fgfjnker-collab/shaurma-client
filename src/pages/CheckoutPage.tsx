import {
  Bitcoin,
  CircleCheck,
  CreditCard,
  Handshake,
  Info,
  LoaderCircle,
  Lock,
  MapPin,
  ShoppingBag,
  Smartphone,
  X,
} from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  IS_DEMO,
  checkPromo,
  createOrder,
  type DeliveryMethod,
  type Order,
  type PaymentMethod,
  type PromoResult,
} from '../api/orders'
import { buttonClass } from '../components/button'
import { ProductArt } from '../components/ProductArt'
import { site } from '../config/site'
import { useCart } from '../context/useCart'
import { promoDiscount, validateCheckout, type CheckoutErrors, type CheckoutForm } from '../lib/checkout'
import { formatPrice } from '../lib/format'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import styles from './CheckoutPage.module.css'

interface Option<T> {
  id: T
  title: string
  text: string
  icon: typeof CreditCard
}

const deliveryMethods: Option<DeliveryMethod>[] = [
  { id: 'meet', title: 'Встреча в игре', text: 'На спавне или на хайвее — договоримся о месте', icon: Handshake },
  { id: 'stash', title: 'Тайник по координатам', text: 'Спрячем заказ у вашей базы, координаты пришлём лично', icon: MapPin },
]

const paymentMethods: Option<PaymentMethod>[] = [
  { id: 'card', title: 'Банковская карта', text: 'Visa, Mastercard, МИР', icon: CreditCard },
  { id: 'sbp', title: 'СБП', text: 'По QR-коду через приложение банка', icon: Smartphone },
  { id: 'crypto', title: 'Криптовалюта', text: 'USDT, TON, BTC', icon: Bitcoin },
]

interface Placed extends Order {
  nickname: string
  contact: string
  email: string | null
}

export function CheckoutPage() {
  useDocumentTitle('Оформление заказа')
  const [placed, setPlaced] = useState<Placed | null>(null)

  return (
    <div className={`container ${styles.page}`}>
      {placed ? <Success order={placed} /> : <Checkout onPlaced={setPlaced} />}
    </div>
  )
}

function Checkout({ onPlaced }: { onPlaced: (order: Placed) => void }) {
  const cart = useCart()
  const [form, setForm] = useState<CheckoutForm>({ nickname: '', contact: '', email: '', consent: false })
  const [delivery, setDelivery] = useState<DeliveryMethod>('meet')
  const [payment, setPayment] = useState<PaymentMethod>('card')
  const [errors, setErrors] = useState<CheckoutErrors>({})
  const [touched, setTouched] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const [promoInput, setPromoInput] = useState('')
  const [promo, setPromo] = useState<PromoResult | null>(null)
  const [promoState, setPromoState] = useState<'idle' | 'checking' | 'invalid'>('idle')

  const promoOff = promo ? promoDiscount(cart.subtotal, promo.percent) : 0
  const total = cart.subtotal - promoOff

  const set = <K extends keyof CheckoutForm>(key: K, value: CheckoutForm[K]) => {
    const next = { ...form, [key]: value }
    setForm(next)
    // после первой попытки отправки ошибки обновляются на лету
    if (touched) setErrors(validateCheckout(next))
  }

  const applyPromo = async () => {
    if (!promoInput.trim()) return
    setPromoState('checking')
    const result = await checkPromo(promoInput)
    setPromo(result)
    setPromoState(result ? 'idle' : 'invalid')
    if (result) setPromoInput('')
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setTouched(true)
    const found = validateCheckout(form)
    setErrors(found)
    const firstInvalid = Object.keys(found)[0]
    if (firstInvalid) {
      document.getElementById(`checkout-${firstInvalid}`)?.focus()
      return
    }

    setSubmitting(true)
    setSubmitError('')
    const recipient = {
      nickname: form.nickname.trim(),
      contact: form.contact.trim(),
      email: form.email.trim() || null,
    }
    try {
      const order = await createOrder(
        {
          ...recipient,
          delivery,
          payment,
          promo: promo?.code ?? null,
          items: cart.lines.map((l) => ({ id: l.product.id, qty: l.qty })),
        },
        total,
      )
      cart.clear()
      onPlaced({ ...order, ...recipient })
    } catch {
      setSubmitError('Не удалось оформить заказ. Проверьте соединение и попробуйте ещё раз.')
    } finally {
      setSubmitting(false)
    }
  }

  if (cart.lines.length === 0) {
    return (
      <div className={styles.state}>
        <div className={styles.stateIcon}>
          <ShoppingBag size={36} />
        </div>
        <h2>В корзине пока пусто</h2>
        <p>Добавьте товары из каталога, и здесь появится форма заказа.</p>
        <div className={styles.actions}>
          <Link to="/catalog" className={buttonClass({ size: 'lg' })}>
            Перейти в каталог
          </Link>
        </div>
      </div>
    )
  }

  const fieldProps = (key: keyof CheckoutForm) => ({
    id: `checkout-${key}`,
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': errors[key] ? `checkout-${key}-error` : `checkout-${key}-hint`,
  })

  const fieldError = (key: keyof CheckoutForm) =>
    errors[key] && (
      <span id={`checkout-${key}-error`} className={styles.error}>
        {errors[key]}
      </span>
    )

  return (
    <>
      <h1>Оформление заказа</h1>
      {IS_DEMO && (
        <p className={styles.demo}>
          <Info size={18} />
          Демо-режим: оплата пока не подключена, заказ сохраняется только в браузере.
        </p>
      )}

      <div className={styles.layout}>
        <form id="checkout-form" className={styles.form} onSubmit={submit} noValidate>
          <fieldset className={styles.card}>
            <legend>Получатель</legend>
            <div className={styles.fields}>
              <div className={styles.field}>
                <label htmlFor="checkout-nickname">Ник в Minecraft</label>
                <input
                  {...fieldProps('nickname')}
                  className={styles.input}
                  autoComplete="nickname"
                  autoCapitalize="off"
                  spellCheck={false}
                  placeholder="Например, Shaurmist"
                  value={form.nickname}
                  onChange={(e) => set('nickname', e.target.value)}
                />
                {fieldError('nickname') || (
                  <span id="checkout-nickname-hint" className={styles.hint}>
                    Точно как в игре, на {site.game}
                  </span>
                )}
              </div>
              <div className={styles.field}>
                <label htmlFor="checkout-contact">Discord или Telegram</label>
                <input
                  {...fieldProps('contact')}
                  className={styles.input}
                  autoCapitalize="off"
                  spellCheck={false}
                  placeholder="@username"
                  value={form.contact}
                  onChange={(e) => set('contact', e.target.value)}
                />
                {fieldError('contact') || (
                  <span id="checkout-contact-hint" className={styles.hint}>
                    Напишем, чтобы договориться о передаче
                  </span>
                )}
              </div>
              <div className={`${styles.field} ${styles.wide}`}>
                <label htmlFor="checkout-email">
                  Почта для чека <span className={styles.optional}>— необязательно</span>
                </label>
                <input
                  {...fieldProps('email')}
                  className={styles.input}
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => set('email', e.target.value)}
                />
                {fieldError('email') || (
                  <span id="checkout-email-hint" className={styles.hint}>
                    Пришлём чек и номер заказа
                  </span>
                )}
              </div>
            </div>
          </fieldset>

          <fieldset className={styles.card}>
            <legend>Способ получения</legend>
            <div className={`${styles.methods} ${styles.twoColumns}`}>
              {deliveryMethods.map(({ id, title, text, icon: MethodIcon }) => (
                <label key={id} className={styles.method}>
                  <input
                    type="radio"
                    name="delivery"
                    value={id}
                    checked={delivery === id}
                    onChange={() => setDelivery(id)}
                  />
                  <MethodIcon size={22} />
                  <strong>{title}</strong>
                  <span>{text}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className={styles.card}>
            <legend>Способ оплаты</legend>
            <div className={styles.methods}>
              {paymentMethods.map(({ id, title, text, icon: MethodIcon }) => (
                <label key={id} className={styles.method}>
                  <input
                    type="radio"
                    name="payment"
                    value={id}
                    checked={payment === id}
                    onChange={() => setPayment(id)}
                  />
                  <MethodIcon size={22} />
                  <strong>{title}</strong>
                  <span>{text}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <label className={styles.consent}>
              <input
                {...fieldProps('consent')}
                type="checkbox"
                checked={form.consent}
                onChange={(e) => set('consent', e.target.checked)}
              />
              <span id="checkout-consent-hint">
                Я проверил ник и согласен с <Link to="/help">условиями покупки</Link>
              </span>
            </label>
            {fieldError('consent')}
          </div>
        </form>

        <aside className={styles.summary} aria-labelledby="summary-title">
          <h2 id="summary-title">Ваш заказ</h2>
          <ul className={styles.lines}>
            {cart.lines.map(({ product, qty, total: lineTotal }) => (
              <li key={product.id} className={styles.line}>
                <ProductArt art={product.art} size="sm" />
                <div>
                  <strong>{product.title}</strong>
                  <span>
                    {product.amount} × {qty}
                  </span>
                </div>
                <b>{formatPrice(lineTotal)}</b>
              </li>
            ))}
          </ul>

          {promo ? (
            <div className={styles.applied}>
              Промокод {promo.code} · −{promo.percent}%
              <button
                type="button"
                className={buttonClass({ variant: 'ghost', size: 'sm', icon: true })}
                onClick={() => setPromo(null)}
                aria-label="Убрать промокод"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className={styles.field}>
              <div className={styles.promo}>
                <input
                  className={styles.input}
                  placeholder="Промокод"
                  aria-label="Промокод"
                  aria-invalid={promoState === 'invalid' || undefined}
                  value={promoInput}
                  onChange={(e) => {
                    setPromoInput(e.target.value)
                    if (promoState === 'invalid') setPromoState('idle')
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      void applyPromo()
                    }
                  }}
                />
                <button
                  type="button"
                  className={buttonClass({ variant: 'secondary' })}
                  onClick={applyPromo}
                  disabled={promoState === 'checking' || !promoInput.trim()}
                >
                  {promoState === 'checking' ? <LoaderCircle size={18} className={styles.spin} /> : 'Применить'}
                </button>
              </div>
              {promoState === 'invalid' ? (
                <span className={styles.error}>Такого промокода нет или он истёк</span>
              ) : (
                IS_DEMO && <span className={styles.hint}>Для проверки: SHAURMA10</span>
              )}
            </div>
          )}

          <div className={styles.rows}>
            <div className={styles.row}>
              <span>Товары ({cart.count})</span>
              <span>{formatPrice(cart.fullPrice)}</span>
            </div>
            {cart.savings > 0 && (
              <div className={`${styles.row} ${styles.good}`}>
                <span>Скидка</span>
                <span>−{formatPrice(cart.savings)}</span>
              </div>
            )}
            {promoOff > 0 && (
              <div className={`${styles.row} ${styles.good}`}>
                <span>Промокод</span>
                <span>−{formatPrice(promoOff)}</span>
              </div>
            )}
          </div>

          <div className={styles.total}>
            <span>К оплате</span>
            <strong>{formatPrice(total)}</strong>
          </div>

          {submitError && (
            <p className={styles.alert} role="alert">
              {submitError}
            </p>
          )}

          <button
            type="submit"
            form="checkout-form"
            className={buttonClass({ size: 'lg', block: true })}
            disabled={submitting}
          >
            {submitting ? (
              <>
                <LoaderCircle size={18} className={styles.spin} /> Оформляем…
              </>
            ) : (
              `Оплатить ${formatPrice(total)}`
            )}
          </button>
          <p className={styles.secure}>
            <Lock size={14} /> Данные передаются по защищённому соединению
          </p>
        </aside>
      </div>
    </>
  )
}

function Success({ order }: { order: Placed }) {
  return (
    <div className={`${styles.state} ${styles.success}`} role="status">
      <div className={styles.stateIcon}>
        <CircleCheck size={40} />
      </div>
      <h2>Заказ оформлен!</h2>
      <span className={styles.orderNumber}>{order.number}</span>
      <p>
        Скоро напишем вам в <strong>{order.contact}</strong>, чтобы договориться о передаче заказа игроку{' '}
        <strong>{order.nickname}</strong>.{order.email && ` Чек придёт на ${order.email}.`}
      </p>
      <div className={styles.actions}>
        <Link to="/catalog" className={buttonClass({ size: 'lg' })}>
          Вернуться в магазин
        </Link>
        <Link to="/help" className={buttonClass({ variant: 'secondary', size: 'lg' })}>
          Помощь
        </Link>
      </div>
    </div>
  )
}
