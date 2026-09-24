import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { Link } from 'react-router-dom'
import PriceBreakdown from './PriceBreakdown'
import BookingForm, { Field, FIELD, OK } from './BookingForm'
import BookingConfirmed from './BookingConfirmed'
import { EMPTY_BOOKING, cleanBooking, validateBooking } from './validation'
import { buildQuote, makeReference, minimumHours } from '../../lib/quote'
import {
  EmailNotConfiguredError,
  bookingTemplateParams,
  isEmailConfigured,
  sendBookingEmail,
} from '../../lib/email'
import { SITE } from '../../data/site'
import { CloseIcon, ArrowRightIcon } from '../icons/UiIcons'
import { LockIcon, ShieldIcon, ClockIcon, CalendarIcon } from '../icons/FeatureIcons'

const PANEL = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.32, ease: [0.16, 0.84, 0.24, 1] } },
  exit: { opacity: 0, y: 16, scale: 0.985, transition: { duration: 0.2 } },
}

export default function BookingModal({ item, cat, onClose }) {
  const [form, setForm] = useState(EMPTY_BOOKING)
  const [errors, setErrors] = useState({})
  const [hours, setHours] = useState(() => minimumHours(item))
  const [submitted, setSubmitted] = useState(false)
  const [status, setStatus] = useState('editing') // editing | sending | done | error
  const [failure, setFailure] = useState(null)
  const [confirmed, setConfirmed] = useState(null)
  const [clampWarning, setClampWarning] = useState(null) // transient time-clamp notice

  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const scheduledAtRef = useRef(null)
  const clampTimerRef = useRef(null)
  const titleId = 'booking-modal-title'

  const quote = useMemo(() => buildQuote({ item, cat, hours }), [item, cat, hours])
  const pinIsValid = Boolean(form.location && !form.location.outOfArea)

  // Escape closes, background stops scrolling — same contract as the mobile
  // menu. Blocked mid-send so a stray key cannot orphan a request.
  const canDismiss = status !== 'sending'
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && canDismiss) onClose()
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 120)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.clearTimeout(focusTimer)
      document.body.style.overflow = prevOverflow
    }
  }, [canDismiss, onClose])

  // Keeps Tab inside the dialog while it is open.
  const onKeyDown = useCallback((e) => {
    if (e.key !== 'Tab') return
    const focusable = dialogRef.current?.querySelectorAll(
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    if (!focusable?.length) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const found = validateBooking(form)
    setErrors(found)
    setSubmitted(true)
    const firstBad = Object.keys(found)[0]
    if (firstBad) {
      dialogRef.current?.querySelector(`#${firstBad}`)?.focus()
      return
    }

    const booking = cleanBooking(form)
    const reference = makeReference()

    setStatus('sending')
    setFailure(null)
    try {
      await sendBookingEmail(bookingTemplateParams({ booking, quote, reference }))
      setConfirmed({ booking, reference })
      setStatus('done')
    } catch (err) {
      // Nothing is persisted server-side yet, so a failed send means the
      // booking genuinely did not go anywhere. Say so rather than showing a
      // confirmation the customer cannot rely on.
      setFailure(
        err instanceof EmailNotConfiguredError
          ? 'Online booking is not switched on yet. Call us and we will take this over the phone.'
          : 'We could not send your confirmation, so the booking has not gone through. Check your connection and try again.'
      )
      setStatus('error')
    }
  }

  return (
    <div className="fixed inset-0 z-[120] overflow-y-auto">
      <m.div
        className="fixed inset-0 bg-ink-900/55 backdrop-blur-[3px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        onClick={canDismiss ? onClose : undefined}
      />

      <div className="relative flex min-h-full items-start justify-center p-3 sm:p-6">
        <m.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onKeyDown={onKeyDown}
          variants={PANEL}
          initial="hidden"
          animate="show"
          exit="exit"
          className="relative w-full max-w-4xl overflow-hidden rounded-4xl border border-ink-900/10 bg-paper-50 shadow-[0_40px_100px_-30px_rgba(15,23,42,0.6)]"
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            disabled={!canDismiss}
            aria-label="Close booking"
            className="absolute top-4 right-4 z-10 rounded-full border border-ink-900/12 bg-white/85 p-2 text-ink-600 backdrop-blur-sm transition hover:bg-white hover:text-ink-900 disabled:opacity-40"
          >
            <CloseIcon size={18} />
          </button>

          <AnimatePresence mode="wait">
            {status === 'done' ? (
              <m.div
                key="done"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <BookingConfirmed
                  quote={quote}
                  booking={confirmed.booking}
                  reference={confirmed.reference}
                  onClose={onClose}
                />
              </m.div>
            ) : (
              <m.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                noValidate
              >
                <div className="border-b border-ink-900/8 px-6 py-6 pr-16 sm:px-8">
                  <p className="font-mono text-[0.6rem] tracking-[0.2em] text-ink-500 uppercase">
                    Book a service
                  </p>
                  <h2 id={titleId} className="mt-2 text-[1.55rem] text-ink-900 sm:text-[1.85rem]">
                    {item.name}
                  </h2>
                  <p className="mt-1.5 text-[0.9rem] text-ink-600">
                    Tell us where to send your professional. We confirm the price before
                    anyone sets off.
                  </p>

                  {/* ── Instant / Schedule toggle ── */}
                  <div className="mt-5 inline-flex items-center rounded-2xl border border-ink-900/10 bg-paper-100 p-1 gap-1">
                    <button
                      type="button"
                      id="schedule-instant"
                      onClick={() => setForm((p) => ({ ...p, scheduleType: 'instant', scheduledAt: '' }))}
                      className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-[0.84rem] font-semibold transition-all duration-200 ${
                        form.scheduleType === 'instant'
                          ? 'bg-brand-700 text-paper-50 shadow-[0_6px_18px_-8px_rgba(15,23,42,0.55)]'
                          : 'text-ink-600 hover:text-ink-900'
                      }`}
                    >
                      <ClockIcon size={15} />
                      Book now
                    </button>
                    <button
                      type="button"
                      id="schedule-later"
                      onClick={() => setForm((p) => ({ ...p, scheduleType: 'scheduled' }))}
                      className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-[0.84rem] font-semibold transition-all duration-200 ${
                        form.scheduleType === 'scheduled'
                          ? 'bg-brand-700 text-paper-50 shadow-[0_6px_18px_-8px_rgba(15,23,42,0.55)]'
                          : 'text-ink-600 hover:text-ink-900'
                      }`}
                    >
                      <CalendarIcon size={15} />
                      Schedule
                    </button>
                  </div>
                </div>

                <div className="grid gap-7 px-6 py-7 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
                  <div>
                    <BookingForm
                      form={form}
                      onChange={setForm}
                      errors={errors}
                      onValidityChange={setErrors}
                      submitted={submitted}
                    />

                    {/* Schedule date-time picker — revealed when "Schedule" mode is active */}
                    {form.scheduleType === 'scheduled' && (
                      <div className="booking-fields-reveal mt-5">
                        <Field
                          id="scheduledAt"
                          label="Date & time"
                          hint="Available between 7:00 AM and 10:00 PM"
                          error={submitted ? errors.scheduledAt : undefined}
                        >
                          <div className="booking-dt-wrapper">
                            <span className="booking-dt-icon">
                              <CalendarIcon size={16} />
                            </span>
                            <input
                              ref={scheduledAtRef}
                              id="scheduledAt"
                              type="datetime-local"
                              min={(() => {
                                const pad = (n) => String(n).padStart(2, '0')
                                const dt = new Date(Date.now() + 60 * 60 * 1000)
                                const h = dt.getHours()
                                if (h < 7) {
                                  dt.setHours(7, 0, 0, 0)
                                } else if (h >= 22) {
                                  dt.setDate(dt.getDate() + 1)
                                  dt.setHours(7, 0, 0, 0)
                                }
                                return `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())}T${pad(dt.getHours())}:${pad(dt.getMinutes())}`
                              })()}
                              value={form.scheduledAt}
                              onClick={() => scheduledAtRef.current?.showPicker?.()}
                              onChange={(e) => {
                                let value = e.target.value
                                let warned = null
                                if (value) {
                                  // Auto-clamp to service hours: 7:00 AM – 10:00 PM
                                  const dt = new Date(value)
                                  const h = dt.getHours()
                                  const m = dt.getMinutes()
                                  if (h < 7) {
                                    dt.setHours(7, 0, 0, 0)
                                    warned = 'Time adjusted to 7:00 AM — our earliest slot.'
                                  } else if (h > 22 || (h === 22 && m > 0)) {
                                    dt.setHours(22, 0, 0, 0)
                                    warned = 'Time adjusted to 10:00 PM — our latest slot.'
                                  }
                                  const pad = (n) => String(n).padStart(2, '0')
                                  value = `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())}T${pad(dt.getHours())}:${pad(dt.getMinutes())}`
                                }
                                if (warned) {
                                  setClampWarning(warned)
                                  clearTimeout(clampTimerRef.current)
                                  clampTimerRef.current = setTimeout(() => setClampWarning(null), 3500)
                                } else {
                                  setClampWarning(null)
                                }
                                const next = { ...form, scheduledAt: value }
                                setForm(next)
                                if (submitted) setErrors(validateBooking(next))
                              }}
                              className={`booking-dt-input ${
                                submitted && errors.scheduledAt
                                  ? 'border-danger-500/60 focus:ring-danger-500/30'
                                  : ''
                              }`}
                            />
                          </div>
                        </Field>

                        {/* Auto-dismiss clamp warning */}
                        <AnimatePresence>
                          {clampWarning && (
                            <m.p
                              key="clamp-warn"
                              initial={{ opacity: 0, y: -6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -4 }}
                              transition={{ duration: 0.22 }}
                              className="mt-2 flex items-start gap-1.5 rounded-xl border border-warning-500/30 bg-warning-100/70 px-3 py-2 text-[0.78rem] leading-snug text-warning-700"
                            >
                              <span aria-hidden="true" className="mt-px shrink-0 text-[0.9rem]">⚠️</span>
                              {clampWarning} Services run 7:00 AM – 10:00 PM.
                            </m.p>
                          )}
                        </AnimatePresence>
                      </div>
                    )}

                    {/* Landmark — visible only on mobile/tablet (hidden at lg+, shown in right col there) */}
                    {pinIsValid && (
                      <div className="booking-fields-reveal mt-5 lg:hidden">
                        <Field id="landmark-mobile" label="Landmark" optional>
                          <input
                            id="landmark-mobile"
                            type="text"
                            placeholder="Opposite the Reliance Fresh"
                            value={form.landmark ?? ''}
                            onChange={(e) =>
                              setForm((prev) => ({ ...prev, landmark: e.target.value }))
                            }
                            className={`${FIELD} ${OK}`}
                          />
                        </Field>
                      </div>
                    )}

                    <p className="mt-5 flex items-start gap-2 text-[0.76rem] leading-relaxed text-ink-500">
                      <LockIcon size={14} className="mt-0.5 shrink-0 text-brand-500" />
                      Your details are used to dispatch and confirm this booking, and
                      nothing else. See our{' '}
                      <Link
                        to="/privacy-policy"
                        onClick={onClose}
                        className="font-semibold text-ink-700 underline underline-offset-2"
                      >
                        privacy policy
                      </Link>
                      .
                    </p>
                  </div>

                  <div className="space-y-5 lg:sticky lg:top-6 lg:h-fit">
                    <PriceBreakdown quote={quote} hours={hours} onHoursChange={setHours} />

                    {/* Landmark — visible only on desktop (lg+), shown in left col on mobile) */}
                    {pinIsValid && (
                      <div className="booking-fields-reveal hidden lg:block">
                        <Field id="landmark" label="Landmark" optional>
                          <input
                            id="landmark"
                            type="text"
                            placeholder="Opposite the Reliance Fresh"
                            value={form.landmark ?? ''}
                            onChange={(e) =>
                              setForm((prev) => ({ ...prev, landmark: e.target.value }))
                            }
                            className={`${FIELD} ${OK}`}
                          />
                        </Field>
                      </div>
                    )}
                  </div>
                </div>

                {status === 'error' && (
                  <div
                    role="alert"
                    className="mx-6 mb-2 rounded-2xl border border-danger-500/30 bg-danger-500/8 px-5 py-4 sm:mx-8"
                  >
                    <p className="text-[0.88rem] font-semibold text-danger-600">
                      {failure}
                    </p>
                    <p className="mt-1 text-[0.82rem] text-ink-600">
                      You can reach us on{' '}
                      <a
                        href={`tel:${SITE.phone.replace(/\s/g, '')}`}
                        className="font-semibold text-ink-900 underline underline-offset-2"
                      >
                        {SITE.phone}
                      </a>{' '}
                      any time.
                    </p>
                  </div>
                )}

                {import.meta.env.DEV && !isEmailConfigured() && (
                  <p className="mx-6 mb-2 rounded-2xl border border-dashed border-warning-500/50 bg-warning-100/60 px-5 py-3 text-[0.8rem] text-ink-700 sm:mx-8">
                    <strong>Dev note:</strong> EmailJS is not configured. Set
                    VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID and
                    VITE_EMAILJS_PUBLIC_KEY in <code>.env.local</code> — see{' '}
                    <code>.env.example</code>.
                  </p>
                )}

                <div className="flex flex-col gap-4 border-t border-ink-900/8 bg-paper-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                  <p className="inline-flex items-center gap-2 text-[0.8rem] text-ink-600">
                    <ShieldIcon size={15} className="text-success-500" />
                    Free to cancel until a professional accepts.
                  </p>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-brand-500 via-brand-600 to-brand-700 px-7 py-3.5 text-[0.95rem] font-semibold text-white shadow-[0_10px_30px_-8px_rgba(0,103,79,0.55)] transition-all duration-300 hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-60"
                  >
                    {status === 'sending' ? (
                      <>
                        <span
                          aria-hidden="true"
                          className="h-4 w-4 animate-spin rounded-full border-2 border-white/35 border-t-white"
                        />
                        Booking…
                      </>
                    ) : (
                      <>
                        {quote.ctaLabel}
                        <ArrowRightIcon
                          size={17}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </button>
                </div>
              </m.form>
            )}
          </AnimatePresence>
        </m.div>
      </div>
    </div>
  )
}
