import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MarketType, TransactionType } from './const'

export interface TypeState {
  marketType: MarketType | null,
  transactionType: TransactionType,
}

const initialState: TypeState = {
  marketType: MarketType.market,
  transactionType: TransactionType.sell,
}

export const MarketSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {
    setMarketType: (state, action: PayloadAction<MarketType>) => {
      state.marketType = action.payload
    },
    setTransactionType: (state, action: PayloadAction<TransactionType>) => { 
      state.transactionType = action.payload
    },
  },
})

export const { setMarketType, setTransactionType } = MarketSlice.actions

export default MarketSlice.reducer