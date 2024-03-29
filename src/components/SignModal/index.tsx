import { Box, Modal, Typography } from '@material-ui/core';
import { FC } from 'react';
import { HpButton } from '../HpButton';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { API } from 'src/Api';
import { fetchIsExists, setOpenSignModal } from 'src/store/network';
import { useSign } from 'src/web3React/hooks';


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
  const sign = useSign()
  const { account, openSignModal } = useSelector((state: RootState) => state.network)
  const dispatch = useDispatch()

  const handleSubmit = () => {
    sign((params) => {
      API.postOnboarding(params).then((res: any) => {
        dispatch(setOpenSignModal(false))
        localStorage.setItem('token', res.jwt_token);
        localStorage.setItem('uid', res.uid);
        dispatch(fetchIsExists(account))
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