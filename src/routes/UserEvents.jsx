import React from 'react'
import '../index.css'
import { Button, Pagination, Spinner } from '@nextui-org/react'
import { useNavigate } from 'react-router'
import { EventCard } from '../components/CustomCard/EventCard'
import useEventSearch from '../hooks/useEventSearch'
import EventFilter from '../components/EventFilter'
import useUpdatedUser from '../hooks/useUpdatedUser'
import { useQuery } from 'react-query'

export const UserEvents = () => {
  const { getUpdatedUser } = useUpdatedUser()
  const { data: user, status } = useQuery('updatedUser', getUpdatedUser)
  const userEvents = user ? user.userEvents.concat(user.followingEvents) : []
  const {
    currentEvents,
    handlePageChange,
    handleSearchChange,
    handleFilterChange,
    handleFilterOtherChange
  } = useEventSearch(userEvents, user)

  const navigateTo = useNavigate()

  if (status === 'loading') {
    return <Spinner className='center pt-40' />
  }
  return (
    <>
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
          <p className='text-2xl'>You donmaint have any future event.</p>
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
    </>
  )
}
