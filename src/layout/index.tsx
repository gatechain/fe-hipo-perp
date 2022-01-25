import { Box, CssBaseline } from '@material-ui/core'
import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SignModal } from 'src/components/SignModal'
import { RootState } from 'src/store'
import { fetchIsExists } from 'src/store/network'
import { GlobalHeader } from './GlobalHeader'


export const Layout: FC = ({ children }) => {
  const dispatch = useDispatch()
  const account = useSelector((state: RootState) => state.network.account)
  useEffect(() => {
    if (account) {
      dispatch(fetchIsExists(account))
    }
  }, [dispatch, account])

  return <React.Fragment>
    <CssBaseline />
    <Box id="app" display="flex" flexDirection="column">
      <GlobalHeader />
      <Box flexGrow={1}>
        {children}
      </Box>
      <SignModal />
    </Box>
  </React.Fragment>
}