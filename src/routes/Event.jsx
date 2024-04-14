import { useLoaderData } from 'react-router'
import { Avatar, Divider, Spacer } from '@nextui-org/react'

export const Event = () => {
  const event = useLoaderData()
  return (
    <>
      {event && (
        <div className='flex-column'>
          {' '}
          <Avatar src={event.image} alt='Event Image' size='large' />
          <Spacer y={1} />
          <p>
            <strong>Nombre:</strong> {event.name}
          </p>
          <p>
            <strong>Descripción:</strong> {event.description}
          </p>
          <Divider />
          <p>
            <strong>Tipo:</strong> {event.type}
          </p>
          <p>
            <strong>Dirección:</strong> {event.address}
          </p>
          <p>
            <strong>Fecha:</strong> {event.date}
          </p>
          <p>
            <strong>Asistentes esperados:</strong> {event.assistantsExpected}
          </p>
        </div>
      )}
    </>
  )
}
