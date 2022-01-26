import { Box  } from '@material-ui/core'//Tooltip, Typography, Button
import React, { FC, useCallback, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Position } from './Position'
import { OrderType } from 'src/store/order/const'
import { setOrderType } from 'src/store/order'
import { useDispatch, useSelector } from 'react-redux'
import { Order } from './Order'
import { TransactionOrder } from './TransactionOrder'
import { KlintBox } from './KlintBox'
import { DepthBox } from './DepthBox'
import { CapitalBox } from './CapitalBox'
import { DetailsBox } from './DetailsBox'
import { RootState } from 'src/store'
import { ChartType } from 'src/store/chart/const'
import { setChartType } from 'src/store/chart'
import { IconFont } from 'src/components/IconFont'
import { PayOrder } from './PayOrder'
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
    height: '44px',
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
  iconBox: {
    display: 'flex',
    justifyContent:'center',
    alignItems:'center',
    width:'28px',
    height:'28px',
    cursor: 'pointer',
    transition: 'all .15s ease-in-out!important',
    '&:hover': {
      backgroundColor: '#303044',
      borderRadius: '14px',
    },
  },
  iconActive: {
    '&>svg': {
      transform: 'rotate(180deg)',
    },
  },
})

export const Trade: FC = () => {
  const classes = useStyles()
  const [isShowPositionOrder, setIsShowPositionOrder] = useState(true)
  const dispatch = useDispatch()
  const orderType = useSelector((state: RootState) => state.order.orderType)
  const handlerType = (type: OrderType) => { 
    dispatch(setOrderType(type))
  }
  const chartType = useSelector((state: RootState) => state.chart.chartType)
  const getTypeEle = useCallback(() => { 
    const type = orderType 
    const actions = {
      [OrderType.position]:<Position />,
      [OrderType.order]: <Order />,
      [OrderType.allSuccess]: <TransactionOrder />,
      [OrderType.pay]: <PayOrder/>,
    }
    return actions[type]
  }, [orderType])

  const getChartTypeEle = useCallback(() => { 
    const type = chartType 
    const actions = {
      [ChartType.kline]:<KlintBox />,
      [ChartType.depth]: <DepthBox />,
      [ChartType.capital]: <CapitalBox />,
      [ChartType.details]: <DetailsBox />,
    }
    return actions[type]
  }, [chartType])

  const handlerChartType = (type: ChartType) => { 
    dispatch(setChartType(type))
  }

  return (
    <Box flexGrow={1} display="flex" flexDirection="column" justifyContent="space-between">
      <Box flexGrow={1} display="flex" flexDirection="column">
        <Box display="flex" justifyContent="space-between" alignItems="center" height='44px' width='100%' pr='12px' >
          <Box display="flex" height='100%'>
            <Box
              className={`${classes.item} ${chartType == ChartType.kline ? classes.active : ''}`}
              onClick={()=>handlerChartType(ChartType.kline)}
            >价格</Box>
            <Box
              className={`${classes.item} ${chartType == ChartType.depth ? classes.active : ''}`}
              onClick={()=>handlerChartType(ChartType.depth)}
            >深度</Box>
            <Box
              className={`${classes.item} ${chartType == ChartType.capital ? classes.active : ''}`}
              onClick={()=>handlerChartType(ChartType.capital)}
            >资金</Box>
            <Box
              className={`${classes.item} ${chartType == ChartType.details ? classes.active : ''}`}
              onClick={()=>handlerChartType(ChartType.details)}
            >详情</Box>
          </Box>
        </Box>
        {/* klint 等图表 */}
        <Box flexGrow={1} width="100%" borderTop='1px solid #2d2d3d'>
          { getChartTypeEle() }
        </Box>
      </Box>

      <Box
        borderTop='1px solid #2d2d3d'
        display="flex"
        flexDirection="column"
        height={`${isShowPositionOrder ? '330px' : '44px'}`}
        minHeight={`${isShowPositionOrder ? '330px' : '44px'}`}>
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
          <Box >
            <Box
              className={`${classes.iconBox} ${isShowPositionOrder == true ? '' : classes.iconActive}`}
              onClick={() => setIsShowPositionOrder(!isShowPositionOrder)}
            >
              <IconFont name='icon-xiangxia1' color='#6f6e84' />
              
            </Box>
            
          </Box>
        </Box>
        {
          isShowPositionOrder &&
          <Box flexGrow={1} display="flex" flexDirection="column" borderTop='1px solid #2d2d3d' >
            { getTypeEle() }
          </Box>
        }
      </Box>
    </Box>
  )
  
}