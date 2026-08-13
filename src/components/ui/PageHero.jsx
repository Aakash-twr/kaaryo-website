import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import { Eyebrow } from './SectionHeading'
import { ArrowRightIcon } from '../icons/UiIcons'

/** Shared top-of-page block. Light background, so the nav stays legible. */
export default function PageHero({ eyebrow, title, body, children, crumb }) {
  return (
    <section className="relative isolate overflow-hidden pt-10 pb-14 sm:pt-14 sm:pb-18">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-linear-to-b from-brand-50 via-paper-50 to-paper-50" />
        <div className="bg-grid absolute inset-0 mask-fade-y opacity-70" />
        <div className="absolute -top-32 right-[10%] h-[26rem] w-[26rem] rounded-full bg-brand-300/30 blur-[110px]" />
        <div className="absolute -top-20 -left-24 h-[20rem] w-[20rem] rounded-full bg-brand-400/12 blur-[110px]" />
      </div>

      <div className="container-k relative">
        <Reveal>
          <nav aria-label="Breadcrumb" className="mb-7">
            <ol className="flex items-center gap-2 font-mono text-[0.66rem] tracking-[0.16em] text-ink-500 uppercase">
              <li>
                <Link to="/" className="transition-colors hover:text-ink-900">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ArrowRightIcon size={12} className="text-ink-300" />
              </li>
              <li className="text-ink-800">{crumb || eyebrow}</li>
            </ol>
          </nav>
        </Reveal>

        <div className="max-w-3xl">
          {eyebrow && (
            <Reveal delay={0.04}>
              <Eyebrow>{eyebrow}</Eyebrow>
            </Reveal>
          )}
          <Reveal delay={0.1}>
            <h1 className="mt-6 text-[2.6rem] leading-[0.98] sm:text-[3.6rem] lg:text-[4.2rem]">
              {title}
            </h1>
          </Reveal>
          {body && (
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-ink-600 sm:text-[1.12rem]">
                {body}
              </p>
            </Reveal>
          )}
          {children && <Reveal delay={0.22}>{children}</Reveal>}
        </div>
      </div>
    </section>
  )
}
