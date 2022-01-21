import React, { FC, useCallback, useState } from 'react';
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { MarketPriceBox } from './market/MarketPriceBox'
import { LimitPriceBox } from './market/LimitPriceBox'
import { StopLimitPriceBox } from './market/StopLimitPriceBox'
import { TrackStopLimitPriceBox } from './market/TrackStopLimitPriceBox'//追踪止损
import { ProfitLimitPriceBox } from './market/ProfitLimitPriceBox'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { MarketType } from 'src/store/market/const';
import { setMarketType } from 'src/store/market';

const useStyles = makeStyles({
  marketTypeBox: {
    display:'flex',
    alignItems:'center',
    flexDirection:'row',
    borderBottom: '1px solid #2d2d3d',
    fontSize: '14px',
    lineHeight: '18px',
    color: '#6f6e84',
    backgroundColor: '#1c1c28',
    minHeight: '44px',
    maxHeight: '44px',
    width: '100%',
  },
  marketTypeItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '0 0 33.3333%',
    borderRight: '1px solid #2d2d3d',
    minHeight: '44px',
    cursor: 'pointer',
  },
  marketTypeChoose: {
    backgroundColor: '#171722 !important', 
    color: '#f7f7f7 !important',
  },
  stopLimitPriceItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 20px',
    height: '44px',
    color: '#6f6e84',
    backgroundColor:'#1c1c28',
  },
  stopLimitPriceBox: {
    flexDirection: 'column',
    position: 'absolute',
    right: '0',
    top: 'calc(100% + 1px)',
    backgroundColor: '#1c1c28',
    border: '1px solid #2d2d3d',
    borderTop: 'none', 
    borderRight: 'none',
    zIndex: 2,
    '&>:not(:last-child)': {
      borderBottom:'1px solid #2d2d3d',
    },
  },
  line: {
    flex: '1 1 50%',
    height: '1px',
    backgroundColor: '#2d2d3d',
  },
})


export const TradeBox: FC = () => {
  const classes = useStyles()
  const marketType = useSelector((state: RootState) => state.market.marketType)
  const [isLimitPriceActive, setIsLimitPriceActive] = useState(false)
  const dispatch = useDispatch()

  const handlerMarket = (type: MarketType) => { 
    dispatch(setMarketType(type))
    setIsLimitPriceActive(false)
  }

  const getMarketEle = useCallback(() => {
    const type = marketType 
    const actions = {
      [MarketType.market]:<MarketPriceBox />,
      [MarketType.limit]: <LimitPriceBox />,
      [MarketType.stopLimit]: <StopLimitPriceBox />,
      [MarketType.trackStop]: <TrackStopLimitPriceBox />,
      [MarketType.profitLimit]: <ProfitLimitPriceBox/>,
    }
    return actions[type]
  }, [marketType])

  return (
    <Box flexGrow={1} position="relative" display="flex" flexDirection="column">
      <Box
        position="absolute"
        width="100%"
        height="100%"
        overflow="hidden"
        sx={{ overflowY: 'scroll', '&::-webkit-scrollbar': { display: 'none' } }}>
        <Box width="100%" height="100%">
          <Box display="flex" flexDirection="column">
            <Box className={classes.marketTypeBox}>
              <Box
                className={`${classes.marketTypeItem} ${marketType == 'market' ? classes.marketTypeChoose : ''}`}
                onClick={()=>handlerMarket(MarketType.market)}>市场</Box>
              <Box 
                className={`${classes.marketTypeItem} ${marketType == 'limit' ? classes.marketTypeChoose : ''}`}
                onClick={()=>handlerMarket(MarketType.limit)}
              >限价</Box>
              <Box display="flex" alignItems="center" justifyContent="center"
                sx={{
                  flex: '0 0 33.3333%',
                  minHeight: '44px',
                  cursor: 'pointer',
                  position: 'relative',
                }}
                className={`${((marketType == 'stopLimit' || marketType == 'trackStop' || marketType == 'profitStop') && isLimitPriceActive == false) ? classes.marketTypeChoose : ''}`}
                onClick={ ()=>setIsLimitPriceActive(!isLimitPriceActive) }
              >
                止损
                <Box component="div"
                  className={`${classes.stopLimitPriceBox}`}
                  display={isLimitPriceActive == true ? 'flex' : 'none'}
                >
                  <Box
                    className={`${classes.stopLimitPriceItem} ${marketType == 'stopLimit' && isLimitPriceActive == true ? classes.marketTypeChoose : ''}`}
                    onClick={ ()=>handlerMarket(MarketType.stopLimit) }
                  >止损限价</Box>
                  <Box
                    className={`${classes.stopLimitPriceItem} ${marketType == 'trackStop' && isLimitPriceActive == true ? classes.marketTypeChoose : ''}`}
                    onClick={ ()=>handlerMarket(MarketType.trackStop) }
                  >追踪止损</Box>
                  <Box
                    className={`${classes.stopLimitPriceItem} ${marketType == 'profitStop' && isLimitPriceActive == true ? classes.marketTypeChoose : ''}`}
                    onClick={ ()=>handlerMarket(MarketType.profitLimit) }
                  >获利止损</Box>
                </Box>
              </Box>
            </Box>
            {getMarketEle()}
            
          </Box>
          
        </Box>
      </Box>
      
    </Box>
    
  )
};