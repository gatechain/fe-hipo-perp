import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MarketType, DirectionType } from './const'

export interface TypeState {
  marketType: MarketType | null,
  directionType: DirectionType,
  marketSymbol: string,
  isShowSymbolList: boolean,
}

const initialState: TypeState = {
  marketType: MarketType.market,
  directionType: DirectionType.sell,
  marketSymbol: 'ETH-USD',
  isShowSymbolList: false,
}

export const MarketSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {
    setMarketType: (state, action: PayloadAction<MarketType>) => {
      state.marketType = action.payload
    },
    setDirectionType: (state, action: PayloadAction<DirectionType>) => { 
      state.directionType = action.payload
    },
    setMarketSymbol: (state, action: PayloadAction<string>) => { 
      state.marketSymbol = action.payload
    },
    setIsShowSymbolList: (state, action: PayloadAction<boolean>) => { 
      state.isShowSymbolList = action.payload
    },
  },
})

export const { setMarketType, setDirectionType, setMarketSymbol, setIsShowSymbolList } = MarketSlice.actions

export default MarketSlice.reducer