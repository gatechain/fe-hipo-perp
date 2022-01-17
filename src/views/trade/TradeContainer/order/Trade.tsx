import { Box } from '@material-ui/core'
import { FC } from 'react'
import { Item } from './Item'

export const Trade: FC = () => {
  return <Box flexGrow={1} position="relative">
  <Box position="absolute" width="100%" height="100%" sx={{ overflowY: 'scroll', '&::-webkit-scrollbar': { display:'none' } }}>
      <Item type="trade" direction="buy" />
      <Item type="trade" direction="buy" />
      <Item type="trade" direction="buy" />
      <Item type="trade" direction="buy" />
      <Item type="trade" direction="buy" />
      <Item type="trade" direction="buy" />
      <Item type="trade" direction="sell" />
      <Item type="trade" direction="sell" />
      <Item type="trade" direction="sell" />
      <Item type="trade" direction="sell" />
      <Item type="trade" direction="sell" />
      <Item type="trade" direction="sell" />
      <Item type="trade" direction="sell" />
      <Item type="trade" direction="sell" />
      <Item type="trade" direction="sell" />
      <Item type="trade" direction="sell" />
      <Item type="trade" direction="sell" />
      <Item type="trade" direction="sell" />
      <Item type="trade" direction="sell" />
      <Item type="trade" direction="sell" />
  </Box>
  
</Box>
}