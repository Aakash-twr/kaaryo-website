import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { LIVE_CITIES, SITE } from '../../data/site'
import { priceOf } from '../../data/services'
import { normalizeMobile } from './validation'
import {
  EmailNotConfiguredError,
  isEmailConfigured,
  planTemplateParams,
  sendPlanEmail,
} from '../../lib/email'
import { makeReference } from '../../lib/quote'
import { CloseIcon, ArrowRightIcon, CheckIcon, ChevronDownIcon } from '../icons/UiIcons'
import { ShieldIcon, SparkleIcon, PhoneIcon, MailIcon } from '../icons/FeatureIcons'

const PANEL = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.32, ease: [0.16, 0.84, 0.24, 1] } },
  exit: { opacity: 0, y: 16, scale: 0.985, transition: { duration: 0.2 } },
}

const EASE = [0.16, 0.84, 0.24, 1]
const rise = (delay) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: EASE },
})

const FIELD =
  'w-full rounded-2xl border bg-white px-4 py-3 text-[0.94rem] text-ink-900 transition-colors placeholder:text-ink-400'
const OK = 'border-ink-900/12 hover:border-ink-900/25 focus:border-ink-900/40 outline-none'
const BAD = 'border-danger-500/60 hover:border-danger-500 outline-none'

const EMPTY = { name: '', mobile: '', city: LIVE_CITIES[0].name }

function validatePlan(form) {
  const errors = {}
  if (form.name.trim().length < 2) errors.name = 'Please enter your full name.'
  const mobile = normalizeMobile(form.mobile)
  if (!/^[6-9]\d{9}$/.test(mobile)) errors.mobile = 'Enter a 10-digit Indian mobile number, starting 6 to 9.'
  return errors
}

const PERKS = [
  'Doorstep wash at your home or office',
  'Bolt brings all supplies and water',
  'No-hose, society-friendly service',
  'Cancel anytime, no penalty',
]

function PlanConfirmed({ plan, name, onClose, accent }) {
  const firstName = name.split(/\s+/)[0]
  return (
    <div className="px-6 py-10 text-center sm:px-10 sm:py-14">
      <div className="relative mx-auto w-fit">
        <m.span
          className="absolute inset-0 rounded-full bg-success-500/25"
          initial={{ scale: 0.6, opacity: 0.9 }}
          animate={{ scale: 2.1, opacity: 0 }}
          transition={{ duration: 1.4, ease: 'easeOut', delay: 0.2 }}
        />
        <m.span
          className="relative flex h-18 w-18 items-center justify-center rounded-full bg-linear-to-br from-success-400 to-success-600 shadow-[0_20px_44px_-18px_rgba(62,187,158,0.55)]"
          initial={{ scale: 0.3, rotate: -25 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 240, damping: 14, delay: 0.1 }}
        >
          <svg width="34" height="34" viewBox="0 0 38 38" fill="none" aria-hidden="true">
            <m.path
              d="M9 19.8l6.4 6.4L29 12.6"
              stroke="#fff"
              strokeWidth="3.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.45, delay: 0.35, ease: 'easeOut' }}
            />
          </svg>
        </m.span>
      </div>

      <m.h3 className="mt-7 text-[1.7rem] text-ink-900 sm:text-[2rem]" {...rise(0.45)}>
        You&rsquo;re on, {firstName}.
      </m.h3>

      <m.p className="mx-auto mt-3 max-w-md text-[0.95rem] leading-relaxed text-ink-600" {...rise(0.55)}>
        Your{' '}
        <span className="font-semibold text-ink-900">
          Kaaryo Shine {plan.name} ({plan.tagline})
        </span>{' '}
        interest has been received. Our team will call you within{' '}
        <span className="font-semibold text-ink-900">2 hours</span> to confirm your area and
        schedule your first wash.
      </m.p>

      <m.dl
        className="mx-auto mt-8 max-w-sm divide-y divide-ink-900/8 overflow-hidden rounded-3xl border border-ink-900/10 bg-paper-100 text-left"
        {...rise(0.65)}
      >
        <div className="flex items-baseline justify-between gap-4 px-5 py-3.5">
          <dt className="text-[0.82rem] text-ink-500">Plan</dt>
          <dd className="font-semibold text-[0.9rem] text-ink-900">{plan.name}</dd>
        </div>
        <div className="flex items-baseline justify-between gap-4 px-5 py-3.5">
          <dt className="text-[0.82rem] text-ink-500">Washes</dt>
          <dd className="text-[0.9rem] text-ink-800">{plan.tagline}</dd>
        </div>
        <div className="flex items-baseline justify-between gap-4 px-5 py-3.5">
          <dt className="text-[0.82rem] text-ink-500">Monthly price</dt>
          <dd className="font-display text-[1.2rem] font-extrabold tracking-[-0.02em]" style={{ color: accent }}>
            {priceOf(plan.price)}
          </dd>
        </div>
      </m.dl>

      <m.p
        className="mx-auto mt-5 flex max-w-sm items-start gap-2.5 rounded-2xl border px-4 py-3 text-left text-[0.8rem] leading-relaxed text-ink-700"
        style={{ backgroundColor: `${accent}10`, borderColor: `${accent}25` }}
        {...rise(0.72)}
      >
        <PhoneIcon size={15} className="mt-0.5 shrink-0" style={{ color: accent }} />
        Our team will call you to confirm your first wash slot. No payment is collected until your
        subscription is active.
      </m.p>

      <m.div className="mt-8 flex flex-wrap items-center justify-center gap-3" {...rise(0.8)}>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full bg-linear-to-r from-brand-500 via-brand-600 to-brand-700 px-6 py-3 text-[0.9rem] font-semibold text-white shadow-[0_10px_30px_-8px_rgba(0,103,79,0.55)] transition hover:-translate-y-0.5"
        >
          Done
        </button>
        <a
          href={`tel:${SITE.phone.replace(/\s/g, '')}`}
          className="inline-flex items-center gap-2 rounded-full border border-ink-900/15 bg-white px-6 py-3 text-[0.9rem] font-semibold text-ink-900 transition hover:border-ink-900/35"
        >
          <PhoneIcon size={16} className="text-brand-500" />
          Call us now
        </a>
      </m.div>

      <m.p className="mt-6 inline-flex items-center gap-1.5 text-[0.76rem] text-ink-400" {...rise(0.88)}>
        <MailIcon size={13} />
        Questions? Email us at {SITE.supportEmail}
      </m.p>
    </div>
  )
}

export default function PlanModal({ plan, cat, onClose }) {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [status, setStatus] = useState('editing')
  const [failure, setFailure] = useState(null)

  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const titleId = 'plan-modal-title'
  const canDismiss = status !== 'sending'

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && canDismiss) onClose() }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    const t = window.setTimeout(() => closeRef.current?.focus(), 120)
    return () => { window.removeEventListener('keydown', onKey); window.clearTimeout(t); document.body.style.overflow = prev }
  }, [canDismiss, onClose])

  const onKeyDown = useCallback((e) => {
    if (e.key !== 'Tab') return
    const focusable = dialogRef.current?.querySelectorAll(
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    if (!focusable?.length) return
    const first = focusable[0], last = focusable[focusable.length - 1]
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
  }, [])

  const shown = (key) => (submitted || touched[key] ? errors[key] : undefined)
  const update = (key) => (e) => {
    const next = { ...form, [key]: e.target.value }
    setForm(next)
    if (submitted || touched[key]) setErrors(validatePlan(next))
  }
  const blur = (key) => () => { setTouched((t) => ({ ...t, [key]: true })); setErrors(validatePlan(form)) }
  const inputCls = (key) => `${FIELD} ${shown(key) ? BAD : OK}`

  const handleSubmit = async (e) => {
    e.preventDefault()
    const found = validatePlan(form)
    setErrors(found)
    setSubmitted(true)
    if (Object.keys(found).length > 0) {
      dialogRef.current?.querySelector(`#plan-${Object.keys(found)[0]}`)?.focus()
      return
    }
    setStatus('sending')
    setFailure(null)
    try {
      await sendPlanEmail(planTemplateParams({
        name: form.name.trim(),
        mobile: `+91 ${normalizeMobile(form.mobile)}`,
        city: form.city,
        plan,
        cat,
        reference: makeReference(),
      }))
      setStatus('done')
    } catch (err) {
      setFailure(
        err instanceof EmailNotConfiguredError
          ? 'Online sign-up is not switched on yet. Call us and we will set up your plan over the phone.'
          : 'We could not submit your interest — check your connection and try again.'
      )
      setStatus('error')
    }
  }

  return (
    <div className="fixed inset-0 z-[120] overflow-y-auto">
      <m.div
        className="fixed inset-0 bg-ink-900/55 backdrop-blur-[3px]"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        onClick={canDismiss ? onClose : undefined}
      />
      <div className="relative flex min-h-full items-start justify-center p-3 sm:p-6">
        <m.div
          ref={dialogRef}
          role="dialog" aria-modal="true" aria-labelledby={titleId}
          onKeyDown={onKeyDown}
          variants={PANEL} initial="hidden" animate="show" exit="exit"
          className="relative w-full max-w-2xl overflow-hidden rounded-4xl border border-ink-900/10 bg-paper-50 shadow-[0_40px_100px_-30px_rgba(15,23,42,0.6)]"
        >
          <button
            ref={closeRef} type="button" onClick={onClose} disabled={!canDismiss}
            aria-label="Close plan sign-up"
            className="absolute top-4 right-4 z-10 rounded-full border border-ink-900/12 bg-white/85 p-2 text-ink-600 backdrop-blur-sm transition hover:bg-white hover:text-ink-900 disabled:opacity-40"
          >
            <CloseIcon size={18} />
          </button>

          <AnimatePresence mode="wait">
            {status === 'done' ? (
              <m.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <PlanConfirmed plan={plan} name={form.name} onClose={onClose} accent={cat.accent} />
              </m.div>
            ) : (
              <m.form
                key="form" onSubmit={handleSubmit}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }} noValidate
              >
                {/* Header */}
                <div
                  className="relative overflow-hidden border-b border-ink-900/8 px-6 py-6 pr-16 sm:px-8"
                  style={{ background: `linear-gradient(135deg, ${cat.accent}08 0%, transparent 60%)` }}
                >
                  <div className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full opacity-15 blur-[50px]" style={{ backgroundColor: cat.accent }} />
                  <span
                    className="relative inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[0.6rem] tracking-[0.14em] font-semibold uppercase"
                    style={{ backgroundColor: `${cat.accent}18`, color: cat.accent }}
                  >
                    <SparkleIcon size={11} />
                    Kaaryo Shine Monthly
                  </span>
                  <h2 id={titleId} className="relative mt-3 text-[1.55rem] text-ink-900 sm:text-[1.85rem]">
                    {plan.name} Plan &mdash; {plan.tagline}
                  </h2>
                  <p className="mt-1 text-[0.9rem] text-ink-600">
                    {priceOf(plan.price)}/month &middot; saves{' '}
                    <span className="font-semibold" style={{ color: cat.accent }}>{priceOf(plan.saves)}</span>{' '}
                    vs per-wash pricing
                  </p>
                </div>

                <div className="grid gap-6 px-6 py-6 sm:px-8 lg:grid-cols-[1fr_auto]">
                  {/* Form fields */}
                  <div className="space-y-4">
                    <p className="text-[0.84rem] font-bold text-ink-800">Your details</p>

                    <div>
                      <label htmlFor="plan-name" className="mb-1.5 block text-[0.84rem] font-bold text-ink-800">Full name</label>
                      <input id="plan-name" type="text" autoComplete="name" placeholder="Priya Sharma"
                        value={form.name} onChange={update('name')} onBlur={blur('name')}
                        aria-invalid={shown('name') ? true : undefined}
                        className={inputCls('name')}
                      />
                      {shown('name') && <p role="alert" className="mt-1.5 text-[0.78rem] text-danger-600">{shown('name')}</p>}
                    </div>

                    <div>
                      <label htmlFor="plan-mobile" className="mb-1.5 block text-[0.84rem] font-bold text-ink-800">WhatsApp / mobile number</label>
                      <input id="plan-mobile" type="tel" inputMode="numeric" autoComplete="tel" placeholder="98765 43210"
                        value={form.mobile} onChange={update('mobile')} onBlur={blur('mobile')}
                        aria-invalid={shown('mobile') ? true : undefined}
                        className={inputCls('mobile')}
                      />
                      {shown('mobile') ? (
                        <p role="alert" className="mt-1.5 text-[0.78rem] text-danger-600">{shown('mobile')}</p>
                      ) : (
                        <p className="mt-1.5 text-[0.78rem] text-ink-500">
                          Our team will call you on this number within 2 hours to confirm coverage and schedule your first wash.
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="plan-city" className="mb-1.5 block text-[0.84rem] font-bold text-ink-800">City</label>
                      <div className="relative">
                        <select id="plan-city" value={form.city} onChange={update('city')}
                          className={`${FIELD} ${OK} appearance-none pr-11 font-semibold`}
                        >
                          {LIVE_CITIES.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
                        </select>
                        <ChevronDownIcon size={17} className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-ink-500" />
                      </div>
                    </div>
                  </div>

                  {/* Plan perks card */}
                  <div className="h-fit rounded-3xl border p-5 lg:w-56" style={{ borderColor: `${cat.accent}30`, backgroundColor: `${cat.accent}07` }}>
                    <p className="font-display text-[1.45rem] font-extrabold leading-none tracking-[-0.03em]" style={{ color: cat.accent }}>
                      {priceOf(plan.price)}
                      <span className="ml-1 text-[0.85rem] font-semibold text-ink-500">/mo</span>
                    </p>
                    <p className="mt-1 text-[0.78rem] text-ink-600">{plan.tagline}</p>
                    <ul className="mt-4 space-y-2.5">
                      {PERKS.map((perk) => (
                        <li key={perk} className="flex items-start gap-2 text-[0.78rem] text-ink-700">
                          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: `${cat.accent}25`, color: cat.accent }}>
                            <CheckIcon size={9} strokeWidth={3} />
                          </span>
                          {perk}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {status === 'error' && (
                  <div role="alert" className="mx-6 mb-2 rounded-2xl border border-danger-500/30 bg-danger-500/8 px-5 py-4 sm:mx-8">
                    <p className="text-[0.88rem] font-semibold text-danger-600">{failure}</p>
                    <p className="mt-1 text-[0.82rem] text-ink-600">
                      Call us on{' '}
                      <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="font-semibold text-ink-900 underline underline-offset-2">{SITE.phone}</a>{' '}
                      and we&apos;ll set it up.
                    </p>
                  </div>
                )}

                {import.meta.env.DEV && !isEmailConfigured() && (
                  <p className="mx-6 mb-2 rounded-2xl border border-dashed border-warning-500/50 bg-warning-100/60 px-5 py-3 text-[0.8rem] text-ink-700 sm:mx-8">
                    <strong>Dev note:</strong> EmailJS not configured — plan sign-up email will not send.
                  </p>
                )}

                <div className="flex flex-col gap-4 border-t border-ink-900/8 bg-paper-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                  <p className="inline-flex items-center gap-2 text-[0.8rem] text-ink-600">
                    <ShieldIcon size={15} className="text-success-500" />
                    No payment now. We confirm coverage before activating.
                  </p>
                  <button
                    type="submit" disabled={status === 'sending'}
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-brand-500 via-brand-600 to-brand-700 px-7 py-3.5 text-[0.95rem] font-semibold text-white shadow-[0_10px_30px_-8px_rgba(0,103,79,0.55)] transition-all duration-300 hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-60"
                  >
                    {status === 'sending' ? (
                      <><span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-white/35 border-t-white" />Sending…</>
                    ) : (
                      <>Request this plan<ArrowRightIcon size={17} className="transition-transform duration-300 group-hover:translate-x-1" /></>
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
