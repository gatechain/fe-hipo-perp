import React, { FC, useState } from 'react';
import { Box } from '@material-ui/core'
import Image from 'next/image'
/**
 * 声明Props类型
 */
export interface SelectMarketsProps {
  imgUrl: string;
  symbol: string;
}

export const SelectMarkets: FC<SelectMarketsProps> = props => {
  const [showSymbolList, setShowSymbolList] = useState(false)
  return (
    <Box py="12px" width={324} height={47} borderBottom='1px solid #2d2d3d' >
      <Box sx={{
        '&:hover': {
          cursor: 'pointer',
        },
      }} onClick={() => setShowSymbolList(!showSymbolList)} display="flex" alignItems="center" justifyContent="space-between" borderRight='1px solid #2d2d3d' px="20px">
        <Box display="flex" alignItems="center">
          <Box display={showSymbolList ? 'none' : 'flex'} alignItems="center">
            <Box mr={1} width={24} height={24}>
              <Image width={24} height={24} src={props.imgUrl} alt=""></Image>
            </Box>
            <span>{props.symbol}</span>
          </Box>
          <Box display={showSymbolList ? 'flex' : 'none'} alignItems="center">
            选择市场
          </Box>
        </Box>
        <Box display="flex">
          <span>{showSymbolList ? '点击可平仓' : '交易对'}</span>
        </Box>
      </Box>
    </Box>

  )
};