import type { CategoryId, Product } from '../data/types'
import { discountPercent } from './format'

export type SortKey = 'popular' | 'cheap' | 'expensive' | 'discount'

export const sortOptions: { value: SortKey; label: string }[] = [
  { value: 'popular', label: 'Сначала популярные' },
  { value: 'cheap', label: 'Сначала дешевле' },
  { value: 'expensive', label: 'Сначала дороже' },
  { value: 'discount', label: 'По размеру скидки' },
]

export function isSortKey(value: string | null): value is SortKey {
  return sortOptions.some((o) => o.value === value)
}

export interface CatalogQuery {
  q?: string
  category?: CategoryId | null
  sort?: SortKey
}

const normalize = (s: string) => s.toLowerCase().replaceAll('ё', 'е').trim()

export function filterProducts(list: Product[], { q = '', category = null, sort = 'popular' }: CatalogQuery): Product[] {
  const words = normalize(q).split(/\s+/).filter(Boolean)
  const result = list.filter((p) => {
    if (category && p.category !== category) return false
    if (words.length === 0) return true
    const haystack = normalize(`${p.title} ${p.amount} ${p.short} ${p.includes.join(' ')}`)
    return words.every((w) => haystack.includes(w))
  })

  const compare: Record<SortKey, (a: Product, b: Product) => number> = {
    popular: (a, b) => b.popularity - a.popularity,
    cheap: (a, b) => a.price - b.price,
    expensive: (a, b) => b.price - a.price,
    discount: (a, b) =>
      discountPercent(b.price, b.oldPrice) - discountPercent(a.price, a.oldPrice) || b.popularity - a.popularity,
  }
  return result.sort(compare[sort])
}
