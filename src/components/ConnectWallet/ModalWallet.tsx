import { Box, Typography } from '@material-ui/core'
import Modal, { ModalProps } from '@material-ui/core/Modal'
import { FC } from 'react'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  p: 4,
  '&:focus-visible': {
    outline: 'none',
  },
}

const ModalWallet: FC<Omit<ModalProps, 'children'>> = ({
  open,
}) => {
  return <Modal
    open={open}
  >
    <Box sx={style}>
      <Typography variant='subtitle1'>连接钱包</Typography>
      <Box>

      </Box>
    </Box>
  </Modal>
}

export default ModalWallet