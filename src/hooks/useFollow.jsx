import { updateFollowingEvents } from '../utils'
import { useEffect, useState } from 'react'

const useFollow = (user, event) => {
  const isInitiallyFollowing = user?.followingEvents.some(
    followedEvent => followedEvent.id === event?.id
  )
  const [isFollowing, setIsFollowing] = useState()
  const [followers, setFollowers] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (event && user) {
      setIsFollowing(isInitiallyFollowing)
      setFollowers(event.usersFollowing.length)
      setIsLoading(false)
    }
  }, [event, user])

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
    setIsLoading(false)
  }

  return { followers, isFollowing, toggleFollow, isLoading }
}

export default useFollow
