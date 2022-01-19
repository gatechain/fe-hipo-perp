import { Box } from '@material-ui/core'
import { FC } from 'react'
import { OrderBook } from './order/OrderBook'
import { Trade } from './trade/index'

export const TradeContainer: FC = () => {
  return <Box flexGrow={1} >
    <Box display="flex" height='100%'>
      <OrderBook />
      <Trade/>
    </Box>
    
  </Box>
}