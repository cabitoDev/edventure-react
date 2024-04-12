import { Image, Button } from '@nextui-org/react'
import React from 'react'

import assets from '../../assets'
import { Constants } from '../../constants'

export const StepImage = props => {
  function onChange (e) {
    props.setNewEvent(prev => ({
      ...prev,
      image: URL.createObjectURL(e.target.files[0])
    }))
  }

  return (
    <>
      <p className='text-3xl text-center'>{Constants.QUESTION_STEP_IMAGE}</p>
      <div className='flex flex-col items-center gap-4'>
        <Image
          width={100}
          height={150}
          radius='lg'
          alt='icon of event'
          src={props.image}
        />
        <Button
          isIconOnly
          radius='md'
          color='primary'
          onClick={() => document.getElementById('file-input').click()}
        >
          <img src={assets.upload}></img>
        </Button>
        <input
          {...props.form}
          name='image'
          style={{ display: 'none' }}
          type='file'
          id='file-input'
          onChange={onChange}
        />
      </div>
    </>
  )
}
