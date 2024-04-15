import { useLoaderData, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import '../index.css'

import { Pagination, Button } from '@nextui-org/react'
import { EventCard } from '../components/CustomCard/EventCard'

export const Explore = () => {
  const userEvents = useLoaderData()
  const navigateTo = useNavigate()
  const [currentEvents, setcurrentEvents] = useState([])
  useEffect(() => {
    if (userEvents) setcurrentEvents(userEvents.slice(0, 5))
  }, [userEvents])

  const handlePageChange = indexPage => {
    setcurrentEvents(userEvents.slice((indexPage - 1) * 5, indexPage * 5))
  }

  return (
    <>
      {userEvents && userEvents.length > 0 ? (
        <>
          <p className='text-2xl pl-10'>Explore events:</p>

          <div class='flex-column gap-3 mx-10'>
            {userEvents &&
              currentEvents.map(event => {
                return (
                  <EventCard key={event.id} event={event} inExplore></EventCard>
                )
              })}
          </div>
          <Pagination
            onTouchEnd={e => {
              e.preventDefault()
            }}
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
          <p className='text-2xl'>There are no events created yet.</p>

          <Button color='success' onClick={() => navigateTo('/create')}>
            Create
          </Button>
        </div>
      )}
    </>
  )
}
