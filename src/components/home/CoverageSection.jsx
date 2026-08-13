import SectionHeading from '../ui/SectionHeading'
import IndiaMap from './IndiaMap'
import Button from '../ui/Button'
import Reveal, { RevealGroup, RevealItem } from '../ui/Reveal'
import { LIVE_CITIES, SOON_CITIES } from '../../data/site'
import { ArrowRightIcon } from '../icons/UiIcons'
import { MapPinIcon } from '../icons/FeatureIcons'

export default function CoverageSection() {
  return (
    <section className="relative overflow-hidden bg-brand-700 py-20 text-paper-100 sm:py-24">
      <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute top-10 right-0 h-[26rem] w-[26rem] rounded-full bg-success-500/10 blur-[130px]" />

      <div className="container-k relative">
        <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
          <div>
            <SectionHeading
              tone="light"
              eyebrow="Where we work"
              title={
                <>
                  Three cities live.
                  <br className="hidden sm:block" /> Five more this year.
                </>
              }
              body="Kaaryo launches a city only once there are enough verified professionals in it to actually keep the 20-minute promise. Depth first, map later."
            />

            <RevealGroup className="mt-9 space-y-3">
              {LIVE_CITIES.map((city) => (
                <RevealItem
                  key={city.name}
                  className="flex items-center gap-4 rounded-2xl border border-success-400/20 bg-success-500/8 px-5 py-4"
                >
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full bg-success-400" />
                    <span className="relative h-2.5 w-2.5 rounded-full bg-success-400" />
                  </span>
                  <p className="flex-1 text-[1.05rem] font-bold text-paper-50">{city.name}</p>
                  <p className="font-mono text-[0.74rem] text-success-300">{city.workers}</p>
                  <p className="font-mono text-[0.74rem] text-ink-400 max-sm:hidden">{city.jobs}</p>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.15} className="mt-6">
              <p className="font-mono text-[0.62rem] tracking-[0.2em] text-ink-400 uppercase">
                Coming soon
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {SOON_CITIES.map((city) => (
                  <span
                    key={city.name}
                    className="inline-flex items-center gap-1.5 rounded-full border border-paper-50/12 px-3.5 py-1.5 text-[0.82rem] text-ink-300"
                  >
                    <MapPinIcon size={13} className="text-ink-500" />
                    {city.name}
                  </span>
                ))}
              </div>
              <Button to="/contact" variant="outlineLight" size="md" className="mt-7">
                Request your city
                <ArrowRightIcon size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </Button>
            </Reveal>
          </div>

          <Reveal y={34} className="relative">
            <div className="mx-auto max-w-[30rem] px-2 sm:px-0">
              <IndiaMap />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
