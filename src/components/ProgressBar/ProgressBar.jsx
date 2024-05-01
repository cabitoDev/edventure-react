import PropTypes from 'prop-types'
import React from 'react'

const ProgressBar = props => {
  return (
    <div className='h-1 w-full bg-neutral-200 dark:bg-neutral-600'>
      <div
        data-testid='progress-bar'
        className={`h-1 ${props.progress < 1 ? 'bg-primary' : 'bg-green-500'}`}
        style={{ width: `${props.progress * 100}%` }}
      ></div>
    </div>
  )
}

ProgressBar.propTypes = {
  progress: PropTypes.number
}
export default ProgressBar
