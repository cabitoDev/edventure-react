import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'

export const uploadImage = async (dir, id, file) => {
  const storage = getStorage()
  const storageRef = ref(storage, `${dir}/${id}`)
  const snapshot = await uploadBytes(storageRef, file)
  const downloadURL = await getDownloadURL(snapshot.ref)
  return downloadURL
}

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

export const formatMilisec = ms => {
  const days = Math.floor(ms / (1000 * 60 * 60 * 24))
  const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((ms % (1000 * 60)) / 1000)

  return { days, hours, minutes, seconds }
}

export const getNewEventRequest = (eventData, newImage, user) => {
  const { address, assistants, date, time, description, placeId, name, type } =
    eventData
  return {
    address,
    placeId,
    assistants,
    date: strToDate(date, time),
    description,
    image: newImage,
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

export const dateToStr = dateStr => {
  const date = new Date(dateStr)
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  const formattedDay = String(day).padStart(2, '0')
  const formattedMonth = String(month).padStart(2, '0')

  return `${formattedDay}/${formattedMonth}/${year}`
}

export const strToDate = (date, time) => {
  const [day, month, year] = date.split('/')
  const [hour, min] = time.split(':')
  return new Date(year, parseInt(month) - 1, day, hour, min)
}
