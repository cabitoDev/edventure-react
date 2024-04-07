import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import eventReducer from './eventSlice'
import nextStepReducer from './nextStepSlice'
import { combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
  user: userReducer,
  event: eventReducer,
  nextStep: nextStepReducer
})

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer
})

export const persistor = persistStore(store)
