import { FC } from 'react'
import { HpButton } from '../HpButton'
import ModalWallet from './ModalWallet'

const ConnectWallet: FC = () => {
  return <>
    <HpButton variant='contained'>连接钱包</HpButton>
    <ModalWallet open={true} />
  </>
}

export default ConnectWallet