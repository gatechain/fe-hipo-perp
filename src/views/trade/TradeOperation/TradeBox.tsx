import React, { FC, useState } from 'react';
import { Box, Button, InputBase, styled, Tooltip, tooltipClasses, TooltipProps, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Image from 'next/image'

const useStyles = makeStyles({
  
  marketTypeChoose: {
    backgroundColor: '#171722', 
    color: '#f7f7f7',
    borderTop: '1px solid #2d2d3d',
  },
  typeSelection: {
    fontWeight: 500,
    display: 'flex',
    height: '40px',
    width: '100%',
    backgroundColor: '#171722',
    borderRadius: '6px',
    cursor: 'pointer',
    marginBottom: '14px',
    position: 'relative',
    '&:before': {
      display:'block',
      content: '""',
      boxSizing: 'border-box',
      height: '40px',
      width: '50%',
      position: 'absolute',
      top: '0',
      left: '0',
      backgroundColor: '#232334',
      borderRadius: '6px',
      zIndex: 0,
      transition: 'all .2s ease-in-out',
    },
  },
  buyType: {
    fontWeight: 500,
    display: 'flex',
    height: '40px',
    width: '100%',
    backgroundColor: '#171722',
    borderRadius: '6px',
    cursor: 'pointer',
    marginBottom: '14px',
    position: 'relative',
    '&:before': {
      display:'block',
      content: '""',
      transform: 'translateX(100%)',
      border: '2px solid #3fb68b',
    },
  },
  typeItem: {
    fontSize: '14px',
    lineHeight: '18px',
    display: 'flex',
    flex: '0 0 50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#6f6e84',
    transition: 'color .2s ease-in-out',
    zIndex: 1,
  },
  buyColor: {
    color: '#3fb68b',
  },
  sellColor: {
    color: '#ff5353 ',
  },
  amountExplain: {
    fontSize: '13px',
    lineHeight: '16px',
    marginLeft: '4px',
    color: '#6f6e84',
  },
  itemK: {
    fontSize: '13px',
    lineHeight: '16px',
    color: '#c3c2d4',
    marginBottom: '8px',
  },
  itemV: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#12121a',
    borderRadius: '6px',
    cursor: 'point',
    height: '40px',
    width: '100%',
  },
  line: {
    flex: '1 1 50%',
    height: '1px',
    backgroundColor: '#2d2d3d',
  },
  positionType: {
    display: 'grid',
    alignSelf: 'center',
    textAlign: 'center',
    color:'#f7f7f7',
    padding: '0 3px 0 4px',
    fontSize: '10px',
    fontWeight: 500,
    lineHeight: '16px',
    backgroundColor: '#303044',
    borderRadius: '2px',
    letterSpacing: '.06em',
    marginLeft: '12px',
    marginRight:'12px',
  },
  longPosition: {
    color:'#3fb68b',
  },
  lessPosition: {
    color: '#ff5353',
  },
})
const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} placement="top"/>
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#454258',
    color: '#c3c2d4',
    width: 250,
    fontSize: '13px',
    lineHeight: '16px',
    margin: '10px 10px 10px 30px',
    padding:'12px',
    filter: 'drop-shadow(0 0 44px #171722)',
    overflow: 'hidden',
  },
}));
const LeverageBtn = styled(Button)({
  display: 'flex',
  alignItems: 'center',
  padding:'0 10px',
  height: '36px',
  minWidth: '0',
  fontWeight: 500,
  fontSize: '14px',
  backgroundColor: '#303044',
  color: '#c3c2d4',
  borderRadius: '8px',
  marginRight: '8px',
})
const Btn = styled(Button)({
  display: 'flex',
  alignItems: 'center',
  padding:'0 10px',
  minWidth: '0',
  fontWeight: 500,
  fontSize: '13px',
  backgroundColor: '#303044',
  color: '#ff5353',
  borderRadius: '24px',
  marginRight: '6px',
  '&:hover': {
    backgroundColor: '#303044',
  },
})
const Input = styled(InputBase)({
  fontSize: '16px',
  lineHeight: '20px',
  fontWeight: 400,
  backgroundColor: '#232334',
  padding: '0',
  height: '40px',
  width: '100%',
})
export const TradeBox: FC = () => {
  const classes = useStyles()
  const [marketType, setMarketType] = useState('market');
  const [isBuy, setIsBuy] = useState(true)
  
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
            <Box
              display="flex"
              alignItems="center"
              flexDirection="row"
              sx={{
                borderBottom: '1px solid #2d2d3d',
                fontSize: '14px',
                lineHeight: '18px',
                color: '#6f6e84',
                backgroundColor: '#1c1c28',
                minHeight: '44px',
                maxHeight: '44px',
                width: '100%',
              }}
            >
              <Box display="flex" alignItems="center" justifyContent="center"
                sx={{ flex: '0 0 33.3333%', borderRight: '1px solid #2d2d3d', minHeight: '44px', cursor: 'pointer' }}
                className={marketType == 'market' ? classes.marketTypeChoose : ''}
                onClick={()=>setMarketType('market')}
              >市场</Box>
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
            <Box display="flex" flexDirection="column"
              sx={{
                flex: '1 1 auto',
                padding: '20px 24px',
              }}>
              <Box>
                <Box>
                  <Box className={classes.typeSelection}>
                    <Box className={classes.typeItem} onClick={() =>setIsBuy(!isBuy)}>卖出</Box>
                    <Box className={`${classes.typeItem} ${classes.buyType}`} onClick={() =>setIsBuy(!isBuy)}>买入</Box>
                  </Box>
                </Box>
                <Box>
                  <Box fontSize="13px" fontWeight={500} color="#c3c2d4" marginLeft="4px" marginBottom="8px">
                    <HtmlTooltip
                      title={
                        <React.Fragment>
                          <Typography sx={{ fontSize: '13px', fontWeight:500 }} color="inherit">订单金额</Typography>
                          <span>要买入或卖出的SMBOL金额。这是您在将订单全部成交时头寸将增加或减少的金额，而不是您得到的头寸金额。</span>
                        </React.Fragment>
                      }>
                      <Box display="flex" alignItems="center" sx={{ cursor: 'help' }}>金额<span className={classes.amountExplain}>设置订单规模</span></Box>
                    </HtmlTooltip>
                  </Box>
                  <Box display="flex" width='100%' marginBottom="10px">
                    <Box
                      display="flex"
                      justifyContent="flex-end"
                      height="40px"
                      fontSize="16px"
                      lineHeight="20px"
                      borderRadius="6px"
                      paddingLeft="12px"
                      flex="1 1"
                      bgcolor="#232334"
                      marginRight="6px"
                    >
                      <Input placeholder="0.0000"></Input>
                      <Box
                        display="grid"
                        alignSelf="center"
                        marginRight="12px"
                        padding="0 3px 0 4px"
                        fontSize="10px"
                        bgcolor="#303044"
                        color="#c3c2d4"
                        borderRadius="2px"
                        letterSpacing=".06em"
                      >ATOM</Box>
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      fontSize="13px"
                      lineHeight="16px"
                      bgcolor="#303044"
                      height="36px"
                      padding="0 10px"
                      borderRadius="6px"
                      color="#c3c2d4"
                      marginLeft="6px"
                    >USD</Box>
                  </Box>
                </Box>
                <Box display="flex" alignItems="center" marginBottom="10px" padding="0 16px">
                  <div className={classes.line}></div>
                  <span style={{ fontSize:'13px', lineHeight:'16px', color:'#6f6e84', padding:'0 12px' }}>或</span>
                  <div className={classes.line}></div>
                </Box>
                <Box display="flex" alignItems="center"
                  sx={{
                    '&:first-of-type': {
                      marginLeft: '8px',
                    },
                    '&:not(:last-child)': {
                      marginRight: '8px',
                    },
                  }}
                >
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    height="40px"
                    fontSize="16px"
                    lineHeight="20px"
                    borderRadius="6px"
                    paddingLeft="12px"
                    flex="1 1"
                    bgcolor="#232334"
                    marginRight="6px"
                  >
                    <Input placeholder="0.0000"></Input>
                    <div className={classes.positionType}>空</div>
                  </Box>
                  <LeverageBtn>2×</LeverageBtn>
                  <LeverageBtn>5×</LeverageBtn>
                  <LeverageBtn>10×</LeverageBtn>
                </Box>
                <Box
                  bgcolor="rgba(255,83,83,.1)"
                  borderLeft="4px solid #ff5353"
                  color="#f7f7f7"
                  fontSize="13px"
                  lineHeight="16px"
                  borderRadius="4px"
                  padding="10px 12px"
                  margin="16px 0"
                  maxHeight="200px"
                  overflow="scroll"
                >
                  <Box>鉴于当前的流动性，此市价单将导致 7.00% 指数价格下滑。如果您仍然打算下该订单，请使用限价单。</Box>
                </Box>
              </Box>

              <Box display="flex" flexDirection="column">
                <Box display="flex" justifyContent="flex-end">
                  <Btn>清仓</Btn>
                  <Btn>
                    <Image width="6px" height="28px" src="/images/btc.svg" alt=""></Image>
                  </Btn>
                </Box>

              </Box>
            </Box> 
          </Box>
          
        </Box>
      </Box>
      
      
    </Box>
    
  )
};