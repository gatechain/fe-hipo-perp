import React, { FC, useState } from 'react';
import { Box, ButtonBase } from '@material-ui/core'
import { makeStyles, styled } from '@material-ui/styles'
import Image from 'next/image'
import { MarketSelectionMenuItem } from './MarketSelectionMenuItem';

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
  
  return (
    <Box
      sx={{
        position: 'absolute',
        left: '0',
        top: '48px',
        width: '375px',
        backgroundColor: '#171722',
        zIndex: 2,
      }}>
      <Box display="flex" justifyContent="flex-end" flexDirection="row"
        alignItems="center" px="16px" height={60}
        borderBottom="1px solid #2d2d3d;"
        sx={{
          '>:not(:first-child)': { marginLeft: '12px' },
        }}
      >
        <Box display="flex" marginRight="auto"
          sx={{
            '>:not(:first-child)': { marginLeft: '12px' },
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
        <MarketSelectionMenuItem></MarketSelectionMenuItem>
        <MarketSelectionMenuItem></MarketSelectionMenuItem>
        <MarketSelectionMenuItem></MarketSelectionMenuItem>
        <MarketSelectionMenuItem></MarketSelectionMenuItem>
        <MarketSelectionMenuItem></MarketSelectionMenuItem>
        <MarketSelectionMenuItem></MarketSelectionMenuItem>
        <MarketSelectionMenuItem></MarketSelectionMenuItem>
      </Box>
      
    </Box>
    
  )
};