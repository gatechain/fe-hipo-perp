import { Box } from '@material-ui/core'
import { useWeb3React } from '@web3-react/core'
import { FC, useEffect, useMemo, useState } from 'react'
import { HpButton } from '../HpButton'
import ModalWallet from './ModalWallet'

enum StatusType {
  connect,
  active,
  account,
  error,
}

const ConnectWallet: FC = () => {
  const { active, error, account } = useWeb3React()

  const [isOpen, setIsOpen] = useState(false)
  const [status, setStatus] = useState<StatusType>(StatusType.connect)

  const statusEle = useMemo(() => ({
    [StatusType.connect]: <HpButton variant="contained" onClick={() => setIsOpen(true)}>连接钱包</HpButton>,
    [StatusType.account]: <Box color="#ccc">🟢  已连接  {account}</Box>,
    [StatusType.error]: <Box>🔴 链接失败</Box>,
  }), [account])

  useEffect(() => {
    if (active && error) {
      setStatus(StatusType.error)
      return
    }

    if (active) {
      setStatus(StatusType.account)
      return
    }
    setStatus(StatusType.connect)
  }, [active, error])

  return <>
    {statusEle[status]}
    <ModalWallet open={isOpen} />
  </>
}

export default ConnectWallet