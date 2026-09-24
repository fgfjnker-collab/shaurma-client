import { useCallback, useEffect, useMemo, useReducer, useState, type ReactNode } from 'react'
import { productById } from '../data/products'
import { cartReducer, sanitizeCart, summarizeCart } from '../lib/cart'
import { readStorage, writeStorage } from '../lib/storage'
import { CartContext, type CartContextValue } from './cartContext'

const STORAGE_KEY = 'shaurma:cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, undefined, () => sanitizeCart(readStorage(STORAGE_KEY, [])))
  const [isOpen, setIsOpen] = useState(false)
  const [pulse, setPulse] = useState(0)

  useEffect(() => writeStorage(STORAGE_KEY, items), [items])

  const add = useCallback((id: string, qty = 1) => {
    dispatch({ type: 'add', id, qty })
    setPulse((n) => n + 1)
  }, [])
  const setQty = useCallback((id: string, qty: number) => dispatch({ type: 'setQty', id, qty }), [])
  const remove = useCallback((id: string) => dispatch({ type: 'remove', id }), [])
  const clear = useCallback(() => dispatch({ type: 'clear' }), [])
  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  const value = useMemo<CartContextValue>(() => {
    const summary = summarizeCart(items, (id) => productById.get(id))
    return {
      ...summary,
      items,
      qtyOf: (id) => items.find((i) => i.id === id)?.qty ?? 0,
      add,
      setQty,
      remove,
      clear,
      isOpen,
      open,
      close,
      pulse,
    }
  }, [items, isOpen, pulse, add, setQty, remove, clear, open, close])

  return <CartContext value={value}>{children}</CartContext>
}
