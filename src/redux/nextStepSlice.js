import { createSlice } from '@reduxjs/toolkit'

export const nextStepSlice = createSlice({
  name: 'nextStep',
  initialState: false,
  reducers: {
    nextStepAvailable: (state, action) => {
      return action.payload
    }
  }
})

export const { nextStepAvailable } = nextStepSlice.actions

export default nextStepSlice.reducer
