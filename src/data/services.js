export const CATEGORIES = [
  {
    slug: 'electrician',
    name: 'Electrician',
    blurb: 'Sparks, trips and dead switchboards — handled by licensed hands.',
    accent: '#F59E0B',
    note: 'Most booked at 8pm',
    items: [
      { name: 'Fan Installation', price: 299, mins: 30 },
      { name: 'Switchboard Repair', price: 199, mins: 20 },
      { name: 'Light Fitting', price: 249, mins: 25 },
      { name: 'Geyser Installation', price: 499, mins: 45 },
      { name: 'Short Circuit Repair', price: 349, mins: 40 },
    ],
  },
  {
    slug: 'cleaning',
    name: 'Cleaning',
    blurb: 'From a quick reset to a full deep clean, with our own supplies.',
    accent: '#3EBB9E',
    note: 'Weekend favourite',
    items: [
      { name: 'Basic Home Cleaning', price: 399, mins: 60 },
      { name: 'Deep Cleaning', price: 899, mins: 180 },
      { name: 'Kitchen Cleaning', price: 499, mins: 90 },
      { name: 'Bathroom Cleaning', price: 299, mins: 45 },
      { name: 'Sofa Cleaning', price: 599, mins: 60 },
    ],
  },
  {
    slug: 'cooking',
    name: 'Cooking',
    blurb: 'Home cooks for daily tiffin, meal prep or a full house party.',
    accent: '#E15B4C',
    note: 'Rated 4.9 by families',
    items: [
      { name: 'Daily Tiffin Cook', price: 699, mins: 60 },
      { name: 'Party Cooking', price: 1499, mins: 120 },
      { name: 'Meal Prep', price: 799, mins: 90 },
    ],
  },
  {
    slug: 'plumbing',
    name: 'Plumbing',
    blurb: 'Leaks, chokes and pressure problems fixed before they spread.',
    accent: '#3B82F6',
    note: 'Fastest average arrival',
    items: [
      { name: 'Tap Repair', price: 199, mins: 20 },
      { name: 'Pipe Fitting', price: 349, mins: 40 },
      { name: 'Drainage Unclogging', price: 299, mins: 30 },
      { name: 'Geyser Plumbing', price: 399, mins: 45 },
    ],
  },
  {
    slug: 'carpentry',
    name: 'Carpentry',
    blurb: 'Doors, drawers and flat-pack furniture, squared up properly.',
    accent: '#A2703F',
    note: 'Tools included',
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
    items: [
      { name: 'Wall Painting', price: 1299, mins: 180 },
      { name: 'Touch Up Painting', price: 499, mins: 60 },
      { name: 'Wood Polish', price: 399, mins: 45 },
    ],
  },
]

export const PLATFORM_FEE = 20

export function formatDuration(mins) {
  if (mins < 60) return `${mins} min`
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return m ? `${h} hr ${m} min` : `${h} hr`
}

export const priceOf = (n) => `₹${n.toLocaleString('en-IN')}`
