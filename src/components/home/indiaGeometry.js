/**
 * India's boundary, stored as real [longitude, latitude] reference points and
 * projected at render time. Authoring in degrees rather than SVG units keeps
 * the geometry checkable against an atlas — and means a whole region cannot
 * quietly go missing the way Jammu & Kashmir did when this was hand-plotted
 * straight into viewBox coordinates.
 *
 * Extent covered: 8.08°N (Kanyakumari) to 37.1°N (Indira Col, the northern tip
 * of Jammu & Kashmir), and 68.03°E (Guhar Moti, Kutch) to 97.4°E (Arunachal).
 * Boundaries follow the Government of India's depiction, so Jammu & Kashmir
 * — including Gilgit-Baltistan and Aksai Chin — is shown in full.
 */

// Equirectangular, with x scaled by cos(23°) — the mean latitude of the
// landmass — so the country is not stretched sideways.
const LON_ORIGIN = 68
const LAT_ORIGIN = 37.5
const LAT_SCALE = 100 / 30 // 30° of latitude across 100 units
const LON_SCALE = LAT_SCALE * 0.92

export const project = (lon, lat) => ({
  x: (lon - LON_ORIGIN) * LON_SCALE,
  y: (LAT_ORIGIN - lat) * LAT_SCALE,
})

/** Traced clockwise from the northern tip. */
const BOUNDARY = [
  // ── Jammu & Kashmir: eastern edge, Siachen down through Aksai Chin ──
  [76.9, 37.1], // Indira Col — northernmost point
  [78.0, 35.6],
  [79.5, 35.0],
  [80.0, 34.6],
  [80.3, 34.0], // Aksai Chin, eastern limit
  [79.5, 33.0],
  [79.2, 32.5],

  // ── Himalayan border: Himachal, Uttarakhand, Nepal, Sikkim, Bhutan ──
  [79.0, 31.4],
  [79.9, 30.9],
  [80.2, 30.2], // Kali river — Nepal's western border
  [80.1, 28.8],
  [81.0, 28.4],
  [82.7, 27.9],
  [84.0, 27.5],
  [85.8, 26.6],
  [87.0, 26.4],
  [88.1, 26.4], // eastern Nepal — north side of the Siliguri corridor
  [88.0, 27.9], // Sikkim
  [88.9, 27.3],
  [89.0, 26.7], // western Bhutan
  [92.0, 26.8], // eastern Bhutan
  [92.1, 27.5],

  // ── Arunachal Pradesh ──
  [93.5, 28.6],
  [95.0, 29.0],
  [96.4, 29.3],
  [97.4, 28.3], // easternmost point

  // ── Eastern border with Myanmar ──
  [97.0, 27.7],
  [96.2, 27.0],
  [97.1, 26.0],
  [96.5, 25.0],
  [95.1, 24.0], // Manipur
  [94.5, 23.5],
  [93.4, 23.0], // Mizoram
  [92.7, 21.9], // southern tip of Mizoram

  // ── Around Bangladesh: Tripura, Barak valley, Meghalaya ──
  [92.2, 23.3],
  [91.4, 22.9], // southern tip of Tripura
  [91.2, 24.2],
  [92.1, 24.9],
  [92.0, 25.2],
  [90.6, 25.15], // southern Meghalaya
  [89.8, 25.3],
  [89.7, 26.2],
  [88.9, 26.3], // south side of the Siliguri corridor

  // ── West Bengal, down to the Sundarbans ──
  [88.1, 25.2],
  [88.7, 24.3],
  [88.1, 23.5],
  [88.9, 22.2],
  [88.1, 21.6], // Sundarbans

  // ── East coast: Odisha → Tamil Nadu ──
  [87.0, 21.6],
  [86.5, 20.7],
  [85.1, 19.5],
  [84.5, 19.0],
  [83.0, 18.0],
  [82.3, 16.9],
  [81.2, 16.3], // Godavari delta
  [80.3, 15.8], // Krishna delta
  [80.1, 14.5],
  [80.3, 13.1], // Chennai
  [79.9, 11.9],
  [79.4, 10.3], // Point Calimere
  [78.9, 9.3], // Rameswaram
  [78.1, 8.8],
  [77.5, 8.08], // Kanyakumari — southernmost point

  // ── West coast: Kerala → Gujarat ──
  [76.9, 8.5],
  [76.3, 10.0], // Kochi
  [75.8, 11.6],
  [74.8, 12.9], // Mangaluru
  [74.4, 14.8],
  [73.8, 15.5], // Goa
  [73.3, 17.0],
  [72.8, 19.1], // Mumbai
  [72.7, 20.7],
  [72.9, 21.5],
  [72.6, 22.3], // head of the Gulf of Khambhat
  [72.2, 21.5],
  [71.0, 20.75], // southern Saurashtra
  [69.7, 21.5],
  [68.97, 22.47], // Okha
  [70.0, 22.9], // head of the Gulf of Kutch
  [69.6, 23.5],
  [68.6, 23.6],
  [68.03, 23.71], // Guhar Moti — westernmost point

  // ── Western border with Pakistan, up into Jammu & Kashmir ──
  [68.8, 24.3], // Rann of Kutch
  [70.7, 25.8],
  [71.0, 27.8],
  [72.3, 28.8],
  [73.9, 30.0], // Punjab
  [74.6, 31.1],
  [75.3, 32.3],
  [74.3, 32.8], // Jammu
  [74.0, 34.0],
  [73.4, 34.7], // western limit of Jammu & Kashmir
  [73.9, 35.5], // Gilgit-Baltistan
  [74.5, 36.5],
  [75.9, 36.9],
]

export const INDIA_PATH = BOUNDARY.map(([lon, lat], i) => {
  const { x, y } = project(lon, lat)
  return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`
})
  .join(' ')
  .concat(' Z')
