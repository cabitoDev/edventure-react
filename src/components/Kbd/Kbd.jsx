import PropTypes from 'prop-types'
import cx from 'classnames'
import React from 'react'

const Kbd = ({ children, className }) => {
  return (
    <>
      <kbd
        className={cx(
          'rounded-md border-[1px] border-b-2 dark:border-[#4a4a4a] dark:bg-[#333333] px-2 py-0.5 text-sm',
          className
        )}
      >
        {children}
      </kbd>
    </>
  )
}

Kbd.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

export default Kbd
