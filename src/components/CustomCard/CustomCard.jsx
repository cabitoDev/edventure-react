import { Card, CardHeader, CardBody, Image } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'

export const CustomCard = props => {
  const navigateTo = useNavigate()

  return (
    <Card
      onClick={() => {
        navigateTo(props.route)
      }}
      isHoverable
      isPressable
      className='py-4'
    >
      <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
        <h4 className='font-bold text-large align-self-center'>
          {props.title}
        </h4>
      </CardHeader>
      <CardBody>
        <p className='text-align-center'>{props.text}</p>
      </CardBody>
    </Card>
  )
}
