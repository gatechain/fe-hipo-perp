import React, { FC, useEffect, useMemo, useState } from 'react';
import { Box, ButtonBase, InputBase } from '@material-ui/core'
import { makeStyles, styled } from '@material-ui/styles'
import { MarketSelectionMenuItem } from './MarketSelectionMenuItem';
import { useMarkets } from 'src/Api/hooks';
import { formatNumber } from 'src/utils';
import { IconFont } from 'src/components/IconFont';

const Btn = styled(ButtonBase)({
  height: '28px',
  fontSize: '13px',
  fontWeight: 500,
  background: '#303044',
  borderRadius: '24px',
  padding: '0 10px',
  color: '#C3C2D4',
})

const Input = styled(InputBase)({
  marginLeft: '12px',
  textAlign: 'center',
  fontSize: '16px',
  lineHeight: '32px',
  fontWeight: 400,
  backgroundColor: '#232334',
  padding: '0px',
  paddingLeft: '38px',
  height: '32px',
  width: '100%',
  borderRadius: '16px',
})

const useStyles = makeStyles({
  btnChoose: {
    background: '#171722',
    color: '#F7F7F7',
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#303044',
    },
  },
  closeSearch: {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    width:'32px',
    fontSize:'20px',
    height:'32px',
    borderRadius:'50%',
    backgroundColor: '#303044',
    position: 'absolute',
    left: '11px',
    top: '0px',
    zIndex: 1,
    cursor: 'pointer',
  },
})


export const MarketSelectionMenu: FC = () => {
  const [btnValue, setBtnValue] = useState('ALL');
  const classes = useStyles()
  const [markets, fetchMakets] = useMarkets()
  const [word, setWord] = useState('')
  const [isSearch, setIsSearch] = useState(false)

  useEffect(() => {
    fetchMakets()
  }, [fetchMakets]);

  const filterMarkets = useMemo(() => {
    const regWord = new RegExp(word, 'gi')
    return markets.filter(item => regWord.test(item.base_asset))
  }, [markets, word])
  
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
        { !isSearch &&
          <Box display="flex" marginRight="auto"
            sx={{
              '>:not(:first-of-type)': { marginLeft: '12px' },
            }}
          >
            <Btn className={btnValue == 'ALL' ? classes.btnChoose : ''} onClick={() => setBtnValue('ALL')}>全部</Btn>
            <Btn className={btnValue == 'FIRST' ? classes.btnChoose : ''} onClick={() => setBtnValue('FIRST')}>第一层</Btn>
            <Btn className={btnValue == 'DEFI' ? classes.btnChoose : ''} onClick={() => setBtnValue('DEFI')}>Defi</Btn>
          </Box>
        }
        { isSearch &&
          <Box display="flex" width="100%">
            <Box display="flex" width="100%" position="relative">
              <Box
                className={classes.closeSearch}
                onClick={()=>setIsSearch(!isSearch)}
              >
                <IconFont name="icon-guanbi" color="#c3c2d4"></IconFont>
              </Box>
              <Input placeholder="例如：‘ETH’" onChange={(e) => setWord(e.target.value)}></Input>
            </Box>
          </Box>
        }
        
        { !isSearch &&
          <Box
            className={classes.searchBox}
            onClick={()=>setIsSearch(!isSearch)}
          >
            <IconFont name="icon-sousuo" color="#C3C2D4"></IconFont>
          </Box>
        }
        
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
          filterMarkets.map(item => {
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