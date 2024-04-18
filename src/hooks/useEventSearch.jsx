import { useEffect, useState } from 'react'

const useEventSearch = (allEvents, user) => {
  const [currentEvents, setCurrentEvents] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterOther, setFilterOther] = useState('ALL')

  useEffect(() => {
    let filteredEvents = allEvents.filter(filteredEvent =>
      filteredEvent.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    if (filterType) {
      filteredEvents = filteredEvents.filter(filteredEvent =>
        filterType.toLowerCase().includes(filteredEvent.type.toLowerCase())
      )
    }

    switch (filterOther) {
      case 'OWNER':
        filteredEvents = filteredEvents.filter(filteredEvent =>
          user.userEvents.some(ev => ev.id === filteredEvent.id)
        )
        break
      case 'FOLLOWING':
        filteredEvents = filteredEvents.filter(filteredEvent => {
          if (filteredEvent.usersFollowing)
            return filteredEvent.usersFollowing.some(
              follower => follower.id === user.id
            )
        })
        break
      case 'NOT_FOLLOWING':
        filteredEvents = filteredEvents.filter(filteredEvent => {
          if (
            filteredEvent.usersFollowing &&
            filteredEvent.userOwner.id !== user.id
          )
            return !filteredEvent.usersFollowing.some(
              follower => follower.id === user.id
            )
        })
        break
      case 'ALL':
        break
      default:
        break
    }

    setCurrentEvents(filteredEvents.slice(0, 5))
  }, [searchQuery, filterType, filterOther, allEvents])

  const handlePageChange = indexPage => {
    setCurrentEvents(allEvents.slice((indexPage - 1) * 5, indexPage * 5))
  }

  const handleSearchChange = value => {
    setSearchQuery(value)
  }

  const handleFilterChange = ev => {
    setFilterType(ev.target.value)
  }
  const handleFilterOtherChange = ev => {
    setFilterOther(ev.target.value)
  }

  return {
    currentEvents,
    handlePageChange,
    handleSearchChange,
    handleFilterChange,
    handleFilterOtherChange
  }
}

export default useEventSearch
