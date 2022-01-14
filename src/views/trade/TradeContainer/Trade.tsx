import { Box } from '@material-ui/core'
import { FC } from 'react'
import { OrderBookItem } from './OrderBookItem'

export const Trade: FC = () => {
  return <Box flexGrow={1} position="relative">
  <Box position="absolute" width="100%" height="100%" sx={{ overflowY: 'scroll', '&::-webkit-scrollbar': { display:'none' } }}>
    <OrderBookItem type="trade" direction="buy"/>
  </Box>
  
</Box>
}