import PropTypes from 'prop-types'
import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch
} from 'kbar'
import { KResults, Kbd } from '.'
import React from 'react'
import { SearchIcon } from '../Navbar'

const KPortal = () => {
  return (
    <KBarPortal>
      <KBarPositioner className='z-30 backdrop-blur-md backdrop-filter'>
        <KBarAnimator className='mx-auto w-[32rem] overflow-hidden rounded-xl border-[1px] border-tertiary px-4 drop-shadow-2xl '>
          <div className='mx-2 flex items-end justify-between py-4'>
            <SearchIcon />
            <KBarSearch className='w-full rounded-md border-b border-none border-gray-300 bg-transparent pt-2 text-gray-100 outline-none pl-2' />
            <Kbd>esc</Kbd>
          </div>

          <KResults />
          <div className='h-4' />
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
  )
}
const KProvider = props => {
  return (
    <>
      <KBarProvider actions={props.actions}>
        <KPortal></KPortal>
        {props.children}
      </KBarProvider>
    </>
  )
}

KProvider.propTypes = {
  actions: PropTypes.array,
  children: PropTypes.node
}
export default KProvider
