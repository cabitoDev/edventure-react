import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    updateUser: (state, action) => {
      return action.payload
    },
    updateFollowingEventsAction: (state, action) => {
      return {
        ...state,
        followingEvents: [...state.followingEvents, action.payload]
      }
    }
  }
})

export const { updateUser, updateFollowingEventsAction } = userSlice.actions

export default userSlice.reducer
