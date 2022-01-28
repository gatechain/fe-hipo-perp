import { Box } from '@material-ui/core'
import { FC, useEffect, useRef, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { OrderBookTitle } from './OrderBookTitle'
import { OrderBookBody } from './OrderBookBody'
import { OrderBookFoot } from './OrderBookFoot'
import { Trade } from './Trade'
const useStyles = makeStyles({
  activeBtn: {
    backgroundColor: '#171722',
    color: '#f7f7f7',
  },
})
export const OrderBook: FC = () => {
  const classes = useStyles()
  const ws = useRef<WebSocket | null>(null)
  const [isOrderBook, setIsOrderBook] = useState(true)
  useEffect(() => {
    ws.current = new WebSocket('wss://www.hipo.com/trade/ws/')
    ws.current.onopen = () => {
      ws.current.send(JSON.stringify({
        type: 'subscribe',
        channel: 'orderbook',
        id: 'BTC_USD',
      }))
    }
    ws.current.onerror = (err) => {
      console.log('onerror')
      console.log(err)
    }
    ws.current.onmessage = () => {
      // console.log(msg.data)
    }

  }, [ws])
  return <Box width={300} height='100%' display='flex' flexDirection='column' borderRight='1px solid #2d2d3d' component="div">
    <Box display="flex" justifyContent="center" alignItems="center" height={44}
      sx={{
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: '18px',
        color: '#6f6e84',
        textAlign: 'center',
        '>div': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flex: '0 0 50%',
          padding: '0 24px',
          height: '44px',
        },
        '>:not(:last-child)': {
          borderRight: '1px solid #2d2d3d',
        },
      }}>
      <div className={isOrderBook == true ? classes.activeBtn : ''} onClick={() => setIsOrderBook(!isOrderBook)}>盘口</div>
      <div className={isOrderBook == true ? '' : classes.activeBtn} onClick={() => setIsOrderBook(!isOrderBook)}>交易订单</div>
    </Box>
    <Box display="flex" position="relative" flexDirection='column' flexGrow={1} component="div" borderTop='1px solid #2d2d3d'>
      <OrderBookTitle />
      {isOrderBook ? <OrderBookBody /> : ''}
      {isOrderBook ? <OrderBookFoot /> : ''}
      {isOrderBook ? '' : <Trade />}
    </Box>
  </Box>
}