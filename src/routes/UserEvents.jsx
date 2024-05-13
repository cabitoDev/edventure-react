import React, { useState } from 'react'
import '../index.css'
import { Button, Pagination, Spinner } from '@nextui-org/react'
import { useNavigate } from 'react-router'
import { useEventSearch, useFetch } from '../hooks'
import { EventFilter, EventCard, TransitionAnimation } from '../components'
import { useQuery } from 'react-query'
import Constants from '../constants'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const UserEvents = () => {
  const stateUser = useSelector(state => state.user)
  const { httpGet } = useFetch()
  const [userEvents, setUserEvents] = useState()

  const { data: user, status: userLoading } = useQuery(
    'updatedUser',
    async () => {
      const updatedUser = await httpGet(
        Constants.USERS_ENDPOINT_URL,
        stateUser.id
      )
      setUserEvents(updatedUser.userEvents.concat(updatedUser.followingEvents))
      return updatedUser
    }
  )

  const {
    currentEvents,
    handlePageChange,
    handleSearchChange,
    handleFilterChange,
    handleFilterOtherChange,
    isSearching
  } = useEventSearch(userEvents, user)

  const navigateTo = useNavigate()
  const { t } = useTranslation('edventure')

  if (!userEvents || isSearching || userLoading === 'loading') {
    return <Spinner className='center pt-40 flex' />
  }
  if (user && userEvents) {
    return (
      <TransitionAnimation className='gap-md flex-column'>
        {userEvents && userEvents.length > 0 ? (
          <>
            <p data-testid='YOUR_EVENTS' className='text-2xl pl-10'>
              {t('YOUR_EVENTS')}
            </p>
            <div className='flex-column gap-3 mx-10'>
              <EventFilter
                handleSearchChange={handleSearchChange}
                handleFilterChange={handleFilterChange}
                handleFilterOtherChange={handleFilterOtherChange}
                ownerOption
              />
              {currentEvents.length > 0 ? (
                currentEvents.map(event => {
                  return (
                    <EventCard
                      key={event.id}
                      event={event}
                      userId={user.id}
                    ></EventCard>
                  )
                })
              ) : (
                <div className='title'>
                  <p className='text-2xl'>{t('NO_MATCHES')}</p>
                </div>
              )}
            </div>
            <Pagination
              showControls
              className='center'
              variant='light'
              total={Math.ceil(userEvents.length / 5)}
              color='primary'
              onChange={handlePageChange}
            />
          </>
        ) : (
          <div className='title'>
            <p className='text-2xl'>{t('NO_FUTURE_EVENTS')}</p>
            <div className='flex gap-3'>
              <Button color='primary' onClick={() => navigateTo('/explore')}>
                {t('EXPLORE')}
              </Button>
              <Button color='success' onClick={() => navigateTo('/create')}>
                {t('CREATE')}
              </Button>
            </div>
          </div>
        )}
      </TransitionAnimation>
    )
  }
}
export default UserEvents
