import React, { useState } from 'react'
import '../index.css'
import { Button, Pagination, Spinner } from '@nextui-org/react'
import { useNavigate } from 'react-router'
import { useEventSearch } from '../hooks'
import { EventFilter, EventCard, TransitionAnimation } from '../components'
import { useQuery } from 'react-query'
import { httpGet } from '../utils'
import Constants from '../constants'
import { useSelector } from 'react-redux'

const UserEvents = () => {
  const stateUser = useSelector(state => state.user)
  const [userEvents, setUserEvents] = useState()

  const { data: user, status } = useQuery('updatedUser', async () => {
    const updatedUser = await httpGet(
      Constants.USERS_ENDPOINT_URL,
      stateUser.id
    )
    setUserEvents(updatedUser.userEvents.concat(updatedUser.followingEvents))
    return updatedUser
  })

  const {
    currentEvents,
    handlePageChange,
    handleSearchChange,
    handleFilterChange,
    handleFilterOtherChange,
    isSearching
  } = useEventSearch(userEvents, user)

  const navigateTo = useNavigate()

  if (!userEvents || isSearching || status === 'loading') {
    return <Spinner className='center pt-40 flex' />
  }
  return (
    <TransitionAnimation className='gap-md flex-column'>
      {userEvents && userEvents.length > 0 ? (
        <>
          <p className='text-2xl pl-10'>Your events:</p>
          <div className='flex-column gap-3 mx-10'>
            <EventFilter
              handleSearchChange={handleSearchChange}
              handleFilterChange={handleFilterChange}
              handleFilterOtherChange={handleFilterOtherChange}
              ownerOption
            />
            {currentEvents.length > 0 ? (
              currentEvents.map(event => {
                return <EventCard key={event.id} event={event}></EventCard>
              })
            ) : (
              <div className='home-title'>
                <p className='text-2xl'>No matches.</p>
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
        <div className='home-title'>
          <p className='text-2xl'>You dont have any future event.</p>
          <div className='flex gap-3'>
            <Button color='primary' onClick={() => navigateTo('/explore')}>
              Explore
            </Button>
            <Button color='success' onClick={() => navigateTo('/create')}>
              Create
            </Button>
          </div>
        </div>
      )}
    </TransitionAnimation>
  )
}
export default UserEvents
