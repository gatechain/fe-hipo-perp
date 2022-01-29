import { Box } from '@material-ui/core'
import { FC, useMemo } from 'react'
import { makeStyles } from '@material-ui/styles'
import { OrderItem } from './OrderItem'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/store'
import { loadOrderList } from 'src/store/order'
const useStyles = makeStyles({
  unit: {
    fontSize: '10px',
    backgroundColor: '#303044',
    color: '#c3c2d4',
    padding: '1px 4px 1px 5px',
    letterSpacing: '.06em',
    borderRadius: '2px',
    marginLeft: '2px',
    lineHeight: '16px',
  },
  titleBox: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    flexShrink: 0,
    flexGrow: 0,
    cursor: 'pointer',
  },
  sortImg: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 4px',
    width: '10px',
    height: '11px',
  },
})

export const Order: FC = () => {
  const classes = useStyles()
  const orderList = useSelector((state: RootState) => state.order.orderList)
  const dispatch = useDispatch()

  useMemo(() => {
    dispatch(loadOrderList('', ''))
  }, [dispatch]);

  return (
    <Box display="flex" flexDirection="column" bgcolor="#1c1c28" width='100%' height="100%">
      <Box
        display="flex"
        alignItems="center"
        fontSize="13px"
        lineHeight="16px"
        bgcolor="#171722"
        padding="0 16px"
        height="40px"
        color="#6f6e84"
        borderBottom="1px solid #2d2d3d"
        component="div"
      >
        <Box className={classes.titleBox} style={{ flexBasis: '15%', width: '15%' }}>
          状态
        </Box>
        <Box className={classes.titleBox} style={{ flexBasis: '10%', width: '10%' }}>
          买/卖
        </Box>
        <Box className={classes.titleBox} style={{ flexBasis: '28%', width: '28%' }}>
          <Box display="flex">金额/已全部成交</Box>
          <Box className={classes.unit}>Atom</Box>
        </Box>
        <Box className={classes.titleBox} style={{ flexBasis: '18%', width: '18%' }}>
          价格
        </Box>
        <Box className={classes.titleBox} style={{ flexBasis: '12%', width: '12%' }}>触发器</Box>
        <Box className={classes.titleBox} style={{ flexBasis: '17%', width: '17%' }}>
          有效至
        </Box>
      </Box>
      <Box flexGrow={1} position="relative">
        {
          orderList ?
            <Box
              position="absolute"
              display="flex"
              flexDirection="column"
              width="100%"
              height="100%"
              sx={{ overflowY: 'scroll', '&::-webkit-scrollbar': { display: 'none' } }}>
              {orderList.length && orderList.map((item, index) => {
                return (
                  <OrderItem
                    key={index}
                    market={item.market}
                    status={item.status}
                    side={item.side}
                    size={item.size}
                    remaining_size={item.remaining_size}
                    price={item.price}
                    created_at={item.created_at}
                    type={item.type}
                    expire_at={item.expired_at}
                    trigger_price={item.trigger_price}
                    time_in_force={item.time_in_force}
                  />
                )
              })}
            </Box>
            : <Box
              position="absolute"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flex="1 1 auto"
              width="100%"
              height="100%"
              fontSize="15px"
              fontWeight="500"
              color="#c3c2d4"
              lineHeight="20px">

              没有订单。
            </Box>
        }
      </Box>


    </Box>
  )

}