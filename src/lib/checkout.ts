export interface CheckoutForm {
  nickname: string
  contact: string
  email: string
  consent: boolean
}

export type CheckoutErrors = Partial<Record<keyof CheckoutForm, string>>

const NICKNAME_RE = /^[A-Za-z0-9_]{3,16}$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateCheckout(form: CheckoutForm): CheckoutErrors {
  const errors: CheckoutErrors = {}
  const nickname = form.nickname.trim()
  if (!nickname) errors.nickname = 'Укажите ник в Minecraft'
  else if (!NICKNAME_RE.test(nickname)) errors.nickname = 'Ник — 3–16 символов: латиница, цифры и _'

  const contact = form.contact.trim()
  if (!contact) errors.contact = 'Укажите Discord или Telegram'
  else if (contact.length < 2 || contact.length > 64) errors.contact = 'Проверьте контакт'

  // почта необязательна, но если указана — должна быть корректной
  const email = form.email.trim()
  if (email && !EMAIL_RE.test(email)) errors.email = 'Проверьте адрес почты'

  if (!form.consent) errors.consent = 'Нужно согласие с условиями'
  return errors
}

/** Скидка по промокоду в рублях, округлённая до целого. */
export function promoDiscount(subtotal: number, percent: number): number {
  return Math.round((subtotal * percent) / 100)
}
