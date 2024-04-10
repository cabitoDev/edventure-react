import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLoaderData } from 'react-router-dom'
import '../index.css'
import EventCard from '../components/CustomCard/EventCard'

export const UserEvents = () => {
  const userEvents = useSelector(state => state.user.userInfo.userEvents)
  const dispatch = useDispatch()

  return (
    <>
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
    </>
  )
}
