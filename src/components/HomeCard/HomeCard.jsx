import PropTypes from 'prop-types'
import { Card, CardHeader, Image, CardFooter } from '@nextui-org/react'
import React from 'react'

const HomeCard = ({ headerTitle, headerSubtitle, description, image }) => {
  return (
    <Card
      isFooterBlurred
      className='w-full h-[300px] col-span-12 sm:col-span-7'
    >
      <CardHeader className='absolute z-10 top-1 flex-col items-start'>
        <p className='text-shadow text-tiny text-white/80 uppercase font-bold'>
          {headerSubtitle}
        </p>
        <h4 className='text-shadow text-white font-medium text-xl'>
          {headerTitle}
        </h4>
      </CardHeader>
      <Image
        removeWrapper
        alt='Decorative image of home landing'
        className='z-0 w-full h-full object-cover'
        src={image}
      />
      <CardFooter className='absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100'>
        <div className='flex flex-grow gap-2 items-center'>
          <div className='flex flex-col'>
            <p className='text-tiny text-white/60'>{description}</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

HomeCard.propTypes = {
  description: PropTypes.string,
  headerSubtitle: PropTypes.string,
  headerTitle: PropTypes.string,
  image: PropTypes.string
}

export default HomeCard
