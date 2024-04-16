import { Input, ListboxItem, Listbox } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import Constants from '../../constants'
import { getMatches } from '../../services/MapsService'
import { useFormContext } from 'react-hook-form'

export const StepWhere = () => {
  const {
    register,
    setValue,
    clearErrors,
    watch,
    formState: { errors }
  } = useFormContext()
  const [coincidences, setCoincidences] = useState([])
  const [shouldSearch, setShouldSearch] = useState(false)

  const doQuery = async () => {
    if (!shouldSearch) return
    const results = JSON.parse(
      JSON.stringify(await getMatches(watch('address')))
    )
    console.log(results)
    setCoincidences(
      results.map(result => {
        return {
          description: result.description
        }
      })
    )
  }

  const onInputChange = ev => {
    clearErrors()
    setValue('address', ev.target.value)
    setShouldSearch(true)
  }

  useEffect(() => {
    if (shouldSearch) doQuery()
  }, [shouldSearch])

  const onAction = address => {
    setValue('address', address)
    setShouldSearch(false)
    setCoincidences([])
  }
  return (
    <>
      <div className='input-width'>
        <Input
          autoFocus
          placeholder='Input the event address'
          {...register('address', { required: true })}
          value={watch('address')}
          onChange={onInputChange}
          isInvalid={errors.address ? true : false}
          errorMessage={errors.address ? Constants.STEP_WHERE_ERROR : ''}
        />
        {coincidences.length > 0 && (
          <Listbox
            aria-label='User Menu'
            onAction={onAction}
            className='z-20 p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 w-full overflow-visible shadow-small rounded-medium'
            itemClasses={{
              base: 'px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80'
            }}
            items={coincidences}
          >
            {item => (
              <ListboxItem key={item.description}>
                {item.description}
              </ListboxItem>
            )}
          </Listbox>
        )}
      </div>
    </>
  )
}
