import { LIVE_CITIES } from '../../data/site'

export const EMPTY_BOOKING = {
  name: '',
  mobile: '',
  email: '',
  address: '',
  landmark: '',
  city: LIVE_CITIES[0].name,
  location: null, // { lat, lng } from the map pin
}

/** Digits only, so "+91 98765 43210" and "9876543210" validate the same. */
export const normalizeMobile = (v) => v.replace(/\D/g, '').replace(/^(?:0|91)(?=\d{10}$)/, '')

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/**
 * Field-level validation, run on submit and on blur once a field has been
 * touched. Messages say what to do, not what went wrong.
 */
export function validateBooking(form) {
  const errors = {}

  if (form.name.trim().length < 2) {
    errors.name = 'Please enter your full name.'
  }

  const mobile = normalizeMobile(form.mobile)
  if (!/^[6-9]\d{9}$/.test(mobile)) {
    errors.mobile = 'Enter a 10-digit Indian mobile number, starting 6 to 9.'
  }

  if (!EMAIL.test(form.email.trim())) {
    errors.email = 'We send your confirmation here, so it has to be a working address.'
  }

  if (form.address.trim().length < 12) {
    errors.address = 'Add the flat or house number, building and street.'
  }

  if (form.location?.outOfArea) {
    errors.location = 'We don\u2019t serve this area yet. Pin a location in Hyderabad, Delhi or Bengaluru.'
  }

  return errors
}

/** Trimmed and normalised, ready for the email template. */
export function cleanBooking(form) {
  return {
    name: form.name.trim(),
    mobile: `+91 ${normalizeMobile(form.mobile)}`,
    email: form.email.trim(),
    address: form.address.trim(),
    landmark: form.landmark.trim(),
    city: form.city,
    location: form.location || null,
  }
}
