import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    updateUser: (state, action) => {
      return action.payload
    },
    addFollowingEvents: (state, action) => {
      return {
        ...state,
        followingEvents: [...state.followingEvents, action.payload]
      }
    },
    deleteFollowingEvents: (state, action) => {
      const updatedFollowingEvents = state.followingEvents.filter(
        event => event.id !== action.payload.id
      )
      return {
        ...state,
        followingEvents: updatedFollowingEvents
      }
    }
  }
})

export const { updateUser, addFollowingEvents, deleteFollowingEvents } =
  userSlice.actions

export default userSlice.reducer
