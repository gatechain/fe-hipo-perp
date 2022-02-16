import { Backdrop, CircularProgress } from '@material-ui/core'
import { useWeb3React } from '@web3-react/core'
import { FC, useEffect, useState } from 'react'
import { Ether } from 'src/sdk/ether'
import { MetaMaskManage } from './MetaMaskManager'

const Web3ReactManager: FC<any> = ({ children }) => {
  const { library, account } = useWeb3React()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (library && account) {
      Ether.getInstance({
        provider: library,
        signer: library?.getSigner(account)?.connectUnchecked(),
      })
      setLoading(false)
    }
    setLoading(false)
  }, [library, account])

  const LoadingEle = () => {
    return <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  }

  return <>
    <MetaMaskManage />
    {loading ? <LoadingEle /> : children}
  </>
}

export default Web3ReactManager