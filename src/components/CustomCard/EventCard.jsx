import { Button, Card, Image } from '@nextui-org/react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

export const EventCard = props => {
  const { name, type, description, image, eventOwnerId, inExplore, id } = props
  const navigateTo = useNavigate()
  const user = useSelector(state => state.user)
  return (
    <div
      className='hover:cursor-pointer'
      onClick={() => navigateTo(`/event/${id}`)}
    >
      <Card isHoverable className='rounded-lg shadow-md p-4'>
        <div className='flex items-center h-full'>
          <Image src={image} alt={name} width={100} />
          <div className='flex-column justify-between pl-2 self-baseline w-full h-[6rem]'>
            <div className='flex flex-responsive justify-between w-full'>
              <p className='text-lg font-semibold'>{name}</p>
              <p className='text-gray-500'>{type}</p>
            </div>
            <p className='hide-xs'>{description}</p>
            {inExplore && (
              <div className='self-end'>
                {eventOwnerId === user.id ? (
                  <p className='text-green-600'>Owner</p>
                ) : (
                  <Button
                    className='z-20'
                    onMouseMoveCapture={e => {
                      e.stopPropagation()
                      e.preventDefault()
                    }}
                    on
                    color='primary'
                  >
                    Follow
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
