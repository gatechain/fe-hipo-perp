import { FC, useState } from 'react'
import { HpButton } from '../HpButton'
import ModalWallet from './ModalWallet'

const ConnectWallet: FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  return <>
    <HpButton variant='contained' onClick={() => setIsOpen(true)}>连接钱包</HpButton>
    <ModalWallet open={isOpen} />
  </>
}

export default ConnectWallet