import { createContext } from 'react'
import type { CartItem, CartSummary } from '../lib/cart'

export interface CartContextValue extends CartSummary {
  items: CartItem[]
  qtyOf: (id: string) => number
  add: (id: string, qty?: number) => void
  setQty: (id: string, qty: number) => void
  remove: (id: string) => void
  clear: () => void
  isOpen: boolean
  open: () => void
  close: () => void
  /** Меняется при каждом добавлении — для анимации значка корзины */
  pulse: number
}

export const CartContext = createContext<CartContextValue | null>(null)
