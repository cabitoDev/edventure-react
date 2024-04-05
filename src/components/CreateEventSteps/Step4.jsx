import { Select, SelectItem } from '@nextui-org/react'
import { Constants } from '../../constants'

export const Step4 = () => {
  return (
    <>
      <Select label='Number of assistants' className='max-w-xs'>
        {Constants.ASSISTANTS_NUMBER.map(type => (
          <SelectItem key={type} value={type}>
            {type}
          </SelectItem>
        ))}
      </Select>
    </>
  )
}
