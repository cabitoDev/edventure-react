export const getChartData = followersHistory => {
  const transformedHistory = transformFollowersHistory(followersHistory)
  return Object.keys(transformedHistory).map(date => ({
    x: date,
    y: transformedHistory[date]
  }))
}

export const isDesiredPosition = (index, totalTicks) => {
  const step = Math.floor(totalTicks / 3)
  return index % step === 0 || index === totalTicks - 1 || index === 0
}

export const transformFollowersHistory = followersHistory => {
  const newFollowersHistory = {}
  const dates = Object.keys(followersHistory)
  const lastDate = new Date(dates[0].split('/').reverse().join('-'))
  const firstDate = new Date(
    dates[dates.length - 1].split('/').reverse().join('-')
  )
  let currentDate = new Date(firstDate)
  let previousDate
  while (currentDate <= lastDate) {
    const formatedCurrentDate = formatDate(currentDate)
    newFollowersHistory[formatedCurrentDate] =
      followersHistory[formatedCurrentDate] !== undefined
        ? followersHistory[formatedCurrentDate]
        : newFollowersHistory[previousDate]
    previousDate = formatedCurrentDate
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return newFollowersHistory
}

export const formatDate = dateString => {
  const date = new Date(dateString)

  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}
