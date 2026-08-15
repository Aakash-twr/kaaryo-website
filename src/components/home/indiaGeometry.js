/**
 * India's boundary, stored as real [longitude, latitude] points and projected at
 * render time.
 *
 * Source: DataMeet's `india-composite.geojson` (github.com/datameet/maps), the
 * community dataset that merges Pakistan-occupied Kashmir and Aksai Chin into
 * the national outline — i.e. the Government of India depiction, in which the
 * whole of Jammu & Kashmir and Ladakh is Indian territory. The mainland ring was
 * extracted and reduced with Douglas–Peucker at a tolerance of 0.2° (about 3px
 * at the size this renders), taking it from 2,42,146 vertices to 150.
 *
 * These coordinates are generated, not hand-authored. An earlier version of this
 * file was plotted by hand from memory and got Jammu & Kashmir badly wrong — the
 * northern half of Aksai Chin and the Muzaffarabad side of PoK both fell outside
 * the outline. If the shape needs changing, re-derive it from the source data
 * rather than nudging numbers here.
 *
 * Extent: 8.07°N (Kanyakumari) to 37.03°N (northern Gilgit-Baltistan),
 * 68.17°E (Kutch) to 97.40°E (Arunachal Pradesh).
 *
 * Known deviation: the Shaksgam Valley (Trans-Karakoram Tract), which Pakistan
 * ceded to China in 1963 and India does not recognise as ceded, is outside this
 * outline — the source takes PoK from Pakistani administrative boundaries, which
 * exclude it. Everything else matches the official depiction.
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

/** Mainland ring, starting at the northernmost point. */
const BOUNDARY = [
  [75.15, 37.03], [77.52, 35.49], [79.34, 35.99], [80.05, 35.42],
  [80.41, 35.48], [79.40, 34.00], [78.89, 33.97], [78.94, 33.38],
  [79.41, 33.19], [79.55, 32.68], [78.97, 32.34], [78.74, 32.70],
  [78.40, 32.53], [78.78, 31.99], [78.78, 31.31], [79.10, 31.45],
  [81.03, 30.25], [80.37, 29.75], [80.08, 28.82], [82.74, 27.50],
  [84.15, 27.52], [85.21, 26.76], [88.01, 26.36], [88.12, 27.92],
  [88.64, 28.12], [88.89, 27.86], [88.75, 27.14], [89.13, 26.81],
  [92.06, 26.85], [92.12, 27.29], [91.64, 27.76], [92.46, 27.79],
  [94.63, 29.30], [95.26, 29.07], [96.05, 29.38], [96.63, 28.73],
  [96.41, 28.51], [96.71, 28.61], [97.40, 28.01], [96.89, 27.61],
  [97.14, 27.09], [96.23, 27.28], [95.15, 26.62], [95.19, 26.07],
  [94.63, 25.40], [94.71, 24.94], [94.16, 23.85], [93.33, 24.08],
  [93.39, 23.13], [93.13, 23.04], [93.20, 22.26], [92.91, 21.94],
  [92.60, 21.98], [92.28, 23.72], [91.96, 23.73], [91.62, 22.94],
  [91.16, 23.61], [91.37, 24.11], [92.16, 24.42], [92.43, 25.03],
  [89.84, 25.29], [89.68, 26.24], [89.36, 26.01], [88.40, 26.63],
  [88.52, 26.36], [88.11, 25.82], [89.01, 25.26], [88.44, 25.21],
  [88.01, 24.67], [88.74, 24.28], [88.56, 23.65], [89.00, 23.22],
  [89.10, 21.64], [88.72, 21.68], [88.64, 22.08], [88.25, 21.56],
  [88.02, 22.22], [88.19, 22.10], [87.80, 21.70], [86.91, 21.34],
  [87.07, 20.72], [86.37, 19.95], [85.04, 19.39], [84.13, 18.31],
  [82.31, 17.04], [82.30, 16.56], [81.27, 16.29], [80.94, 15.71],
  [80.26, 15.67], [80.05, 15.07], [80.35, 13.28], [79.76, 11.67],
  [79.88, 10.31], [79.29, 10.26], [78.90, 9.49], [79.19, 9.28],
  [78.27, 9.02], [78.07, 8.37], [77.55, 8.07], [76.55, 8.90],
  [75.87, 11.12], [75.20, 12.00], [74.52, 14.24], [73.46, 16.05],
  [72.86, 18.69], [73.07, 19.02], [72.81, 18.89], [72.66, 19.83],
  [72.93, 20.76], [72.60, 21.30], [72.93, 21.68], [72.54, 21.66],
  [72.75, 21.97], [72.51, 21.98], [72.91, 22.26], [72.33, 22.31],
  [72.11, 21.20], [70.82, 20.69], [68.94, 22.31], [70.17, 22.54],
  [70.45, 22.97], [69.20, 22.84], [68.43, 23.51], [68.81, 23.88],
  [68.17, 23.62], [68.81, 24.31], [71.12, 24.40], [70.66, 25.70],
  [70.10, 25.94], [70.17, 26.55], [69.51, 26.74], [69.59, 27.18],
  [70.37, 28.01], [70.87, 27.71], [71.90, 27.96], [73.40, 29.95],
  [74.70, 31.07], [74.61, 31.89], [75.37, 32.23], [74.68, 32.49],
  [74.71, 32.84], [73.63, 33.09], [73.40, 34.38], [74.13, 35.12],
  [73.18, 35.86], [72.57, 35.85], [72.55, 36.23], [73.06, 36.70],
  [73.86, 36.72], [73.67, 36.92],
]

export const INDIA_PATH = BOUNDARY.map(([lon, lat], i) => {
  const { x, y } = project(lon, lat)
  return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`
})
  .join(' ')
  .concat(' Z')
