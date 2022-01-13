import React, { FC, useState } from 'react';
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
// import Image from 'next/image'


const useStyles = makeStyles({
  
  marketTypeChoose: {
    backgroundColor: '#171722', 
    color: '#f7f7f7',
    borderTop: '1px solid #2d2d3d',
  },
  buyColor: {
    color: '#3fb68b !important',
  },
  sellColor: {
    color: '#ff5353 !important',
  },
})

export const TradeBox: FC = () => {
  const classes = useStyles()
  const [marketType, setMarketType] = useState('market');
  const [isBuy, setIsBuy] = useState(true)
  
  return (
    <Box display="flex" flexDirection="column">
      {/* 下单类型 */}
      <Box display="flex" alignItems="center" flexDirection="row" sx={{
        borderBottom: '1px solid #2d2d3d',
        fontSize: '14px',
        lineHeight: '18px',
        color: '#6f6e84',
        backgroundColor: '#1c1c28',
        minHeight: '44px',
        maxHeight: '44px',
        width: '100%',
      }}>
        <Box display="flex" alignItems="center" justifyContent="center"
          sx={{ flex: '0 0 33.3333%', borderRight: '1px solid #2d2d3d', minHeight: '44px', cursor: 'pointer' }}
          className={marketType == 'market' ? classes.marketTypeChoose : ''}
          onClick={()=>setMarketType('market')}
        >
          市场</Box>
        <Box display="flex" alignItems="center" justifyContent="center"
          sx={{
            flex: '0 0 33.3333%',
            borderRight: '1px solid #2d2d3d', minHeight: '44px', cursor: 'pointer',
          }}
          className={marketType == 'limit' ? classes.marketTypeChoose : ''}
          onClick={()=>setMarketType('limit')}
        >限价</Box>
        <Box display="flex" alignItems="center" justifyContent="center"
          sx={{
            flex: '0 0 33.3333%',
            minHeight: '44px',
            cursor: 'pointer',
            position: 'relative',
          }}
          className={marketType == ('stoploss' || 'stoplosslimit') ? classes.marketTypeChoose : ''}
          onClick={()=>setMarketType('stoploss')}
        >
          止损
          <Box  
            display={ marketType == 'stoploss' ? 'flex' : 'none'}
            sx={{
              flexDirection: 'column',
              position: 'absolute',
              right: '0',
              top: 'calc(100% + 1px)',
              backgroundColor: '#1c1c28',
              border: '1px solid #2d2d3d',
              borderTop: 'none', 
              borderRight: 'none',
              zIndex: 2, 
              '>div': {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 20px',
                height: '44px',
                color: '#6f6e84',
                backgroundColor:'#1c1c28',
              },
              '>:not(:last-child)': {
                borderBottom:'1px solid #2d2d3d',
              },
            }}>
            <Box>止损限价</Box>
            <Box>止损限价</Box>
            <Box>止损限价</Box>
          </Box>
        </Box>
      </Box>
      {/* 买卖 */}
      <Box display="flex" flexDirection="column"
        sx={{
          flex: '1 1 auto',
          padding: '20px 24px',
        }}>
        <Box>
          <Box display="flex" flexDirection="row"
            sx={{
              alignItems: 'center',
              fontWeight: '500',
              height: '40px',
              width: '100%',
              backgroundColor: '#171722',
              borderRadius: '6px',
              position: 'relative',
              '&::before': {
                display: 'flex',
                content:'""',
                boxSizing: 'border-box',
                height: '40px',
                width: '50%',
                backgroundColor: '#232334',
                borderRadius: '6px',
                transition: 'all .2s ease-in-out',
                position: 'absolute',
                left: '0',
                top: '0',
              },
              '&>div': {
                fontSize: '14px',
                height: '40px',
                display: 'flex', 
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                color: '#6f6e84',
                transition: 'color .2s ease-in-out',
                zIndex:1,
              },
            }}>
            <Box className={isBuy == true ? '' : classes.sellColor} onClick={() =>setIsBuy(!isBuy)}>卖出</Box>
            <Box className={isBuy == true ? classes.buyColor : ''} onClick={() =>setIsBuy(!isBuy)}>买入</Box>
            
          </Box>
        </Box>
        
      </Box>
      
    </Box>
    
  )
};