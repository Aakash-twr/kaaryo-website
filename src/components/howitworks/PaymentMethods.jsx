import SectionHeading from '../ui/SectionHeading'
import Reveal, { RevealGroup, RevealItem } from '../ui/Reveal'
import { WalletIcon, RupeeIcon, LockIcon, BuildingIcon } from '../icons/FeatureIcons'
import { PLATFORM_FEE, priceOf } from '../../data/services'
import { PAYMENT_METHODS } from '../../data/site'

/** Icons live here rather than in the data file, which stays import-free. */
const PAYMENT_ICONS = {
  upi: WalletIcon,
  card: LockIcon,
  netbanking: BuildingIcon,
  cash: RupeeIcon,
}

export default function PaymentMethods() {
  return (
    <section className="bg-paper-50 py-20 sm:py-24">
      <div className="container-k">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
          <SectionHeading
            eyebrow="Paying for it"
            title={
              <>
                Pay after the work,
                <br className="hidden sm:block" /> however you like.
              </>
            }
            body={`Nothing is charged when you book. You settle up once the job is done and you are happy with it. The only addition to the service price is a ${priceOf(PLATFORM_FEE)} platform fee per booking.`}
          />

          <div>
            <RevealGroup className="grid grid-cols-2 gap-4">
              {PAYMENT_METHODS.map((method) => {
                const Icon = PAYMENT_ICONS[method.slug]
                return (
                  <RevealItem
                    key={method.slug}
                    className="group rounded-3xl border border-ink-900/8 bg-paper-100 p-5 transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-[0_24px_50px_-36px_rgba(15,23,42,0.5)] sm:p-6"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-700 p-3 text-brand-300 transition-transform duration-500 group-hover:-rotate-6">
                      <Icon size={22} />
                    </span>
                    <p className="mt-4 text-[1.02rem] font-bold text-ink-900">{method.name}</p>
                    <p className="mt-1 text-[0.84rem] leading-snug text-ink-500">{method.note}</p>
                  </RevealItem>
                )
              })}
            </RevealGroup>

            <Reveal delay={0.12} className="mt-4 rounded-3xl border border-dashed border-ink-900/14 bg-paper-100 px-6 py-5">
              <p className="text-[0.9rem] leading-relaxed text-ink-600">
                <span className="font-bold text-ink-900">Not satisfied?</span> Tell
                support within 24 hours and we arrange a redo or a full refund — the
                worker is paid by us either way, so nobody has a reason to argue with
                you at your door.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
