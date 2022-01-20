import { Web3ReactManagerFunctions } from '@web3-react/core/dist/types'
import { injected } from './connector'

export class MetaMask {

}

enum MetaEvents {
  accountsChanged = 'accountsChanged',
}

export const metaMaskManage = (activate: Web3ReactManagerFunctions['activate']) => {
  if (!window?.ethereum) {
    return false
  }

  window?.ethereum?.on(MetaEvents.accountsChanged, (accounts) => {
    console.log(accounts)
    activate(injected)
  })
}