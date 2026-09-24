import { Headphones, Mail, Send } from 'lucide-react'
import { buttonClass } from '../components/button'
import { Faq } from '../components/Faq'
import { Section } from '../components/Section'
import { Steps } from '../components/Steps'
import { site } from '../config/site'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import styles from './HelpPage.module.css'

export function HelpPage() {
  useDocumentTitle('Помощь')

  return (
    <>
      <div className={`container ${styles.hero}`}>
        <h1>Помощь и ответы</h1>
        <p>Как оформить заказ, когда придут ресурсы и что делать, если что-то пошло не так.</p>
      </div>

      <Section eyebrow="Как купить" title="Три шага до ресурсов">
        <Steps />
      </Section>

      <div id="faq">
        <Section eyebrow="FAQ" title="Частые вопросы">
          <div className={styles.layout}>
            <Faq />
            <aside className={styles.support}>
              <span className={styles.supportIcon}>
                <Headphones size={24} />
              </span>
              <h3>Не нашли ответ?</h3>
              <p>Напишите в поддержку — поможем с заказом, оплатой или зачислением.</p>
              <a href={site.support.telegram} target="_blank" rel="noreferrer" className={buttonClass({ block: true })}>
                <Send size={18} /> Написать в Telegram
              </a>
              <a href={`mailto:${site.support.email}`} className={buttonClass({ variant: 'secondary', block: true })}>
                <Mail size={18} /> {site.support.email}
              </a>
              <small>{site.support.hours}</small>
            </aside>
          </div>
        </Section>
      </div>
    </>
  )
}
