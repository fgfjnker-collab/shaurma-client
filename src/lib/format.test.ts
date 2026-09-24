import { describe, expect, it } from 'vitest'
import { discountPercent, formatPrice, plural } from './format'

describe('format', () => {
  it('форматирует цену в рублях без копеек', () => {
    expect(formatPrice(1299).replace(/\s/g, ' ')).toBe('1 299 ₽')
  })

  it('считает скидку', () => {
    expect(discountPercent(249, 590)).toBe(57)
    expect(discountPercent(100)).toBe(0)
    expect(discountPercent(100, 90)).toBe(0)
  })

  it('склоняет слова', () => {
    const forms: [string, string, string] = ['товар', 'товара', 'товаров']
    expect([1, 2, 5, 11, 21, 22, 112].map((n) => plural(n, forms))).toEqual([
      'товар',
      'товара',
      'товаров',
      'товаров',
      'товар',
      'товара',
      'товаров',
    ])
  })
})
