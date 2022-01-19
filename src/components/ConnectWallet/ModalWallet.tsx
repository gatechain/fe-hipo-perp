import { Box, Button, Typography } from '@material-ui/core'
import Modal, { ModalProps } from '@material-ui/core/Modal'
import { styled } from '@material-ui/styles'
import { FC } from 'react'

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
  return <Modal
    open={open}
  >
    <Box sx={style}>
      <Typography variant='subtitle1'>连接钱包</Typography>
      <Box mt={1} bgcolor="#171722" padding={2}>
        <Btn>MetaMask</Btn>
      </Box>
    </Box>
  </Modal >
}

export default ModalWallet