import PropTypes from 'prop-types'
import React from 'react'
import { Button, Card, Image, Link } from '@nextui-org/react'
import { useNavigate } from 'react-router'

const EventCard = props => {
  const { event, inExplore, user } = props
  const navigateTo = useNavigate()

  return (
    <Card isHoverable className='rounded-lg shadow-md p-4'>
      <div className='flex flex-responsive items-center h-fit'>
        <Image
          onClick={() => navigateTo(`/event/${event.id}`)}
          src={event.image}
          alt={event.name}
          className='h-[5rem] w-[5rem] cursor-pointer'
        />
        <div className='flex-column justify-between pl-2 self-baseline w-full'>
          <div className='flex flex-responsive justify-between w-full'>
            <Link
              color='foreground'
              onClick={() => navigateTo(`/event/${event.id}`)}
              className='hover:cursor-pointer underline text-lg font-semibold'
            >
              {event.name}
            </Link>
            <p className='text-gray-500'>{event.type}</p>
          </div>
          <p className='hide-xs'>{event.description}</p>
          {inExplore && (
            <div className='self-end'>
              {event.userOwner.id === user.id && (
                <p className='text-green-600'>Owner</p>
              )}
            </div>
          )}
        </div>
      </div>
      <p className='self-end text-bold text-s'>
        Followers: {event.usersFollowing.length}
      </p>
    </Card>
  )
}

EventCard.propTypes = {
  event: PropTypes.object,
  inExplore: PropTypes.bool,
  user: PropTypes.object
}
export default EventCard
