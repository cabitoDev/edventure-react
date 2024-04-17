import { useDispatch } from 'react-redux'
import { updateFollowingEvents } from '../utils/httpUtils'
import { addFollowingEvents, deleteFollowingEvents } from '../redux/userSlice'
import { useState } from 'react'

const useFollow = (user, event) => {
  const dispatch = useDispatch()
  const isInitiallyFollowing = user.followingEvents.some(
    followedEvent => followedEvent.id === event.id
  )
  const [isFollowing, setIsFollowing] = useState(isInitiallyFollowing)

  const toggleFollow = () => {
    if (isFollowing) {
      setIsFollowing(false)
      dispatch(deleteFollowingEvents(event))
      updateFollowingEvents(user.id, event.id, 'DELETE')
    } else {
      setIsFollowing(true)
      dispatch(addFollowingEvents(event))
      updateFollowingEvents(user.id, event.id, 'PUT')
    }
  }

  return { isFollowing, toggleFollow }
}

export default useFollow
