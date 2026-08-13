import { useId, useState } from 'react'
import FaqItem from './FaqItem'
import { RevealGroup, RevealItem } from '../ui/Reveal'

/** One open item at a time; clicking the open item closes it. */
export default function FaqAccordion({ items, defaultOpen = 0 }) {
  const [openIndex, setOpenIndex] = useState(defaultOpen)
  const baseId = useId()

  return (
    <RevealGroup className="space-y-3" stagger={0.06}>
      {items.map((item, i) => (
        <RevealItem key={item.q}>
          <FaqItem
            id={`${baseId}-${i}`}
            index={i}
            question={item.q}
            answer={item.a}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
          />
        </RevealItem>
      ))}
    </RevealGroup>
  )
}
