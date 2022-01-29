import { useWeb3React } from '@web3-react/core'
import { FC, useEffect } from 'react'
import { injected } from './connector'

export const MetaMaskManage: FC<any> = () => {
  const { active, error, activate, deactivate } = useWeb3React()

  function onMetaMaskEvent() {
    window.ethereum.on('accountsChanged', (accounts) => {
      if (accounts.length === 0) {
        // 无账号，则代表锁定了,主动断开
        deactivate()
      }
      // 账号改了，刷新网页
      window.location.reload()
      window.localStorage.removeItem('token')
    })
  }

  useEffect(() => {
    if (window.ethereum && window.ethereum.on) {
      onMetaMaskEvent()
    }
  }, [])

  useEffect(() => {
    (async function () {
      const isAuthorized = await injected.isAuthorized()
      if (isAuthorized && !active && !error) {
        activate(injected)
      }
    }())
  }, [active, error, activate])

  return null
}