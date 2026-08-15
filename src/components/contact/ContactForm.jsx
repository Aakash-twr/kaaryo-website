import { useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import SuccessState from './SuccessState'
import { ChevronDownIcon, ArrowRightIcon } from '../icons/UiIcons'
import { LIVE_CITIES, SOON_CITIES } from '../../data/site'

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

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  // Deliberately local: no network request, just the success state.
  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  const reset = () => {
    setForm(EMPTY)
    setSent(false)
  }

  return (
    <div className="overflow-hidden rounded-4xl border border-ink-900/8 bg-paper-50">
      <AnimatePresence mode="wait">
        {sent ? (
          <SuccessState key="success" name={form.name} onReset={reset} />
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
                <Label htmlFor="name">Your name</Label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={update('name')}
                  placeholder="Priya Sharma"
                  className={FIELD}
                />
              </div>

              <div>
                <Label htmlFor="contact">Email or phone</Label>
                <input
                  id="contact"
                  type="text"
                  required
                  value={form.contact}
                  onChange={update('contact')}
                  placeholder="priya@example.com"
                  className={FIELD}
                />
              </div>

              <div>
                <Label htmlFor="city">Your city</Label>
                <div className="relative">
                  <select
                    id="city"
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
                <Label htmlFor="topic">What is this about?</Label>
                <div className="relative">
                  <select
                    id="topic"
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
                <Label htmlFor="message" optional>
                  Your message
                </Label>
                <textarea
                  id="message"
                  rows={5}
                  value={form.message}
                  onChange={update('message')}
                  placeholder="Tell us what happened, or what you need help with…"
                  className={`${FIELD} resize-y`}
                />
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xs text-[0.8rem] leading-relaxed text-ink-500">
                We reply within a few hours on working days. Urgent booking issues are
                faster by phone.
              </p>
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-brand-500 via-brand-600 to-brand-700 px-7 py-3.5 text-[0.97rem] font-semibold text-white shadow-[0_10px_30px_-8px_rgba(0,103,79,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-10px_rgba(0,103,79,0.7)]"
              >
                Send message
                <ArrowRightIcon
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  )
}
