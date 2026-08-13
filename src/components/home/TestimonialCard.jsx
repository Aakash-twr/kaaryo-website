import Avatar from '../ui/Avatar'
import Stars from '../ui/Stars'
import { QuoteIcon } from '../icons/UiIcons'

export default function TestimonialCard({ t }) {
  return (
    <figure className="mx-2.5 flex w-[19.5rem] shrink-0 flex-col rounded-3xl border border-ink-900/8 bg-paper-50 p-6 transition-colors duration-500 hover:bg-white sm:w-[22rem]">
      <div className="flex items-center justify-between">
        <Stars size={14} />
        <QuoteIcon size={22} className="text-brand-300" />
      </div>
      <blockquote className="mt-4 flex-1 text-[0.96rem] leading-relaxed text-ink-700">
        “{t.quote}”
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-ink-900/8 pt-5">
        <Avatar name={t.name} size={40} />
        <div className="min-w-0">
          <p className="text-[0.88rem] leading-tight font-bold text-ink-900">{t.name}</p>
          <p className="truncate font-mono text-[0.6rem] tracking-[0.12em] text-ink-500 uppercase">
            {t.city} · {t.service}
          </p>
        </div>
      </figcaption>
    </figure>
  )
}
