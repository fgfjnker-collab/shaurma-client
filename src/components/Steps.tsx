import { CreditCard, MousePointerClick, PackageCheck } from 'lucide-react'
import { site } from '../config/site'
import styles from './Steps.module.css'

const steps = [
  {
    icon: MousePointerClick,
    title: 'Выберите товар',
    text: 'Валюта, ресурсы, бусты или готовый набор — добавьте нужное в корзину.',
  },
  {
    icon: CreditCard,
    title: 'Укажите аккаунт и оплатите',
    text: `Нужны только ник и ID в ${site.game}. Оплата картой, через СБП или кошелёк.`,
  },
  {
    icon: PackageCheck,
    title: 'Получите в игре',
    text: 'Ресурсы поступят на аккаунт автоматически, обычно за пару минут.',
  },
]

export function Steps() {
  return (
    <ol className={styles.steps}>
      {steps.map(({ icon: StepIcon, title, text }) => (
        <li key={title} className={styles.step}>
          <span className={styles.icon}>
            <StepIcon size={24} aria-hidden="true" />
          </span>
          <h3>{title}</h3>
          <p>{text}</p>
        </li>
      ))}
    </ol>
  )
}
