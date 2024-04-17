import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Input,
  Pagination,
  Radio,
  RadioGroup,
  Select,
  SelectItem
} from '@nextui-org/react'
import { useLoaderData } from 'react-router-dom'
import useEventSearch from '../hooks/useEventSearch'
import { EventCard } from '../components/CustomCard/EventCard'
import { useSelector } from 'react-redux'
import EventFilter from '../components/EventFilter'

export const Explore = () => {
  const allEvents = useLoaderData()
  const navigateTo = useNavigate()
  const user = useSelector(state => state.user)
  const {
    currentEvents,
    handlePageChange,
    handleSearchChange,
    handleFilterChange,
    handleFilterOtherChange
  } = useEventSearch(allEvents, user)
  if (allEvents)
    return (
      <>
        {allEvents && allEvents.length > 0 ? (
          <div className='flex-column gap-4'>
            <p className='ml-10 text-2xl'>Explore events:</p>
            <div className='flex-column gap-3 mx-10'>
              <EventFilter
                handleSearchChange={handleSearchChange}
                handleFilterChange={handleFilterChange}
                handleFilterOtherChange={handleFilterOtherChange}
              />
              {currentEvents.length > 0 ? (
                currentEvents.map(event => (
                  <EventCard key={event.id} event={event} inExplore />
                ))
              ) : (
                <div className='home-title'>
                  <p className='text-2xl'>No matches.</p>
                </div>
              )}
            </div>
            <Pagination
              onTouchEnd={e => {
                e.preventDefault()
              }}
              showControls
              className='center'
              variant='light'
              total={Math.ceil(allEvents.length / 5)}
              color='primary'
              onChange={handlePageChange}
            />
          </div>
        ) : (
          <div className='home-title'>
            <p className='text-2xl'>There are no events created yet.</p>
            <Button color='success' onClick={() => navigateTo('/create')}>
              Create
            </Button>
          </div>
        )}
      </>
    )
  return <>Loading</>
}
