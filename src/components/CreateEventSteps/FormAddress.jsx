import { Input } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import Constants from '../../constants'
import { getMatches } from '../../services/MapsService'
import { useFormContext } from 'react-hook-form'
export const FormAddress = props => {
  const {
    register,
    setValue,
    clearErrors,
    watch,
    formState: { errors }
  } = useFormContext()
  const [coincidences, setCoincidences] = useState([])

  const searchResults = async () => {
    clearErrors('address')
    const results = await getMatches(watch('address'))
    setCoincidences(
      results.map(result => ({
        description: result.description,
        placeId: result.place_id
      }))
    )
  }

  const selectItem = address => {
    clearErrors('address')
    setValue('placeId', address.placeId)
    setValue('address', address.description)
    setCoincidences([])
  }

  const validateAddress = () => !!watch('address') && !!watch('placeId')

  return (
    <div className={props.className}>
      <Input
        label='Address'
        {...register('address', { validate: validateAddress })}
        value={watch('address')}
        onInput={searchResults}
        isInvalid={errors.address ? true : false}
        errorMessage={errors.address && Constants.STEP_ADDRESS_ERROR}
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
