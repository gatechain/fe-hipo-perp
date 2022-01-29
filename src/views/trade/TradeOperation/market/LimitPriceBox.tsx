import React, { FC, useMemo, useState } from 'react';
import { Box, Button, Checkbox, CheckboxProps, InputBase, MenuItem, Select, styled, Tooltip, tooltipClasses, TooltipProps, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { HTooltip } from './HTooltips';
import { DirectionBox } from './DirectionBox';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { DirectionType } from 'src/store/market/const';
import { IconFont } from 'src/components/IconFont';
import { API } from 'src/Api';
import moment from 'moment';
import { Alert } from 'src/components/Alert';
import { loadOrderList } from 'src/store/order';
import { fetchUser } from 'src/store/network';

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
  highRanking: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '13px',
    color: '#6f6e84',
    height: '44px',
    padding: '0 8px 0 4px',
    borderTop: '1px solid #2d2d3d',
    cursor: 'pointer',
  },
  effectiveTimeBox: {
    display: 'flex',
    fontSize: '13px',
    fontWeight: 500,
    color: '#c3c2d4',
    marginLeft: '4px',
    marginBottom: '8px',
  },
  closeDetailBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    color: '#c3c2d4',
    cursor: 'pointer',
    fontWeight: 500,
    fontSize: '22px',
    '&:hover': {
      backgroundColor: '#303044',
      borderRadius: '8px',
    },
  },
  highRankingOptionIcon: {
    display: 'flex',
    fontSize: '18px',
    fontWeight: 500,
    transition: 'all .15s ease-in-out!important',
  },
  highRankingOptionIconAcitve: {
    transform: 'rotate(180deg)',
  },
})
const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} placement="top" />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#454258',
    color: '#c3c2d4',
    width: 250,
    fontSize: '13px',
    lineHeight: '16px',
    margin: '10px 10px 10px 30px',
    padding: '12px',
    filter: 'drop-shadow(0 0 44px #171722)',
    overflow: 'hidden',
  },
}));
const Btn = styled(Button)({
  display: 'flex',
  alignItems: 'center',
  padding: '0 10px',
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
  borderRadius: '6px',
})
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  root: {
    width: '100%',
  },
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input.MuiSelect-select': {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 4,
    position: 'relative',
    backgroundColor: '#232334',
    color: '#f7f7f7',
    fontSize: 15,
    fontWeight: 500,
    padding: '0 26px 0 12px',
    height: '40px',
    width: '100%',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
  },
  '& .MuiInputBase-root.MuiInputBase-colorPrimary.MuiSelect-root.MuiInputBase-root': {
    width: '100%',
  },
}));
const BpIcon = styled('span')(() => ({
  borderRadius: 3,
  width: '20px',
  height: '20px',
  backgroundColor: '#171722',
  position: 'relative',
}));
const BpCheckedIcon = styled(BpIcon)({
  '&:before': {
    display: 'block',
    content: '""',
    width: '8px',
    height: '12px',
    border: 'solid #f7f7f7',
    borderWidth: '0 2px 2px 0',
    borderRadius: '1px',
    transform: 'rotate(40deg) scale(1)',
    position: 'absolute',
    left: '6px',
    top: '2px',
  },
});
function BpCheckbox(props: CheckboxProps) {
  return (
    <Checkbox
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      inputProps={{ 'aria-label': 'Checkbox demo' }}
      {...props}
    />
  );
}

export const LimitPriceBox: FC = () => {
  const classes = useStyles()
  const directionType = useSelector((state: RootState) => state.market.directionType)
  const [isShowClose, setIsShowClose] = useState(false)
  const [isHighRankingOption, setIsHighRankingOption] = useState(true)
  const [price, setPirce] = useState(null)
  const [timeInForce, setTimeInForce] = useState('GTT')
  const [expiration, setExpiration] = useState('day')
  const [inputValue, setInputValue] = useState(28)
  const [postOnly, setPostOnly] = useState(false)
  const [amount, setAmount] = useState(null)
  const market = useSelector((state: RootState) => state.market)
  const dispatch = useDispatch()

  const expirationUTC = useMemo(() => {
    if (expiration == 'day') {
      return moment().add(inputValue, 'days').utc().format('YYYY-MM-DDTHH:mm:SS')
    }
    if (expiration == 'week') {
      return moment().add(Number(inputValue) * 7, 'days').utc().format('YYYY-MM-DDTHH:mm:SS')
    }
    if (expiration == 'hour') {
      return moment().add(inputValue, 'hours').utc().format('YYYY-MM-DDTHH:mm:SS')
    }
    if (expiration == 'minute') {
      return moment().add(inputValue, 'minutes').utc().format('YYYY-MM-DDTHH:mm:SS')
    }
  }, [expiration, inputValue])


  const handlerPlaceOrder = () => {
    (async function () {
      try {
        await API.postPlaceOrder({
          market: market.marketSymbol.replace('-', '_'),
          side: directionType.toUpperCase(),
          type: market.marketType.toLocaleUpperCase(),
          size: amount.toString(),
          post_only: postOnly.toString(),
          expiration: expirationUTC + 'Z',
          time_in_force: timeInForce.toString(),
          price: price.toString(),
          limit_fee: '0.05',
        })
        // setIsShowClose(false)
        // setIsHighRankingOption(true)
        // setPirce(null)
        // setTimeInForce('GTT')
        // setExpiration('day')
        // setInputValue(28)
        // setPostOnly(false)
        Alert.success('下单成功')
        dispatch(fetchUser())
        dispatch(loadOrderList(1, 20))
      } catch (error) {
        console.log(error)
        Alert.error('error')
      }
    }())
  }

  return (
    <Box display="flex" flexDirection="column"
      sx={{
        flex: '1 1 auto',
        padding: '20px 24px',
      }}>
      <Box>
        <Box>
          <DirectionBox />
        </Box>
        <Box>
          <Box display="flex" fontSize="13px" fontWeight={500} color="#c3c2d4" marginLeft="4px" marginBottom="8px">
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography sx={{ fontSize: '13px', fontWeight: 500 }} color="inherit">订单金额</Typography>
                  <span>要买入或卖出的SMBOL金额。这是您在将订单全部成交时头寸将增加或减少的金额，而不是您得到的头寸金额。</span>
                </React.Fragment>
              }>
              <Box display="flex" alignItems="center" sx={{ cursor: 'help' }}>金额<Box className={classes.amountExplain}>设置订单规模</Box></Box>
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
              <Input placeholder="0.0000" onChange={(e) => setAmount(e.target.value)}></Input>
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
              >{market.currentAsset}</Box>
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

        <Box marginBottom="14px">
          <Box display="flex" fontSize="13px" fontWeight={500} color="#c3c2d4" marginLeft="4px" marginBottom="8px">
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography sx={{ fontSize: '13px', fontWeight: 500 }} color="inherit">订单金额</Typography>
                  <span>要买入或卖出的SMBOL金额。这是您在将订单全部成交时头寸将增加或减少的金额，而不是您得到的头寸金额。</span>
                </React.Fragment>
              }>
              <Box display="flex" alignItems="center" sx={{ cursor: 'help' }}>限价<span className={classes.amountExplain}>USD</span></Box>
            </HtmlTooltip>
          </Box>
          <Box
            display="flex"
            height="40px"
            fontSize="16px"
            lineHeight="20px"
            borderRadius="6px"
            paddingLeft="12px"
            flex="1 1"
            bgcolor="#232334"
            marginRight="6px"
          >
            <Input placeholder="0.0000" value={price} onChange={(e) => setPirce(e.target.value)}></Input>
          </Box>
        </Box>
      </Box>

      <Box marginBottom="4px">
        <Box className={classes.highRanking}>
          <Box>高级</Box>
          <Box
            className={`${classes.highRankingOptionIcon} ${isHighRankingOption == true ? classes.highRankingOptionIconAcitve : ''}`}
            onClick={() => setIsHighRankingOption(!isHighRankingOption)}
          >
            <IconFont name="icon-xiangxia1" color="#6f6e84"></IconFont>
          </Box>
        </Box>
        {
          isHighRankingOption &&
          <Box display="flex" flexDirection="column" sx={{ transition: 'all 2s ease' }}>
            <Box display="flex" flexDirection="column" className={classes.effectiveTimeBox}>
              <Box marginBottom="8px">有效时间截止</Box>
              <Select
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={timeInForce}
                input={<BootstrapInput />}
                onChange={(e) => setTimeInForce(e.target.value)}
              >
                <MenuItem value="GTT">有效时间截止</MenuItem>
                <MenuItem value="FOK">全部成交否则取消指令</MenuItem>
                <MenuItem value="IOC">立即否则取消</MenuItem>
              </Select>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Box width="calc(50% - 5px)">
                <Input value={inputValue} style={{ paddingLeft: '12px' }} onChange={(e) => setInputValue(Number(e.target.value) || 28)}></Input>
              </Box>
              <Select
                sx={{ width: '50%' }}
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={expiration}
                input={<BootstrapInput />}
                onChange={(e) => setExpiration(e.target.value)}
              >
                <MenuItem value='minute'>分钟</MenuItem>
                <MenuItem value='hour'>小时</MenuItem>
                <MenuItem value='day'>天</MenuItem>
                <MenuItem value='week'>周</MenuItem>
              </Select>
            </Box>
            <Box display="flex" flexDirection="column" marginTop="16px" className={classes.effectiveTimeBox}>
              <Box marginBottom="8px">执行</Box>
              <Box display="flex">
                <BpCheckbox sx={{ padding: '0' }} onChange={(e) => setPostOnly(e.target.checked)} />
                <Box paddingLeft="10px" display="flex">仅挂单
                  <HtmlTooltip
                    title={
                      <React.Fragment>
                        <Typography sx={{ fontSize: '13px', fontWeight: 500 }} color="inherit">仅挂单</Typography>
                        <span>要买入或卖出的SMBOL金额。这是您在将订单全部成交时头寸将增加或减少的金额，而不是您得到的头寸金额。</span>
                      </React.Fragment>
                    }>
                    <Box display="flex" alignItems="center" fontSize="16px" fontWeight={500} marginLeft="2px" sx={{ cursor: 'help' }}>
                      <IconFont name="icon-wenhao-xianxingyuankuang" color="#c3c2d4"></IconFont>
                    </Box>
                  </HtmlTooltip>

                </Box>
              </Box>
            </Box>

          </Box>
        }
      </Box>

      <Box display="flex" flexDirection="column" >
        <Box
          bgcolor="rgba(255,83,83,.1)"
          borderLeft="4px solid #ff5353"
          color="#f7f7f7"
          fontSize="13px"
          lineHeight="16px"
          borderRadius="4px"
          padding="10px 12px"
          margin="0 0 16px 0"
          maxHeight="200px"
          overflow="scroll"
        >
          <Box>鉴于当前的流动性，此市价单将导致 7.00% 指数价格下滑。如果您仍然打算下该订单，请使用限价单。</Box>
        </Box>
        {
          !isShowClose && <Box display="flex" justifyContent="flex-end" margin="0 8px 12px 8px">
            <Btn>清仓</Btn>
            <Btn onClick={() => setIsShowClose(!isShowClose)}>
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
              className={`${classes.closeDetailBox}`}
              onClick={() => setIsShowClose(!isShowClose)}
            >
              <IconFont name='icon-guanbi' color='#fff' />
            </Box>
          </Box>
        }

        <Box>
          <Box display="flex" flexDirection="column">
            <Box display="flex" flexDirection="column" padding="6px 12px 4px 12px" bgcolor="#171722">
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
                  <HTooltip isImg={false} title="交易费率" explain="订单与投标方或询价方最佳订单之间预期执行价格的差值。交易量越大，价格影响因素就越大。"></HTooltip>
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
            >下限价订单</Btn>
          </Box>
        </Box>

      </Box>
    </Box>

  )
};