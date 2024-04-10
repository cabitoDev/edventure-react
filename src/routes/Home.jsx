import React from 'react'
import { Constants } from '../constants'
import { HomeCard } from '../components/CustomCard/HomeCard'
import { ReactLogo } from '../components/ReactLogo/ReactLogo'

export const Home = () => {
  return (
    <>
      <div className='margin-md flex-column gap-md mx-3'>
        <div className='home-title'>
          <p className='text-3xl'>{Constants.HOME_TITLE}</p>
          <p>{Constants.HOME_SUBTITLE}</p>
        </div>

        <div className='flex-column gap-4 sm:grid sm:grid-cols-2'>
          <HomeCard
            route='my-events'
            title={Constants.CARD_YOUR_EVENTS_TITLE}
            text={Constants.CARD_YOUR_EVENTS_TEXT}
          ></HomeCard>
          <HomeCard
            route='create'
            title={Constants.CARD_CREATE_EVENTS_TITLE}
            text={Constants.CARD_CREATE_EVENTS_TEXT}
          ></HomeCard>
          <HomeCard
            title={Constants.CARD_INTERACT_TITLE}
            text={Constants.CARD_INTERACT_TEXT}
          ></HomeCard>
          <HomeCard
            title={Constants.CARD_TRACKING_TITLE}
            text={Constants.CARD_TRACKING_TEXT}
          ></HomeCard>
        </div>
        <div className='flex-column center pd-top-bottom'>
          <ReactLogo />
          <span>{Constants.DEP_WITH_REACT}</span>
        </div>
      </div>
    </>
  )
}
