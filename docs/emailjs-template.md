# Booking confirmation email — EmailJS setup

The booking modal sends one email, to the customer, through
[EmailJS](https://dashboard.emailjs.com). Everything here is dashboard
configuration — no code changes needed.

The template itself lives in
[`emailjs-booking-template.html`](emailjs-booking-template.html).

## 1. Get the three ids

1. **Email Services → Add New Service.** Connect the mailbox confirmations
   should come *from* (Gmail, Outlook, or SMTP). Copy the **Service ID**.
2. **Email Templates → Create New Template.** Copy the **Template ID**.
3. **Account → General.** Copy the **Public Key**.
4. Put all three in `.env.local` (see `.env.example`) and restart the dev
   server — Vite only reads env files at startup.

## 2. Template settings

| Field | Value |
| --- | --- |
| To Email | `{{to_email}}` |
| To Name | `{{to_name}}` |
| From Name | `{{from_name}}` — **required, see troubleshooting** |
| Reply To | `{{reply_to}}` |
| Subject | `Booking confirmed — {{service}} · {{reference}}` |
| **Bcc** | your ops inbox — **see below** |

> **Set the Bcc.** Nothing else in the stack records the booking: there is no
> backend and no database. If Bcc is empty, a customer gets a confirmation and
> nobody at Kaaryo ever learns a job was booked.

## 3. Paste the template

Open the template editor, switch it to **Code / HTML**, and paste the entire
contents of [`emailjs-booking-template.html`](emailjs-booking-template.html).

Two things to preserve if you edit it:

- **Triple braces on `breakdown_html`, `notes_html` and `address_html`.**
  Double braces escape the markup and print raw HTML tags at the customer.
- **The tables.** Outlook renders through Word — no flexbox, no grid. Styles
  are inline because Gmail strips `<head>`. It looks over-built because email
  clients are.

The header logo loads from `https://kaaryo.vercel.app/icon-192.png`. If the
site moves to its own domain, update that URL — a broken logo is the first
thing anyone notices.

## 4. Preview it without sending

```bash
npm run preview:email
```

Renders the template with real catalogue data into `dist/`, one file per price
shape — fixed, hourly, and a "from" job where the total is an estimate and the
wording changes. Open them in a browser. The script fails if the template
references a variable the app does not send.

Checking in a browser catches layout and copy; it does not tell you how Outlook
2016 will render it. Send yourself a real one before launch.

## 5. Troubleshooting the sender name

**Inbox shows `openx.startup` instead of Kaaryo.**

That string is the local part of the sending Gmail address. Gmail prints it
when the `From` header carries no display name at all — so the template's
**From Name** field is empty. Set it to `{{from_name}}` (the app sends
`Kaaryo`, from `SITE.name`) or type `Kaaryo` literally, and save.

If it still shows the Gmail identity after that, Google is overwriting the
display name on the way out. Two ways round it, in order of effort:

1. **Gmail → Settings → Accounts and Import → "Send mail as" → edit info**,
   and set the name on `openx.startup@gmail.com` to `Kaaryo`.
2. **Google Account → Personal info → Name** — changes it everywhere that
   account sends from, personal mail included. Blunt, but it works.

**The better fix is to stop sending from a personal Gmail.** Even with the
name corrected, the address underneath stays `openx.startup@gmail.com`:
visible the moment anyone taps the sender, unsignable with SPF/DKIM for
`kaaryo.in`, and a reliable way to land booking confirmations in Promotions or
spam. When the domain is live, swap the EmailJS service for an SMTP provider
(Zoho Mail, Brevo, Resend, Postmark all have free tiers), verify `kaaryo.in`,
and send from `bookings@kaaryo.in`. Nothing in this repo changes — it is a
service swap in the EmailJS dashboard, and the Service ID in `.env.local` /
Vercel is the only value to update.

## 6. Available variables

| Variable | Example |
| --- | --- |
| `from_name` | `Kaaryo` — put this in the template's **From Name** field |
| `to_name`, `to_email` | `Priya Sharma`, `priya@example.com` |
| `reference` | `KRY-Q4M7X` |
| `placed_at` | `Friday, 11 September 2026 at 2:38 pm` (IST) |
| `service`, `category` | `Wall Painting`, `Painting` |
| `professional` | `painter` — the person, for use in a sentence |
| `duration_note` | `30 min typical` / `3 hours booked` |
| `customer_name`, `customer_mobile`, `customer_email` | |
| `customer_address`, `customer_city`, `customer_landmark` | raw fields |
| `address_html` | the three above, joined with `<br>`, landmark dropped if blank — **`{{{ }}}`** |
| `total` | `₹109`, or `From ₹2,019` on a quoted job |
| `total_label` | `Total payable` / `Estimated total` |
| `total_is_estimate` | `yes` / `no` |
| `payment_note` | the sentence that changes on a quoted job |
| `breakdown_html` | itemised table — **`{{{ }}}`** |
| `breakdown_text` | same breakdown as plain text |
| `notes_html` | ticked "good to know" list — **`{{{ }}}`** |
| `notes_text` | same notes as plain text |
| `support_email`, `support_phone` | from `src/data/site.js` |
| `support_phone_tel` | the number with spaces stripped, for a `tel:` href |

EmailJS substitutes variables and nothing else — no `{{#if}}`, no loops. That
is why anything that reads differently on a quoted job (`total_label`,
`payment_note`) is decided in `src/lib/email.js` and sent as finished text
rather than branched in the template.

The money in those variables comes from `src/lib/quote.js`, which also renders
the on-screen breakdown — so the email and the screen cannot quote different
totals.
