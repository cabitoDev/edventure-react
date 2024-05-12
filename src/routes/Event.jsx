import { Card, Spinner } from '@nextui-org/react'
import { EditEvent, EventInfo, TransitionAnimation } from '../components'
import { useEvent, useUser } from '../hooks'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const Event = () => {
  const { user, userLoading } = useUser()
  const token = useSelector(state => state.token)
  const { event, setEvent, eventLoading } = useEvent()

  const [isEditing, setIsEditing] = useState(false)

  if (userLoading || eventLoading) {
    return <Spinner className='center pt-40 flex' />
  }
  if (event) {
    return (
      <TransitionAnimation className='gap-md flex-column'>
        <div className='flex center pb-4'>
          <Card className='p-6 md:w-[40rem]'>
            {isEditing ? (
              <EditEvent
                event={event}
                setIsEditing={setIsEditing}
                setEvent={setEvent}
                token={token}
              />
            ) : (
              <EventInfo
                user={user}
                event={event}
                setIsEditing={setIsEditing}
                token={token}
              />
            )}
          </Card>
        </div>
      </TransitionAnimation>
    )
  }
}
export default Event
