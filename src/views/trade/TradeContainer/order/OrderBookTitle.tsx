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
})

export const OrderBookTitle: FC = () => {
  const classes = useStyles()
  return (
    <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        fontSize={12}
        fontWeight={400}
        color="#6f6e84"
        px={2}
        height={28}>
        <div className={classes.amountBox}>数量 <div className={classes.lableUnit}>Atom</div></div>
        <div className={classes.priceBox}>价格<div className={classes.lableUnit}>usd</div></div>
        <div className={classes.orderBox}>我的订单</div>
      </Box>
  )
}