import { createSlice } from '@reduxjs/toolkit'

export const eventSlice = createSlice({
  name: 'event',
  initialState: {
    name: '',
    description: '',
    address: '',
    dateTime: { date: '', time: '' },
    assistants: '',
    avatar: '',
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
    avatarUpated: (state, action) => {
      state.avatar = action.payload
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
  avatarUpated,
  typeUpated
} = eventSlice.actions

export default eventSlice.reducer
