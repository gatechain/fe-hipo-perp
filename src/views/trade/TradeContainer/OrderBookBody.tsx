import { Box } from '@material-ui/core'
import { FC } from 'react'
import { makeStyles } from '@material-ui/styles'
import { OrderBookItem } from './OrderBookItem'

const useStyles = makeStyles({
  amountBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'end',
    flex: '0 0 32%',
    paddingRight: '4px',
    zIndex:2,
  },
  priceBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'end',
    flex: '0 0 24%',
    paddingRight: '4px',
  },
  orderBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'end',
    flex: '0 0 28%',
    paddingRight: '4px',
  },
  span:{
    color: '#c3c2d4',
    fontSize:'12px',
  },
})

export const OrderBookBody: FC = () => {
  const classes = useStyles()
  return <Box flexGrow={1} position="relative">
  <Box position="absolute" width="100%" height="100%" sx={{ overflowY: 'scroll', '&::-webkit-scrollbar': { display:'none' } }}>
    <Box >
      <Box>
        <OrderBookItem type="book" direction="sell"/>
        <OrderBookItem type="book" direction="sell"/>
      </Box>
      
      <Box display="flex" justifyContent="space-between" alignItems="center" 
        sx={{
          fontSize: '12px',
          color: '#6f6e84',
          height: '32px',
          margin: '4px 0 4px 1px',
          padding: '0 18px',
          borderTop: '1px solid #2d2d3d',
          borderBottom:'1px solid #2d2d3d',
        }}>
          <div className={classes.amountBox}><span className={classes.span}>点差</span></div>
          <div className={classes.priceBox}><span className={classes.span}>0.04</span></div>
          <div className={classes.orderBox}><span className={classes.span}>0.11%</span></div>
      </Box>
      <Box>
        <Box >
            <OrderBookItem type="trade" direction="buy"/>
        </Box>
      </Box>
    </Box>
  </Box>
  
</Box>
}