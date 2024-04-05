import { Select, SelectItem } from '@nextui-org/react'
import { Constants } from '../../constants'
export const Step2 = () => {
  return (
    <>
      <p>¿Wich is the type of the event?</p>
      <Select label='Type of event' className='max-w-xs'>
        {Constants.EVENT_TYPES.map(type => (
          <SelectItem key={type} value={type}>
            {type}
          </SelectItem>
        ))}
      </Select>
      <p>Upload your own icon</p>
    </>
  )
}
