import LegalLayout from '../components/legal/LegalLayout'

const SECTIONS = [
  {
    id: 'what-we-collect',
    heading: 'Information we collect',
    paragraphs: [
      'We collect only what is needed to send a verified professional to the right address at the right time, and to keep both of you safe while the job happens.',
    ],
    bullets: [
      'Account details: your name, phone number, email address and the city you book in.',
      'Service address and location: the address you enter, and — while a booking is active — approximate device location so we can match you with the nearest available professional.',
      'Booking history: the services you have booked, prices, durations, ratings and any support conversations attached to them.',
      'Payment information: the method you choose and the transaction reference. Full card numbers are handled by our payment partners and are never stored on Kaaryo servers.',
      'Device and usage data: app version, device type and diagnostic logs, used to fix crashes and detect fraud.',
    ],
  },
  {
    id: 'how-we-use-it',
    heading: 'How we use your information',
    bullets: [
      'To dispatch a verified professional to your address and show you their live location during the job.',
      'To process payments, issue refunds, and apply the 20-minute arrival guarantee.',
      'To operate our safety systems, including worker verification, fraud checks and post-job rating audits.',
      'To provide support when something goes wrong, and to investigate complaints fairly for both customers and workers.',
      'To improve service coverage and pricing accuracy in each neighbourhood we operate in.',
    ],
  },
  {
    id: 'worker-visibility',
    heading: 'What workers can see about you',
    paragraphs: [
      'A professional receives your first name, the service booked, your service address and your phone number — and only after they have accepted the job. Your contact number is masked through our calling layer where the device supports it.',
      'Once the job is marked complete, the address and number are hidden from their app again. Workers never receive your payment details or your booking history.',
    ],
  },
  {
    id: 'sharing',
    heading: 'When we share information',
    paragraphs: [
      'We do not sell your personal data. We share it only in these situations:',
    ],
    bullets: [
      'With the assigned professional, limited to what is described above.',
      'With payment processors, background-verification agencies and communication providers who help us run the platform, under contracts that restrict them to that purpose.',
      'With law enforcement or a court, where we are legally required to respond, or where there is a credible risk to someone’s safety.',
      'With an acquiring entity, if Kaaryo is ever part of a merger or acquisition — you would be notified before your data moved.',
    ],
  },
  {
    id: 'retention',
    heading: 'How long we keep it',
    paragraphs: [
      'Booking and payment records are retained for as long as Indian tax and accounting rules require. Support transcripts are kept for two years. Location traces from an individual job are aggregated after 90 days and the precise trace is deleted.',
      'If you close your account, we delete or anonymise your personal data except where we are legally required to retain a transaction record.',
    ],
  },
  {
    id: 'your-rights',
    heading: 'Your rights and choices',
    bullets: [
      'Access: request a copy of the personal data we hold about you.',
      'Correction: fix anything inaccurate from your profile, or by writing to support.',
      'Deletion: ask us to close your account and erase your data, subject to legal retention rules.',
      'Marketing: opt out of promotional messages at any time without affecting service notifications.',
      'Location: revoke location permission in your device settings — bookings will still work, you will just need to enter addresses manually.',
    ],
  },
  {
    id: 'analytics',
    heading: 'Analytics and cookies',
    paragraphs: [
      'This website sets no cookies and does not track you across other sites. We measure two things, both through Vercel, the company that hosts this site: how many people visit each page and which link they arrived from, and how quickly pages actually load on real devices.',
      'Neither measurement uses a cookie, a device identifier, or anything that singles you out. Page views are counted without building a profile of you, and the loading measurements are timing numbers with no personal data attached. Because nothing here identifies you, there is no consent banner to click.',
      'Should we ever adopt analytics that do identify visitors, we will ask for your consent first and update this section before switching it on.',
    ],
  },
  {
    id: 'security',
    heading: 'How we protect your data',
    paragraphs: [
      'Data is encrypted in transit and at rest. Access to customer records inside Kaaryo is role-based, logged, and limited to staff who need it to resolve a specific issue. We run regular reviews of these access logs.',
      'No system is perfect. If a breach ever affects your personal data, we will notify you and the relevant authority promptly and tell you plainly what happened.',
    ],
  },
  {
    id: 'children',
    heading: 'Children',
    paragraphs: [
      'Kaaryo is intended for people aged 18 and over. We do not knowingly collect personal information from children. If you believe a minor has created an account, write to us and we will remove it.',
    ],
  },
  {
    id: 'changes',
    heading: 'Changes to this policy',
    paragraphs: [
      'When we make a material change to this policy we will update the date above and notify you in the app before the change takes effect. Continuing to use Kaaryo after that point means you accept the updated policy.',
    ],
  },
]

export default function PrivacyPolicy() {
  return (
    <LegalLayout
      eyebrow="Privacy Policy"
      title={
        <>
          Your data, handled
          <br className="hidden sm:block" /> like it matters.
        </>
      }
      intro="This policy explains what Kaaryo collects, why we need it, who sees it, and how you can get it removed. It is written to be read, not to be survived."
      updated="12 August 2026"
      sections={SECTIONS}
    />
  )
}
