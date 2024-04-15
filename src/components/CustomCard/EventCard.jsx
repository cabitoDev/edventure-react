import { Button, Card, Image, Link } from '@nextui-org/react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { updateFollowingEvents } from '../../utils/httpUtils'
import { useState } from 'react'
import {
  addFollowingEvents,
  deleteFollowingEvents
} from '../../redux/userSlice'

export const EventCard = props => {
  const { event, inExplore } = props
  const navigateTo = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [isFollowing, setIsFollowing] = useState(
    user.followingEvents.find(ev => ev.id === event.id)
  )
  const followEvent = () => {
    setIsFollowing(!isFollowing)
    isFollowing
      ? dispatch(deleteFollowingEvents(event))
      : dispatch(addFollowingEvents(event))
    updateFollowingEvents(user.id, event.id, isFollowing ? 'DELETE' : 'PUT')
  }
  return (
    <Card isHoverable className='rounded-lg shadow-md p-4'>
      <div className='flex items-center h-full'>
        <Image src={event.image} alt={event.name} width={100} />
        <div className='flex-column justify-between pl-2 self-baseline w-full h-[6rem]'>
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
                  onClick={followEvent}
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
    </Card>
  )
}
