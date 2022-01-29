import { Box } from '@material-ui/core'
import { FC, useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Item } from './Item'

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
})
interface Prosp {
  data?: any
}
export const OrderBookBody: FC<Prosp> = ({ data }) => {
  const classes = useStyles()
  const contentBox = useRef(null)
  const box = useRef(null)
  
  useEffect(() => { 
    const boxHeight = box.current.clientHeight / 2
    const contentHeight = contentBox.current.clientHeight / 2
    box.current.scrollTop = contentHeight - boxHeight
  }, [contentBox, box])

  return <Box flexGrow={1} position="relative">
    <Box ref={box} position="absolute" width="100%" height="100%" sx={{ overflowY: 'scroll', '&::-webkit-scrollbar': { display: 'none' } }}>
      <Box ref={contentBox}>
        <Box>
          {data?.asks?.map((item, ind) => {
            return <Item key={ind} data={item} type="book" direction="sell" />
          })}
        </Box>
        

        <Box display="flex" justifyContent="space-between" alignItems="center"
          sx={{
            fontSize: '12px',
            color: '#6f6e84',
            height: '32px',
            margin: '4px 0 4px 1px',
            padding: '0 18px',
            borderTop: '1px solid #2d2d3d',
            borderBottom: '1px solid #2d2d3d',
          }}>
          <Box className={classes.amountBox}><span className={classes.span}>点差</span></Box>
          <Box className={classes.priceBox}><span className={classes.span}>0.04</span></Box>
          <Box className={classes.orderBox}><span className={classes.span}>0.11%</span></Box>
        </Box>
        <Box>
          {data?.bids?.map((item, ind) => {
            return <Item key={ind} data={item} type="trade" direction="buy" />
          })
          }
        </Box>
      </Box>
    </Box>

  </Box>
}