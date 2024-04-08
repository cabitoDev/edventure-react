import { createSlice } from '@reduxjs/toolkit'
import { Constants } from '../constants'

export const eventSlice = createSlice({
  name: 'event',
  initialState: {
    name: '',
    description: '',
    address: '',
    dateTime: { date: '', time: '' },
    assistants: '',
    image: Constants.DEFAULT_EVENT_IMAGE_URL,
    type: ''
  },
  reducers: {
    nameUpated: (state = '', action) => {
      state.name = action.payload
    },
    descriptionUpated: (state = '', action) => {
      state.description = action.payload
    },
    addressUpated: (state, action) => {
      state.address = action.payload
    },
    dateUpated: (state, action) => {
      state.dateTime = action.payload
    },
    assistantsUpated: (state, action) => {
      state.assistants = action.payload
    },
    imageUpated: (state, action) => {
      state.image = action.payload
    },
    typeUpated: (state, action) => {
      state.type = action.payload
    }
  }
})

export const {
  nameUpated,
  descriptionUpated,
  addressUpated,
  dateUpated,
  assistantsUpated,
  imageUpated,
  typeUpated
} = eventSlice.actions

export default eventSlice.reducer
