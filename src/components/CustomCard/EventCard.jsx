import { Button, Card, Image, Link } from '@nextui-org/react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

export const EventCard = props => {
  const { name, type, description, image, eventOwnerId, inExplore, id } = props
  const navigateTo = useNavigate()
  const user = useSelector(state => state.user)
  return (
    <Card isHoverable className='rounded-lg shadow-md p-4'>
      <div className='flex items-center h-full'>
        <Image src={image} alt={name} width={100} />
        <div className='flex-column justify-between pl-2 self-baseline w-full h-[6rem]'>
          <div className='flex flex-responsive justify-between w-full'>
            <Link
              color='foreground'
              onClick={() => navigateTo(`/event/${id}`)}
              className='hover:cursor-pointer underline text-lg font-semibold'
            >
              {name}
            </Link>
            <p className='text-gray-500'>{type}</p>
          </div>
          <p className='hide-xs'>{description}</p>
          {inExplore && (
            <div className='self-end'>
              {eventOwnerId === user.id ? (
                <p className='text-green-600'>Owner</p>
              ) : (
                <Button className='z-20' color='primary'>
                  Follow
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
