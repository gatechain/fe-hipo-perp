import { Box, Typography } from '@material-ui/core'
import { useWeb3React } from '@web3-react/core'
import { FC, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/store'
import { setAccount, setConnectButtonStatus } from 'src/store/network'
import { ConnectButtonStatus } from 'src/store/network/const'
import { showHeadAndEnd } from 'src/utils'
import { HpButton } from '../HpButton'
import ModalWallet from './ModalWallet'

const ConnectWallet: FC = () => {
  const { active, error, account } = useWeb3React()
  const connectButtonStatus = useSelector((state: RootState) => state.network.connectButtonStatus)
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()

  const accountStr: string = useMemo(() => {
    let selectedAddress = ''
    if (typeof window !== 'undefined') {
      selectedAddress = window?.ethereum?.selectedAddress
    }
    return account?.toLocaleLowerCase() || selectedAddress
  }, [account]);

  useEffect(() => {
    dispatch(setAccount(accountStr))
  }, [accountStr, dispatch])

  const connectEle = useMemo(() => {
    return <Box color="#ccc">
      <Box mr={2} component="span">🟢</Box>
      <Typography variant='caption' mr={2}>
        {showHeadAndEnd(accountStr)}
      </Typography>
    </Box>
  }, [accountStr])

  const statusEle = useMemo(() => ({
    [ConnectButtonStatus.disconnect]: <HpButton variant="contained" onClick={() => setIsOpen(true)}>连接钱包</HpButton>,
    [ConnectButtonStatus.connect]: connectEle,
    [ConnectButtonStatus.chainChanged]: connectEle,
  }), [connectEle])

  useEffect(() => {
    if (error) {
      dispatch(setConnectButtonStatus(ConnectButtonStatus.chainChanged))
      return
    }

    if (active) {
      dispatch(setConnectButtonStatus(ConnectButtonStatus.connect))
      return
    }

    dispatch(setConnectButtonStatus(ConnectButtonStatus.disconnect))
  }, [active, error, dispatch])

  return <>
    {statusEle[connectButtonStatus]}
    <ModalWallet open={isOpen} />
  </>
}

export default ConnectWallet