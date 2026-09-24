import { describe, expect, it } from 'vitest'
import { products } from '../data/products'
import { filterProducts } from './catalog'

describe('filterProducts', () => {
  it('фильтрует по категории', () => {
    const result = filterProducts(products, { category: 'shulkers' })
    expect(result.length).toBeGreaterThan(0)
    expect(result.every((p) => p.category === 'shulkers')).toBe(true)
  })

  it('ищет по нескольким словам без учёта регистра и буквы ё', () => {
    expect(filterProducts(products, { q: 'ЭЛИТРЫ прочность' }).map((p) => p.id)).toEqual(['elytra'])
    expect(filterProducts(products, { q: 'тотём' }).map((p) => p.id)).toContain('totem-shulker')
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
