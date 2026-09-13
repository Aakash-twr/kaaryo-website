import SectionHeading from '../ui/SectionHeading'
import { RevealGroup, RevealItem } from '../ui/Reveal'

const BEATS = [
  {
    t: '00:00',
    title: 'You confirm the booking',
    body: 'Service picked, address confirmed, price accepted. Nothing is charged yet.',
  },
  {
    t: '00:12',
    title: 'Nearby pros are pinged',
    body: 'Every verified professional inside your radius who is online and free gets the job on screen.',
  },
  {
    t: '00:48',
    title: 'A pro accepts — median time',
    body: 'The job locks to one worker. Their full profile, rating and job history open on your screen.',
  },
  {
    t: '01:30',
    title: 'Live tracking begins',
    body: 'You watch them leave and approach on the map. Call or message from inside the app any time.',
  },
  {
    t: '20:00',
    title: 'The deadline',
    body: 'Not there yet? The booking becomes free and stays active until they arrive. You do not have to ask.',
    critical: true,
  },
  {
    t: '—',
    title: 'Job done, then paid',
    body: 'Pay by UPI, card, net banking or cash once you are satisfied. Rate the work and save your favourite pro.',
    done: true,
  },
]

export default function BookingTimeline() {
  return (
    <section className="bg-paper-100 py-20 sm:py-24">
      <div className="container-k">
        <SectionHeading
          eyebrow="Minute by minute"
          title={
            <>
              The anatomy of a
              <br className="hidden sm:block" /> twenty-minute booking.
            </>
          }
          body="Here is exactly what happens after you tap confirm — and precisely what we owe you if the clock runs out."
          className="mb-14"
        />

        <RevealGroup className="relative" stagger={0.08}>
          <div
            aria-hidden="true"
            className="absolute top-3 bottom-8 left-[4.35rem] w-px bg-linear-to-b from-brand-400 via-brand-400/40 to-success-400 max-sm:left-[3.1rem]"
          />

          {BEATS.map((beat) => (
            <RevealItem key={beat.t + beat.title} className="relative flex gap-5 pb-7 last:pb-0 sm:gap-7">
              <p
                className={`w-9 shrink-0 pt-0.5 text-right font-mono text-[0.78rem] font-bold tabular-nums sm:w-12 sm:text-[0.9rem] ${
                  beat.critical ? 'text-warning-600' : beat.done ? 'text-success-600' : 'text-ink-500'
                }`}
              >
                {beat.t}
              </p>

              <span
                className={`relative z-10 mt-1 h-3.5 w-3.5 shrink-0 rounded-full ring-4 ring-paper-100 ${
                  beat.critical
                    ? 'bg-warning-400'
                    : beat.done
                      ? 'bg-success-500'
                      : 'bg-brand-400'
                }`}
              />

              <div
                className={`-mt-1.5 flex-1 rounded-3xl border p-5 transition-colors duration-400 sm:p-6 ${
                  beat.critical
                    ? 'border-warning-400/35 bg-warning-400/8'
                    : beat.done
                      ? 'border-success-500/25 bg-success-500/8'
                      : 'border-ink-900/8 bg-paper-50'
                }`}
              >
                <h3 className="text-[1.14rem] text-ink-900">{beat.title}</h3>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-600">{beat.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
