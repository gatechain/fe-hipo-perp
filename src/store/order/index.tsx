import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { OrderType } from './const'

export interface TypeState {
  orderType: OrderType | null,
  orderList: any[] 
}

const initialState: TypeState = {
  orderType: OrderType.position,
  orderList:[],
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
  },
})

export const { setOrderType, setOrdersList } = OrderSlice.actions

export default OrderSlice.reducer