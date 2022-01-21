import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ConnectStatus } from './const'

export interface TradeState {
  connectStatus: ConnectStatus
  lastWallet: string
}

const initialState: TradeState = {
  connectStatus: ConnectStatus.connect,
  lastWallet: '',
}

export const NetworkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    setConnectStatus(state, action: PayloadAction<ConnectStatus>) {
      state.connectStatus = action.payload
    },
  },
})

export const { setConnectStatus } = NetworkSlice.actions

export default NetworkSlice.reducer