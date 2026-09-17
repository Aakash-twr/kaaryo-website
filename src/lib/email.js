import { formatDuration, priceOf } from '../data/services'
import { SITE } from '../data/site'
import { escapeHtml, notesToHtml, quoteToHtml, quoteToText } from './quote'

/**
 * EmailJS sends from the browser, so all three ids below are public by design
 * — the "public key" is exactly that. The protection is not secrecy, it is the
 * allowlist: restrict the EmailJS service to this site's domains and leave the
 * per-key rate limit on, or anyone can post the endpoint from curl.
 *
 * Missing config is treated as a hard, visible failure rather than a silent
 * no-op. A booking form that swallows the send and still says "confirmed" is
 * worse than one that admits it could not reach the customer.
 */
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const CONTACT_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID
const PLAN_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_PLAN_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export const isEmailConfigured = () =>
  Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY)

export const isContactEmailConfigured = () =>
  Boolean(SERVICE_ID && CONTACT_TEMPLATE_ID && PUBLIC_KEY)

export const isPlanEmailConfigured = () =>
  Boolean(SERVICE_ID && PLAN_TEMPLATE_ID && PUBLIC_KEY)

export class EmailNotConfiguredError extends Error {
  constructor() {
    super('EmailJS is not configured')
    this.name = 'EmailNotConfiguredError'
  }
}

const DATE_FORMAT = {
  dateStyle: 'full',
  timeStyle: 'short',
  timeZone: 'Asia/Kolkata',
}

/**
 * The template variables the confirmation email can use. Kept flat and
 * explicitly named — EmailJS templates are edited in a dashboard by people who
 * are not reading this file, so every value has to be self-describing.
 */
export function bookingTemplateParams({ booking, quote, reference, placedAt = new Date() }) {
  return {
    to_name: booking.name,
    to_email: booking.email,
    reply_to: SITE.supportEmail,

    /*
     * The inbox list shows the From header's display name. With none, Gmail
     * falls back to the local part of the sending address — a customer sees
     * "openx.startup", not "Kaaryo". Set the template's From Name field to
     * {{from_name}} so the brand name lives here rather than in a dashboard
     * text box someone can blank out.
     */
    from_name: SITE.name,

    reference,
    placed_at: new Intl.DateTimeFormat('en-IN', DATE_FORMAT).format(placedAt),

    service: quote.item.name,
    category: quote.cat.name,
    professional: quote.cat.pro,
    duration_note: quote.hourly
      ? `${quote.billedHours} hour${quote.billedHours === 1 ? '' : 's'} booked`
      : `${formatDuration(quote.item.mins)} typical`,

    customer_name: booking.name,
    customer_mobile: booking.mobile,
    customer_email: booking.email,
    customer_address: booking.address,
    customer_city: booking.city,
    customer_landmark: booking.landmark || '—',

    total: quote.totalLabel,
    total_is_estimate: quote.estimate ? 'yes' : 'no',
    breakdown_text: quoteToText(quote),
    breakdown_html: quoteToHtml(quote),
    notes_text: quote.notes.map((n) => `• ${n}`).join('\n'),
    notes_html: notesToHtml(quote),

    /*
     * EmailJS substitutes variables and nothing else — no {{#if}}, no loops.
     * Anything that reads differently on a quoted job than a fixed-price one
     * has to be decided here and sent as finished text.
     */
    total_label: quote.estimate ? 'Estimated total' : 'Total payable',
    payment_note: quote.estimate
      ? `${priceOf(quote.total)} is the starting price. Your professional confirms the final amount on site, before starting work.`
      : 'Nothing is charged yet. You pay once the job is done — UPI, card, or cash.',
    address_html: [booking.address, booking.landmark, booking.city]
      .filter(Boolean)
      .map(escapeHtml)
      .join('<br>'),
    customer_location: booking.location
      ? `${booking.location.lat.toFixed(6)}, ${booking.location.lng.toFixed(6)}`
      : '—',
    customer_location_link: booking.location
      ? `https://www.google.com/maps?q=${booking.location.lat},${booking.location.lng}`
      : '',

    support_email: SITE.supportEmail,
    support_phone: SITE.phone,
    // Spaces break a tel: href in several clients.
    support_phone_tel: SITE.phone.replace(/\s/g, ''),
  }
}

/**
 * Loaded on demand: the SDK is ~10kB that a visitor who never opens the
 * booking modal should not pay for.
 */
export async function sendBookingEmail(params) {
  if (!isEmailConfigured()) throw new EmailNotConfiguredError()

  const emailjs = await import('@emailjs/browser')
  return emailjs.send(SERVICE_ID, TEMPLATE_ID, params, { publicKey: PUBLIC_KEY })
}

/**
 * Template variables for the contact-form acknowledgement email.
 * Only sent when the user supplies an email address (not a phone number).
 * Kept flat and self-describing for the same reason as bookingTemplateParams.
 */
export function contactTemplateParams({ name, email, city, topic, message, reference, placedAt = new Date() }) {
  return {
    to_name: name,
    to_email: email,
    reply_to: SITE.supportEmail,
    from_name: SITE.name,

    reference,
    placed_at: new Intl.DateTimeFormat('en-IN', DATE_FORMAT).format(placedAt),

    customer_name: name,
    customer_email: email,
    customer_city: city,
    topic,
    message: message || '—',

    support_email: SITE.supportEmail,
    support_phone: SITE.phone,
    support_phone_tel: SITE.phone.replace(/\s/g, ''),
  }
}

/**
 * Send the contact-form acknowledgement. Uses a separate EmailJS template so
 * the confirmation copy can be tailored to "we got your message" rather than
 * "your booking is confirmed".
 *
 * If VITE_EMAILJS_CONTACT_TEMPLATE_ID is not set, the error is surfaced to
 * the caller — same loud-failure policy as sendBookingEmail.
 */
export async function sendContactEmail(params) {
  if (!isContactEmailConfigured()) throw new EmailNotConfiguredError()

  const emailjs = await import('@emailjs/browser')
  return emailjs.send(SERVICE_ID, CONTACT_TEMPLATE_ID, params, { publicKey: PUBLIC_KEY })
}

/**
 * Template variables for a Kaaryo Shine subscription interest notification.
 * Kept flat and self-describing so the EmailJS dashboard is readable without
 * opening this file.
 */
export function planTemplateParams({ name, mobile, city, plan, cat, reference, placedAt = new Date() }) {
  return {
    to_name: name,
    reply_to: SITE.supportEmail,
    from_name: SITE.name,

    reference,
    placed_at: new Intl.DateTimeFormat('en-IN', DATE_FORMAT).format(placedAt),

    customer_name: name,
    customer_mobile: mobile,
    customer_city: city,

    plan_name: plan.name,
    plan_tagline: plan.tagline,
    plan_price: priceOf(plan.price),
    plan_saves: priceOf(plan.saves),
    vehicle_type: cat.name,

    support_email: SITE.supportEmail,
    support_phone: SITE.phone,
    support_phone_tel: SITE.phone.replace(/\s/g, ''),
  }
}

/**
 * Sends a subscription interest notification using the plan-specific template.
 * Uses VITE_EMAILJS_PLAN_TEMPLATE_ID — set this in .env.local alongside the
 * other EmailJS vars. The same loud-failure policy applies.
 */
export async function sendPlanEmail(params) {
  if (!isPlanEmailConfigured()) throw new EmailNotConfiguredError()

  const emailjs = await import('@emailjs/browser')
  return emailjs.send(SERVICE_ID, PLAN_TEMPLATE_ID, params, { publicKey: PUBLIC_KEY })
}
