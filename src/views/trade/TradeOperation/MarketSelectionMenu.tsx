import React, { FC } from 'react';
import { Box, ButtonBase, styled } from '@material-ui/core'
import Image from 'next/image'

const Btn = styled(ButtonBase)({
  width: '60px',
  height: '30px',
  background: 'rgba(0,0,0,0.3)',
  borderRadius: '10px',
})

export const MarketSelectionMenu: FC = () => {
  return (
    <Box >
      <Box display="flex" justifyContent="flex-end" flexDirection="row" alignItems="center" px="16px" height={60} borderBottom="1px solid #2d2d3d;">
        <Box display="flex" flexDirection="row" >
          <Btn>全部</Btn>
          {/* <div>全部</div>
          <div>第一层</div>
          <div>Defi</div> */}
        </Box>
        <Image width={32} height={32} src="/images/btc.svg" alt=""></Image>
        <Image width={32} height={32} src="/images/btc.svg" alt=""></Image>
      </Box>
      {/* list */}
      <Box>

      </Box>
      
    </Box>
    
  )
};