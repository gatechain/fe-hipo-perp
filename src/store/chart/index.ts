import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ChartType } from './const'

export interface TypeState {
  chartType: ChartType | null,
}

const initialState: TypeState = {
  chartType: ChartType.kline,
  
}

export const ChartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    setChartType: (state, action: PayloadAction<ChartType>) => {
      state.chartType = action.payload
    },
    
  },
})

export const { setChartType } = ChartSlice.actions

export default ChartSlice.reducer