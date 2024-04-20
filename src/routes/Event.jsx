import { Avatar, Button, Card, Divider, Spinner } from '@nextui-org/react'
import { GoogleMap, Countdown, DeleteModal, EditEvent } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { useFollow } from '../hooks'
import assets from '../assets'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { httpDelete, httpGet, dateToStr } from '../utils'
import { deleteUserEvents } from '../redux'
import Constants from '../constants'
import { useQuery } from 'react-query'

const Event = () => {
  const navigateTo = useNavigate()
  const user = useSelector(state => state.user)

  const [isOpenModal, setIsOpenModal] = useState(false)
  const dispatch = useDispatch()
  const id = useParams().id
  const [event, setEvent] = useState(null)
  const { status } = useQuery('event', async () => {
    const eventInfo = await httpGet(Constants.EVENTS_ENDPOINT_URL, id)
    setEvent(eventInfo)
  })
  const { followers, isFollowing, toggleFollow } = useFollow(user, event)
  const [isEditing, setIsEditing] = useState(false)

  const onDelete = async () => {
    const deletedEvent = await httpDelete(
      Constants.EVENTS_ENDPOINT_URL,
      event.id
    )
    if (deletedEvent) {
      dispatch(deleteUserEvents(deletedEvent))
      navigateTo('/my-events')
    }
  }
  if (status === 'loading') {
    return <Spinner className='center pt-40' />
  }
  if (event) {
    return (
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
                        {event.userOwner.id === user.id && 'Owner'}
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
                          {isFollowing ? 'Unfollow' : 'Follow'}
                        </Button>
                        <p className='text-bold text-s'>
                          Followers: {followers}
                        </p>
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

                <Divider className='my-6' />
                <div className='flex flex-col md:flex-row justify-between space-y-6 md:space-y-0 md:space-x-6 center'>
                  <div className='flex flex-col items-end space-y-2 center'>
                    <Countdown date={event.date} />
                    <p>{dateToStr(event.date)}</p>
                  </div>
                </div>

                <Divider className='my-6' />
                <div className='flex justify-between'>
                  <span className='text-gray-500'>{event.type}</span>
                  <span className='text-gray-500'>
                    {event.assistants} assistants
                  </span>
                </div>

                <p className='text-lg pt-4'>{event.description}</p>

                <Divider className='my-6' />

                <div className='text-lg flex-column gap-3'>
                  <p>
                    <strong>Address:</strong> {event.address}
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
    )
  }
}
export default Event
