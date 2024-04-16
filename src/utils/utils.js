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

export const getNewEventRequest = (eventData, newImage, user) => {
  const { address, assistants, date, time, description, image, name, type } =
    eventData
  return {
    address,
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

export const strToDate = (date, time) => {
  const [day, month, year] = date.split('/')
  const [hour, min] = time.split(':')
  return new Date(year, parseInt(month) - 1, day, hour, min)
}
