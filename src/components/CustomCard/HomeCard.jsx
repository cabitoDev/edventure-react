import PropTypes from 'prop-types'
import { Card, CardHeader, CardBody } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
import React from 'react'

export const HomeCard = props => {
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
        <h4 className='font-bold text-large self-center'>{props.title}</h4>
      </CardHeader>
      <CardBody>
        <p className='text-center'>{props.text}</p>
      </CardBody>
    </Card>
  )
}

HomeCard.propTypes = {
  route: PropTypes.string,
  text: PropTypes.string,
  title: PropTypes.string
}
