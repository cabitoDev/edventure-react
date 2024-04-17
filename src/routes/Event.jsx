import { useLoaderData } from 'react-router'
import { Avatar, Button, Card, Divider } from '@nextui-org/react'
import Countdown from '../components/Countdown'
import GoogleMap from '../components/GoogleMap'
import { useSelector } from 'react-redux'
import useFollow from '../hooks/useFollow'
import { dateToStr } from '../utils/utils'

export const Event = () => {
  const event = useLoaderData()
  const user = useSelector(state => state.user)
  const { isFollowing, toggleFollow } = useFollow(user, event)

  return (
    <div className='flex center pb-4'>
      {event && (
        <Card className='p-6 md:w-[40rem]  '>
          <div className='flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0'>
            <div className='flex items-center space-x-4'>
              <Avatar
                src={event.image}
                alt='Event Image'
                className='w-24 h-24'
              />
              <div className='flex flex-col'>
                <h1 className='text-3xl font-semibold'>{event.name}</h1>
                <p className='text-sm text-green-600'>
                  {event.userOwner.id === user.id ? 'Owner' : ''}
                </p>
              </div>
            </div>
            <div className='flex space-x-4'>
              {event.userOwner.id !== user.id && (
                <Button
                  onClick={toggleFollow}
                  variant={isFollowing ? 'bordered' : 'solid'}
                  color={isFollowing ? 'error' : 'primary'}
                  className='px-4'
                >
                  {isFollowing ? 'Unfollow' : 'Follow'}
                </Button>
              )}
            </div>
          </div>

          <Divider className='my-6' />

          <div className='flex flex-col md:flex-row justify-between space-y-6 md:space-y-0 md:space-x-6 center'>
            <div className='flex flex-col items-end space-y-2 center'>
              <Countdown date={event.date} />
              <p>{dateToStr(event.date)}</p>
            </div>
          </div>

          <Divider className='my-6' />
          <div className='flex justify-between'>
            <span className='text-gray-500'>{event.type}</span>
            <span className='text-gray-500'>{event.assistants} assistants</span>
          </div>

          <p className='text-lg pt-4'>{event.description}</p>

          <Divider className='my-6' />

          <div className='text-lg flex-column gap-3'>
            <p>
              <strong>Address:</strong> {event.address}
            </p>
            <GoogleMap placeId={event.placeId} />
          </div>

          <Divider className='my-6' />

          <div className='flex items-center space-x-4 justify-between'>
            <p className='text-lg'>
              <strong>Followers:</strong> {event.usersFollowing.length}
            </p>
            <div className='flex items-center space-x-2'>
              <div className='flex-column gap-1'>
                <div className='flex center gap-3'>
                  <Avatar
                    alt='Avatar'
                    height={40}
                    size='lg'
                    src={event.userOwner.avatar}
                    width={40}
                  />
                  <p className='text-lg'>{event.userOwner.nickname}</p>
                </div>
                {event.userOwner.showEmail && (
                  <p className='text-lg'>{event.userOwner.email}</p>
                )}
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
