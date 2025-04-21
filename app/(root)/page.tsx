import FeaturesGrid  from '@/components/FeaturesGrid'
import FeatureTabs  from '@/components/FeatureTabs'
import LandingFooter  from '@/components/LandingFooter'
import LandingHero  from '@/components/LandingHero'
import TeamIllustration  from '@/components/TeamIllustration'
import Testimonials  from '@/components/Testimonials'
import React from 'react'



const page = async () => {

 
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <LandingHero />
      <main className="flex flex-col flex-1">
        <FeatureTabs />
        <FeaturesGrid />
        <Testimonials />
        <TeamIllustration />
      </main>
      <LandingFooter />
    </div>
  )
}

export default page