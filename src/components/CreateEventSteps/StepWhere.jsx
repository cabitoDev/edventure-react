import { Input, ListboxItem, Listbox } from '@nextui-org/react'
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
  const [results, setResults] = useState()

  const doQuery = async () => {
    setResults(JSON.parse(JSON.stringify(await getMatches(watch('address')))))

    setCoincidences(
      results.map(result => {
        return {
          description: result.description,
          placeId: result.place_id
        }
      })
    )
  }

  const onInputChange = ev => {
    doQuery()
    clearErrors('address')
    setValue('address', ev.target.value)
  }

  const onAction = address => {
    console.log(address.description)
    setValue('address', address.description)
    setValue('placeId', address.placeId)
    setCoincidences([])
  }

  const validateAddress = () => {
    return watch('address') && watch('placeId') ? true : false
  }
  return (
    <>
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
        {coincidences && (
          <ul className='z-20 p-0 relative z-40 bg-white dark:bg-gray-900 w-full overflow-visible shadow-small rounded-md'>
            {coincidences.map((item, index) => (
              <li
                key={index}
                className='px-4 py-2 first:rounded-t-md last:rounded-b-md rounded-none hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer'
                onClick={() => onAction(item)}
              >
                {item.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}
