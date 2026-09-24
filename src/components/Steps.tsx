import { CreditCard, MousePointerClick, PackageCheck } from 'lucide-react'
import styles from './Steps.module.css'

const steps = [
  {
    icon: MousePointerClick,
    title: 'Выберите товар',
    text: 'Кит, шалкер или снаряжение — добавьте нужное в корзину.',
  },
  {
    icon: CreditCard,
    title: 'Укажите ник и оплатите',
    text: 'Нужны ник в Minecraft и Discord или Telegram для связи. Оплата картой, через СБП или криптой.',
  },
  {
    icon: PackageCheck,
    title: 'Получите в игре',
    text: 'Передадим заказ в игре: на спавне, на хайвее или у ваших координат.',
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
