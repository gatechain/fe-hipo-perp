import React, { FC, useState } from 'react';
import { Box, Button, InputBase, styled, Tooltip, tooltipClasses, TooltipProps, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { HTooltip } from './HTooltips';
import { DirectionBox } from './DirectionBox';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { DirectionType } from 'src/store/market/const';
import { IconFont } from 'src/components/IconFont';
import { API } from 'src/Api';

const useStyles = makeStyles({
  amountExplain: {
    fontSize: '13px',
    lineHeight: '16px',
    marginLeft: '4px',
    color: '#6f6e84',
    borderRadius: '2px',
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
  long: {
    color:'#3fb68b',
  },
  less: {
    color: '#ff5353',
  },
  valuation: {
    fontSize: '12.5px',
    lineHeight: '16px',
    display: 'flex',
    justifyContent: 'flex-end',
    flex: '1 1 auto',
    flexWrap: 'wrap',
    color: '#c3c2d4',
    paddingLeft: '16px',
    overflow: 'hidden',
  },
  placeOrder: {
    height: '40px',
    fontSize: '13px',
    color: '#6f6e84',
  },
  doPlaceOrderBuy: {
    backgroundColor: '#3fb68b',
    color: '#f7f7f7',
  },
  doPlaceOrderSell: {
    backgroundColor: '#ff5353',
    color: '#f7f7f7',
  },
  closeDetailBox: {
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    width:'32px',
    height:'32px',
    color:'#c3c2d4',
    cursor: 'pointer',
    fontWeight: 500,
    fontSize: '22px',
    '&:hover': {
      backgroundColor: '#303044',
      borderRadius: '8px',
    },
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
export const MarketPriceBox: FC = () => {
  const classes = useStyles()
  const directionType = useSelector((state: RootState) => state.market.directionType)
  const [isShowClose, setIsShowClose] = useState(false)
  const [amount, setAmount] = useState(null)
  const marketType = useSelector((state: RootState) => state.market.marketType)
  const marketSymbol = useSelector((state: RootState) => state.market.marketSymbol)
  
  const handlerPlaceOrder = async () => { 
    try {
      const result = await API.postPlaceOrder({
        market: marketSymbol,
        side: directionType.toUpperCase(),
        type: marketType.toLocaleUpperCase(),
        size: amount.toString(),
        post_only: false,
        expiration: '2022-02-01T08:07:04.805Z',
        time_in_force: 'GTT',
        price: '0',
        limit_fee: '0.05',
      })
      console.log(result.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Box display="flex" flexDirection="column"
      sx={{
        flex: '1 1 auto',
        padding: '20px 24px',
      }}>
      <Box>
        <Box>
          <DirectionBox/>
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
              <Input placeholder="0.0000" onChange={(event)=> setAmount(event.target.value)}></Input>
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
        <Box fontSize="13px" fontWeight={500} color="#c3c2d4" marginLeft="4px" marginBottom="8px">杠杆</Box>
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
            <Box className={`${classes.positionType} 
                ${directionType == DirectionType.buy ? classes.long : classes.less}`}
            >
              {directionType == DirectionType.buy ? '多头' : '空头'}
            </Box>
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
        {
          !isShowClose && <Box display="flex" justifyContent="flex-end" margin="0 8px 12px 8px">
            <Btn>清仓</Btn>
            <Btn onClick={() => setIsShowClose(!isShowClose)} sx={{ padding:0 }}>
              <Box display="flex" alignItems="center" justifyContent="center" width="26px" height="28px">
                <IconFont name='icon-i' color='#fff' />
              </Box>
            </Btn>
          </Box>
        }
        
        {
          isShowClose && 
          <Box
            display="flex"
            justifyContent="space-between"
            fontSize="15px"
            lineHeight="20px"
            alignItems="center"
            padding="10px 8px 0 18px"
            bgcolor="#171722">详情
            <Box
              className={classes.closeDetailBox}
              onClick={()=>setIsShowClose(!isShowClose)}
              >
                <IconFont name='icon-guanbi' color='#fff' />
            </Box>
          </Box>
        }
        
        <Box>
          <Box display="flex" flexDirection="column">
            <Box display="flex" flexDirection="column" padding="6px 12px 4px 12px" bgcolor="#171722">
              <Box
                display="flex"
                justifyContent="space-between"
                fontSize="13px"
                color="#6f6e84"
                padding="4px 0"
              >
                <HTooltip isImg={false} title="预期价格" explain="您订单的预期执行价格。在匹配引擎处理您的订单之前，由于订单簿可能会发生变化，因此此价格仅是估计值。"></HTooltip>
                <span className={classes.valuation}>$38.28</span>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                fontSize="13px"
                color="#6f6e84"
                padding="4px 0"
              >
                <HTooltip isImg={false} title="价格差" explain="订单与投标方或询价方最佳订单之间预期执行价格的差值。交易量越大，价格影响因素就越大。"></HTooltip>
                <span className={classes.valuation}>$38.28</span>
              </Box>
              {
                isShowClose &&
                <Box
                  display="flex"
                  justifyContent="space-between"
                  fontSize="13px"
                  color="#6f6e84"
                  padding="4px 0"
                >
                  <Box>费率百分比</Box>
                  <span className={classes.valuation}>$38.28</span>
                </Box>
              }
              <Box
                display="flex"
                justifyContent="space-between"
                fontSize="13px"
                color="#6f6e84"
                padding="4px 0"
              >
                <Box display="flex">
                  <HTooltip isImg={false} title="交易费率" explain="dYdX的费用根据流动性类型收取。挂单订单的费用比吃单订单的费用低。"></HTooltip>
                  <Box
                    fontSize="13px"
                    lineHeight="16px"
                    fontWeight={500}
                    bgcolor="#303044"
                    padding="1px 4px 1px 5px"
                    borderRadius="2px"
                    marginLeft="4px"
                  >吃单</Box>
                </Box>
                <span className={classes.valuation}>$38.28</span>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                fontSize="13px"
                color="#6f6e84"
                padding="4px 0"
              >
                <Box>合计</Box>
                <span className={classes.valuation}>$38.28</span>
              </Box>
            </Box>
            <Btn
              disabled={!amount}
              className={`${classes.placeOrder} 
              ${!amount ? '' : directionType == DirectionType.buy ? classes.doPlaceOrderBuy : classes.doPlaceOrderSell}`}
              onClick={() => handlerPlaceOrder()}
            >下市场价订单</Btn>
          </Box>
        </Box>
      </Box>
    </Box> 
    
  )
};