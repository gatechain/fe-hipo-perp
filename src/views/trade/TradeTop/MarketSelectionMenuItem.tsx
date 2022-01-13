import React, { FC } from 'react';
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Image from 'next/image'

const useStyles = makeStyles({
  itemBg: {
    backgroundColor: '#171722',
  },
  coinLeft: {
    marginLeft: '6px',
  },
  price: {
    fontSize: '15px',
    lineHeight: '20px',
    height: '20px',
  },
})

export const MarketSelectionMenuItem: FC = () => {
  
  const classes = useStyles()  
  return (
    <Box sx={{ backgroundColor: '#171722', padding:'0 16px', color:'#f7f7f7', borderBottom:'1px solid #2d2d3d' }}>
      {/* top */}
      <Box display="flex" alignItems="center" justifyContent="space-between" height={54}>
        {/* left */}
        <Box display="flex" alignItems="center" flexDirection="row">
          <Box
            sx={{
              marginLeft: '4px',
              display: 'flex',
              alignItems: 'center',
            }}>
            <Image width={24} height={24} src="/images/btc.svg" alt=""></Image>
          </Box>
          <span className={classes.coinLeft}>Bitcoin</span>
          <Box
            sx={{
              marginLeft: '4px',
              fontSize: '10px',
              backgroundColor: '#303044',
              display: 'inline-flex',
              padding: '1px 4px 1px 5px',
              textTransform: 'uppercase',
              height: '18px',
              lineHeight: '18px',
              borderRadius: '2px',
              letterSpacing: '.6px',
            }}>
            BTC
          </Box>
        </Box>
        {/* right */}
        <Box sx={{
          display:'grid',
          justifyItems:'end',
          gridGap: '4px',
          gap: '4px',
          boxSizing: 'border-box',
        }} >
          <span className={classes.price}>$43,682</span>
          <Box display="flex" flexDirection="row" alignItems="center"
            sx={{ 
              fontSize: '13px',
              color:'#3fb68b',
            }}>
            <span>2.26%</span>
          </Box>
        </Box>
      </Box>
      {/* bottom */}
      <Box display="flex" flexDirection="row" alignItems="center"
        sx={{
          paddingBottom: '16px',
          '>:not(:last-child)': {
            borderRight:'1px solid #2d2d3d',
          },
          '>:nth-child(2)': {
            alignItems: 'center',
            flex:'0 0 38%',
          },
        }}>
        <Box display="flex" flexDirection="column" justifyContent="center" flex="0 0 31%">
          <Box display="flex"
            sx={{
              fontSize: '13px',
              lineHeight: '16px', 
              color: '#6f6e84',
              marginBottom: '2px',
            }}
          >24小时交易量</Box>
          <Box
            sx={{
              fontSize: '14px',
              lineHeight: '18px',
              color:'#c3c2d4',
            }}>
            <span>$348,380,315</span>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="center" >
          <Box
          sx={{
            fontSize: '13px',
            lineHeight: '16px', 
            color: '#6f6e84',
            marginBottom: '2px',
          }}
          >未平仓合约</Box>
          <Box display="flex" flexDirection="row" alignItems="center"
            sx={{
              fontSize: '14px',
              lineHeight: '18px',
              color:'#c3c2d4',
            }}
          >
            <span>5,650.8284</span>
            <Box
              sx={{
                padding: '0 3px 0 4px',
                marginTop: '-2px',
                marginBottom: '-2px',
                backgroundColor: '#303044',
                height: '16px', 
                lineHeight: '16px',
                borderRadius: '2px',
                marginLeft:'4px',
              }}
            >Btc</Box>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="flex-end" justifyContent="center" flex="0 0 31%">
          <Box
            sx={{
              fontSize: '13px',
              lineHeight: '16px', 
              color: '#6f6e84',
              marginBottom: '2px',  
            }}
          >资金利率</Box>
          <Box
            sx={{
              fontSize: '14px',
              lineHeight: '18px',
              color:'#c3c2d4',
            }}
          >
            <span>0.000717%</span>
          </Box>
        </Box>
      </Box>
    </Box>
    
  )
};