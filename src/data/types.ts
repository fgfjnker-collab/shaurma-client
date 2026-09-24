export type IconName =
  | 'anvil'
  | 'apple'
  | 'backpack'
  | 'blocks'
  | 'bomb'
  | 'box'
  | 'compass'
  | 'crosshair'
  | 'feather'
  | 'flask'
  | 'gem'
  | 'heartPulse'
  | 'hexagon'
  | 'pickaxe'
  | 'rocket'
  | 'route'
  | 'shield'
  | 'sparkles'
  | 'sword'
  | 'swords'

export type CategoryId = 'kits' | 'shulkers' | 'gear' | 'resources' | 'services'

export interface Category {
  id: CategoryId
  title: string
  description: string
  icon: IconName
}

export type ProductBadge = 'hit' | 'new' | 'sale'

export interface ProductArt {
  icon: IconName
  /** Цвета градиента плитки товара */
  from: string
  to: string
}

export interface Product {
  /** Используется в URL: /product/:id */
  id: string
  title: string
  category: CategoryId
  /** Что именно получит покупатель, например «1 000 кристаллов» */
  amount: string
  short: string
  description: string
  includes: string[]
  /** Цена в рублях */
  price: number
  oldPrice?: number
  badge?: ProductBadge
  /** Чем больше, тем выше в сортировке «Популярные» */
  popularity: number
  art: ProductArt
}
