import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { load, save } from 'redux-localstorage-simple'
import isBrowser from 'src/utils/isBrowser'
import TestSliceReducer from './test'
import TradeSliceReducer from './trade'
import MarketTypeReducer from './market'
import OrderTypeReducer from './order'
import NetworkSliceReducer from './network'
import ChartSliceReducer from './chart'

export const store = configureStore({
  reducer: {
    test: TestSliceReducer,
    trade: TradeSliceReducer,
    market: MarketTypeReducer,
    order: OrderTypeReducer,
    network: NetworkSliceReducer,
    chart: ChartSliceReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    isBrowser() ? save(load()) : null,
  ].filter(mid => !!mid) as any,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispath = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>