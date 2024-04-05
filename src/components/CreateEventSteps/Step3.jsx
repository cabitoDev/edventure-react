import { Input } from '@nextui-org/react'
import { useState } from 'react'
import Datepicker from 'react-tailwindcss-datepicker'
import { Select, SelectItem } from '@nextui-org/react'
import { Constants } from '../../constants'
import { Switch } from '@nextui-org/react'
import { SearchIcon } from '../Navbar/SearchIcon'

export const Step3 = () => {
  const [value, setValue] = useState(new Date())
  const [isSelected, setIsSelected] = useState(true)

  const handleValueChange = newValue => {
    console.log('newValue:', newValue)
    setValue(newValue)
  }
  return (
    <>
      <div className='z-20'>
        <Datepicker
          asSingle
          popoverDirection='down'
          useRange={false}
          placeholder='DD/MM/YYYY'
          displayFormat='DD/MM/YYYY'
          startFrom={new Date()}
          value={value}
          onChange={handleValueChange}
          inputClassName={
            'relative w-full inline-flex tap-highlight-transparent flex-row items-center shadow-sm px-3 gap-3 bg-default-100 data-[hover=true]:bg-default-200 group-data-[focus=true]:bg-default-100 h-unit-10 min-h-unit-10 rounded-medium transition-background motion-reduce:transition-none !duration-150 outline-none group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background'
          }
          containerClassName={'relative w-full'}
        />
      </div>

      <Select label='Hour' className='max-w-xs'>
        {Constants.HOURS.map(type => (
          <SelectItem key={type} value={type}>
            {type}
          </SelectItem>
        ))}
      </Select>
      <Select label='Min' className='max-w-xs'>
        {Constants.HOURS.map(type => (
          <SelectItem key={type} value={type}>
            {type}
          </SelectItem>
        ))}
      </Select>
      <Switch
        isSelected={isSelected}
        onValueChange={setIsSelected}
        defaultSelected
        size='lg'
        color='success'
        startContent={<SearchIcon></SearchIcon>}
        endContent={<SearchIcon></SearchIcon>}
      >
        {isSelected ? 'AM' : 'PM'}
      </Switch>
    </>
  )
}
