import React from 'react'
import Integrations from '@/components/Integrations'
import HeroSection from '@/components/HeroSection'
import StepSection from '@/components/StepsSection'
import Team from '@/components/Team'
import Testemonial from '@/components/Testemonials'
import PredictionsTable from '@/components/PredictionTable'

const index = () => {
  return (
    <>
    <HeroSection/>
    <StepSection/>
    <PredictionsTable/>
    {/* <Integrations/> */}
    <Testemonial/>
    <Team/>
    </>
  )
}

export default index