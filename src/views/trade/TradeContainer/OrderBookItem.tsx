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
  bottomBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRight:'1px solid #2d2d3d',
    width:'36px',
    height:'100%',
  },
  amountPercentage: {
    width: '50px',
    height: '18px',
    backgroundColor: '#ff5353',
    opacity: '.4',
    position: 'absolute',
    top: '1px',
    zIndex: 1,
  },
  volPercentage: {
    width: '100px',
    height: '18px',
    backgroundColor: '#ff5353',
    opacity: '.2',
    position: 'absolute',
    top: '1px',
    zIndex: 0,
  },
  tradeBuyColor: {
    color: '#3fb68b',
  },
  tradeSellColor: {
    color: '#3fb68b',
  },
})

export interface ItemProps {
  type: string;
  direction: String;
}
export const OrderBookItem: FC<ItemProps> = (props) => {
  console.log(props)
  const classes = useStyles()
  return (
    <Box display="flex" position="relative">
      <div className={classes.amountPercentage}></div>
      <div className={classes.volPercentage}></div>
      <Box display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexGrow={1}
        height={20}
        padding='0 16px'
        sx={{ cursor: 'pointer', '&:hover': {
          backgroundColor: '#232334',
        },
        }}>
        
        <div className={classes.amountBox}><span className={`${classes.span} ${props.type == 'trade' ? (props.direction == 'buy' ? classes.tradeBuyColor : classes.tradeSellColor) : ''}`}>123.32</span></div>
        <div className={classes.priceBox}><span className={classes.span}>123.32</span></div>
        <div className={classes.orderBox}><span className={classes.span}>123.32</span></div>
      </Box>
    </Box>
  )
}