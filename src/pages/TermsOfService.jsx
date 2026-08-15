import LegalLayout from '../components/legal/LegalLayout'

const SECTIONS = [
  {
    id: 'about-these-terms',
    heading: 'About these terms',
    paragraphs: [
      'These terms govern your use of the Kaaryo website and apps, operated by Kaaryo Technologies Pvt Ltd. By booking a service or creating an account, you agree to them.',
      'Kaaryo is a technology platform that connects customers with independent, verified service professionals. We are responsible for the matching, the pricing, the verification standard and the guarantees described here.',
    ],
  },
  {
    id: 'eligibility',
    heading: 'Who can use Kaaryo',
    bullets: [
      'You must be 18 or older and able to enter into a binding contract.',
      'You must provide an accurate service address inside one of our live service areas.',
      'You must not use Kaaryo to request anything unlawful, unsafe, or outside the listed service categories.',
    ],
  },
  {
    id: 'bookings',
    heading: 'Bookings and pricing',
    paragraphs: [
      'Every service has a fixed price shown before you confirm. A platform fee of ₹20 is added per booking. No other charges are applied without your explicit confirmation inside the app.',
      'If a job turns out to be materially different from what was booked — a larger scope, or a different service entirely — the professional will raise a revised quote in the app. Work continues only after you accept it. Nothing is ever charged for time the professional simply took longer than expected.',
    ],
  },
  {
    id: 'arrival-guarantee',
    heading: 'The 20-minute arrival guarantee',
    paragraphs: [
      'Our promise is that a verified professional arrives within 20 minutes of a confirmed booking in a live service area.',
      'If we cannot get a professional to you within 20 minutes, that booking is free — the service charge is waived automatically and the booking stays active until a professional arrives, unless you cancel it. The guarantee does not apply to bookings you schedule for a future time slot, or where access to the property is delayed at your end.',
    ],
  },
  {
    id: 'satisfaction',
    heading: 'Satisfaction, redos and refunds',
    bullets: [
      'If you are not satisfied with completed work, contact support within 24 hours and we will arrange a redo or a full refund.',
      'Workmanship on repair and installation services is covered for 30 days from completion.',
      'The professional is paid by Kaaryo either way, so nobody has a financial reason to dispute a genuine complaint with you at your door.',
      'Refunds return to your original payment method within 5 to 7 working days.',
    ],
  },
  {
    id: 'cancellations',
    heading: 'Cancellations',
    bullets: [
      'You can cancel free of charge any time before a professional accepts the job.',
      'After acceptance, a cancellation fee of ₹49 may apply, since the professional has already begun travelling to you.',
      'If a professional cancels, we immediately find a replacement and notify you. If no replacement can be found in time, you receive a full refund and a discount on your next booking.',
    ],
  },
  {
    id: 'your-responsibilities',
    heading: 'Your responsibilities',
    bullets: [
      'Provide safe, reasonable access to the work area, and disclose known hazards such as exposed wiring or unstable structures.',
      'Secure valuables and pets before the professional arrives.',
      'Treat professionals with respect. Abuse, harassment or discrimination results in immediate and permanent removal from the platform.',
      'Pay for completed work through the app or in cash on completion, as chosen at checkout.',
    ],
  },
  {
    id: 'professionals',
    heading: 'Professionals on the platform',
    paragraphs: [
      'Kaaryo professionals are independent contractors, not employees of Kaaryo. They set their own hours and choose which jobs to accept.',
      'Every professional completes Aadhaar-based identity verification, a criminal background check, an in-person practical skill assessment and a supervised paid trial job before going live. Professionals who fall below our rating or conduct standards are removed.',
    ],
  },
  {
    id: 'liability',
    heading: 'Liability',
    paragraphs: [
      'Kaaryo is liable for damage directly caused by a professional’s negligence during a job booked through the platform, up to the limits of our service guarantee and insurance cover. Report any damage within 48 hours of the job so we can investigate while the evidence is fresh.',
      'We are not liable for pre-existing faults, for consequential losses such as lost income, or for work carried out outside the Kaaryo platform — including any private arrangement you make directly with a professional you met through us.',
    ],
  },
  {
    id: 'accounts',
    heading: 'Suspension and termination',
    paragraphs: [
      'You can close your account at any time from the app. We may suspend or terminate an account for fraud, repeated abusive conduct, non-payment, or misuse of the guarantee and refund policies. Where the situation allows it, we tell you why and give you a chance to respond.',
    ],
  },
  {
    id: 'governing-law',
    heading: 'Governing law and disputes',
    paragraphs: [
      'These terms are governed by the laws of India. Disputes are subject to the exclusive jurisdiction of the courts of Hyderabad, Telangana.',
      'Before any formal proceeding, please write to us — the overwhelming majority of disputes are resolved by our support team within a few days.',
    ],
  },
  {
    id: 'updates',
    heading: 'Changes to these terms',
    paragraphs: [
      'We may update these terms as the service changes. Material changes are announced in the app before they take effect, and the date above is updated. Continued use of Kaaryo after that point means you accept the revised terms.',
    ],
  },
]

export default function TermsOfService() {
  return (
    <LegalLayout
      eyebrow="Terms of Service"
      title={
        <>
          The rules, in
          <br className="hidden sm:block" /> plain language.
        </>
      }
      intro="What you can expect from Kaaryo, what we expect from you, and exactly what happens when something does not go to plan."
      updated="12 August 2026"
      sections={SECTIONS}
    />
  )
}
