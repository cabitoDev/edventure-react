import { Input } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import Constants from '../../constants'
import { getMatches } from '../../services/MapsService'
import { useFormContext } from 'react-hook-form'
import GoogleMap from '../GoogleMap'

export const StepWhere = () => {
  const {
    register,
    setValue,
    clearErrors,
    watch,
    formState: { errors }
  } = useFormContext()
  const [coincidences, setCoincidences] = useState([])

  useEffect(() => {
    const doQuery = async () => {
      const results = await getMatches(watch('address'))
      setCoincidences(
        results.map(result => ({
          description: result.description,
          placeId: result.place_id
        }))
      )
    }
    doQuery()
  }, [watch])

  const onInputChange = ev => {
    clearErrors('address')
    setValue('address', ev.target.value)
  }

  const selectItem = address => {
    setValue('address', address.description)
    setValue('placeId', address.placeId)
    setCoincidences([])
  }

  const validateAddress = () => !!watch('address') && !!watch('placeId')

  return (
    <div className='input-width'>
      <Input
        autoFocus
        placeholder='Input the event address'
        {...register('address', { validate: validateAddress })}
        value={watch('address')}
        onChange={onInputChange}
        isInvalid={errors.address ? true : false}
        errorMessage={errors.address ? Constants.STEP_WHERE_ERROR : ''}
      />
      {coincidences.length > 0 && (
        <ul className='z-20 p-0 relative z-40 bg-white dark:bg-default-100 w-full overflow-visible shadow-small rounded-md'>
          {coincidences.map((item, index) => (
            <li
              key={index}
              className='px-4 py-2 first:rounded-t-md last:rounded-b-md rounded-none hover:bg-gray-200 dark:hover:bg-default-200 cursor-pointer'
              onClick={() => selectItem(item)}
            >
              {item.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
