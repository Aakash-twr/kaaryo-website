import { PLATFORM_FEE, formatDuration, priceOf } from '../data/services'

/**
 * Turns a catalogue item plus the customer's choices into the exact rows the
 * booking breakdown renders and the confirmation email repeats.
 *
 * There is one builder rather than one per surface on purpose: the number on
 * screen and the number in the customer's inbox come from the same call, so
 * they cannot drift apart. Everything here is pure — no React, no formatting
 * decisions beyond the rupee strings — so the email module can import it too.
 */

/** Hourly services are sold in whole hours, floored at the minimum booking. */
export function minimumHours(item) {
  return item.unit === 'hour' ? Math.max(1, Math.round(item.mins / 60)) : 1
}

export const CANCELLATION_FEE = 49

export function buildQuote({ item, cat, hours }) {
  const hourly = item.unit === 'hour'
  const billedHours = hourly ? Math.max(minimumHours(item), Math.round(hours || 1)) : 1

  // A "from" price is the floor of a quote, not the price. Everything
  // downstream reads `estimate` and refuses to call the total final.
  const estimate = Boolean(item.from)

  const labour = item.price * billedHours

  const lines = [
    {
      key: 'labour',
      label: item.name,
      detail: hourly
        ? `${priceOf(item.price)}/hr × ${billedHours} ${billedHours === 1 ? 'hour' : 'hours'}`
        : estimate
          ? `Starting price · ${formatDuration(item.mins)} typical`
          : `Fixed labour price · ${formatDuration(item.mins)} typical`,
      amount: labour,
    },
    {
      key: 'platform',
      label: 'Platform fee',
      detail: PLATFORM_FEE
        ? 'Flat, one per booking. Covers verification, tracking and support.'
        : 'We went looking for a reason to charge one. Came back empty-handed.',
      amount: PLATFORM_FEE,
    },
  ]

  const total = lines.reduce((sum, l) => sum + l.amount, 0)

  const notes = [
    cat.materials,
    estimate &&
      'This is a starting price. Your professional confirms the final amount after seeing the job — always before any work begins, never after.',
    hourly &&
      `Billed by the hour, with a ${minimumHours(item)}-hour minimum. Extra hours are charged at the same rate and agreed with you first.`,
    'No worker at your door within 20 minutes and the booking is free.',
    `Free to cancel until a professional accepts. After that a ${priceOf(CANCELLATION_FEE)} cancellation fee may apply.`,
  ].filter(Boolean)

  return {
    item,
    cat,
    hourly,
    estimate,
    billedHours,
    labour,
    platformFee: PLATFORM_FEE,
    lines,
    total,
    totalLabel: estimate ? `From ${priceOf(total)}` : priceOf(total),
    ctaLabel: estimate ? `Book from ${priceOf(total)}` : `Book for ${priceOf(total)}`,
    notes,
  }
}

/** Plain-text breakdown, for the confirmation email body. */
export function quoteToText(quote) {
  const rows = quote.lines.map((l) => `${l.label} — ${priceOf(l.amount)}\n    ${l.detail}`)
  return [
    ...rows,
    '',
    `${quote.estimate ? 'Estimated total' : 'Total payable'}: ${quote.totalLabel}`,
  ].join('\n')
}

const ESCAPE = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
export const escapeHtml = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ESCAPE[c])

/**
 * HTML for templates that render `{{{breakdown_html}}}` raw.
 *
 * Every rule is inline and the layout is a table: email clients strip <style>
 * blocks and Outlook renders through Word, which has no flexbox, no grid and
 * no support for most of what the site's stylesheet does. Rounded corners and
 * the like degrade to squares rather than breaking.
 */
export function quoteToHtml(quote) {
  const row = (l, last) => `<tr>
      <td style="padding:14px 0;${last ? '' : 'border-bottom:1px solid #eef2f6;'}font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif">
        <span style="display:block;font-size:15px;font-weight:700;color:#0f172a;line-height:1.3">${escapeHtml(l.label)}</span>
        <span style="display:block;margin-top:3px;font-size:13px;color:#64748b;line-height:1.5">${escapeHtml(l.detail)}</span>
      </td>
      <td width="90" style="padding:14px 0;${last ? '' : 'border-bottom:1px solid #eef2f6;'}text-align:right;vertical-align:top;white-space:nowrap;font-family:'SFMono-Regular',Menlo,Consolas,monospace;font-size:15px;font-weight:700;color:#0f172a">
        ${escapeHtml(priceOf(l.amount))}
      </td>
    </tr>`

  const rows = quote.lines
    .map((l, i) => row(l, i === quote.lines.length - 1))
    .join('')

  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse">
    ${rows}
    <tr>
      <td colspan="2" style="padding:0"><div style="height:2px;background:#0f172a;font-size:0;line-height:0">&nbsp;</div></td>
    </tr>
    <tr>
      <td style="padding:16px 0 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;font-weight:700;color:#0f172a">
        ${quote.estimate ? 'Estimated total' : 'Total payable'}
      </td>
      <td style="padding:16px 0 0;text-align:right;white-space:nowrap;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:24px;font-weight:800;letter-spacing:-0.5px;color:#00674f">
        ${escapeHtml(quote.totalLabel)}
      </td>
    </tr>
  </table>`
}

/** The "good to know" list, as ticked rows rather than a bare paragraph. */
export function notesToHtml(quote) {
  const rows = quote.notes
    .map(
      (note) => `<tr>
      <td width="26" style="padding:0 0 12px;vertical-align:top">
        <div style="width:18px;height:18px;border-radius:9px;background:#e2f9f1;text-align:center;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:11px;font-weight:700;line-height:18px;color:#0a8265">&#10003;</div>
      </td>
      <td style="padding:0 0 12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:13px;line-height:1.6;color:#475569">
        ${escapeHtml(note)}
      </td>
    </tr>`
    )
    .join('')

  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse">${rows}</table>`
}

/**
 * Booking references are generated in the browser, so they are unique enough
 * to quote over the phone but are not a guarantee of uniqueness. Once a real
 * backend issues them, this goes away.
 */
export function makeReference() {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
  const rand = Array.from(
    { length: 5 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join('')
  return `KRY-${rand}`
}
