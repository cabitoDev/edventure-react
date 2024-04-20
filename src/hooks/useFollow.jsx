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
  const [followers, setFollowers] = useState(event?.usersFollowing.length || 0)

  const toggleFollow = () => {
    if (isFollowing) {
      setIsFollowing(false)
      setFollowers(prev => prev - 1)
      dispatch(deleteFollowingEvents(event))
      updateFollowingEvents(user.id, event.id, 'DELETE')
    } else {
      setIsFollowing(true)
      setFollowers(prev => prev + 1)

      dispatch(addFollowingEvents(event))
      updateFollowingEvents(user.id, event.id, 'PUT')
    }
  }

  return { followers, isFollowing, toggleFollow }
}

export default useFollow
