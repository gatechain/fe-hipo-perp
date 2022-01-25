import { Box, Modal, Typography } from '@material-ui/core';
import { FC, useMemo } from 'react';
import Web3 from 'web3';
import moment from 'moment';
import { HpButton } from '../HpButton';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { API } from 'src/Api';
import { setOpenSignModal } from 'src/store/network';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 328,
  bgcolor: '#232334',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  outline: 0,
};

export const SignModal: FC = () => {
  const { account, openSignModal } = useSelector((state: RootState) => state.network)
  const dispatch = useDispatch()

  const web3 = useMemo(() => {
    return new Web3(Web3.givenProvider || 'ws://localhost:8545')
  }, [])

  const handleSubmit = () => {
    const timestamp = moment().unix()
    const signData = { action: 'HIPO-ONBOARDING', timestamp }

    web3.eth.personal.sign(JSON.stringify(signData), account, '').then(data => {
      const fd = new FormData()
      fd.append('signature', data)
      fd.append('timestamp', timestamp.toString())
      fd.append('ethereum_address', account)
      API.postOnboarding(fd as any).then(() => {
        dispatch(setOpenSignModal(false))
        localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDMxODI4MzQsImlhdCI6MTY0MzA5NjQzNCwidWlkIjoiN2U4NmM4NzNlNTAwMzY4NThjNmZkMGZhZTU4NmE3OGIifQ.c0qBzX14fuDVPItxKKzFL1q2Eshkgm60OAFvxOHaRR8');
      })
    })
  }
  const body = (
    <>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        钱包签名
      </Typography>
      <Typography id="modal-modal-description" variant='body2' sx={{ mt: 1, mb: 2 }} color="#6f6e84">
        您将收到签名请求。签名是免费的，而且不会发送交易。
      </Typography>
      <HpButton fullWidth onClick={handleSubmit}>发送请求</HpButton>
    </>
  )
  const handleClose = () => {
    dispatch(setOpenSignModal(false))
  }

  return <Modal
    open={openSignModal}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      {body}
    </Box>
  </Modal>
}