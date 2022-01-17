import { Box } from '@material-ui/core'
import { blue } from '@material-ui/core/colors'
import { FC } from 'react'
import { OrderBook } from './order/OrderBook'
import { Trade } from './trade/index'

export const TradeContainer: FC = () => {
  return <Box border={`1px solid ${blue[100]}`} flexGrow={1} >
    <Box display="flex" height='100%'>
      <OrderBook />
      <Trade/>
    </Box>
    
  </Box>
}