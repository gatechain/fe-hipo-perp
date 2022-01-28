import { UnsupportedChainIdError } from '@web3-react/core'
import { InjectedConnector, NoEthereumProviderError } from '@web3-react/injected-connector'

export enum ConnectorNames {
  Injected = 'Injected 链接 metahaha',
  // Network = 'Network',
  // WalletConnect = 'WalletConnect',
  // WalletLink = 'WalletLink',
  // Ledger = 'Ledger',
  // Trezor = 'Trezor',
  // Lattice = 'Lattice',
  // Frame = 'Frame',
  // Authereum = 'Authereum',
  // Fortmatic = 'Fortmatic',
  // Magic = 'Magic',
  // Portis = 'Portis',
  // Torus = 'Torus',
}

export const injected = new InjectedConnector({ supportedChainIds: [85] })


export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  // [ConnectorNames.Network]: network,
  // [ConnectorNames.WalletConnect]: walletconnect,
  // [ConnectorNames.WalletLink]: walletlink,
  // [ConnectorNames.Ledger]: ledger,
  // [ConnectorNames.Trezor]: trezor,
  // [ConnectorNames.Lattice]: lattice,
  // [ConnectorNames.Frame]: frame,
  // [ConnectorNames.Authereum]: authereum,
  // [ConnectorNames.Fortmatic]: fortmatic,
  // [ConnectorNames.Magic]: magic,
  // [ConnectorNames.Portis]: portis,
  // [ConnectorNames.Torus]: torus,
}

export function getErrorMessage(error: Error) {
  if (error instanceof NoEthereumProviderError) {
    return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.'
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network."
  } else {
    console.error(error)
    return 'An unknown error occurred. Check the console for more details.'
  }
}

export function useConnectWallet() {

}

export interface SupportedWalletsItem {
  connector?: InjectedConnector
  name: string
  iconName: string
  key: string
  description: string
}

// 支持的钱包
export const SUPPORTED_WALLETS: SupportedWalletsItem[] = [
  {
    connector: injected,
    key: 'METAMASK',
    name: 'MetaMask',
    iconName: 'icon-metamask',
    description: 'Easy-to-use browser extension.',
  },
]



