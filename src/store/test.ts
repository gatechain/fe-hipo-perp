import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface TestState {
  value: number
}

const initialState: TestState = {
  value: 0,
}

export const TestSlice = createSlice({
  name: 'Test',
  initialState,
  reducers: {
    increment: (state) => {
      console.log('increment')
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = TestSlice.actions

export default TestSlice.reducer