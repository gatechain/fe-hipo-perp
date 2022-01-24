import { FC, useEffect } from 'react'
import { Box } from '@material-ui/core'
import { TradeTop } from './TradeTop'
import { TradeOperation } from './TradeOperation'
import { TradeContainer } from './TradeContainer'
import { useDispatch } from 'react-redux'
import { fetchIsExists } from 'src/store/network'

export const TradeView: FC = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchIsExists())
  }, [dispatch])
  return <Box display="flex" flexDirection="column" height="100%" bgcolor="#1c1c28">
    <TradeTop />
    <Box flexGrow={1} display="flex">
      <TradeOperation />
      <TradeContainer />
    </Box>
  </Box>
}