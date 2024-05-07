import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import useDeleteModal from '../../hooks/useDeleteModal'
import React, { useState } from 'react'
import { useFollow } from '../../hooks'
import { Avatar, Button, Divider, Spinner } from '@nextui-org/react'
import { dateToStr, isUserOwner } from '../../utils'
import DeleteModal from '../DeleteModal/DeleteModal'
import assets from '../../../public/assets'
import { Countdown } from '../Countdown'
import GoogleMap from '../GoogleMap/GoogleMap'
import { ChartModal } from '../ChartModal'

const EventInfo = ({ user, event, setIsEditing }) => {
  const { t } = useTranslation('edventure')
  const { onDelete, isOpenDelete, setIsOpenDelete } = useDeleteModal(event.id)
  const [isOpenChart, setIsOpenChart] = useState(false)
  const { followers, isFollowing, toggleFollow, followLoading } = useFollow(
    user,
    event
  )
  if (followLoading) {
    return <Spinner className='center pt-40 flex' />
  }
  return (
    <>
      <div className='flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0'>
        <div className='flex items-center space-x-4'>
          <Avatar src={event.image} alt='Event Image' className='w-24 h-24' />
          <div className='flex flex-col'>
            <h1 className='text-3xl font-semibold'>{event.name}</h1>
            <p className='text-sm text-green-600'>
              {isUserOwner(event, user) && t('OWNER')}
            </p>
          </div>
        </div>
        <div className='flex space-x-4 pt-5'>
          {!isUserOwner(event, user) ? (
            <div className='flex-column center gap-4'>
              <Button
                onClick={toggleFollow}
                variant={isFollowing ? 'bordered' : 'solid'}
                color={isFollowing ? 'error' : 'primary'}
                className='px-4'
              >
                {isFollowing ? t('UNFOLLOW') : t('FOLLOW')}
              </Button>
            </div>
          ) : (
            <>
              <DeleteModal
                className='flex mr-[23px] center w-[90%]'
                isOpen={isOpenDelete}
                setIsOpen={setIsOpenDelete}
                onDelete={onDelete}
                text={t('DELETE_MODAL_TEXT')}
              />
              <Button
                data-testid='EDIT'
                onClick={() => {
                  setIsEditing(true)
                }}
                color='primary'
              >
                <img src={assets.edit} />
              </Button>
              <Button
                data-testid='DELETE'
                onClick={() => {
                  setIsOpenDelete(true)
                }}
                color='danger'
              >
                <img src={assets.trash} />
              </Button>
            </>
          )}
        </div>
      </div>
      <div className='flex pt-3 justify-between'>
        {isUserOwner(event, user) && (
          <>
            <Button onClick={() => setIsOpenChart(true)}>
              <p className='flex text-s'>
                <img src={assets.chart} />
              </p>
            </Button>
            <ChartModal
              isOpen={isOpenChart}
              setIsOpen={setIsOpenChart}
              onClose={() => {
                setIsOpenChart(false)
              }}
              followersHistory={event.followersHistory}
            />
          </>
        )}
        <p className='text-bold text-s'>
          {t('FOLLOWERS')}: {followers}
        </p>
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
        <span className='text-gray-500'>{t(event.type)}</span>
        <span className='text-gray-500'>
          {event.assistants} {t('ASSISTANTS')}
        </span>
      </div>

      <p className='text-lg pt-4'>{event.description}</p>

      <Divider className='my-6' />

      <div className='text-lg flex-column gap-3'>
        <p>
          <strong>{t('ADDRESS')}</strong> {event.address}
        </p>
        <GoogleMap placeId={event.placeId} />
      </div>

      <Divider className='my-6' />

      <div className='flex items-center space-x-4 justify-between'>
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
    </>
  )
}

EventInfo.propTypes = {
  event: PropTypes.object,
  setIsEditing: PropTypes.func,
  user: PropTypes.object
}

export default EventInfo
