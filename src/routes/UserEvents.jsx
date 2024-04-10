import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLoaderData } from 'react-router-dom'
import '../index.css'

export const UserEvents = () => {
  const userEvents = useSelector(state => state.user.userInfo.userEvents)
  const dispatch = useDispatch()

  return (
    <ul>
      {userEvents &&
        userEvents.map(event => {
          return <li>Event: {event.name}</li>
        })}
    </ul>
  )
}
