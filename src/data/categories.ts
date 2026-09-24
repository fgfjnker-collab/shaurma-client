import type { Category } from './types'

export const categories: Category[] = [
  {
    id: 'kits',
    title: 'Киты',
    description: 'Готовые наборы для PvP, выхода со спавна и стройки',
    icon: 'backpack',
  },
  {
    id: 'shulkers',
    title: 'Шалкеры',
    description: 'Полные шалкеры расходников: тотемы, кристаллы, обсидиан',
    icon: 'box',
  },
  {
    id: 'gear',
    title: 'Снаряжение',
    description: 'Незеритовая броня, оружие и элитры с лучшими чарами',
    icon: 'shield',
  },
  {
    id: 'resources',
    title: 'Ресурсы',
    description: 'Незерит, алмазы, опыт и эндер-жемчуг',
    icon: 'gem',
  },
  {
    id: 'services',
    title: 'Услуги',
    description: 'Эскорт со спавна и тренировки по PvP',
    icon: 'compass',
  },
]

export const categoryById = Object.fromEntries(categories.map((c) => [c.id, c])) as Record<
  Category['id'],
  Category
>
