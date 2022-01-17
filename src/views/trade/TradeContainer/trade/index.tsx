import { Box  } from '@material-ui/core'//Tooltip, Typography, Button
import React, { FC } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Position } from './Position'
// import { Order } from './Order'
// import { TransactionOrder } from './TransactionOrder'
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
  itemActive: {
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
  return (
    <Box flexGrow={1} display="flex" flexDirection="column">
      <Box height="100%" >
        <Box display="flex" justifyContent="space-between" alignItems="center" height='44px' width='100%' pr='12px' >
          <Box display="flex" height='100%'>
            <div className={`${classes.item} ${classes.itemActive}`}>价格</div>
            <div className={classes.item}>深度</div>
            <div className={classes.item}>资金</div>
            <div className={classes.item}>详情</div>
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
            <div className={classes.item}>当前持仓</div>
            <div className={classes.item}>订单<div className={classes.itemCount}>0</div></div>
            <div className={classes.item}>全部成交<div className={classes.itemCount}>0</div></div>
            <div className={classes.item}>支付<div className={classes.itemCount}>0</div></div>
          </Box>
          <Box>
            👆
          </Box>
          </Box>
          
          <Box display="flex" flexDirection="column" borderTop='1px solid #2d2d3d' height='calc(100% - 44px)'>
            <Position></Position>
          {/* <Order></Order> */}
          {/* <TransactionOrder></TransactionOrder> */}
          </Box>
      </Box>
    </Box>
  )
  
}