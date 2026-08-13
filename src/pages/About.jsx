import PageHero from '../components/ui/PageHero'
import StoryBlock from '../components/about/StoryBlock'
import Values from '../components/about/Values'
import Timeline from '../components/about/Timeline'
import StatsBand from '../components/home/StatsBand'
import CoverageSection from '../components/home/CoverageSection'
import CtaBand from '../components/ui/CtaBand'

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Kaaryo"
        crumb="About"
        title={
          <>
            Kaaryo means work.
            <br className="hidden sm:block" /> We make sure it{' '}
            <span className="text-gradient-brand">gets done</span>.
          </>
        }
        body="We are building the infrastructure that connects India's skilled workers to the homes that need them — verified, tracked, fairly paid, and there in twenty minutes."
      />

      <StatsBand />
      <StoryBlock />
      <Values />
      <Timeline />
      <CoverageSection />

      <CtaBand
        eyebrow="Join us"
        title={
          <>
            Two ways to be part
            <br className="hidden sm:block" /> of what we are building.
          </>
        }
        body="Book a service and hold us to the promise, or bring your skill to the platform and start earning on your own terms."
      />
    </>
  )
}
