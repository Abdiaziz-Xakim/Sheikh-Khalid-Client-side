// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import users from './users'
import feepayments from './fees'
import inactive from './inactiveusers'
import students from './students'

export const store = configureStore({
  reducer: {
    users,
    feepayments,
    inactive,
    students,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>