import { Button, Card, Image, Link } from '@nextui-org/react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import useFollow from '../../hooks/useFollow'
import { useState } from 'react'

export const EventCard = props => {
  const { event, inExplore } = props
  const navigateTo = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const { followers, isFollowing, toggleFollow } = useFollow(user, event)

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
              {event.userOwner.id === user.id ? (
                <p className='text-green-600'>Owner</p>
              ) : (
                <Button
                  onClick={toggleFollow}
                  variant={isFollowing ? 'bordered' : 'solid'}
                  className='z-20'
                  color='primary'
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
      <p className='self-end text-bold text-xs'>Followers: {followers}</p>
    </Card>
  )
}
