import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { OrderType } from './const'

export interface TypeState {
  orderType: OrderType | null,
  
}

const initialState: TypeState = {
  orderType: OrderType.position,
}

export const OrderSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {
    setOrderType: (state, action: PayloadAction<OrderType>) => {
      state.orderType = action.payload
    },
  },
})

export const { setOrderType } = OrderSlice.actions

export default OrderSlice.reducer