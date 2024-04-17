import { useEffect, useState } from 'react'

const useEventSearch = (allEvents, user) => {
  const [currentEvents, setCurrentEvents] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterOther, setFilterOther] = useState('ALL')

  useEffect(() => {
    let filteredEvents = allEvents.filter(event =>
      event.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    if (filterType) {
      filteredEvents = filteredEvents.filter(event =>
        filterType.toLowerCase().includes(event.type.toLowerCase())
      )
    }

    switch (filterOther) {
      case 'OWNER':
        filteredEvents = filteredEvents.filter(
          event => event.userOwner.id === user.id
        )
        break
      case 'FOLLOWING':
        filteredEvents = filteredEvents.filter(event =>
          event.usersFollowing.some(follower => follower.id === user.id)
        )
        break
      case 'NOT_FOLLOWING':
        filteredEvents = filteredEvents.filter(
          event =>
            !event.usersFollowing.some(follower => follower.id === user.id)
        )
        break
      case 'ALL':
        break
      default:
        break
    }

    setCurrentEvents(filteredEvents.slice(0, 5))
  }, [searchQuery, filterType, filterOther])

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
