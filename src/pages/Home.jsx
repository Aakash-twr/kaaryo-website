import Hero from '../components/home/Hero'
import TickerStrip from '../components/home/TickerStrip'
import StatsBand from '../components/home/StatsBand'
import ServicesSection from '../components/home/ServicesSection'
import HowItWorksSection from '../components/home/HowItWorksSection'
import SafetySection from '../components/home/SafetySection'
import TestimonialsSection from '../components/home/TestimonialsSection'
import CoverageSection from '../components/home/CoverageSection'
import WorkerCtaSection from '../components/home/WorkerCtaSection'
import FaqSection from '../components/home/FaqSection'
import CtaBand from '../components/ui/CtaBand'
import { HOME_FAQS } from '../data/faqs'

export default function Home() {
  return (
    <>
      <Hero />
      <TickerStrip />
      <StatsBand />
      <ServicesSection />
      <HowItWorksSection />
      <SafetySection />
      <TestimonialsSection />
      <CoverageSection />
      <WorkerCtaSection />
      <FaqSection items={HOME_FAQS} />
      <CtaBand />
    </>
  )
}
