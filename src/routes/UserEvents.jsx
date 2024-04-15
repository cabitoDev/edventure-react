import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import '../index.css'
import { Button, Pagination } from '@nextui-org/react'
import { useNavigate } from 'react-router'
import { EventCard } from '../components/CustomCard/EventCard'

export const UserEvents = () => {
  const userEvents = useSelector(state => state.user.userEvents)
  const [currentEvents, setcurrentEvents] = useState([])
  useEffect(() => {
    setcurrentEvents(userEvents.slice(0, 5))
  }, [userEvents])

  const handlePageChange = indexPage => {
    setcurrentEvents(userEvents.slice((indexPage - 1) * 5, indexPage * 5))
  }

  const navigateTo = useNavigate()

  return (
    <>
      {userEvents && userEvents.length > 0 ? (
        <>
          <p className='text-2xl pl-10'>Your created events:</p>
          <div class='flex-column gap-3 mx-10'>
            {currentEvents.map(event => {
              return <EventCard key={event.id} event={event}></EventCard>
            })}
          </div>
          <Pagination
            showControls
            className='center'
            variant='light'
            total={Math.ceil(userEvents.length / 5)}
            color='primary'
            onChange={handlePageChange}
          />{' '}
        </>
      ) : (
        <div className='home-title'>
          <p className='text-2xl'>You don't have any future event.</p>
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
