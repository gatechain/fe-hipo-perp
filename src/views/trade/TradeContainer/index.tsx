import { Box } from '@material-ui/core'
import { blue } from '@material-ui/core/colors'
import { FC } from 'react'

export const TradeContainer: FC = () => {
  return <Box border={`1px solid ${blue[100]}`} flexGrow={1}>
    TradeContainer
  </Box>
}