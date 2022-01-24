import { Box } from '@material-ui/core'
import { FC } from 'react'
import ConnectWallet from 'src/components/ConnectWallet'
import { GlobalNav } from './GlobalNav'

export const GlobalHeader: FC = () => {
  return <Box display="flex" justifyContent="space-between" alignItems="center" bgcolor="#1c1c28" borderBottom='1px solid #2d2d3d'>
    <Box flexGrow={1}><GlobalNav /></Box>
    <Box>
      <ConnectWallet />
    </Box>
  </Box>
}