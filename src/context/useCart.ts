import { useContext } from 'react'
import { CartContext } from './cartContext'

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart должен вызываться внутри <CartProvider>')
  return ctx
}
