import { useEffect, useState } from 'react'

const useEventSearch = (allEvents, user) => {
  const [currentEvents, setCurrentEvents] = useState([])
  const [isSearching, setIsSearching] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterOther, setFilterOther] = useState('ALL')

  useEffect(() => {
    if (allEvents && user) {
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
            return filteredEvent.usersFollowing.some(
              follower => follower.id === user.id
            )
          })
          break
        case 'NOT_FOLLOWING':
          filteredEvents = filteredEvents.filter(filteredEvent => {
            return !filteredEvent.usersFollowing.some(
              follower =>
                (follower.id === user.id) !== filteredEvent.userOwner.id
            )
          })
          break
        case 'ALL':
          break
        default:
          break
      }

      setCurrentEvents(filteredEvents.slice(0, 5))
      setIsSearching(false)
    }
  }, [searchQuery, filterType, filterOther, allEvents, user])

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
    handleFilterOtherChange,
    isSearching
  }
}

export default useEventSearch
