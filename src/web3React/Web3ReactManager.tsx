import { useWeb3React } from '@web3-react/core'
import { FC, useEffect } from 'react'
import { injected } from './connector'
import { metaMaskManage } from './MetaMask'

const Web3ReactManager: FC = ({ children }) => {
  const { active, activate, error } = useWeb3React()

  useEffect(() => {
    metaMaskManage(activate)
  }, [])


  useEffect(() => {
    if (error || active) {
      return
    }
    // MetaMask connect
    if (window?.ethereum?.selectedAddress) {
      activate(injected)
    }
  }, [activate, active, error])

  return <>{children}</>
}

export default Web3ReactManager