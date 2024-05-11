import { createSlice } from '@reduxjs/toolkit'

const tokenSlice = createSlice({
  name: 'token',
  initialState: null,
  reducers: {
    updateToken: (state, action) => {
      return action.payload
    }
  }
})

export const { updateToken } = tokenSlice.actions

export default tokenSlice.reducer
