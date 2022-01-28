import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { API } from 'src/Api'
import { AppThunk } from '..'
import { ConnectButtonStatus, ConnectStatus, UserInfo } from './const'

export interface TradeState {
  connectStatus: ConnectStatus
  connectButtonStatus: ConnectButtonStatus
  lastWallet: string
  isExists: boolean
  account: string
  openSignModal: boolean
  userInfo: UserInfo
  accountInfo: any
}

const initialState: TradeState = {
  connectStatus: ConnectStatus.connect,
  connectButtonStatus: ConnectButtonStatus.disconnect,
  lastWallet: '',
  account: '',
  isExists: false, // 是否登录
  openSignModal: false,
  userInfo: {
    uid: '7e86c873e50036858c6fd0fae586a78b',
    name: '',
    ether_address: '0xD962E24F1630774aba2A77F49E5234E9E903D941',
    email: '',
    maker_fee: '400',
    taker_fee: '0.0005',
    is_verified: 0,
    created_at: '2022-01-20 10:29:08',
    updated_at: '2022-01-20 10:29:08',
  },
  accountInfo: {},
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
    setUserDetail(state, action: PayloadAction<{ user: any, account: any }>) {
      state.userInfo = action.payload.user
      state.accountInfo = action.payload.account
    },
  },
})

export const { setConnectStatus, setIsExists, setConnectButtonStatus, setAccount, setOpenSignModal, setUserDetail } = NetworkSlice.actions

export default NetworkSlice.reducer
export const fetchUser = (): AppThunk => async dispatch => {
  try {
    const res = await API.getUser()
    dispatch(setUserDetail(res))
    return
  } catch (error) {
    console.log(error)
    // TODO
    dispatch(setIsExists(false))
  }
}
// 查看地址是否已注册
export const fetchIsExists = (ethereum_address: string): AppThunk => async dispatch => {
  try {
    const res = await API.getExists({ ethereum_address })
    const token = localStorage.getItem('token')
    const exists = token ? res.exists : false
    if (exists) {
      dispatch(fetchUser())
    }
    dispatch(setIsExists(exists))
  } catch (error) {
    dispatch(setIsExists(false))
  }
}


