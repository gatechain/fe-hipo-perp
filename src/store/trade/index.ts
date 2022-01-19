import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { OperationType } from './const'

export interface TradeState {
  operationType: OperationType | null
}

const initialState: TradeState = {
  operationType: null,
}

export const TradeSlice = createSlice({
  name: 'trade',
  initialState,
  reducers: {
    setOperationType: (state, action: PayloadAction<OperationType>) => {
      state.operationType = action.payload
    },
  },
})

export const { setOperationType } = TradeSlice.actions

export default TradeSlice.reducer