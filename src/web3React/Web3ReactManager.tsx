import { useWeb3React } from '@web3-react/core'
import { FC, useEffect } from 'react'
import { Ether } from 'src/sdk/ether'
// import { injected } from './connector'
// import { metaMaskManage } from './MetaMask'

const Web3ReactManager: FC<any> = ({ children }) => {
  const { library, account } = useWeb3React()

  useEffect(() => {
    if (library && account) {
      Ether.getInstance({
        provider: library,
        signer: library?.getSigner(account)?.connectUnchecked(),
      })
    }
  }, [library, account])

  // useEffect(() => {
  //   metaMaskManage(activate)
  // }, [])


  // useEffect(() => {
  //   if (error || active) {
  //     return
  //   }
  //   // MetaMask connect
  //   if (window?.ethereum?.selectedAddress) {
  //     activate(injected)
  //   }
  // }, [activate, active, error])

  return children
}

export default Web3ReactManager