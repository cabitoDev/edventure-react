import { Input, Kbd } from '@nextui-org/react'
import { useKBar } from 'kbar'
import React from 'react'
import { SearchIcon } from '../Navbar'
const KInput = () => {
  const { query } = useKBar()

  return (
    <div data-testid='KBAR' onClick={query.toggle}>
      <Input
        className='w-min'
        startContent={
          <div className='flex gap-1'>
            <SearchIcon />
            <div className='flex hide-xs gap-1'>
              <Kbd>Ctrl</Kbd>
              <Kbd>K</Kbd>
            </div>
          </div>
        }
      />
    </div>
  )
}
export default KInput
