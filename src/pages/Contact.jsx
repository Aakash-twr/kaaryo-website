import PageHero from '../components/ui/PageHero'
import ContactForm from '../components/contact/ContactForm'
import ContactInfo from '../components/contact/ContactInfo'
import FaqSection from '../components/home/FaqSection'
import CtaBand from '../components/ui/CtaBand'
import { FAQS } from '../data/faqs'

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        crumb="Contact"
        title={
          <>
            Talk to a human.
            <br className="hidden sm:block" /> Any hour, any language.
          </>
        }
        body="Support in Hindi, English, Marathi, Kannada and Tamil, around the clock. Whether it is a booking going sideways or a housing society with two hundred flats, someone here can help."
      />

      <section className="bg-paper-50 pb-20 sm:pb-24">
        <div className="container-k">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-7">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </section>

      <FaqSection items={FAQS.slice(4)} />

      <CtaBand
        eyebrow="Or skip the form"
        title={
          <>
            Most questions are answered
            <br className="hidden sm:block" /> faster by just booking.
          </>
        }
        body="Fixed prices, a verified professional and a live map. If anything goes wrong, support is one tap away inside the app."
      />
    </>
  )
}
