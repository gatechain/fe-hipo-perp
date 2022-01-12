import { configureStore } from '@reduxjs/toolkit'
import { load, save } from 'redux-localstorage-simple'
import isBrowser from 'src/utils/isBrowser'
import TestSliceReducer from './test'

export const store = configureStore({
  reducer: {
    test: TestSliceReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    isBrowser() ? save(load()) : null,
  ].filter(mid => !!mid) as any,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispath = typeof store.dispatch