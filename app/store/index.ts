// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import users from './users'
import students from './students'
import feepayments from './fees'
import inactive from './inactiveusers'

export const store = configureStore({
  reducer: {
    users,
    students,
    feepayments,
    inactive,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>