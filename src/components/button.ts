import styles from './button.module.css'

interface ButtonOptions {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  icon?: boolean
  block?: boolean
  className?: string
}

/** Классы кнопки — подходят и для <button>, и для <Link>. */
export function buttonClass({ variant = 'primary', size = 'md', icon, block, className }: ButtonOptions = {}) {
  return [
    styles.button,
    styles[variant],
    size !== 'md' && styles[size],
    icon && styles.icon,
    block && styles.block,
    className,
  ]
    .filter(Boolean)
    .join(' ')
}
