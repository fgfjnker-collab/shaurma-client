import { Search } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './SearchForm.module.css'

export function SearchForm({ onSubmitted, autoFocus }: { onSubmitted?: () => void; autoFocus?: boolean }) {
  const [value, setValue] = useState('')
  const navigate = useNavigate()

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const q = value.trim()
    navigate(q ? `/catalog?q=${encodeURIComponent(q)}` : '/catalog')
    setValue('')
    onSubmitted?.()
  }

  return (
    <form className={styles.form} role="search" onSubmit={submit}>
      <Search size={18} />
      <input
        className={styles.input}
        type="search"
        placeholder="Кристаллы, VIP, наборы…"
        aria-label="Поиск по магазину"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoFocus={autoFocus}
      />
    </form>
  )
}
