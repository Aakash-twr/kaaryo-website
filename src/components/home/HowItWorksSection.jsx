import SectionHeading from '../ui/SectionHeading'
import StepsFlow from './StepsFlow'
import Button from '../ui/Button'
import { ArrowRightIcon } from '../icons/UiIcons'

export default function HowItWorksSection() {
  return (
    <section className="relative bg-paper-100 py-20 sm:py-24">
      <div className="container-k">
        <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="How it works"
            title={
              <>
                Four taps between a broken fan
                <br className="hidden sm:block" /> and a fixed one.
              </>
            }
            body="No calling around, no haggling, no waiting for a callback that never comes. Kaaryo turns a home problem into a scheduled, priced, tracked job in under a minute."
          />
          <Button to="/how-it-works" variant="outline" size="md" className="shrink-0">
            Full walkthrough
            <ArrowRightIcon size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </Button>
        </div>

        <StepsFlow />
      </div>
    </section>
  )
}
