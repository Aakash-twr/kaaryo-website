export const SITE = {
  name: 'Kaaryo',
  tagline: 'Get any home work done in 20 minutes',
  secondaryTagline: 'Verified professionals. Instant booking. At your doorstep.',
  supportEmail: 'support@kaaryo.in',
  businessEmail: 'business@kaaryo.in',
  phone: '+91 98765 43210',
  address: {
    company: 'Kaaryo Technologies Pvt Ltd',
    line1: 'Banjara Hills',
    line2: 'Hyderabad, India',
    // Structured equivalents, used only by the LocalBusiness JSON-LD.
    // postalCode is blank until the full street address is known; the
    // builder drops empty fields rather than emitting a hollow one.
    locality: 'Hyderabad',
    region: 'Telangana',
    postalCode: '',
    country: 'IN',
  },

  /* ----------------------------------------------------------------
     Structured-data honesty switches.

     Search engines treat JSON-LD as a factual claim about the business,
     so both of these stay false until the underlying data is real:

     contactVerified — gates `telephone` and `address` in the
       LocalBusiness markup. The number above is the stock filler Indian
       number; publishing it to Google is worse than publishing nothing.

     metricsVerified — gates `aggregateRating`. Review markup that is not
       backed by real, collected ratings breaches Google's structured-data
       policy and can earn a manual action against the whole domain.

     The site copy is unaffected either way — only the machine-readable
     claims are withheld.
     ---------------------------------------------------------------- */
  contactVerified: false,
  metricsVerified: false,

  /** Populate and they appear as `sameAs` in the Organization markup. */
  social: {
    instagram: '',
    linkedin: '',
    twitter: '',
  },
}

/**
 * Real city coordinates. IndiaMap projects lon/lat with the same transform it
 * uses for the boundary, so a pin can never drift off the landmass.
 * `anchor` places the label to the left ('end') or right ('start') of the pin.
 */
/**
 * Worker and job counts add up to the headline figures in STATS below —
 * 500+ verified workers and ~38,000 jobs. Change one and the other stops
 * being true, so keep the arithmetic intact.
 */
export const LIVE_CITIES = [
  { name: 'Hyderabad', workers: '210+ pros', jobs: '18,400 jobs', lon: 78.486, lat: 17.385, anchor: 'start' },
  { name: 'Delhi', workers: '180+ pros', jobs: '13,900 jobs', lon: 77.209, lat: 28.614, anchor: 'start' },
  { name: 'Bangalore', workers: '110+ pros', jobs: '6,100 jobs', lon: 77.594, lat: 12.972, anchor: 'end' },
]

export const SOON_CITIES = [
  { name: 'Ahmedabad', lon: 72.571, lat: 23.023, anchor: 'end' },
  { name: 'Mumbai', lon: 72.877, lat: 19.076, anchor: 'end' },
  { name: 'Chennai', lon: 80.27, lat: 13.083, anchor: 'start' },
  { name: 'Kolkata', lon: 88.364, lat: 22.573, anchor: 'start' },
]

/**
 * Payment options, shared by the How it works section and the LocalBusiness
 * JSON-LD so the two cannot disagree. Icons are mapped by slug in
 * components/howitworks/PaymentMethods.jsx — this file stays import-free so the
 * build script can read it from Node.
 *
 * `schema` is the label used in the `paymentAccepted` field. It exists
 * separately from `name` because the UI wants the short human word ("Card")
 * while search engines want the specific instruments behind it.
 */
export const PAYMENT_METHODS = [
  {
    slug: 'upi',
    name: 'UPI',
    schema: 'UPI',
    note: 'GPay, PhonePe, Paytm — one tap',
  },
  {
    slug: 'card',
    name: 'Card',
    schema: 'Credit Card, Debit Card',
    note: 'Credit or debit, saved securely',
  },
  {
    slug: 'netbanking',
    name: 'Net banking',
    schema: 'Net Banking',
    note: 'All major Indian banks',
  },
  {
    slug: 'cash',
    name: 'Cash',
    schema: 'Cash',
    note: 'Pay the pro on completion',
  },
]

export const STATS = [
  { value: 10000, suffix: '+', label: 'Happy customers', sub: 'and counting, every week' },
  { value: 500, suffix: '+', label: 'Verified workers', sub: 'background-checked, skill-tested' },
  { value: 20, suffix: ' min', label: 'Average arrival', sub: 'or your booking is free' },
  { value: 4.8, suffix: '/5', label: 'Average rating', decimals: 1, sub: 'across 38,000 jobs' },
]

export const VERIFICATION_STEPS = [
  {
    title: 'Aadhaar identity verification',
    body: 'Every applicant is matched against their Aadhaar record. No alias, no borrowed profile — the person who knocks is the person on your screen.',
  },
  {
    title: 'Criminal background check',
    body: 'A third-party police and court-record check runs before onboarding, and is refreshed on a rolling basis for everyone on the platform.',
  },
  {
    title: 'In-person skill assessment',
    body: 'A practical test at our city hub, graded by a senior tradesperson. Wiring, pipework, finish quality — assessed by hand, not by a form.',
  },
  {
    title: 'Paid trial job',
    body: 'A supervised, fully paid trial job with a real customer. Only workers who clear it go live and start receiving bookings.',
  },
]

export const HOW_IT_WORKS = [
  {
    title: 'Tell us what broke',
    body: 'Pick a service and your slot. Fixed prices are shown up front — nothing changes after the worker arrives.',
    meta: 'Takes 40 seconds',
  },
  {
    title: 'We match in seconds',
    body: 'Kaaryo pings verified professionals nearest to you. The first to accept is locked in and dispatched immediately.',
    meta: 'Median match: 48 seconds',
  },
  {
    title: 'Track them to your door',
    body: 'Full profile, rating, job count and live map, the moment they accept. You always know who is on the way.',
    meta: '20-minute promise',
  },
  {
    title: 'Job done, pay your way',
    body: 'UPI, card, net banking or cash on completion. Rate the work — and save your favourite worker for next time.',
    meta: 'Satisfaction guaranteed',
  },
]

export const WORKER_BENEFITS = [
  { title: 'Flexible hours', body: 'Go online when it suits you. No shifts, no minimum, no penalty for taking a day off.' },
  { title: 'Weekly payouts', body: 'Every Monday, straight to your bank account. Always on time, no chasing anyone.' },
  { title: 'Work near home', body: 'Set your radius. We only send you jobs inside it, so less travel and more earning.' },
  { title: 'Dedicated support', body: 'A real human on the phone in your language, 24×7, for any issue on any job.' },
  { title: 'Performance bonuses', body: 'Hit your weekly rating and job targets and earn extra on top of every payout.' },
  { title: 'Free skill badge', body: 'Clear the assessment and get a verified Kaaryo skill badge on your public profile.' },
]
