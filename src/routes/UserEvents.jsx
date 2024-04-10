import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../index.css'
import EventCard from '../components/CustomCard/EventCard'

export const UserEvents = () => {
  const userEvents = useSelector(state => state.user.userInfo.userEvents)
  const dispatch = useDispatch()

  return (
    <>
      <p className='text-2xl pl-10'>Your created events:</p>
      <div class='flex-column gap-3 mx-10'>
        {userEvents &&
          userEvents.map(event => {
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
    </>
  )
}
