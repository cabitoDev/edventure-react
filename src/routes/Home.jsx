import React from 'react'
import Constants from '../constants'
import { HomeCard, ReactLogo, TransitionAnimation } from '../components'
import { useTranslation } from 'react-i18next'
const Home = () => {
  const { t } = useTranslation('edventure')
  return (
    <TransitionAnimation className='gap-md flex-column'>
      <div className='margin-md flex-column gap-md mx-3'>
        <div className='title'>
          <p className='text-3xl'>{t('HOME_TITLE')}</p>
          <p>{t('HOME_SUBTITLE')}</p>
          <div className='flex flex-responsive-2 gap-3'>
            <HomeCard
              image={Constants.HOME_CREATE_IMAGE}
              headerTitle={t('CREATE_EVENTS_TITLE')}
              headerSubtitle={t('CREATE_EVENTS_SUBTITLE')}
              description={t('CREATE_EVENTS_TEXT')}
            />
            <HomeCard
              image={Constants.HOME_EXPLORE_IMAGE}
              headerTitle={t('EXPLORE_EVENTS_TITLE')}
              headerSubtitle={t('EXPLORE_EVENTS_SUBTITLE')}
              description={t('EXPLORE_EVENTS_TEXT')}
            />
            <HomeCard
              image={Constants.HOME_CONNECT_IMAGE}
              headerTitle={t('CONNECT_TITLE')}
              headerSubtitle={t('CONNECT_SUBTITLE')}
              description={t('CONNECT_TEXT')}
            />
          </div>
        </div>
        <div className='flex-column center pd-top-bottom'>
          <ReactLogo />
          <span>{t('DEP_WITH_REACT')}</span>
        </div>
      </div>
    </TransitionAnimation>
  )
}
export default Home
