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
  {
    slug: 'vehicle-wash',
    name: 'Kaaryo Shine',
    blurb:
      'Doorstep wash and detailing for cars, bikes and scooters — no garage, no hose, no waiting.',
    accent: '#06B6D4',
    note: 'Doorstep · no hose needed',
    /** What to call the person who turns up, in a sentence. */
    pro: 'Bolt',
    materials:
      'All cleaning supplies, foam, microfibre cloths and water are carried by your Bolt. Nothing to arrange on your end.',
    /**
     * Sub-groups rendered as a Car / Bike toggle inside the price-list panel.
     * Each item carries a `group` field matching one of these ids.
     */
    defaultGroup: 'bike',
    groups: [
      { id: 'bike', label: 'Bike / Scooter' },
      { id: 'car', label: 'Car' },
    ],
    items: [
      // Car services
      {
        name: 'Basic Exterior Wash', price: 149, mins: 25, group: 'car',
        desc: 'Water rinse, foam wash, hand scrub of exterior body, wheel clean and microfibre dry.',
      },
      {
        name: 'Interior Vacuuming', price: 149, mins: 30, group: 'car',
        desc: 'Seats, floor mats, dashboard, boot space and between seat gaps vacuumed.',
      },
      {
        name: 'Full Wash (Exterior + Interior)', price: 249, mins: 45, group: 'car',
        desc: 'Everything in Basic Exterior Wash plus interior vacuum, dashboard wipe and inside glass clean.',
      },
      {
        name: 'Foam Wash (Low Water)', price: 199, mins: 30, group: 'car',
        desc: 'High-foam spray agitated with a soft mitt and wiped off — uses 80% less water. Ideal for societies with hose restrictions.',
      },
      {
        name: 'Premium Wash', price: 399, mins: 60, group: 'car',
        desc: 'Full Wash plus tyre shine, engine bay dry wipe, interior fragrance, seat wipe and full glass treatment inside and out.',
      },
      {
        name: 'Windshield & Glass Treatment', price: 299, mins: 30, group: 'car',
        desc: 'Rain-repellent coating applied to all glass surfaces for significantly better wet-weather visibility.',
      },
      {
        name: 'AC Vent & Dashboard Detailing', price: 249, mins: 35, group: 'car',
        desc: 'AC vents cleaned with brushes and compressed air, dashboard vinyl conditioned and console detailed.',
      },
      {
        name: 'Deep Interior Cleaning', price: 799, mins: 150, from: true, group: 'car',
        desc: 'Seat and carpet shampooing, full dashboard and door panel deep clean, roof lining wipe and boot clean. Takes 2–3 hrs.',
      },
      {
        name: 'Full Car Detailing', price: 1999, mins: 300, from: true, group: 'car',
        desc: 'Paint decontamination, clay bar, single-stage machine polish, full interior deep clean, tyre dressing and glass coat. 4–6 hrs.',
      },
      {
        name: 'Ceramic Coating (Single Layer)', price: 3999, mins: 360, from: true, group: 'car',
        desc: 'Surface prep, single-layer ceramic coat application and curing. Protects paint for 6–12 months.',
      },
      // Bike / Scooter services
      {
        name: 'Basic Bike Wash', price: 79, mins: 20, group: 'bike',
        desc: 'Water rinse, foam wash, body panel scrub, wheel clean and chain wipe.',
      },
      {
        name: 'Full Bike Wash', price: 129, mins: 35, group: 'bike',
        desc: 'Basic wash plus under-body clean, engine surface dry wipe, spoke clean and headlight and tail light clean.',
      },
      {
        name: 'Scooter Interior Cleaning', price: 149, mins: 30, group: 'bike',
        desc: 'Under-seat compartment, footboard scrub, handlebar grip clean and speedometer glass clean. For scooters only.',
      },
      {
        name: 'Premium Bike Wash', price: 199, mins: 45, group: 'bike',
        desc: 'Full Bike Wash plus tyre shine, body polish wipe, chain lubrication and seat conditioning.',
      },
      {
        name: 'Bike Detailing', price: 499, mins: 105, from: true, group: 'bike',
        desc: 'Full wash, chrome polish, tank pad clean, compound and full body polish, tyre shine, chain clean and lube. 1.5–2 hrs.',
      },
    ],
    /** Subscription plans — vehicleType matches the group toggle. */
    subscriptions: [
      {
        id: 'car-4',
        vehicleType: 'car',
        name: 'Starter',
        tagline: '4 exterior washes / month',
        price: 349,
        saves: 247,
        highlight: false,
      },
      {
        id: 'car-8',
        vehicleType: 'car',
        name: 'Regular',
        tagline: '8 exterior washes / month',
        price: 599,
        saves: 593,
        highlight: true,
      },
      {
        id: 'car-12',
        vehicleType: 'car',
        name: 'Premium',
        tagline: '12 exterior washes / month',
        price: 799,
        saves: 989,
        highlight: false,
      },
      {
        id: 'bike-4',
        vehicleType: 'bike',
        name: 'Starter',
        tagline: '4 washes / month',
        price: 199,
        saves: 117,
        highlight: false,
      },
      {
        id: 'bike-8',
        vehicleType: 'bike',
        name: 'Regular',
        tagline: '8 washes / month',
        price: 349,
        saves: 283,
        highlight: true,
      },
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
