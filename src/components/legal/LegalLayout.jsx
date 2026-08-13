import PageHero from '../ui/PageHero'
import Reveal from '../ui/Reveal'
import { SITE } from '../../data/site'
import { MailIcon, LockIcon } from '../icons/FeatureIcons'

export default function LegalLayout({ eyebrow, title, intro, updated, sections }) {
  return (
    <>
      <PageHero eyebrow={eyebrow} crumb={eyebrow} title={title} body={intro}>
        <p className="mt-7 inline-flex items-center gap-2 rounded-full border border-ink-900/10 bg-white/70 px-4 py-2 font-mono text-[0.66rem] tracking-[0.14em] text-ink-600 uppercase backdrop-blur-sm">
          <LockIcon size={13} className="text-brand-500" />
          Last updated {updated}
        </p>
      </PageHero>

      <section className="bg-paper-50 pb-20 sm:pb-24">
        <div className="container-k">
          <div className="grid gap-10 lg:grid-cols-[0.32fr_0.68fr] lg:gap-14">
            {/* Contents */}
            <nav aria-label="On this page" className="lg:sticky lg:top-28 lg:self-start">
              <p className="font-mono text-[0.62rem] tracking-[0.2em] text-ink-500 uppercase">
                On this page
              </p>
              <ol className="mt-4 space-y-1.5">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="group flex gap-3 rounded-xl px-3 py-2 text-[0.88rem] text-ink-600 transition-colors hover:bg-ink-900/4 hover:text-ink-900"
                    >
                      <span className="font-mono text-[0.72rem] text-ink-400 group-hover:text-brand-500">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ol>

              <a
                href={`mailto:${SITE.supportEmail}`}
                className="mt-7 flex items-center gap-2.5 rounded-2xl border border-ink-900/8 bg-paper-100 px-4 py-3.5 text-[0.84rem] font-semibold text-ink-700 transition hover:bg-white hover:text-ink-900"
              >
                <MailIcon size={16} className="text-brand-500" />
                Ask us about this
              </a>
            </nav>

            {/* Body */}
            <div className="max-w-2xl">
              {sections.map((section, i) => (
                <Reveal key={section.id} delay={0.04}>
                  <section
                    id={section.id}
                    className={`scroll-mt-28 ${i > 0 ? 'mt-12 border-t border-ink-900/8 pt-12' : ''}`}
                  >
                    <p className="font-mono text-[0.66rem] tracking-[0.2em] text-brand-600 uppercase">
                      Section {String(i + 1).padStart(2, '0')}
                    </p>
                    <h2 className="mt-3 text-[1.6rem] text-ink-900 sm:text-[1.85rem]">
                      {section.heading}
                    </h2>

                    <div className="mt-5 space-y-4 text-[0.98rem] leading-relaxed text-ink-600">
                      {section.paragraphs?.map((p) => (
                        <p key={p.slice(0, 32)}>{p}</p>
                      ))}
                    </div>

                    {section.bullets && (
                      <ul className="mt-5 space-y-3">
                        {section.bullets.map((b) => (
                          <li
                            key={b.slice(0, 32)}
                            className="flex gap-3.5 text-[0.95rem] leading-relaxed text-ink-600"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-linear-to-br from-brand-500 to-brand-700" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                </Reveal>
              ))}

              <div className="mt-14 rounded-4xl border border-ink-900/8 bg-paper-100 p-7">
                <h3 className="text-[1.2rem] text-ink-900">Questions about this policy?</h3>
                <p className="mt-2.5 text-[0.94rem] leading-relaxed text-ink-600">
                  Write to{' '}
                  <a
                    href={`mailto:${SITE.supportEmail}`}
                    className="font-semibold text-ink-900 underline decoration-brand-400 decoration-2 underline-offset-4"
                  >
                    {SITE.supportEmail}
                  </a>{' '}
                  or post to {SITE.address.company}, {SITE.address.line1},{' '}
                  {SITE.address.line2}. We answer every genuine query about how we
                  handle your data and your bookings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
