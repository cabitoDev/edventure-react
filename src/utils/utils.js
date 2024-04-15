export const getLoginRequest = userData => {
  return {
    id: parseInt(userData.sub.slice(-5)),
    nickname: userData.nickname,
    name: userData.given_name,
    lastname: userData.family_name,
    email: userData.email,
    loggedDate: userData.updated_at,
    avatar: userData.picture
  }
}

export const getNewEventRequest = (eventData, user) => {
  const { address, assistants, date, time, description, image, name, type } =
    eventData
  return {
    address,
    assistants,
    date: strToDate(date, time),
    description,
    image,
    name,
    type,
    userOwner: {
      id: user.id,
      name: user.name,
      nickname: user.nickname,
      email: user.email,
      loggedDate: user.loggedDate
    }
  }
}

export const strToDate = (date, time) => {
  const [day, month, year] = date.split('/')
  const [hour, min] = time.split(':')
  return new Date(year, parseInt(month) - 1, day, hour, min)
}
