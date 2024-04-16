import { useEffect, useState } from 'react'
import { formatMilisec } from '../utils/utils'

const Countdown = props => {
  const [difference, setDifference] = useState(
    new Date(props.date) - new Date()
  )

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newDifference = new Date(props.date) - new Date()
      setDifference(newDifference)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [props.date])

  const { days, hours, minutes, seconds } = formatMilisec(difference)

  return (
    <div className='flex gap-3'>
      <div>
        <span className='countdown font-thin text-3xl'>
          <span>{days}</span>
        </span>
        days
      </div>
      <div>
        <span className='countdown font-thin text-3xl'>
          <span>{hours}</span>
        </span>
        hours
      </div>
      <div>
        <span className='countdown font-thin text-3xl'>
          <span>{minutes}</span>
        </span>
        min
      </div>
      <div>
        <span className='countdown font-thin text-3xl'>
          <span>{seconds}</span>
        </span>
        sec
      </div>
    </div>
  )
}

export default Countdown
