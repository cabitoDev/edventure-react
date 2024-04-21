import PropTypes from 'prop-types'
import React from 'react'
import { Card, Image, Link } from '@nextui-org/react'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'

const EventCard = props => {
  const { event, inExplore, user } = props
  const navigateTo = useNavigate()
  const { t } = useTranslation('edventure')

  return (
    <Card isHoverable className='rounded-lg shadow-md p-4'>
      <div className='flex flex-responsive items-center h-fit'>
        <Image
          onClick={() => navigateTo(`/event/${event.id}`)}
          src={event.image}
          alt={event.name}
          className='max-h-[9rem] max-w-[9rem] min-h-[9rem] min-w-[9rem] relative cursor-pointer'
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
            <p className='text-gray-500'>{t(event.type)}</p>
          </div>
          <p className='hide-xs'>{event.description}</p>
          {inExplore && (
            <div className='self-end'>
              {event.userOwner.id === user.id && (
                <p className='text-green-600'>{t('OWNER')}</p>
              )}
            </div>
          )}
        </div>
      </div>
      <p className='self-end text-bold text-s'>
        Followers: {event.usersFollowing.length}
      </p>
    </Card>
  )
}

EventCard.propTypes = {
  event: PropTypes.object,
  inExplore: PropTypes.bool,
  user: PropTypes.object
}
export default EventCard
