import { FC } from 'react'
// import { NetWorkContextName } from 'src/constants'
import { Web3ReactProvider as BaseWeb3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
// import isBrowser from 'src/utils/isBrowser'
import Web3ReactManager from './Web3ReactManager'

function getLibrary(provider) {
  const library = new Web3Provider(provider)
  library.pollingInterval = 8000
  return library
}

// const defaultWeb3ProviderNetwork: FC = ({ children }) => <>{children}</>
// const Web3ProviderNetwork = isBrowser() ? createWeb3ReactRoot(NetWorkContextName) : defaultWeb3ProviderNetwork

const Web3ReactProvider: FC = ({ children }) => {

  return <BaseWeb3ReactProvider getLibrary={getLibrary}>
    {/* <Web3ProviderNetwork getLibrary={getLibrary}> */}
    <Web3ReactManager>
      {children}
    </Web3ReactManager>
    {/* </Web3ProviderNetwork> */}
  </BaseWeb3ReactProvider>
}

export default Web3ReactProvider