import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { API } from 'src/Api'
import { AppThunk } from '..'
import { ConnectStatus } from './const'

export interface TradeState {
  connectStatus: ConnectStatus
  lastWallet: string
  isExists: boolean
}

const initialState: TradeState = {
  connectStatus: ConnectStatus.connect,
  lastWallet: '',
  isExists: true,
}

export const NetworkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    setConnectStatus(state, action: PayloadAction<ConnectStatus>) {
      state.connectStatus = action.payload
    },
    setIsExists(state, action: PayloadAction<boolean>) {
      state.isExists = action.payload
    },
  },
})

export const { setConnectStatus, setIsExists } = NetworkSlice.actions

export default NetworkSlice.reducer

export const fetchIsExists = (): AppThunk => async dispatch => {
  try {
    const { data } = await API.getExists({ ethereum_address: '0xD962E24F1630774aba2A77F49E5234E9E903D945' })
    dispatch(setIsExists(data.data.exists))
  } catch (error) {
    dispatch(setIsExists(false))
  }
}