import { Box } from '@material-ui/core'
import { FC } from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  amountBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'end',
    flex: '0 0 32%',
    paddingRight: '4px',
    zIndex: 2,
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
  span: {
    color: '#c3c2d4',
    fontSize: '12px',
  },
  bottomBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRight: '1px solid #2d2d3d',
    width: '36px',
    height: '100%',
  },
  amountPercentage: {
    // width: '50px',
    height: '18px',
    opacity: '.4',
    position: 'absolute',
    top: '1px',
    zIndex: 1,
  },
  amountPercentageBuy: {
    backgroundColor: '#ff5353',
  },
  amountPercentageSell: {
    backgroundColor: '#3fb68b',
  },
  volPercentage: {
    // width: '100px',
    height: '18px',
    opacity: '.2',
    position: 'absolute',
    top: '1px',
    zIndex: 0,
  },
  volPercentageSell: {
    backgroundColor: '#3fb68b',
  },
  volPercentageBuy: {
    backgroundColor: '#ff5353',
  },
  tradeBuyColor: {
    color: '#3fb68b',
  },
  tradeSellColor: {
    color: '#ff5353',
  },
})

export interface ItemProps {
  type: string;
  direction: String;
  data?: any
}
export const Item: FC<ItemProps> = ({ type, direction, data = [] }) => {
  const classes = useStyles()
  return (
    <Box display="flex" position="relative">
      <Box className={`${classes.amountPercentage} ${direction == 'buy' ? classes.amountPercentageBuy : classes.amountPercentageSell}`} sx={{ width:'10px' }} ></Box>
      <Box className={`${classes.volPercentage} ${direction == 'buy' ? classes.volPercentageBuy : classes.volPercentageSell}`} sx={{ width:'3px' }}></Box>
      <Box display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexGrow={1}
        height={20}
        padding='0 16px'
        sx={{
          cursor: 'pointer', '&:hover': {
            backgroundColor: '#232334',
          },
        }}>

        <Box className={classes.amountBox}><span className={`${classes.span} ${type == 'trade' ? (direction == 'buy' ? classes.tradeBuyColor : classes.tradeSellColor) : ''}`}>{data[0] || 0}</span></Box>
        <Box className={classes.priceBox}><span className={classes.span}>{data[1] || 0}</span></Box>
        <Box className={classes.orderBox}><span className={classes.span}>0</span></Box>
      </Box>
    </Box>
  )
}