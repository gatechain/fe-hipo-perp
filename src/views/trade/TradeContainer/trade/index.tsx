import { Box  } from '@material-ui/core'//Tooltip, Typography, Button
import React, { FC, useCallback } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Position } from './Position'
import { OrderType } from 'src/store/order/const'
import { setOrderType } from 'src/store/order'
import { useDispatch, useSelector } from 'react-redux'
import { Order } from './Order'
import { TransactionOrder } from './TransactionOrder'
import { RootState } from 'src/store'
const useStyles = makeStyles({
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 24px',
    borderRight: '1px solid #2d2d3d', 
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 500,
    color: '#6f6e84',
    backgroundColor: '#1c1c28',
  },
  active: {
    backgroundColor: '#171722',
    color: '#f7f7f7',
  },
  itemCount: {
    fontSize: '10px',
    backgroundColor: '#303044',
    color: '#c3c2d4',
    padding: '1px 4px 1px 5px',
    letterSpacing: '.06em',
    borderRadius: '2px',
    marginLeft: '2px',
    lineHeight: '16px',
  },
  positionItem: {
    display:'flex',
    flexDirection: 'column',
    fontSize: '14px',
    lineHeight: '18px',
    color: '#6f6e84',
    marginBottom: '8px',
    flex: '0 0 50%',
  },
  positionK: {

  },
  positionV: {
    fontSize: '16px',
    lineHeight: '20px',
    display: 'flex',
    flexDirection: 'column',
  },
})

export const Trade: FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const orderType = useSelector((state: RootState) => state.order.orderType)
  const handlerType = (type: OrderType) => { 
    dispatch(setOrderType(type))
  }
  const getTypeEle = useCallback(() => { 
    const type = orderType 
    const actions = {
      [OrderType.position]:<Position />,
      [OrderType.order]: <Order />,
      [OrderType.allSuccess]: <TransactionOrder/>,
    }
    return actions[type]
  }, [orderType])
  return (
    <Box flexGrow={1} display="flex" flexDirection="column">
      <Box height="100%" display="flex" flexDirection="column">
        <Box display="flex" justifyContent="space-between" alignItems="center" height='44px' width='100%' pr='12px' >
          <Box display="flex" height='100%'>
            <Box className={`${classes.item} ${classes.active}`}>价格</Box>
            <Box className={classes.item}>深度</Box>
            <Box className={classes.item}>资金</Box>
            <Box className={classes.item}>详情</Box>
          </Box>
          
        </Box>
        {/* klint 等图表 */}
        <Box borderTop='1px solid #2d2d3d'>
          kline
        </Box>
      </Box>

      <Box borderTop='1px solid #2d2d3d' display="flex" flexDirection="column" height={330}>
        <Box display="flex" justifyContent="space-between" alignItems="center" height='44px' width='100%' pr='12px' >
          <Box display="flex" height='100%'>
            <Box
              className={`${classes.item} ${OrderType.position == orderType ? classes.active : ''}`}
              onClick={()=>handlerType(OrderType.position)}
            >当前持仓</Box>
            <Box
              className={`${classes.item} ${OrderType.order == orderType ? classes.active : ''}`}
              onClick={()=>handlerType(OrderType.order)}
            >订单<Box className={classes.itemCount}>0</Box></Box>
            <Box
              className={`${classes.item} ${OrderType.allSuccess == orderType ? classes.active : ''}`}
              onClick={()=>handlerType(OrderType.allSuccess)}
            >全部成交<Box className={classes.itemCount}>0</Box></Box>
            <Box
              className={`${classes.item} ${OrderType.pay == orderType ? classes.active : ''}`}
              onClick={()=>handlerType(OrderType.pay)}
            >支付<Box className={classes.itemCount}>0</Box></Box>
          </Box>
          <Box>
            👆
          </Box>
        </Box>

        <Box flexGrow={1} display="flex" flexDirection="column" borderTop='1px solid #2d2d3d' >
          { getTypeEle() }
        </Box>
      </Box>
    </Box>
  )
  
}