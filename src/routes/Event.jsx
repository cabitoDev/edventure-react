import { useLoaderData } from 'react-router'
import { Avatar } from '@nextui-org/react'
import Countdown from '../components/Countdown'

export const Event = () => {
  const event = useLoaderData()

  return (
    <>
      {event && (
        <div className='flex flex-col items-center space-y-4'>
          <Avatar
            src={event.image}
            alt='Event Image'
            className='w-[7rem] h-[7rem]'
          />
          <h1 className='text-3xl font-semibold'>{event.name}</h1>
          <Countdown date={event.date} />
          <div className='flex justify-center space-x-4'>
            <p className='text-lg'>Type: {event.type}</p>
            <p className='text-lg'>Expected assistants: {event.assistants}</p>
          </div>
          <p className='text-lg'>{event.description}</p>
          <p className='text-lg'>
            <strong>Dirección:</strong> {event.address}
          </p>
          <p className='text-lg'>Followers: {event.usersFollowing.length}</p>
          <div className='flex flex-col items-center space-y-2'>
            <p className='text-lg'>Created by:</p>
            <div className='flex items-center space-x-2'>
              <Avatar
                alt='Avatar'
                height={40}
                size='lg'
                src={event.userOwner.avatar}
                width={40}
              />
              <p className='text-lg'>{event.userOwner.nickname}</p>
            </div>
            {!event.userOwner.showEmail && (
              <p className='text-lg'>{event.userOwner.email}</p>
            )}
          </div>
        </div>
      )}
    </>
  )
}
