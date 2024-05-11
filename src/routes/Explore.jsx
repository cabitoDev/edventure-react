import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Pagination, Spinner } from '@nextui-org/react'
import { useEventSearch } from '../hooks'
import { EventCard, EventFilter, TransitionAnimation } from '../components'
import { useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import { httpGet } from '../utils'
import Constants from '../constants'
import { useTranslation } from 'react-i18next'

const Explore = () => {
  const stateUser = useSelector(state => state.user)
  const token = useSelector(state => state.token)
  const { data: user, status: userStatus } = useQuery('updatedUser', () =>
    httpGet(Constants.USERS_ENDPOINT_URL, token, stateUser.id)
  )
  const { data: allEvents, status: eventsStatus } = useQuery(
    'eventsInfo',
    async () => {
      const events = await httpGet(Constants.EVENTS_ENDPOINT_URL, token)

      return events
    }
  )
  const navigateTo = useNavigate()
  const { t } = useTranslation('edventure')
  const {
    currentEvents,
    handlePageChange,
    handleSearchChange,
    handleFilterChange,
    handleFilterOtherChange,
    isSearching
  } = useEventSearch(allEvents, user, true)

  if (userStatus === 'loading' || eventsStatus === 'loading' || isSearching) {
    return <Spinner className='center pt-40 flex' />
  }

  if (allEvents && user) {
    return (
      <TransitionAnimation className='gap-md flex-column'>
        {allEvents.length > 0 ? (
          <div className='flex-column gap-4'>
            <p className='ml-10 text-2xl'>{t('EXPLORE_EVENTS')}</p>
            <div className='flex-column gap-3 mx-10'>
              <EventFilter
                handleSearchChange={handleSearchChange}
                handleFilterChange={handleFilterChange}
                handleFilterOtherChange={handleFilterOtherChange}
              />
              {currentEvents.length > 0 ? (
                currentEvents.map(event => (
                  <EventCard key={event.id} event={event} userId={user.id} />
                ))
              ) : (
                <div className='title'>
                  <p className='text-2xl'>{t('NO_MATCHES')}</p>
                </div>
              )}
            </div>
            <Pagination
              onTouchEnd={e => {
                e.preventDefault()
              }}
              showControls
              className='center'
              variant='light'
              total={Math.ceil(allEvents.length / 5)}
              color='primary'
              onChange={handlePageChange}
            />
          </div>
        ) : (
          <div className='title'>
            <p className='text-2xl'>{t('NO_EVENTS_CREATED')}</p>
            <Button color='success' onClick={() => navigateTo('/create')}>
              {t('CREATE')}
            </Button>
          </div>
        )}
      </TransitionAnimation>
    )
  }
}
export default Explore
