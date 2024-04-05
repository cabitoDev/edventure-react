import React from 'react'
import { Constants } from '../constants'
import { CustomCard } from '../components/CustomCard/CustomCard'
import { ReactLogo } from '../components/ReactLogo/ReactLogo'

export const Home = () => {
  return (
    <>
      <div className='margin-md flex-column gap-md'>
        <div className='home-title'>
          <p className='text-3xl'>{Constants.HOME_TITLE}</p>
          <p>{Constants.HOME_SUBTITLE}</p>
        </div>

        <div className='cards-grid'>
          <CustomCard
            route="yourEvents"
            title={Constants.CARD_YOUR_EVENTS_TITLE}
            text={Constants.CARD_YOUR_EVENTS_TEXT}
          ></CustomCard>
          <CustomCard
          route="create"
            title={Constants.CARD_CREATE_EVENTS_TITLE}
            text={Constants.CARD_CREATE_EVENTS_TEXT}
          ></CustomCard>
          <CustomCard
            title={Constants.CARD_INTERACT_TITLE}
            text={Constants.CARD_INTERACT_TEXT}
          ></CustomCard>
          <CustomCard
            title={Constants.CARD_TRACKING_TITLE}
            text={Constants.CARD_TRACKING_TEXT}
          ></CustomCard>
        </div>
        <div className='flex-column center pd-top-bottom'>
          <ReactLogo />
          <span>{Constants.DEP_WITH_REACT}</span>
        </div>
      </div>
    </>
  )
}
