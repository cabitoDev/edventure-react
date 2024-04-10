import { Card, Spacer, Avatar, Image } from '@nextui-org/react'

export const EventCard = ({ name, type, description, avatar }) => {
  return (
    <Card hoverable className='rounded-lg shadow-md p-4'>
      <div className='flex items-center h-full'>
        <Image src={avatar} alt={name} width={100} />
        <div className='flex-column justify-between pl-2 self-baseline w-full'>
          <div className='flex flex-responsive justify-between w-full'>
            <p className='text-lg font-semibold'>{name}</p>
            <p className='text-gray-500'>{type}</p>
          </div>

          <p className='hide-xs'>{description}</p>
        </div>
      </div>
    </Card>
  )
}

export default EventCard
