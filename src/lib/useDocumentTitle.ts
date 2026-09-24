import { useEffect } from 'react'
import { site } from '../config/site'

const DEFAULT_TITLE = `${site.name} — ресурсы для ${site.game}`

export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} · ${site.name}` : DEFAULT_TITLE
    return () => {
      document.title = DEFAULT_TITLE
    }
  }, [title])
}
