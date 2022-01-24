import React, { FC, useEffect, useState } from 'react';
import { Box, ButtonBase } from '@material-ui/core'
import { makeStyles, styled } from '@material-ui/styles'
import Image from 'next/image'
import { MarketSelectionMenuItem } from './MarketSelectionMenuItem';
import { useMarkets } from 'src/Api/hooks';
import { formatNumber } from 'src/utils';

const Btn = styled(ButtonBase)({
  height: '28px',
  fontSize: '13px',
  fontWeight: 500,
  background: '#303044',
  borderRadius: '24px',
  padding: '0 10px',
  color: '#C3C2D4',
})

const useStyles = makeStyles({
  btnChoose: {
    background: '#171722',
    color: '#F7F7F7',
  },
  box: {

  },
})


export const MarketSelectionMenu: FC = () => {
  const [btnValue, setBtnValue] = useState('ALL');
  const classes = useStyles()
  const [markets, fetchMakets] = useMarkets()


  useEffect(() => {
    fetchMakets()
  }, [fetchMakets]);
  
  return (
    <Box
      sx={{
        position: 'absolute',
        left: '0',
        top: '48px',
        width: '375px',
        backgroundColor: '#171722',
        zIndex: 4,
        borderRight: '1px solid #2d2d3d',
      }}>
      <Box display="flex" justifyContent="flex-end" flexDirection="row"
        alignItems="center" px="16px" height={60}
        borderBottom="1px solid #2d2d3d;"
        sx={{
          '>:not(:first-of-type)': { marginLeft: '12px' },
        }}
      >
        <Box display="flex" marginRight="auto"
          sx={{
            '>:not(:first-of-type)': { marginLeft: '12px' },
          }}
        >
          <Btn className={btnValue == 'ALL' ? classes.btnChoose : ''} onClick={() => setBtnValue('ALL')}>全部</Btn>
          <Btn className={btnValue == 'FIRST' ? classes.btnChoose : ''} onClick={() => setBtnValue('FIRST')}>第一层</Btn>
          <Btn className={btnValue == 'DEFI' ? classes.btnChoose : ''} onClick={() => setBtnValue('DEFI')}>Defi</Btn>
        </Box>
        <Box>
          <Image width={32} height={32} src="/images/btc.svg" alt=""></Image>
        </Box>
        <Box>
          <Image width={32} height={32} src="/images/btc.svg" alt=""></Image>
        </Box>
      </Box>
      {/* list */}
      <Box sx={{ 
        height: 'calc(100vh - 48px - 69px - 60px)',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          display:'none',
        },
      }}>
        {
          markets.map(item => {
            return (
              <MarketSelectionMenuItem
                key={item.base_asset}
                market={ item.market }
                base_asset={ item.base_asset}
                base_asset_name={ item.base_asset_name}
                index_price={ formatNumber(item.index_price)}
                volume_24h={ formatNumber(item.volume_24h.split('.')[0])}
                next_funding_rate={ item.next_funding_rate }
                open_interest={ formatNumber(item.open_interest)}
              ></MarketSelectionMenuItem>
            )
          })
        }
      </Box>
      
    </Box>
    
  )
};