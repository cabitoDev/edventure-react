import { updateFollowingEvents } from '../utils'
import { useState } from 'react'

const useFollow = (user, event) => {
  const isInitiallyFollowing = user?.followingEvents.some(
    followedEvent => followedEvent.id === event?.id
  )
  const [isFollowing, setIsFollowing] = useState(isInitiallyFollowing)
  const [followers, setFollowers] = useState(event?.usersFollowing.length)

  const toggleFollow = () => {
    if (isFollowing) {
      setIsFollowing(false)
      setFollowers(prev => prev - 1)
      updateFollowingEvents(user.id, event.id, 'DELETE')
    } else {
      setIsFollowing(true)
      setFollowers(prev => prev + 1)

      updateFollowingEvents(user.id, event.id, 'PUT')
    }
  }

  return { followers, isFollowing, toggleFollow }
}

export default useFollow
