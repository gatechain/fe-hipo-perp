import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { API } from 'src/Api'
import { OrderType } from './const'

export interface TypeState {
  orderType: OrderType | null,
  successOrderList: any[],
  orderData: any,
  orderList: any[],
}

const initialState: TypeState = {
  orderType: OrderType.position,
  successOrderList: [],
  orderData: {},
  orderList:[],
}

export const OrderSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {
    setOrderType: (state, action: PayloadAction<OrderType>) => {
      state.orderType = action.payload
    },
    setSuccessOrderList: (state, action: PayloadAction<any[]>) => {
      state.orderList = action.payload
    },
    setOrderData: (state, action: PayloadAction<any>) => { 
      state.orderData = action.payload
    },
  },
})

export const { setOrderType, setSuccessOrderList, setOrderData } = OrderSlice.actions

export default OrderSlice.reducer

export const loadOrderList = (pageIndex: number, pageSize: number, market?: string, side?: string) => async dispatch => {
  try {
    const data = await API.getOrders({
      market: market || '', 
      side: side || '',
      page_index: pageIndex,
      page_size: pageSize,
    })
    dispatch(setOrderData(data))
    return
  } catch (error) {
    console.log(error)
    dispatch(setOrderData({}))
  }
}