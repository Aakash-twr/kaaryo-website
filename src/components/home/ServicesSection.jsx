import SectionHeading from '../ui/SectionHeading'
import Button from '../ui/Button'
import CategoryCard from '../services/CategoryCard'
import { RevealGroup, RevealItem } from '../ui/Reveal'
import { CATEGORIES, TOTAL_SERVICES } from '../../data/services'
import { ArrowRightIcon } from '../icons/UiIcons'

export default function ServicesSection() {
  return (
    <section className="relative overflow-hidden bg-paper-50 py-20 sm:py-24">
      <div className="pointer-events-none absolute top-1/4 -left-40 h-96 w-96 rounded-full bg-brand-200/25 blur-[120px]" />

      <div className="container-k relative">
        <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Six trades, one app"
            title={
              <>
                Everything a home breaks,
                <br className="hidden sm:block" /> someone here can fix.
              </>
            }
            body={`${TOTAL_SERVICES} services with the price shown up front and honest durations. Pick the job, see the cost, and a verified professional is on the way.`}
          />
          <Button to="/services" variant="dark" size="md" className="shrink-0">
            Browse all services
            <ArrowRightIcon size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </Button>
        </div>

        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {CATEGORIES.map((cat) => (
            <RevealItem key={cat.slug}>
              <CategoryCard cat={cat} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
