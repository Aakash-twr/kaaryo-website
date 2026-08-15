import PageHero from '../components/ui/PageHero'
import StepsFlow from '../components/home/StepsFlow'
import BookingTimeline from '../components/howitworks/BookingTimeline'
import PaymentMethods from '../components/howitworks/PaymentMethods'
import SafetySection from '../components/home/SafetySection'
import FaqSection from '../components/home/FaqSection'
import CtaBand from '../components/ui/CtaBand'
import TickerStrip from '../components/home/TickerStrip'
import { HOW_IT_WORKS_FAQS } from '../data/faqs'

export default function HowItWorks() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        crumb="How it works"
        title={
          <>
            Book in a minute.
            <br className="hidden sm:block" /> Sorted in{' '}
            <span className="text-gradient-brand">twenty</span>.
          </>
        }
        body="Kaaryo replaces the whole ritual of finding help — the borrowed phone numbers, the unanswered calls, the price invented at your door — with four taps and a live map."
      />

      <section className="bg-paper-50 pb-20 sm:pb-24">
        <div className="container-k">
          <StepsFlow />
        </div>
      </section>

      <TickerStrip />
      <BookingTimeline />
      <PaymentMethods />
      <SafetySection />
      <FaqSection items={HOW_IT_WORKS_FAQS} />

      <CtaBand
        eyebrow="Try it once"
        title={
          <>
            The fastest way to understand it
            <br className="hidden sm:block" /> is to book something.
          </>
        }
        body="Pick a service, watch the clock, and hold us to the twenty minutes. That is the whole pitch."
      />
    </>
  )
}
