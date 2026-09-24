import {
  Battery,
  Box,
  Coins,
  Crown,
  Droplets,
  Flame,
  Gem,
  Gift,
  Key,
  Layers,
  Mountain,
  Package,
  Pickaxe,
  Rocket,
  Shield,
  Star,
  Swords,
  Timer,
  Trees,
  Trophy,
  Wheat,
  Zap,
  type LucideProps,
} from 'lucide-react'
import type { IconName } from '../data/types'

const icons = {
  battery: Battery,
  box: Box,
  coins: Coins,
  crown: Crown,
  droplets: Droplets,
  flame: Flame,
  gem: Gem,
  gift: Gift,
  key: Key,
  layers: Layers,
  mountain: Mountain,
  package: Package,
  pickaxe: Pickaxe,
  rocket: Rocket,
  shield: Shield,
  star: Star,
  swords: Swords,
  timer: Timer,
  trees: Trees,
  trophy: Trophy,
  wheat: Wheat,
  zap: Zap,
} satisfies Record<IconName, unknown>

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Component = icons[name]
  return <Component {...props} />
}
