import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import '../index.css'
import EventCard from '../components/CustomCard/EventCard'
import { Pagination } from '@nextui-org/react'
import { TransitionAnimation } from '../components/TransitionAnimation'

export const UserEvents = () => {
  const userEvents = useSelector(state => state.user.userInfo.userEvents)
  const [currentEvents, setcurrentEvents] = useState([])
  useEffect(() => {
    setcurrentEvents(userEvents.slice(0, 5))
  }, [userEvents])

  const handlePageChange = indexPage => {
    setcurrentEvents(userEvents.slice((indexPage - 1) * 5, indexPage * 5))
  }

  return (
    <>
      <p className='text-2xl pl-10'>Your created events:</p>
      <div class='flex-column gap-3 mx-10'>
        {userEvents &&
          currentEvents.map(event => {
            return (
              <EventCard
                avatar={event.image}
                name={event.name}
                description={event.description}
                type={event.type}
              ></EventCard>
            )
          })}
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
  )
}
