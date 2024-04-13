import { Image, Button } from '@nextui-org/react'
import React from 'react'

import assets from '../../assets'
import { Constants } from '../../constants'
import { useFormContext } from 'react-hook-form'

export const StepImage = props => {
  const { setValue, watch } = useFormContext()

  const onInputChange = ev => {
    setValue('image', URL.createObjectURL(ev.target.files[0]))
  }

  return (
    <>
      <div className='flex flex-col items-center gap-4'>
        <Image
          width={100}
          height={150}
          radius='lg'
          alt='icon of event'
          src={watch('image')}
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
          style={{ display: 'none' }}
          type='file'
          id='file-input'
          onChange={onInputChange}
        />
      </div>
    </>
  )
}
