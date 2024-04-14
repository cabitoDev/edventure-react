import { useLoaderData } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import '../index.css'

import { Pagination } from '@nextui-org/react'
import { EventCard } from '../components/CustomCard/EventCard'

export const Explore = () => {
  const userEvents = useLoaderData()
  const [currentEvents, setcurrentEvents] = useState([])
  useEffect(() => {
    if (userEvents) setcurrentEvents(userEvents.slice(0, 5))
  }, [userEvents])

  const handlePageChange = indexPage => {
    setcurrentEvents(userEvents.slice((indexPage - 1) * 5, indexPage * 5))
  }

  return (
    <>
      <p className='text-2xl pl-10'>Explore events:</p>
      {userEvents && (
        <>
          <div class='flex-column gap-3 mx-10'>
            {userEvents &&
              currentEvents.map(event => {
                return (
                  <EventCard key={event.id} {...event} inExplore></EventCard>
                )
              })}
          </div>
          <Pagination
            onClick={e => e.preventDefault()}
            showControls
            className='center'
            variant='light'
            total={Math.ceil(userEvents.length / 5)}
            color='primary'
            onChange={handlePageChange}
          />
        </>
      )}
    </>
  )
}
