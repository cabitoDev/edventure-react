import { Input } from '@nextui-org/input'
import { useKBar } from 'kbar'
import React from 'react'
import { SearchIcon } from '../Navbar/SearchIcon'
import { Kbd } from '@nextui-org/kbd'
const KInput = () => {
  const { query } = useKBar()

  return (
    <div onClick={query.toggle}>
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
