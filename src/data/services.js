/**
 * The single source of truth for what Kaaryo sells and what it costs.
 * Everything downstream — cards, tabs, JSON-LD offers, the worker earnings
 * calculator — reads from here, so a price only ever changes in one place.
 *
 * Price shapes:
 *   { price }              fixed labour price, does not move on arrival
 *   { price, from: true }  starting price; final quote depends on scope
 *   { price, unit: 'hour' } hourly rate, `mins` is the minimum booking
 *
 * Materials and replacement parts are billed separately on repair and
 * install jobs unless a package explicitly says all-inclusive.
 */
export const CATEGORIES = [
  {
    slug: 'electrician',
    name: 'Electrician',
    blurb: 'Sparks, trips and dead switchboards — handled by licensed hands.',
    accent: '#F59E0B',
    note: 'Most booked at 8pm',
    /** What to call the person who turns up, in a sentence. */
    pro: 'electrician',
    materials:
      'Materials — wiring, sockets, fittings and replacement parts — are billed separately at cost.',
    items: [
      { name: 'Light Fitting', price: 79, mins: 25 },
      { name: 'Fan Installation', price: 89, mins: 30 },
      { name: 'Switchboard Repair', price: 89, mins: 20 },
      { name: 'Fan Repair', price: 129, mins: 30 },
      { name: 'Short Circuit Repair', price: 249, mins: 40, from: true },
      { name: 'Geyser Installation', price: 449, mins: 45 },
    ],
  },
  {
    slug: 'cleaning',
    name: 'Cleaning',
    blurb: 'From a quick reset to a full deep clean, with our own supplies.',
    accent: '#3EBB9E',
    note: 'Weekend favourite',
    /** What to call the person who turns up, in a sentence. */
    pro: 'cleaner',
    materials:
      'Cleaning supplies and equipment are included. Nothing to arrange, nothing extra to pay.',
    items: [
      { name: 'Basic Home Cleaning', price: 99, mins: 60, unit: 'hour' },
      { name: 'Bathroom Cleaning', price: 199, mins: 45 },
      { name: 'Kitchen Cleaning', price: 249, mins: 90 },
      { name: 'Sofa Cleaning', price: 349, mins: 60, from: true },
      { name: 'Deep Cleaning', price: 2499, mins: 180, from: true },
    ],
  },
  {
    slug: 'cooking',
    name: 'Cooking',
    blurb: 'Home cooks for daily tiffin, meal prep or a full house party.',
    accent: '#E15B4C',
    note: 'Rated 4.9 by families',
    /** What to call the person who turns up, in a sentence. */
    pro: 'cook',
    materials:
      'Ingredients are yours to provide, or billed separately at cost. You pay for the cook, not the groceries.',
    items: [
      { name: 'Daily Tiffin Cook', price: 149, mins: 60, unit: 'hour' },
      { name: 'Meal Prep', price: 199, mins: 60, unit: 'hour' },
      { name: 'Party Cooking', price: 799, mins: 120, from: true },
    ],
  },
  {
    slug: 'plumbing',
    name: 'Plumbing',
    blurb: 'Leaks, chokes and pressure problems fixed before they spread.',
    accent: '#3B82F6',
    note: 'Fastest average arrival',
    /** What to call the person who turns up, in a sentence. */
    pro: 'plumber',
    materials:
      'Materials — pipes, washers, fittings and replacement parts — are billed separately at cost.',
    items: [
      { name: 'Tap Repair', price: 89, mins: 20 },
      { name: 'Geyser Plumbing', price: 149, mins: 45 },
      { name: 'Pipe Fitting', price: 149, mins: 40, from: true },
      { name: 'Drainage Unclogging', price: 179, mins: 30 },
    ],
  },
  {
    slug: 'carpentry',
    name: 'Carpentry',
    blurb: 'Doors, drawers and flat-pack furniture, squared up properly.',
    accent: '#A2703F',
    note: 'Tools included',
    /** What to call the person who turns up, in a sentence. */
    pro: 'carpenter',
    materials:
      'Materials — hinges, screws, board and fittings — are billed separately at cost.',
    items: [
      { name: 'Furniture Repair', price: 349, mins: 45 },
      { name: 'Door Hinge Fix', price: 199, mins: 20 },
      { name: 'Wardrobe Assembly', price: 599, mins: 60 },
    ],
  },
  {
    slug: 'painting',
    name: 'Painting',
    blurb: 'Clean edges, covered floors and no smell of a rushed job.',
    accent: '#8B5CF6',
    note: 'Free shade consult',
    /** What to call the person who turns up, in a sentence. */
    pro: 'painter',
    materials:
      'Paint, primer, putty and masking are billed separately unless a package says all-inclusive.',
    items: [
      { name: 'Touch Up Painting', price: 499, mins: 60 },
      { name: 'Wood Polish', price: 799, mins: 45, from: true },
      { name: 'Wall Painting', price: 1999, mins: 180, from: true },
    ],
  },
]

export const PLATFORM_FEE = 0

export const TOTAL_SERVICES = CATEGORIES.reduce((n, c) => n + c.items.length, 0)

export function formatDuration(mins) {
  if (mins < 60) return `${mins} min`
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return m ? `${h} hr ${m} min` : `${h} hr`
}

export const priceOf = (n) => `₹${n.toLocaleString('en-IN')}`

/** Headline price for a catalogue row. */
export function priceLabel(item) {
  if (item.unit === 'hour') return `${priceOf(item.price)}/hr`
  return item.from ? `From ${priceOf(item.price)}` : priceOf(item.price)
}

/** Never promise a fixed price on a job that has to be quoted on site. */
export function priceNote(item) {
  if (item.unit === 'hour') return 'Hourly rate'
  return item.from ? 'Starting price' : 'Fixed price'
}

export function durationLabel(item) {
  return item.unit === 'hour'
    ? `${formatDuration(item.mins)} minimum`
    : formatDuration(item.mins)
}

/** The cheapest way into a category — what the "Starting at" blocks show. */
export function startingItem(cat) {
  return cat.items.reduce((min, i) => (i.price < min.price ? i : min), cat.items[0])
}

export function startingPriceLabel(cat) {
  const item = startingItem(cat)
  return item.unit === 'hour' ? `${priceOf(item.price)}/hr` : priceOf(item.price)
}
