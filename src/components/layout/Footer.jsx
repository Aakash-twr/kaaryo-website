import { Link } from 'react-router-dom'
import Logo from '../icons/Logo'
import { CATEGORIES } from '../../data/services'
import { SITE, LIVE_CITIES, SOON_CITIES } from '../../data/site'
import { PhoneIcon, MailIcon, MapPinIcon } from '../icons/FeatureIcons'
import { ArrowUpRightIcon } from '../icons/UiIcons'

const COMPANY = [
  { label: 'About Kaaryo', to: '/about' },
  { label: 'How it works', to: '/how-it-works' },
  { label: 'For workers', to: '/for-workers' },
  { label: 'Contact', to: '/contact' },
]

const LEGAL = [
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms of Service', to: '/terms-of-service' },
]

function Column({ title, children }) {
  return (
    <div>
      <h3 className="font-mono text-[0.66rem] font-medium tracking-[0.22em] text-ink-400 uppercase">
        {title}
      </h3>
      <ul className="mt-5 space-y-3 text-[0.9rem]">{children}</ul>
    </div>
  )
}

function FooterLink({ to, children }) {
  return (
    <li>
      <Link
        to={to}
        className="group inline-flex items-center gap-1.5 text-ink-300 transition-colors hover:text-paper-50"
      >
        {children}
        <ArrowUpRightIcon
          size={13}
          className="translate-y-px opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-60"
        />
      </Link>
    </li>
  )
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-800 pt-16 text-paper-100 sm:pt-20">
      <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-70" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[46rem] -translate-x-1/2 rounded-full bg-brand-500/12 blur-[110px]" />

      <div className="container-k relative">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr_1fr_1.15fr]">
          <div>
            <Logo size={40} tone="light" />
            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-ink-300">
              {SITE.secondaryTagline} Kaaryo is building the infrastructure that
              gets India&apos;s home work done — reliably, in minutes.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {LIVE_CITIES.map((c) => (
                <span
                  key={c.name}
                  className="inline-flex items-center gap-1.5 rounded-full border border-success-500/25 bg-success-500/10 px-3 py-1 text-[0.76rem] font-semibold text-success-300"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-success-400" />
                  {c.name}
                </span>
              ))}
              {SOON_CITIES.map((c) => (
                <span
                  key={c.name}
                  className="rounded-full border border-paper-50/12 px-3 py-1 text-[0.76rem] text-ink-400"
                >
                  {c.name}
                </span>
              ))}
            </div>
          </div>

          <Column title="Services">
            {CATEGORIES.map((cat) => (
              <FooterLink key={cat.slug} to="/services">
                {cat.name}
              </FooterLink>
            ))}
          </Column>

          <Column title="Company">
            {COMPANY.map((l) => (
              <FooterLink key={l.to} to={l.to}>
                {l.label}
              </FooterLink>
            ))}
            {LEGAL.map((l) => (
              <FooterLink key={l.to} to={l.to}>
                {l.label}
              </FooterLink>
            ))}
          </Column>

          <Column title="Get in touch">
            <li>
              <a
                href={`tel:${SITE.phone.replace(/\s/g, '')}`}
                className="flex items-start gap-3 text-ink-300 transition-colors hover:text-paper-50"
              >
                <PhoneIcon size={17} className="mt-0.5 shrink-0 text-brand-400" />
                <span className="font-mono text-[0.86rem]">{SITE.phone}</span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${SITE.supportEmail}`}
                className="flex items-start gap-3 text-ink-300 transition-colors hover:text-paper-50"
              >
                <MailIcon size={17} className="mt-0.5 shrink-0 text-brand-400" />
                <span>
                  {SITE.supportEmail}
                  <span className="block text-[0.78rem] text-ink-500">Customer support</span>
                </span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${SITE.businessEmail}`}
                className="flex items-start gap-3 text-ink-300 transition-colors hover:text-paper-50"
              >
                <MailIcon size={17} className="mt-0.5 shrink-0 text-brand-400" />
                <span>
                  {SITE.businessEmail}
                  <span className="block text-[0.78rem] text-ink-500">Partnerships</span>
                </span>
              </a>
            </li>
            <li className="flex items-start gap-3 text-ink-300">
              <MapPinIcon size={17} className="mt-0.5 shrink-0 text-brand-400" />
              <span className="leading-relaxed">
                {SITE.address.company}
                <br />
                {SITE.address.line1}, {SITE.address.line2}
              </span>
            </li>
          </Column>
        </div>

        {/* Oversized wordmark, cropped — a signature sign-off */}
        <div
          aria-hidden="true"
          className="mt-14 -mb-4 select-none overflow-hidden sm:mt-16"
        >
          <p className="font-display text-[19vw] leading-[0.78] font-extrabold tracking-[-0.055em] text-transparent [-webkit-text-stroke:1px_rgba(248,250,252,0.13)]">
            Kaaryo
          </p>
        </div>

        <div className="flex flex-col gap-3 border-t border-paper-50/10 py-7 text-[0.8rem] text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Kaaryo Technologies Pvt Ltd. All rights reserved.</p>
          <p className="font-mono tracking-[0.12em] uppercase">
            Made in India · for India
          </p>
        </div>
      </div>
    </footer>
  )
}
