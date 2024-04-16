import { Button, Avatar } from '@nextui-org/react'
import React, { useRef } from 'react'

import assets from '../../assets'
import { useFormContext } from 'react-hook-form'

export const StepImage = () => {
  const { setValue, watch } = useFormContext()
  const inputFileRef = useRef()
  const onInputChange = ev => {
    setValue('image', {
      url: URL.createObjectURL(ev.target.files[0]),
      file: ev.target.files[0]
    })
  }

  return (
    <>
      <div className='flex flex-col items-center gap-4'>
        <button
          onClick={e => {
            e.preventDefault()
            inputFileRef.current.click()
          }}
        >
          <Avatar className='w-40 h-40 text-large' src={watch('image').url} />
        </button>
        <Button
          isIconOnly
          radius='md'
          color='primary'
          onClick={() => inputFileRef.current.click()}
        >
          <img src={assets.upload}></img>
        </Button>
        <input
          style={{ display: 'none' }}
          type='file'
          ref={inputFileRef}
          onChange={onInputChange}
        />
      </div>
    </>
  )
}
