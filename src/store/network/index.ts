import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { API } from 'src/Api'
import { AppThunk } from '..'
import { ConnectButtonStatus, ConnectStatus } from './const'

export interface TradeState {
  connectStatus: ConnectStatus
  connectButtonStatus: ConnectButtonStatus
  lastWallet: string
  isExists: boolean
  account: string
  openSignModal: boolean
}

const initialState: TradeState = {
  connectStatus: ConnectStatus.connect,
  connectButtonStatus: ConnectButtonStatus.disconnect,
  lastWallet: '',
  account: '',
  isExists: false,
  openSignModal: false,
}

export const NetworkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
    setConnectStatus(state, action: PayloadAction<ConnectStatus>) {
      state.connectStatus = action.payload
    },
    setConnectButtonStatus(state, action: PayloadAction<ConnectButtonStatus>) {
      state.connectButtonStatus = action.payload
    },
    setAccount(state, action: PayloadAction<string>) {
      state.account = action.payload
    },
    setIsExists(state, action: PayloadAction<boolean>) {
      state.isExists = action.payload
    },
    setOpenSignModal(state, action: PayloadAction<boolean>) {
      state.openSignModal = action.payload
    },
  },
})

export const { setConnectStatus, setIsExists, setConnectButtonStatus, setAccount, setOpenSignModal } = NetworkSlice.actions

export default NetworkSlice.reducer

// 查看地址是否已注册
export const fetchIsExists = (ethereum_address: string): AppThunk => async dispatch => {
  try {
    const res = await API.getExists({ ethereum_address })
    dispatch(setIsExists(true || res.exists))
  } catch (error) {
    dispatch(setIsExists(false))
  }
}