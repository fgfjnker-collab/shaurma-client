import { describe, expect, it } from 'vitest'
import type { Product } from '../data/types'
import { MAX_QTY, cartReducer, sanitizeCart, summarizeCart } from './cart'

const product = (id: string, price: number, oldPrice?: number): Product => ({
  id,
  title: id,
  category: 'currency',
  amount: '1',
  short: '',
  description: '',
  includes: [],
  price,
  oldPrice,
  popularity: 0,
  art: { icon: 'gem', from: '#000', to: '#fff' },
})

describe('cartReducer', () => {
  it('добавляет новый товар и увеличивает количество существующего', () => {
    let items = cartReducer([], { type: 'add', id: 'a' })
    items = cartReducer(items, { type: 'add', id: 'a', qty: 2 })
    items = cartReducer(items, { type: 'add', id: 'b' })
    expect(items).toEqual([
      { id: 'a', qty: 3 },
      { id: 'b', qty: 1 },
    ])
  })

  it('не даёт превысить максимум', () => {
    const items = cartReducer([{ id: 'a', qty: MAX_QTY - 1 }], { type: 'add', id: 'a', qty: 5 })
    expect(items).toEqual([{ id: 'a', qty: MAX_QTY }])
  })

  it('удаляет товар, если количество стало нулевым', () => {
    expect(cartReducer([{ id: 'a', qty: 2 }], { type: 'setQty', id: 'a', qty: 0 })).toEqual([])
  })

  it('очищает корзину', () => {
    expect(cartReducer([{ id: 'a', qty: 2 }], { type: 'clear' })).toEqual([])
  })
})

describe('summarizeCart', () => {
  const catalog = new Map([
    ['a', product('a', 100, 150)],
    ['b', product('b', 40)],
  ])

  it('считает сумму, экономию и количество', () => {
    const summary = summarizeCart(
      [
        { id: 'a', qty: 2 },
        { id: 'b', qty: 3 },
      ],
      (id) => catalog.get(id),
    )
    expect(summary.subtotal).toBe(320)
    expect(summary.fullPrice).toBe(420)
    expect(summary.savings).toBe(100)
    expect(summary.count).toBe(5)
  })

  it('пропускает товары, которых нет в каталоге', () => {
    const summary = summarizeCart([{ id: 'gone', qty: 1 }], (id) => catalog.get(id))
    expect(summary.lines).toHaveLength(0)
    expect(summary.subtotal).toBe(0)
  })
})

describe('sanitizeCart', () => {
  it('отбрасывает мусор и склеивает дубликаты', () => {
    expect(
      sanitizeCart([{ id: 'a', qty: 1 }, { id: 'a', qty: 2 }, { id: 'b', qty: 'x' }, null, 'junk', { id: 'c', qty: 0 }]),
    ).toEqual([{ id: 'a', qty: 3 }])
  })

  it('возвращает пустую корзину для не-массива', () => {
    expect(sanitizeCart({ id: 'a' })).toEqual([])
  })
})
