import { FC } from 'react'
import { Box } from '@material-ui/core'
import { TradeTop } from './TradeTop'
import { TradeOperation } from './TradeOperation'
import { TradeContainer } from './TradeContainer'

export const TradeView: FC = () => {
  return <Box display="flex" flexDirection="column" height="100%" bgcolor="#1c1c28" borderBottom="1px solid #2d2d3d">
    <TradeTop />
    <Box flexGrow={1} display="flex">
      <TradeOperation />
      <TradeContainer />
    </Box>
  </Box>
}