import { describe, expect, it } from 'vitest'
import { products } from '../data/products'
import { filterProducts } from './catalog'

describe('filterProducts', () => {
  it('фильтрует по категории', () => {
    const result = filterProducts(products, { category: 'boosters' })
    expect(result.length).toBeGreaterThan(0)
    expect(result.every((p) => p.category === 'boosters')).toBe(true)
  })

  it('ищет по нескольким словам без учёта регистра и буквы ё', () => {
    const result = filterProducts(products, { q: 'КРИСТАЛЛ 1 200' })
    expect(result.map((p) => p.id)).toEqual(['crystals-1200'])
    expect(filterProducts(products, { q: 'древесин' }).length).toBeGreaterThan(1)
  })

  it('сортирует по цене', () => {
    const prices = filterProducts(products, { sort: 'cheap' }).map((p) => p.price)
    expect(prices).toEqual([...prices].sort((a, b) => a - b))
  })

  it('не мутирует исходный список', () => {
    const before = products.map((p) => p.id)
    filterProducts(products, { sort: 'expensive' })
    expect(products.map((p) => p.id)).toEqual(before)
  })
})
