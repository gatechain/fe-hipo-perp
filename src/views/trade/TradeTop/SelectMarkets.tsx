import React, { FC } from 'react';
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Image from 'next/image'
import { MarketSelectionMenu } from './MarketSelectionMenu'
import { IconFont } from 'src/components/IconFont';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { setIsShowSymbolList } from 'src/store/market';

const useStyles = makeStyles({
  iconBox: {
    display: 'flex',
    width:'10px',
    height:'10px',
    marginLeft: '10px',
    transition: 'all .15s ease-in-out!important',
  },
  iconActive: {
    '&>svg': {
      transform: 'rotate(180deg)',
    },
  },
})


/**
 * 声明Props类型
 */
export interface SelectMarketsProps {
  imgUrl: string;
}

export const SelectMarkets: FC<SelectMarketsProps> = props => {
  const classes = useStyles()
  const symbol = useSelector((state: RootState) => state.market.marketSymbol)
  const showSymbolList = useSelector((state: RootState) => state.market.isShowSymbolList)
  const dispatch = useDispatch()

  const handlerIsShowSymbolList = (isShow: boolean) => { 
    dispatch(setIsShowSymbolList(isShow))
  }
  
  return (
    <Box py="12px" width={324} height={47}
      sx={{
        position: 'relative',
      }}
    >
      <Box sx={{
        '&:hover': {
          cursor: 'pointer',
        },
      }} onClick={() => handlerIsShowSymbolList(!showSymbolList)} display="flex" alignItems="center" justifyContent="space-between" borderRight='1px solid #2d2d3d' px="20px">
        <Box display="flex" alignItems="center"
          sx={{
            color: '#c3c2d4',
            fontSize: '16px',
            fontWeight: 500,
          }}>
          <Box display={showSymbolList ? 'none' : 'flex'} alignItems="center">
            <Box mr={1} width={24} height={24}>
              <Image width={24} height={24} src={props.imgUrl} alt=""></Image>
            </Box>
            <span >{ symbol }</span>

          </Box>
          <Box display={showSymbolList ? 'flex' : 'none'} alignItems="center">
            选择市场
          </Box>
        </Box>
        <Box display="flex"
          sx={{
            color: '#6f6e84',
            fontSize: '14px',
            fontWeight: 500,
          }}>
          <Box display="flex" alignItems="center">
            <Box>{showSymbolList == true ? '点击可平仓' : '交易对'}</Box>
            <Box className={`${classes.iconBox} ${showSymbolList == true ? classes.iconActive : ''}`}>
              <IconFont name='icon-xiangxia' color='#6f6e84' />
            </Box>
          </Box>
        </Box>
      </Box>

      <Box display={showSymbolList ? 'flex' : 'none'}
      >
        <MarketSelectionMenu></MarketSelectionMenu>
      </Box>
      
    </Box>
  )
};