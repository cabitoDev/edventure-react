export const getMatches = async text => {
  return new Promise((resolve) => {
    try {
      console.log(window.google)
      new window.google.maps.places.AutocompleteService().getPlacePredictions(
        {
          input: text,
          types: ['address']
        },
        resolve
      )
    } catch (e) {
      console.log(e)
    }
  })
}
