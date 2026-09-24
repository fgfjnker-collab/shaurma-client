import {
  Anvil,
  Apple,
  Backpack,
  Blocks,
  Bomb,
  Box,
  Compass,
  Crosshair,
  Feather,
  FlaskConical,
  Gem,
  HeartPulse,
  Hexagon,
  Pickaxe,
  Rocket,
  Route,
  Shield,
  Sparkles,
  Sword,
  Swords,
  type LucideProps,
} from 'lucide-react'
import type { IconName } from '../data/types'

const icons = {
  anvil: Anvil,
  apple: Apple,
  backpack: Backpack,
  blocks: Blocks,
  bomb: Bomb,
  box: Box,
  compass: Compass,
  crosshair: Crosshair,
  feather: Feather,
  flask: FlaskConical,
  gem: Gem,
  heartPulse: HeartPulse,
  hexagon: Hexagon,
  pickaxe: Pickaxe,
  rocket: Rocket,
  route: Route,
  shield: Shield,
  sparkles: Sparkles,
  sword: Sword,
  swords: Swords,
} satisfies Record<IconName, unknown>

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Component = icons[name]
  return <Component {...props} />
}
