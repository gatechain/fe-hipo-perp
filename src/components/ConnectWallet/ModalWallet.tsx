import { Box, Button, Typography } from '@material-ui/core'
import Modal, { ModalProps } from '@material-ui/core/Modal'
import { styled } from '@material-ui/styles'
import { useWeb3React } from '@web3-react/core'
import { FC, useEffect, useState } from 'react'
import { SupportedWalletsItem, SUPPORTED_WALLETS } from 'src/web3React/connector'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#232334',
  borderRadius: '0.5rem',
  padding: 2,
  '&:focus-visible': {
    outline: 'none',
  },
}

const Btn = styled(Button)({
  backgroundColor: '#232334',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#22222d',
    color: 'var(--color-purple)',
  },
})

const ModalWallet: FC<Omit<ModalProps, 'children'>> = ({
  open,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const { activate } = useWeb3React()

  useEffect(() => {
    setIsOpen(open)
  }, [open])

  const handleWallet = (walletOption: SupportedWalletsItem) => {
    activate(walletOption.connector).then(() => {
      setIsOpen(false)
    })
  }

  const walletButtonEles = () => {
    const ELE = SUPPORTED_WALLETS.map((walletOption) => {
      return <Btn
        onClick={() => handleWallet(walletOption)}
        key={walletOption.key}
      >
        {walletOption.name}
      </Btn>
    })

    return ELE
  }

  return <Modal
    open={isOpen}
  >
    <Box sx={style}>
      <Typography variant='subtitle1'>连接钱包</Typography>
      <Box mt={1} bgcolor="#171722" padding={2}>
        {walletButtonEles()}
      </Box>
    </Box>
  </Modal >
}

export default ModalWallet