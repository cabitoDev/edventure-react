import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { formatMilisec } from '../../utils/utils'
import { useTranslation } from 'react-i18next'

const Countdown = props => {
  const [difference, setDifference] = useState(
    new Date(props.date) - new Date()
  )

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newDifference = new Date(props.date) - new Date()
      if (newDifference <= 0) {
        clearInterval(intervalId)
      } else {
        setDifference(newDifference)
      }
    }, 1000)

    return () => clearInterval(intervalId)
  }, [props.date])

  const { t } = useTranslation('edventure')
  const { days, hours, minutes, seconds } = formatMilisec(difference)

  return (
    <div className='flex gap-3'>
      <div>
        <span className='countdown font-thin text-3xl'>
          <span>{days}</span>
        </span>
        {t('DAYS')}
      </div>
      <div>
        <span className='countdown font-thin text-3xl'>
          <span>{hours}</span>
        </span>
        {t('HOUR')}
      </div>
      <div>
        <span className='countdown font-thin text-3xl'>
          <span>{minutes}</span>
        </span>
        {t('MIN')}
      </div>
      <div>
        <span className='countdown font-thin text-3xl'>
          <span>{seconds}</span>
        </span>
        {t('SEC')}
      </div>
    </div>
  )
}

Countdown.propTypes = {
  date: PropTypes.string
}

export default Countdown
