import { ChevronDown, LayoutGrid, Search, SearchX } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { buttonClass } from '../components/button'
import { Icon } from '../components/Icon'
import { ProductGrid } from '../components/ProductGrid'
import { categories, categoryById } from '../data/categories'
import { products } from '../data/products'
import type { CategoryId } from '../data/types'
import { filterProducts, isSortKey, sortOptions } from '../lib/catalog'
import { plural } from '../lib/format'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import styles from './CatalogPage.module.css'

export function CatalogPage() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') ?? ''
  const rawCategory = params.get('category')
  const category = rawCategory && Object.hasOwn(categoryById, rawCategory) ? (rawCategory as CategoryId) : null
  const rawSort = params.get('sort')
  const sort = isSortKey(rawSort) ? rawSort : 'popular'

  const result = filterProducts(products, { q, category, sort })

  const update = (key: string, value: string | null) => {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (value) next.set(key, value)
        else next.delete(key)
        return next
      },
      { replace: true, preventScrollReset: true },
    )
  }

  const title = category ? categoryById[category].title : 'Каталог'
  useDocumentTitle(title)

  return (
    <div className={`container ${styles.page}`}>
      <div className={styles.head}>
        <h1>{title}</h1>
        <span>
          {result.length} {plural(result.length, ['товар', 'товара', 'товаров'])}
        </span>
      </div>

      <div className={styles.toolbar}>
        <label className={styles.search}>
          <span className="visually-hidden">Поиск по каталогу</span>
          <Search size={18} />
          <input
            className={styles.control}
            type="search"
            placeholder="Поиск: кристаллы, руда, VIP…"
            value={q}
            onChange={(e) => update('q', e.target.value)}
          />
        </label>
        <label className={styles.select}>
          <span className="visually-hidden">Сортировка</span>
          <select className={styles.control} value={sort} onChange={(e) => update('sort', e.target.value === 'popular' ? null : e.target.value)}>
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <ChevronDown size={18} />
        </label>
      </div>

      <div className={styles.chips} role="group" aria-label="Категории">
        <button type="button" className={styles.chip} aria-pressed={!category} onClick={() => update('category', null)}>
          <LayoutGrid size={17} /> Все
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            className={styles.chip}
            aria-pressed={category === c.id}
            onClick={() => update('category', c.id)}
          >
            <Icon name={c.icon} size={17} /> {c.title}
          </button>
        ))}
      </div>

      {result.length > 0 ? (
        <ProductGrid products={result} />
      ) : (
        <div className={styles.empty}>
          <SearchX size={40} />
          <h2>Ничего не нашлось</h2>
          <p>Попробуйте изменить запрос или выбрать другую категорию.</p>
          <button type="button" className={buttonClass({ variant: 'secondary' })} onClick={() => setParams({}, { replace: true })}>
            Сбросить фильтры
          </button>
        </div>
      )}
    </div>
  )
}
