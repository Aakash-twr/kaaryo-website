import { Suspense, lazy, useState } from 'react'
import { LIVE_CITIES } from '../../data/site'
import { validateBooking } from './validation'
import { ChevronDownIcon } from '../icons/UiIcons'

const LocationPicker = lazy(() => import('./LocationPicker'))

export const FIELD =
  'w-full rounded-2xl border bg-white px-4 py-3 text-[0.94rem] text-ink-900 transition-colors placeholder:text-ink-400'
export const OK = 'border-ink-900/12 hover:border-ink-900/25'
export const BAD = 'border-danger-500/60 hover:border-danger-500'

export function Field({ id, label, hint, error, optional, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 flex items-baseline gap-2">
        <span className="text-[0.84rem] font-bold text-ink-800">{label}</span>
        {optional && (
          <span className="font-mono text-[0.56rem] tracking-[0.14em] text-ink-400 uppercase">
            optional
          </span>
        )}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-[0.78rem] text-danger-600">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-[0.78rem] text-ink-500">{hint}</p>
      ) : null}
    </div>
  )
}

/**
 * Name, mobile and address are what the professional needs to reach you.
 * Email is here because the confirmation has to land somewhere — without it
 * there is nothing to send.
 *
 * Flow: the map picker appears right after the city dropdown. Once the
 * customer pins a valid (in-area) location, the full-address and landmark
 * fields slide in so they can add flat / building / street detail.
 */
export default function BookingForm({ form, onChange, errors, onValidityChange, submitted }) {
  const [touched, setTouched] = useState({})

  // An error appears once the customer has left the field, or as soon as
  // they try to submit — never while they are still typing their first name.
  const shown = (key) => (submitted || touched[key] ? errors[key] : undefined)

  const update = (key) => (e) => {
    const next = { ...form, [key]: e.target.value }
    onChange(next)
    if (submitted || touched[key]) onValidityChange?.(validateBooking(next))
  }

  const blur = (key) => () => {
    setTouched((t) => ({ ...t, [key]: true }))
    onValidityChange?.(validateBooking(form))
  }

  const inputProps = (key) => ({
    id: key,
    value: form[key],
    onChange: update(key),
    onBlur: blur(key),
    'aria-invalid': shown(key) ? true : undefined,
    'aria-describedby': shown(key) ? `${key}-error` : undefined,
    className: `${FIELD} ${shown(key) ? BAD : OK}`,
  })

  const handleLocationChange = (coords) => {
    const next = { ...form, location: coords }
    onChange(next)
    onValidityChange?.(validateBooking(next))
  }

  // Address fields unlock only when the pin is placed inside a service area
  const pinIsValid = form.location && !form.location.outOfArea

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Field id="name" label="Your name" error={shown('name')}>
        <input type="text" autoComplete="name" placeholder="Priya Sharma" {...inputProps('name')} />
      </Field>

      <Field id="mobile" label="Mobile number" error={shown('mobile')}>
        <input
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          placeholder="98765 43210"
          {...inputProps('mobile')}
        />
      </Field>

      <Field
        id="email"
        label="Email address"
        hint="Your booking confirmation and breakdown go here."
        error={shown('email')}
      >
        <input
          type="email"
          autoComplete="email"
          placeholder="priya@example.com"
          {...inputProps('email')}
        />
      </Field>

      <Field id="city" label="City">
        <div className="relative">
          <select
            {...inputProps('city')}
            className={`${FIELD} ${OK} appearance-none pr-11 font-semibold`}
          >
            {LIVE_CITIES.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
          <ChevronDownIcon
            size={17}
            className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-ink-500"
          />
        </div>
      </Field>

      {/* Step 1: Pin your location on the map */}
      <div className="sm:col-span-2">
        <Field
          id="location"
          label="Pin your exact location"
          hint="Move the map or search to drop a pin."
          error={shown('location')}
        >
          <Suspense
            fallback={
              <div className="location-picker" style={{ padding: '2rem', textAlign: 'center' }}>
                <span className="location-picker__spinner" aria-hidden="true" />
                <span style={{ marginLeft: '0.5rem', fontSize: '0.82rem', color: 'var(--color-ink-500)' }}>
                  Loading map…
                </span>
              </div>
            }
          >
            <LocationPicker
              city={form.city}
              onLocationChange={handleLocationChange}
              initialCoords={form.location}
            />
          </Suspense>
        </Field>
      </div>

      {/* Step 2: Address field — revealed only after a valid pin is placed */}
      {pinIsValid && (
        <div className="sm:col-span-2 booking-fields-reveal">
          <Field
            id="address"
            label="Full address"
            hint="Flat or house number, building, street and area."
            error={shown('address')}
          >
            <textarea
              rows={3}
              autoComplete="street-address"
              placeholder="Flat 402, Sai Residency, Road No. 12, Banjara Hills"
              {...inputProps('address')}
              className={`${FIELD} ${shown('address') ? BAD : OK} resize-y`}
            />
          </Field>
        </div>
      )}
    </div>
  )
}
