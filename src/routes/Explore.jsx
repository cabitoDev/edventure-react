import { useLoaderData } from 'react-router-dom'
import EventCard from '../components/CustomCard/EventCard'

export const Explore = () => {
  const events = useLoaderData()
  return (
    <>
      <p className='text-2xl pl-10'>Explore events:</p>
      <div class='flex-column gap-3 mx-10'>
        {events &&
          events.map(event => {
            return (
              <EventCard
                avatar={event.image}
                name={event.name}
                description={event.description}
                type={event.type}
              ></EventCard>
            )
          })}
      </div>
    </>
  )
}
