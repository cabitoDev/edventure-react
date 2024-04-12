import { Input, ListboxItem, Listbox } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { Constants } from '../../constants'
import { getMatches } from '../../services/MapsService'

export const StepWhere = props => {
  const [coincidences, setCoincidences] = useState([])
  const [shouldSearch, setShouldSearch] = useState(false)

  const doQuery = async () => {
    if (!shouldSearch) return
    const results = JSON.parse(JSON.stringify(await getMatches(props.address)))
    console.log(results)
    setCoincidences(
      results.map(result => {
        return {
          description: result.description
        }
      })
    )
  }

  const onChange = ev => {
    props.setNewEvent(prev => ({ ...prev, address: ev.target.value }))
    props.setStepsVisited(prev => ({ ...prev, address: false }))
    setShouldSearch(true)
  }

  useEffect(() => {
    if (shouldSearch) doQuery()
  }, [shouldSearch])

  const onAction = address => {
    props.setNewEvent(prev => ({ ...prev, address: address }))
    setShouldSearch(false)
    setCoincidences([])
    props.setStepsVisited(prev => ({ ...prev, address: true }))
  }
  return (
    <>
      <p className='text-3xl text-center'>{Constants.QUESTION_STEP_WHERE}</p>
      <div className='input-width'>
        <Input
          autoFocus
          placeholder='Input the event address'
          value={props.address}
          onChange={onChange}
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
