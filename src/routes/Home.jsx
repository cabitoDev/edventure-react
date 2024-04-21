import React from 'react'
import Constants from '../constants'
import { HomeCard, ReactLogo, TransitionAnimation } from '../components'
const Home = () => {
  return (
    <TransitionAnimation className='gap-md flex-column'>
      <div className='margin-md flex-column gap-md mx-3'>
        <div className='title'>
          <p className='text-3xl'>{Constants.HOME_TITLE}</p>
          <p>{Constants.HOME_SUBTITLE}</p>
        </div>

        <div className='flex flex-responsive-2 gap-3'>
          <HomeCard
            image={Constants.HOME_CREATE_IMAGE}
            headerTitle={Constants.CARD_CREATE_EVENTS_TITLE}
            headerSubtitle={Constants.CARD_CREATE_EVENTS_SUBTITLE}
            description={Constants.CARD_CREATE_EVENTS_TEXT}
          />
          <HomeCard
            image={Constants.HOME_EXPLORE_IMAGE}
            headerTitle={Constants.CARD_EXPLORE_EVENTS_TITLE}
            headerSubtitle={Constants.CARD_EXPLORE_EVENTS_SUBTITLE}
            description={Constants.CARD_EXPLORE_EVENTS_TEXT}
          />
          <HomeCard
            image={Constants.HOME_CONNECT_IMAGE}
            headerTitle={Constants.CARD_CONNECT_TITLE}
            headerSubtitle={Constants.CARD_CONNECT_SUBTITLE}
            description={Constants.CARD_CONNECT_TEXT}
          />
        </div>
        <div className='flex-column center pd-top-bottom'>
          <ReactLogo />
          <span>{Constants.DEP_WITH_REACT}</span>
        </div>
      </div>
    </TransitionAnimation>
  )
}
export default Home
