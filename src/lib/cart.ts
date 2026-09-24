import type { Product } from '../data/types'

export const MAX_QTY = 99

export interface CartItem {
  id: string
  qty: number
}

export type CartAction =
  | { type: 'add'; id: string; qty?: number }
  | { type: 'setQty'; id: string; qty: number }
  | { type: 'remove'; id: string }
  | { type: 'clear' }

const clampQty = (qty: number) => Math.min(MAX_QTY, Math.max(0, Math.floor(qty)))

export function cartReducer(items: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'add': {
      const add = action.qty ?? 1
      const existing = items.find((i) => i.id === action.id)
      if (!existing) return add > 0 ? [...items, { id: action.id, qty: clampQty(add) }] : items
      return items.map((i) => (i.id === action.id ? { ...i, qty: clampQty(i.qty + add) } : i))
    }
    case 'setQty': {
      const qty = clampQty(action.qty)
      if (qty === 0) return items.filter((i) => i.id !== action.id)
      return items.map((i) => (i.id === action.id ? { ...i, qty } : i))
    }
    case 'remove':
      return items.filter((i) => i.id !== action.id)
    case 'clear':
      return []
  }
}

export interface CartLine {
  product: Product
  qty: number
  total: number
}

export interface CartSummary {
  lines: CartLine[]
  count: number
  /** Сумма по старым ценам (без скидок) */
  fullPrice: number
  /** Сколько сэкономлено на скидках товаров */
  savings: number
  subtotal: number
}

/** Собирает строки корзины; товары, которых больше нет в каталоге, отбрасываются. */
export function summarizeCart(items: CartItem[], lookup: (id: string) => Product | undefined): CartSummary {
  const lines: CartLine[] = []
  for (const item of items) {
    const product = lookup(item.id)
    if (product && item.qty > 0) lines.push({ product, qty: item.qty, total: product.price * item.qty })
  }
  const subtotal = lines.reduce((sum, l) => sum + l.total, 0)
  const fullPrice = lines.reduce((sum, l) => sum + (l.product.oldPrice ?? l.product.price) * l.qty, 0)
  return {
    lines,
    count: lines.reduce((sum, l) => sum + l.qty, 0),
    fullPrice,
    savings: fullPrice - subtotal,
    subtotal,
  }
}

/** Проверяет данные из localStorage: мусор и дубликаты не должны ломать корзину. */
export function sanitizeCart(value: unknown): CartItem[] {
  if (!Array.isArray(value)) return []
  const byId = new Map<string, number>()
  for (const raw of value) {
    if (typeof raw !== 'object' || raw === null) continue
    const { id, qty } = raw as Record<string, unknown>
    if (typeof id !== 'string' || typeof qty !== 'number' || !Number.isFinite(qty)) continue
    byId.set(id, clampQty((byId.get(id) ?? 0) + qty))
  }
  return [...byId].filter(([, qty]) => qty > 0).map(([id, qty]) => ({ id, qty }))
}
