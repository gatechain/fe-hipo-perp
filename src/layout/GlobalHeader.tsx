import { Box } from '@material-ui/core'
import { FC } from 'react'
import { GlobalNav } from './GlobalNav'

export const GlobalHeader: FC = () => {
  return <Box display="flex">
    <GlobalNav />
  </Box>
}