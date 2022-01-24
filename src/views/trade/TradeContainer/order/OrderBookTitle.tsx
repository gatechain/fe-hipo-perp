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
  lableUnit: {
    display: 'inline-flex',
    fontSize: '12px',
    padding: '0 3px 0 4px',
    fontWeight: 500,
    backgroundColor: '#303044',
    borderRadius: '2px',
    color: '#c3c2d4',
    marginLeft: '2px',
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
        <Box className={classes.amountBox}>数量 <Box className={classes.lableUnit}>Atom</Box></Box>
        <Box className={classes.priceBox}>价格<Box className={classes.lableUnit}>usd</Box></Box>
        <Box className={classes.orderBox}>我的订单</Box>
      </Box>
  )
}