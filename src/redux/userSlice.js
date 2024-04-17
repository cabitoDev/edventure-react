import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
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
    },
    addUserEvents: (state, action) => {
      return {
        ...state,
        userEvents: [...state.followingEvents, action.payload]
      }
    },
    updateUserEvents: (state, action) => {
      const updatedUserEvents = state.userEvents.map(event => {
        if (event.id === action.payload.id) {
          return action.payload
        } else {
          return event
        }
      })

      return {
        ...state,
        userEvents: updatedUserEvents
      }
    },
    deleteUserEvents: (state, action) => {
      const updatedUserEvents = state.userEvents.filter(
        event => event.id !== action.payload.id
      )
      return {
        ...state,
        userEvents: updatedUserEvents
      }
    }
  }
})

export const {
  updateUser,
  addFollowingEvents,
  deleteFollowingEvents,
  addUserEvents,
  updateUserEvents,
  deleteUserEvents
} = userSlice.actions

export default userSlice.reducer
