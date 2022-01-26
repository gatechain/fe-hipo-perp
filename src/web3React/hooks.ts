import moment from 'moment'
import { useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'
import Web3 from 'web3'

type SignCallback = (data: { signature: string, timestamp: string, ethereum_address: string }) => void

export function useSign() {
  const { account } = useSelector((state: RootState) => state.network)

  const web3 = useMemo(() => {
    return new Web3(Web3.givenProvider || 'ws://localhost:8545')
  }, [])

  const sign = useCallback((callback: SignCallback = () => { }) => {
    const timestamp = moment().unix()
    const signData = { action: 'HIPO-ONBOARDING', timestamp: timestamp.toString() }
    const dataString = web3.utils.utf8ToHex(JSON.stringify(signData))

    web3.eth.personal.sign(dataString, account, '').then(data => {
      const params = {
        signature: data,
        timestamp: timestamp.toString(),
        ethereum_address: account,
      }
      callback(params)
    })
  }, [account, web3])
  return sign
}