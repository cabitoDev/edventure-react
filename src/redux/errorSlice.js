import { createSlice } from '@reduxjs/toolkit'

const errorSlice = createSlice({
  name: 'error',
  initialState: null,
  reducers: {
    updateError: (state, action) => {
      return action.payload
    }
  }
})

export const { updateError } = errorSlice.actions

export default errorSlice.reducer
