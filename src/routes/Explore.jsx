import { useLoaderData } from 'react-router-dom'
import EventCard from '../components/CustomCard/EventCard'

export const Explore = () => {
  const events = useLoaderData()
  return (
    <>
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
    </>
  )
}
