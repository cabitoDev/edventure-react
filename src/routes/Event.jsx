import { Avatar, Button, Card, Divider, Spinner } from '@nextui-org/react'
import {
  GoogleMap,
  Countdown,
  DeleteModal,
  EditEvent,
  TransitionAnimation
} from '../components'
import { useSelector } from 'react-redux'
import { useFollow } from '../hooks'
import assets from '../assets'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { httpDelete, httpGet, dateToStr } from '../utils'
import Constants from '../constants'
import { useQuery } from 'react-query'
import { useTranslation } from 'react-i18next'

const Event = () => {
  const navigateTo = useNavigate()
  const { t } = useTranslation('edventure')
  const [isOpenModal, setIsOpenModal] = useState(false)
  const id = useParams().id
  const stateUser = useSelector(state => state.user)
  const { data: user, status: userStatus } = useQuery('updatedUser', () =>
    httpGet(Constants.USERS_ENDPOINT_URL, stateUser.id)
  )
  const [event, setEvent] = useState(null)
  const { status: eventStatus } = useQuery('event', async () => {
    const eventInfo = await httpGet(Constants.EVENTS_ENDPOINT_URL, id)
    setEvent(eventInfo)
  })
  const { followers, isFollowing, toggleFollow, isLoading } = useFollow(
    user,
    event
  )
  const [isEditing, setIsEditing] = useState(false)

  const onDelete = async () => {
    const deletedEvent = await httpDelete(
      Constants.EVENTS_ENDPOINT_URL,
      event.id
    )
    if (deletedEvent) {
      navigateTo('/my-events')
    }
  }
  if (isLoading || userStatus === 'loading' || eventStatus === 'loading') {
    return <Spinner className='center pt-40 flex' />
  }
  if (event) {
    return (
      <TransitionAnimation className='gap-md flex-column'>
        <div className='flex center pb-4'>
          <DeleteModal
            isOpen={isOpenModal}
            setIsOpen={setIsOpenModal}
            onDelete={onDelete}
          />
          {event && (
            <Card className='p-6 md:w-[40rem]'>
              {isEditing ? (
                <EditEvent
                  event={event}
                  setIsEditing={setIsEditing}
                  setEvent={setEvent}
                />
              ) : (
                <>
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
                          {event.userOwner.id === user.id && t('OWNER')}
                        </p>
                      </div>
                    </div>
                    <div className='flex space-x-4 pt-5'>
                      {event.userOwner.id !== user.id ? (
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
                          <Button
                            onClick={() => {
                              setIsEditing(true)
                            }}
                            color='primary'
                          >
                            <img src={assets.edit} />
                          </Button>
                          <Button
                            onClick={() => {
                              setIsOpenModal(true)
                            }}
                            color='danger'
                          >
                            <img src={assets.trash} />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                  <p className='self-end pt-3 text-bold text-s'>
                    {t('FOLLOWERS')} {followers}
                  </p>
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
              )}
            </Card>
          )}
        </div>
      </TransitionAnimation>
    )
  }
}
export default Event