import { ArrowRight, Compass, Headphones, ShieldCheck, Sparkles } from 'lucide-react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { buttonClass } from '../components/button'
import { Faq } from '../components/Faq'
import { Icon } from '../components/Icon'
import { PriceTag } from '../components/PriceTag'
import { ProductArt } from '../components/ProductArt'
import { DiscountBadge } from '../components/ProductBadge'
import { ProductGrid } from '../components/ProductGrid'
import { Section } from '../components/Section'
import { Steps } from '../components/Steps'
import { site } from '../config/site'
import { categories } from '../data/categories'
import { productById, products } from '../data/products'
import type { Product } from '../data/types'
import { filterProducts } from '../lib/catalog'
import { discountPercent, formatPrice, plural } from '../lib/format'
import styles from './HomePage.module.css'

const popular = filterProducts(products, { sort: 'popular' }).slice(0, 8)
// Товары для баннера и витрины в первом экране; если их убрать из каталога, подставятся популярные
const pick = (id: string, fallback: Product) => productById.get(id) ?? fallback
const deal = pick('starter-kit', popular[0])
const dealDiscount = discountPercent(deal.price, deal.oldPrice)
const showcase = ['pvp-kit', 'totem-shulker', 'elytra'].map((id, i) => pick(id, popular[i]))
const countByCategory = (id: string) => products.filter((p) => p.category === id).length

export function HomePage() {
  const [main, first, second] = showcase

  return (
    <>
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div>
            <span className={styles.pill}>
              <Sparkles size={16} /> {site.tagline}
            </span>
            <h1 className={styles.title}>
              Всё для выживания на <span className={styles.accent}>{site.game}</span>
            </h1>
            <p className={styles.lead}>
              Киты, шалкеры и незеритовое снаряжение с доставкой прямо в игре. Нужен только ник — пароль от
              аккаунта мы не спрашиваем.
            </p>
            <div className={styles.ctas}>
              <Link to="/catalog" className={buttonClass({ size: 'lg' })}>
                Перейти в каталог <ArrowRight size={18} />
              </Link>
              <Link to="/help" className={buttonClass({ variant: 'secondary', size: 'lg' })}>
                Как это работает
              </Link>
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
          </div>

          <div className={styles.visual} aria-hidden="true">
            <div className={`${styles.showcase} ${styles.showMain}`}>
              <ProductArt art={main.art} />
              <div>
                <strong>{main.title}</strong>
                <span>{main.amount}</span>
              </div>
              <PriceTag price={main.price} oldPrice={main.oldPrice} />
            </div>
            <div className={`${styles.showcase} ${styles.showA}`}>
              <ProductArt art={first.art} />
              <strong>{first.title}</strong>
              <b>{formatPrice(first.price)}</b>
            </div>
            <div className={`${styles.showcase} ${styles.showB}`}>
              <ProductArt art={second.art} />
              <strong>{second.title}</strong>
              <b>{formatPrice(second.price)}</b>
            </div>
          </div>
        </div>
      </section>

      <Section eyebrow="Категории" title="Что будем брать?">
        <div className={styles.categories}>
          {categories.map((c) => {
            const count = countByCategory(c.id)
            return (
              <Link key={c.id} to={`/catalog?category=${c.id}`} className={styles.category}>
                <span className={styles.categoryIcon}>
                  <Icon name={c.icon} size={24} />
                </span>
                <h3>{c.title}</h3>
                <p>{c.description}</p>
                <small>
                  {count} {plural(count, ['товар', 'товара', 'товаров'])}
                </small>
              </Link>
            )
          })}
        </div>
      </Section>

      <Section eyebrow="Популярное" title="Хиты магазина" link={{ to: '/catalog', label: 'Весь каталог' }}>
        <ProductGrid products={popular} />
      </Section>

      <section className={`container ${styles.dealSection}`}>
        <div className={styles.deal} style={{ '--deal-from': deal.art.from } as CSSProperties}>
          <div className={styles.dealText}>
            {dealDiscount > 0 && <DiscountBadge percent={dealDiscount} />}
            <h2>{deal.title} — выбраться со спавна</h2>
            <p>{deal.description}</p>
            <ul className={styles.dealIncludes}>
              {deal.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className={styles.dealFooter}>
              <PriceTag price={deal.price} oldPrice={deal.oldPrice} size="lg" />
              <Link to={`/product/${deal.id}`} className={buttonClass({ size: 'lg' })}>
                Забрать набор <ArrowRight size={18} />
              </Link>
            </div>
          </div>
          <ProductArt art={deal.art} size="lg" className={styles.dealArt} />
        </div>
      </section>

      <Section eyebrow="Как это работает" title="Три шага до ресурсов">
        <Steps />
      </Section>

      <Section eyebrow="FAQ" title="Частые вопросы" link={{ to: '/help', label: 'Все вопросы' }}>
        <div className={styles.faqWrap}>
          <Faq limit={4} />
        </div>
      </Section>
    </>
  )
}
