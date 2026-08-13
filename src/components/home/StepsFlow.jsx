import { RevealGroup, RevealItem } from '../ui/Reveal'
import { HOW_IT_WORKS } from '../../data/site'
import { SearchIcon } from '../icons/UiIcons'
import { BoltIcon, RouteIcon, WalletIcon } from '../icons/FeatureIcons'

const ICONS = [SearchIcon, BoltIcon, RouteIcon, WalletIcon]

export default function StepsFlow() {
  return (
    <RevealGroup className="relative grid gap-4 lg:grid-cols-4 lg:gap-5">
      {/* connector — sits behind the cards on wide screens */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[3.6rem] right-[8%] left-[8%] hidden border-t-2 border-dashed border-ink-900/12 lg:block"
      />

      {HOW_IT_WORKS.map((step, i) => {
        const StepIcon = ICONS[i]
        return (
          <RevealItem
            key={step.title}
            className="group relative flex flex-col rounded-3xl border border-ink-900/8 bg-paper-50 p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-ink-900/14 hover:bg-white hover:shadow-[0_28px_60px_-38px_rgba(15,23,42,0.55)] sm:p-7"
          >
            <div className="flex items-center justify-between">
              <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-700 text-brand-300 transition-transform duration-500 group-hover:-rotate-6">
                <StepIcon size={22} />
              </span>
              <span className="font-mono text-[2.6rem] leading-none font-bold text-ink-900/8 transition-colors duration-500 group-hover:text-brand-500/25">
                0{i + 1}
              </span>
            </div>

            <h3 className="mt-6 text-[1.28rem] text-ink-900">{step.title}</h3>
            <p className="mt-2.5 flex-1 text-[0.93rem] leading-relaxed text-ink-600">
              {step.body}
            </p>
            <p className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-500/10 px-3 py-1.5 font-mono text-[0.62rem] font-semibold tracking-[0.1em] text-brand-600 uppercase">
              {step.meta}
            </p>
          </RevealItem>
        )
      })}
    </RevealGroup>
  )
}
