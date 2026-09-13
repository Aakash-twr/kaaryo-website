export const FAQS = [
  {
    q: 'How does Kaaryo ensure workers are trustworthy?',
    a: 'Every worker goes through a 3-step verification process including Aadhaar identity verification, a criminal background check, and an in-person practical skill assessment before they are allowed to work on our platform.',
  },
  {
    q: 'How fast will a worker actually arrive?',
    a: 'Our promise is 20 minutes. In most cases workers arrive sooner. If we cannot find a worker within 20 minutes your booking is completely free.',
  },
  {
    q: 'What if I am not satisfied with the work done?',
    a: 'We have a satisfaction guarantee. If you are not happy with the service contact our support within 24 hours and we will arrange a redo or a full refund.',
  },
  {
    q: 'How are prices determined?',
    a: 'You see the exact price before confirming the booking. Predictable jobs carry a fixed labour price; bigger jobs show a starting price and are quoted before work begins. Materials and replacement parts are billed separately unless the package says all-inclusive. And there is no platform fee — everyone else charges one, we could never explain what it was for, so we do not.',
  },
  {
    q: 'Can I choose a specific worker?',
    a: 'Once you have had a good experience with a worker you can save them as a favorite and request them specifically for future bookings.',
  },
  {
    q: 'Is it safe to let workers into my home?',
    a: 'Yes. Every worker has been background checked, identity verified, and skill assessed. During the job you can track the worker on the live map and our support team is available 24×7.',
  },
  {
    q: 'What areas does Kaaryo currently serve?',
    a: 'We are currently live in Hyderabad, Delhi, and Bangalore. We are rapidly expanding to Ahmedabad, Mumbai, Chennai, and Kolkata through 2026.',
  },
  {
    q: 'How do I pay for services?',
    a: 'We accept UPI, credit and debit cards, net banking, and cash on completion. You choose your preferred payment method at checkout.',
  },
  {
    q: 'What if the worker cancels last minute?',
    a: 'If a worker cancels we immediately find a replacement and notify you. If we cannot find a replacement in time you receive a full refund and a discount on your next booking.',
  },
  {
    q: 'How do I become a worker on Kaaryo?',
    a: 'Download the Kaaryo Worker app, complete the onboarding process including identity verification and skill assessment, and you will be live within 3 to 5 working days.',
  },
]

/* ------------------------------------------------------------------
   Which questions each page shows.

   These live here rather than as slice() calls inside the pages because
   the FAQPage JSON-LD is built from the same constants. Google requires
   FAQ markup to match the content actually visible on the page, so the
   two must not be able to drift apart.
   ------------------------------------------------------------------ */
export const HOME_FAQS = FAQS.slice(0, 6)
export const HOW_IT_WORKS_FAQS = FAQS.slice(1, 7)
export const SERVICES_FAQS = FAQS.slice(2, 8)
export const CONTACT_FAQS = FAQS.slice(4)

/** Path → the exact set rendered there, for the structured-data builder. */
export const FAQS_BY_PATH = {
  '/': HOME_FAQS,
  '/how-it-works': HOW_IT_WORKS_FAQS,
  '/services': SERVICES_FAQS,
  '/contact': CONTACT_FAQS,
}
