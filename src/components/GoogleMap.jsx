import PropTypes from 'prop-types'
import React, { useEffect } from 'react'

const GoogleMap = ({ placeId }) => {
  useEffect(() => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 8
    })

    const service = new window.google.maps.places.PlacesService(map)
    service.getDetails(
      {
        placeId: placeId
      },
      (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          new window.google.maps.Marker({
            position: place.geometry.location,
            map,
            title: place.name
          })
          map.setCenter(place.geometry.location)
        }
      }
    )
  }, [placeId])

  return <div id='map' style={{ width: '100%', height: '400px' }}></div>
}

GoogleMap.propTypes = {
  placeId: PropTypes.string
}

export default GoogleMap
