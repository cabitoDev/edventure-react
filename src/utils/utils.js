export const getLoginRequest = userData => {
  return {
    id: parseInt(userData.sub.slice(-5)),
    nickname: userData.nickname,
    name: userData.given_name,
    email: userData.email,
    loggedDate: userData.updated_at,
    avatar: userData.picture
  }
}

export const getNewEventRequest = (eventData, userId) => {
  const {
    address,
    assistantsExpected,
    dateTime,
    description,
    image,
    name,
    type
  } = eventData
  return {
    address,
    assistantsExpected,
    date: strToDate(dateTime.date, dateTime.time),
    description,
    image,
    name,
    type,
    userOwner: userId,
    userOwner: userId
  }
}

export const strToDate = (date, time) => {
  const [day, month, year] = date.split('/')
  const [hour, min] = time.split(':')
  return new Date(year, parseInt(month) - 1, day, hour, min)
}
