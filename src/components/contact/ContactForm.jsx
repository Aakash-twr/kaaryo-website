import { useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import SuccessState from './SuccessState'
import { ChevronDownIcon, ArrowRightIcon } from '../icons/UiIcons'
import { LIVE_CITIES, SOON_CITIES, SITE } from '../../data/site'
import {
  EmailNotConfiguredError,
  contactTemplateParams,
  isContactEmailConfigured,
  sendContactEmail,
} from '../../lib/email'
import { makeReference } from '../../lib/quote'

const TOPICS = [
  'A booking I already made',
  'Becoming a Kaaryo professional',
  'Business or partnership',
  'Feedback or a complaint',
  'Something else',
]

const EMPTY = { name: '', contact: '', city: 'Hyderabad', topic: TOPICS[0], message: '' }

const FIELD =
  'w-full rounded-2xl border border-ink-900/12 bg-white px-4 py-3.5 text-[0.95rem] text-ink-900 transition-colors placeholder:text-ink-400 hover:border-ink-900/25'

/** Rough but sufficient: if it contains @ and a dot after @, treat it as an email. */
const looksLikeEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())

function Label({ htmlFor, children, optional }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 flex items-baseline gap-2">
      <span className="text-[0.86rem] font-bold text-ink-800">{children}</span>
      {optional && (
        <span className="font-mono text-[0.58rem] tracking-[0.14em] text-ink-400 uppercase">
          optional
        </span>
      )}
    </label>
  )
}

export default function ContactForm() {
  const [form, setForm] = useState(EMPTY)
  const [sent, setSent] = useState(false)
  const [reference, setReference] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | error
  const [failure, setFailure] = useState(null)

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()

    const ref = makeReference()
    setReference(ref)
    setStatus('sending')
    setFailure(null)

    // Only attempt an email send when the user gave us an email address.
    // If they gave a phone number we skip silently and go straight to the
    // success screen — same UX, no error for a valid contact choice.
    if (looksLikeEmail(form.contact)) {
      try {
        await sendContactEmail(
          contactTemplateParams({
            name: form.name,
            email: form.contact.trim(),
            city: form.city,
            topic: form.topic,
            message: form.message,
            reference: ref,
          })
        )
      } catch (err) {
        // EmailJS not configured in dev → warn but still show success so the
        // rest of the UI can be tested without credentials.
        if (err instanceof EmailNotConfiguredError && import.meta.env.DEV) {
          console.warn('[ContactForm] EmailJS contact template not configured — skipping send in dev.')
        } else if (!(err instanceof EmailNotConfiguredError)) {
          // Real network / API failure — tell the user.
          setFailure(
            'We could not send your confirmation email. Your message still reached us — but check your connection and try again if you want the receipt.'
          )
          setStatus('error')
          return
        }
      }
    }

    setStatus('idle')
    setSent(true)
  }

  const reset = () => {
    setForm(EMPTY)
    setSent(false)
    setReference('')
    setStatus('idle')
    setFailure(null)
  }

  return (
    <div className="overflow-hidden rounded-4xl border border-ink-900/8 bg-paper-50">
      <AnimatePresence mode="wait">
        {sent ? (
          <SuccessState key="success" name={form.name} reference={reference} onReset={reset} />
        ) : (
          <m.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="p-7 sm:p-9"
          >
            <p className="font-mono text-[0.62rem] tracking-[0.2em] text-ink-500 uppercase">
              Send us a message
            </p>
            <h2 className="mt-3 text-[1.7rem] text-ink-900 sm:text-[2rem]">
              Tell us what you need
            </h2>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="cf-name">Your name</Label>
                <input
                  id="cf-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={update('name')}
                  placeholder="Priya Sharma"
                  className={FIELD}
                />
              </div>

              <div>
                <Label htmlFor="cf-contact">Email or phone</Label>
                <input
                  id="cf-contact"
                  type="text"
                  required
                  value={form.contact}
                  onChange={update('contact')}
                  placeholder="priya@example.com"
                  className={FIELD}
                />
              </div>

              <div>
                <Label htmlFor="cf-city">Your city</Label>
                <div className="relative">
                  <select
                    id="cf-city"
                    value={form.city}
                    onChange={update('city')}
                    className={`${FIELD} appearance-none pr-11 font-semibold`}
                  >
                    <optgroup label="Live now">
                      {LIVE_CITIES.map((c) => (
                        <option key={c.name} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Coming soon">
                      {SOON_CITIES.map((c) => (
                        <option key={c.name} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </optgroup>
                    <option value="Other">Somewhere else</option>
                  </select>
                  <ChevronDownIcon
                    size={18}
                    className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-ink-500"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="cf-topic">What is this about?</Label>
                <div className="relative">
                  <select
                    id="cf-topic"
                    value={form.topic}
                    onChange={update('topic')}
                    className={`${FIELD} appearance-none pr-11 font-semibold`}
                  >
                    {TOPICS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon
                    size={18}
                    className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-ink-500"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="cf-message" optional>
                  Your message
                </Label>
                <textarea
                  id="cf-message"
                  rows={5}
                  value={form.message}
                  onChange={update('message')}
                  placeholder="Tell us what happened, or what you need help with…"
                  className={`${FIELD} resize-y`}
                />
              </div>
            </div>

            {/* Network / API error banner */}
            {status === 'error' && failure && (
              <div
                role="alert"
                className="mt-5 rounded-2xl border border-danger-500/30 bg-danger-500/8 px-5 py-4"
              >
                <p className="text-[0.88rem] font-semibold text-danger-600">{failure}</p>
                <p className="mt-1 text-[0.82rem] text-ink-600">
                  You can reach us directly on{' '}
                  <a
                    href={`tel:${SITE.phone.replace(/\s/g, '')}`}
                    className="font-semibold text-ink-900 underline underline-offset-2"
                  >
                    {SITE.phone}
                  </a>
                  .
                </p>
              </div>
            )}

            {/* Dev-mode warning when the contact template is not wired up */}
            {import.meta.env.DEV && !isContactEmailConfigured() && (
              <p className="mt-5 rounded-2xl border border-dashed border-warning-500/50 bg-warning-100/60 px-5 py-3 text-[0.8rem] text-ink-700">
                <strong>Dev note:</strong> Contact email not configured. Set{' '}
                <code>VITE_EMAILJS_CONTACT_TEMPLATE_ID</code> in <code>.env.local</code> — see{' '}
                <code>.env.example</code>.
              </p>
            )}

            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xs text-[0.8rem] leading-relaxed text-ink-500">
                We reply within a few hours on working days. Urgent booking issues are faster by
                phone.
              </p>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-brand-500 via-brand-600 to-brand-700 px-7 py-3.5 text-[0.97rem] font-semibold text-white shadow-[0_10px_30px_-8px_rgba(0,103,79,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-10px_rgba(0,103,79,0.7)] disabled:translate-y-0 disabled:opacity-60"
              >
                {status === 'sending' ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="h-4 w-4 animate-spin rounded-full border-2 border-white/35 border-t-white"
                    />
                    Sending…
                  </>
                ) : (
                  <>
                    Send message
                    <ArrowRightIcon
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </div>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  )
}
