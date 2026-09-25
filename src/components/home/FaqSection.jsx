import SectionHeading from '../ui/SectionHeading'
import FaqAccordion from '../faq/FaqAccordion'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import { FAQS } from '../../data/faqs'
import { SITE } from '../../data/site'
import { HeadsetIcon, MailIcon } from '../icons/FeatureIcons'
import { ArrowRightIcon } from '../icons/UiIcons'
import { useLocation } from 'react-router-dom'

export default function FaqSection({ items = FAQS }) {
  const location = useLocation()
  const isContactPage = location.pathname === '/contact'
  
  const handleContactSupport = (e) => {
    if (isContactPage) {
      e.preventDefault()
      const formSection = document.getElementById('contact-form-section')
      if (formSection) {
        const top = formSection.getBoundingClientRect().top + window.scrollY - 80
        window.scrollTo({ top, behavior: 'smooth' })
      }
    }
  }

  return (
    <section className="relative bg-paper-100 py-20 sm:py-24">
      <div className="container-k">
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="Questions"
              title={
                <>
                  The things people
                  <br className="hidden sm:block" /> ask us most.
                </>
              }
              body="Still unsure about something? Our support team answers in minutes, not days."
            />

            <Reveal delay={0.16} className="mt-8">
              <div className="rounded-3xl border border-ink-900/8 bg-paper-50 p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-700 text-brand-300">
                  <HeadsetIcon size={21} />
                </span>
                <p className="mt-4 text-[1.02rem] font-bold text-ink-900">
                  Talk to a human, 24×7
                </p>
                <p className="mt-1.5 text-[0.88rem] leading-relaxed text-ink-600">
                  In Hindi, English, Marathi, Kannada or Tamil — whatever is easiest.
                </p>
                <a
                  href={`mailto:${SITE.supportEmail}`}
                  className="mt-4 inline-flex items-center gap-2 font-mono text-[0.8rem] font-semibold text-ink-900 underline decoration-brand-400 decoration-2 underline-offset-4 transition hover:text-brand-600"
                >
                  <MailIcon size={15} />
                  {SITE.supportEmail}
                </a>
                <Button 
                  {...(isContactPage ? { onClick: handleContactSupport } : { to: '/contact' })} 
                  variant="outline" 
                  size="sm" 
                  className="mt-5 w-full"
                >
                  Contact support
                  <ArrowRightIcon size={15} />
                </Button>
              </div>
            </Reveal>
          </div>

          <FaqAccordion items={items} />
        </div>
      </div>
    </section>
  )
}
