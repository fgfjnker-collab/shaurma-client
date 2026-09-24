import type { Category } from './types'

export const categories: Category[] = [
  {
    id: 'currency',
    title: 'Валюта',
    description: 'Кристаллы и монеты для любых покупок в игре',
    icon: 'gem',
  },
  {
    id: 'resources',
    title: 'Ресурсы',
    description: 'Дерево, камень, руда и энергия для стройки и крафта',
    icon: 'pickaxe',
  },
  {
    id: 'bundles',
    title: 'Наборы',
    description: 'Выгодные комплекты — дешевле, чем по отдельности',
    icon: 'gift',
  },
  {
    id: 'boosters',
    title: 'Бусты',
    description: 'Ускорители опыта, добычи и производства',
    icon: 'rocket',
  },
  {
    id: 'premium',
    title: 'Премиум',
    description: 'VIP-статус и сезонные пропуски',
    icon: 'crown',
  },
  {
    id: 'cases',
    title: 'Сундуки',
    description: 'Сундуки и ключи с редкими наградами',
    icon: 'box',
  },
]

export const categoryById = Object.fromEntries(categories.map((c) => [c.id, c])) as Record<
  Category['id'],
  Category
>
