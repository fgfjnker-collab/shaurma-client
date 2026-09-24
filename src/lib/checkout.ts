export interface CheckoutForm {
  nickname: string
  playerId: string
  email: string
  consent: boolean
}

export type CheckoutErrors = Partial<Record<keyof CheckoutForm, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateCheckout(form: CheckoutForm): CheckoutErrors {
  const errors: CheckoutErrors = {}
  const nickname = form.nickname.trim()
  if (!nickname) errors.nickname = 'Укажите игровой ник'
  else if (nickname.length < 3 || nickname.length > 24) errors.nickname = 'Ник — от 3 до 24 символов'

  const playerId = form.playerId.trim()
  if (!playerId) errors.playerId = 'Укажите ID аккаунта'
  else if (!/^\d{6,12}$/.test(playerId)) errors.playerId = 'ID состоит из 6–12 цифр'

  const email = form.email.trim()
  if (!email) errors.email = 'Укажите почту для чека'
  else if (!EMAIL_RE.test(email)) errors.email = 'Проверьте адрес почты'

  if (!form.consent) errors.consent = 'Нужно согласие с условиями'
  return errors
}

/** Скидка по промокоду в рублях, округлённая до целого. */
export function promoDiscount(subtotal: number, percent: number): number {
  return Math.round((subtotal * percent) / 100)
}
