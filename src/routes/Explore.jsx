import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Pagination, Spinner } from '@nextui-org/react'
import { useEventSearch } from '../hooks'
import { EventCard, EventFilter, TransitionAnimation } from '../components'
import { useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import { httpGet } from '../utils'
import Constants from '../constants'

const Explore = () => {
  const stateUser = useSelector(state => state.user)
  const { data: user, status: userStatus } = useQuery('updatedUser', () =>
    httpGet(Constants.USERS_ENDPOINT_URL, stateUser.id)
  )
  const { data: allEvents, status: eventsStatus } = useQuery(
    'eventsInfo',
    async () => {
      const events = await httpGet(Constants.EVENTS_ENDPOINT_URL)

      return events
    }
  )
  const navigateTo = useNavigate()
  const {
    currentEvents,
    handlePageChange,
    handleSearchChange,
    handleFilterChange,
    handleFilterOtherChange,
    isSearching
  } = useEventSearch(allEvents, user)

  if (userStatus === 'loading' || eventsStatus === 'loading' || isSearching) {
    return <Spinner className='center pt-40 flex' />
  }

  if (allEvents && user) {
    return (
      <TransitionAnimation className='gap-md flex-column'>
        {allEvents.length > 0 ? (
          <div className='flex-column gap-4'>
            <p className='ml-10 text-2xl'>Explore events:</p>
            <div className='flex-column gap-3 mx-10'>
              <EventFilter
                handleSearchChange={handleSearchChange}
                handleFilterChange={handleFilterChange}
                handleFilterOtherChange={handleFilterOtherChange}
              />
              {currentEvents.length > 0 ? (
                currentEvents.map(event => (
                  <EventCard
                    key={event.id}
                    event={event}
                    inExplore
                    user={user}
                  />
                ))
              ) : (
                <div className='title'>
                  <p className='text-2xl'>No matches.</p>
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
            <p className='text-2xl'>There are no events created yet.</p>
            <Button color='success' onClick={() => navigateTo('/create')}>
              Create
            </Button>
          </div>
        )}
      </TransitionAnimation>
    )
  }
}
export default Explore
