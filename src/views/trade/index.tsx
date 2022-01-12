import { FC } from 'react'
import { Box } from '@material-ui/core'
import { TradeTop } from './TradeTop'
import { TradeOperation } from './TradeOperation'
import { TradeContainer } from './TradeContainer'

export const TradeView: FC = () => {
  return <Box display="flex" flexDirection="column" height="100%">
    <TradeTop />
    <Box flexGrow={1} display="flex">
      <TradeOperation />
      <TradeContainer />
    </Box>
  </Box>
}