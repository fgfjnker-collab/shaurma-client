export type IconName =
  | 'gem'
  | 'coins'
  | 'zap'
  | 'crown'
  | 'box'
  | 'key'
  | 'gift'
  | 'rocket'
  | 'flame'
  | 'trees'
  | 'mountain'
  | 'pickaxe'
  | 'swords'
  | 'shield'
  | 'star'
  | 'timer'
  | 'layers'
  | 'battery'
  | 'droplets'
  | 'trophy'
  | 'wheat'
  | 'package'

export type CategoryId = 'currency' | 'resources' | 'bundles' | 'boosters' | 'premium' | 'cases'

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
