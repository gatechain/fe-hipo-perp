
import { Box, Button, Theme, useTheme } from '@material-ui/core'
import { blue } from '@material-ui/core/colors'
import { makeStyles, styled, withStyles, WithStyles } from '@material-ui/styles'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FC, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/store'
import Web3 from 'web3'
import { decrement, increment, incrementByAmount } from 'src/store/test'

import { useWeb3React } from '@web3-react/core'
import { connectorsByName } from 'src/web3React/connector'
import ConnectWallet from 'src/components/ConnectWallet'
import { IconFont } from 'src/components/IconFont'
import { Ether } from 'src/sdk/ether'
import { BigNumber } from '@ethersproject/bignumber'

// hooks api
const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    color: theme.palette.primary.main,
  },
}))

// styled components api
const MyComponents = styled('div')<Theme>(({ theme }) => ({
  color: theme.palette.success.main,
}))

// Higher-order components api
const styles = {
  root: {
    color: blue[100],
  },
}
const HigherOrderComponent: FC<WithStyles<typeof styles>> = (props) => {
  const { classes, children } = props
  return <Button className={classes.root}>{children}</Button>
}
const HOCButton = withStyles(styles)(HigherOrderComponent)

const DemoPage: NextPage = () => {
  const { query } = useRouter()
  const count = useSelector((state: RootState) => state.test.value)
  const dispatch = useDispatch()
  const theme = useTheme()
  const classes = useStyles()
  const { pair } = query
  // test metamask
  const { connector, activate, active, error, account } = useWeb3React()
  const [activatingConnector, setActivatingConnector] = useState<any>()

  const web3 = useMemo(() => {
    return new Web3(Web3.givenProvider || 'ws://localhost:8545')
  }, [])

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])
  // test metamask --- end

  return <div className={classes.root}>
    {pair}
    {theme.palette.primary.main}
    <h1 style={{ margin: '1rem', textAlign: 'right' }}>{active ? '🟢' : error ? '🔴' : '🟠'}</h1>
    <Box color="#fff">
      account : {account || window.ethereum.selectedAddress}
      {
        Object.keys(connectorsByName).map((name, index) => {
          const currentConnector = connectorsByName[name]
          return <Button variant="contained" key={index}
            onClick={() => {
              setActivatingConnector(currentConnector)
              activate(connectorsByName[name])
            }}
          >{name}</Button>
        })
      }
    </Box>

    <Button color="primary" variant="contained" onClick={() => dispatch(increment())}>demo: increment</Button>
    <Button color="primary" variant="contained" onClick={() => dispatch(incrementByAmount(3))}>demo: increment + 3</Button>
    <Button color="primary" variant="contained" onClick={() => dispatch(decrement())}>demo: decrement</Button>
    <MyComponents>My styled Components</MyComponents>
    <HOCButton>HOCButton</HOCButton>
    <Button variant="contained">redux-value: {count}</Button>
    <Box>
      <ConnectWallet></ConnectWallet>
    </Box>
    <IconFont name='icon-xiangxia1' color='#fff' />
    <Button color="primary" variant="contained" onClick={() => {
      console.log(account)
      web3.eth.personal.sign('action: dYdX STARK Key', account, 'dydx', console.log).then(data => {
        console.log(data, '哈哈哈的签名')
      })
    }}>授权</Button>

    <Button color="primary" variant="contained" onClick={async () => {
      const ether = Ether.getInstance()
      const contr = ether.getPerpetualContract('0x4F091e8f52092E7Ce70Fc385ae3B2d1301476293')
      const tokenInfo = await ether.getTokenDetailV2('0x475EbfBF2367d5C42f55bd997f9E65D8b35Ded65')
      console.log(tokenInfo)
      const amount = BigNumber.from(10).pow(tokenInfo.decimals).mul(50).toString()
      console.log(amount)
      // ether.approve('0x475EbfBF2367d5C42f55bd997f9E65D8b35Ded65', '0x4F091e8f52092E7Ce70Fc385ae3B2d1301476293', amount).then(() => {

      // })
      contr.deposit(account, '0x475EbfBF2367d5C42f55bd997f9E65D8b35Ded65', amount).then(console.log).catch(console.log)
    }}>调用合约</Button>
  </div>
}

export default DemoPage