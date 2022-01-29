import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { API } from 'src/Api'
import { OrderType } from './const'

export interface TypeState {
  orderType: OrderType | null,
  orderList: any[],
  successOrderList: any[],
}

const initialState: TypeState = {
  orderType: OrderType.position,
  orderList: [],
  successOrderList: [],
}

export const OrderSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {
    setOrderType: (state, action: PayloadAction<OrderType>) => {
      state.orderType = action.payload
    },
    setOrdersList: (state, action: PayloadAction<any[]>) => {
      state.orderList = action.payload
    },
    setSuccessOrderList: (state, action: PayloadAction<any[]>) => {
      state.orderList = action.payload
    },
  },
})

export const { setOrderType, setOrdersList, setSuccessOrderList } = OrderSlice.actions

export default OrderSlice.reducer

export const loadOrderList = (market: string, side: string) => async dispatch => {
  try {
    const list = await API.getOrders({
      market: market || '',
      side: side || '',
    })
    dispatch(setOrdersList(list))
    return
  } catch (error) {
    console.log(error)
    dispatch(setOrdersList(null))
  }
}