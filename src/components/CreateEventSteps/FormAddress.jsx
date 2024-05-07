import { Input } from '@nextui-org/react'
import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
const FormAddress = () => {
  const {
    register,
    setValue,
    clearErrors,
    watch,
    formState: { errors }
  } = useFormContext()
  const { t } = useTranslation('edventure')

  const [coincidences, setCoincidences] = useState([])

  const getMatches = async text => {
    return new Promise(resolve => {
      try {
        new window.google.maps.places.AutocompleteService().getPlacePredictions(
          { input: text, types: ['address'] },
          resolve
        )
      } catch (e) {
        console.error(e)
      }
    })
  }

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
    <div className='input-width'>
      <Input
        data-testid={'INPUT_ADDRESS'}
        label={t('ADDRESS_LABEL')}
        {...register('address', { validate: validateAddress })}
        value={watch('address')}
        onInput={searchResults}
        isInvalid={errors.address ? true : false}
        errorMessage={errors.address && t('ERROR_ADDRESS')}
      />
      {coincidences.length > 0 && (
        <ul className='z-20 p-0 relative z-40 bg-white dark:bg-default-100 w-full overflow-visible shadow-small rounded-md'>
          {coincidences.map((item, index) => (
            <li
              key={index}
              data-testid={`OPTION_${index}`}
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
export default FormAddress
