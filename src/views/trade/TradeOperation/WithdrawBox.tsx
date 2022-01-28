import React, { FC, useState } from 'react';
import { Box, Button, InputBase, styled } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { HTooltip } from './market/HTooltips'
import { AssetSelect } from './AssetSelect'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { OperationType } from 'src/store/trade/const';
import { setOperationType } from 'src/store/trade';
import { API } from 'src/Api';
import { Alert } from 'src/components/Alert';
import { fetchUser } from 'src/store/network';
import { formatNumber } from 'src/utils';

const useStyles = makeStyles({
  close: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    fontSize: '12px',
    cursor: 'point',
    '&:hover': {
      width: '32px',
      height: '32px',
      background: '#303044',
      transition: 'all 0.15s ease-in-out !important',
      borderRadius: '6px',
    },
  },
  lightning: {
    display: 'inline',
    marginTop: '2px',
    marginRight: '2px',
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
  itemR: {
    color: '#c3c2d4',
    display: 'flex',
    fontSize: '12.5px',
    lineHeight: '16px',
    '&>div': {
      display: 'flex',
      '&>span': {
        display: 'inline',
        margin: '0 4px',
        color: '#ff5353',
      },
    },
  },
  amount: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#12121a',
    borderRadius: '6px',
    cursor: 'point',
    height: '40px',
    width: '100%',
    fontSize: '16px',

  },
  feeExplain: {
    fontSize: '14px',
    lineHeight: '18px',
  },
  errorMsg: {
    fontSize: '13px',
    lineHeight: '16px',
    borderRadius: '4px',
    padding: '10px 12px',
    marginTop: '12px',
    backgroundColor: 'rgba(255,83,83,.1)',
    borderLeft: '4px solid #ff5353',
    color: '#f7f7f7',
    overflow: 'scroll',
  },
  confirm: {
    display: 'flex',
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: '0',
    top: '0',
    backdropFilter: 'blur(6px)',
  },
})
const Input = styled(InputBase)({
  marginLeft: '12px',
  fontSize: '16px',
  lineHeight: '20px',
  fontWeight: 400,
  backgroundColor: '#232334',
  padding: '0',
  height: '40px',
  width: '100%',
})

export const WithDrawBox: FC = () => {
  const classes = useStyles()
  const [isConfirm, setIsConfirm] = useState(false)
  const [amount, setAmount] = useState('')
  const {
    trade: { operationType },
    network: { accountInfo },
  } = useSelector((state: RootState) => state)
  const dispatch = useDispatch()

  const handlerOperation = (type: OperationType) => {
    if (operationType == type) {
      dispatch(setOperationType(null))
    } else {
      dispatch(setOperationType(type))
    }
  }

  const handleSubmit = () => {

    API.postWithdraw({ amount }).then(() => {
      setIsConfirm(false)
      dispatch(setOperationType(null))
      Alert.success('提现成功')
      dispatch(fetchUser())
    }).catch(err => {
      Alert.error(err.msg)
    })
  }

  return (
    <Box display="flex" flexDirection="column" width="100%" height="100%">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        fontWeight={500}
        fontSize="20px"
        lineHeight="24px"
        padding="24px 20px 20px 28px"
        color="#f7f7f7"
      >
        <Box>提现</Box>
        <div className={classes.close} onClick={() => handlerOperation(OperationType.withdraw)}>X</div>
      </Box>
      <Box position="relative" component="div" width="100%" flexGrow={1}>
        <Box
          position="absolute"
          width="100%"
          height="100%"
          overflow="hidden"
          sx={{ overflowY: 'scroll', '&::-webkit-scrollbar': { display: 'none' } }}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            padding="0 28px 24px"
            height="100%"
            flexGrow={1}
            overflow="scroll">
            <Box>
              <Box display="flex" alignItems="center" marginBottom="16px">
                {/* <Button variant="contained"
                  sx={{
                    fontSize: '13px',
                    fontWeight: 500,
                    backgroundColor: '#303044',
                    height: '28px',
                    lineHeight: '16px',
                    borderRadius: '24px',
                    padding: '0 10px',
                    marginRight: '6px',
                  }}>
                  <span className={classes.lightning}>⚡️</span>快速提现
                </Button> */}
                <Button
                  variant="contained"
                  sx={{
                    fontSize: '13px',
                    fontWeight: 500,
                    backgroundColor: '#303044',
                    height: '28px',
                    lineHeight: '16px',
                    borderRadius: '24px',
                    padding: '0 10px',
                    marginRight: '6px',
                  }}
                >正常提现</Button>
                <Box marginLeft="2px">
                  <HTooltip
                    isImg={true}
                    title="提现类型"
                    explain="dYdX支持两种从Layer 2提现的类型。快速提现会产生小额费用，但不需要gas，并会立即发送提现请求。通常出金は手数料はかかりませんが、2ステップの手続きが必要で所要時間がはるかに長く、ユーザーがGas手数料を負担しなければなりません。">
                  </HTooltip>
                </Box>
              </Box>
              <Box display="flex" flexDirection="column" width='100%' marginBottom="10px">
                <div className={classes.itemK}>资产</div>
                <div className={classes.itemV}>
                  <AssetSelect></AssetSelect>
                </div>
              </Box>
              <Box display="flex" flexDirection="column" width='100%' marginBottom="10px">
                <div className={classes.itemK}>金额</div>
                <div className={classes.itemV} style={{ backgroundColor: '#232334' }}>
                  <Input placeholder="0.0000" onChange={(e) => setAmount(e.target.value)}></Input>
                  <Box component="div"
                    display="flex"
                    fontSize="12px"
                    color="#6f6e84"
                    padding="0 12px"
                    letterSpacing=".04em"
                  >最大值</Box>
                </div>
              </Box>
              <Box padding="6px 12px 4px" width="100%" color="#6f6e84">
                <Box py="4px"
                  display="flex"
                  justifyContent="space-between"
                  fontSize="13px"
                  lineHeight="16px"
                  flex="0 0 auto"
                  whiteSpace="nowrap">
                  <HTooltip isImg={false} title='可用质押品' explain="您可以提现的最大金额。当可用质押品为0或负时，您的账户正在使用最大杠杆。"></HTooltip>
                  {/* <Box display="flex" alignItems="center">可用质押品</Box> */}
                  <div className={classes.itemR}>
                    $
                    {formatNumber(accountInfo.free_collateral)}
                    <div>
                      <span>{'→'}</span>
                      $
                      {formatNumber((Number(accountInfo.free_collateral) - Number(amount)).toString())}
                    </div>
                  </div>

                </Box>
                {/* 
                <Box py="4px"
                  display="flex"
                  justifyContent="space-between"
                  fontSize="13px"
                  lineHeight="16px"
                  flex="0 0 auto"
                  whiteSpace="nowrap">
                  <Box display="flex" alignItems="center">可用质押品</Box>
                  <Box display="flex" alignItems="center" color="#c3c2d4">$8,000.00</Box>
                </Box>
              */}
              </Box>
              <Box>

              </Box>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              bgcolor="#171722"
              borderRadius="8px"
              fontWeight={500}
              color="#c3c2d4"
            >
              <Box
                padding="6px 12px 4px"
                width="100%"
                color="#6f6e84"
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  fontSize="13px"
                  color="#6f6e84"
                  padding="4px 0">
                  <Box display="flex" >
                    <Box display="flex" sx={{ cursor: 'help' }}>交易费率</Box>
                    <Box display="flex" width="16px" height="16px" marginLeft="6px">
                      <HTooltip isImg={true} title="快速提现费" explain="高速出金は直ちに送金され、dYdXが手数料と引き換えにGasコストを負担します。手数料がかからない出金については、通常出金（お客様がGasコストを負担するほか、レイヤー2の承認を待つ必要があります）をご利用ください。"></HTooltip>
                    </Box>
                  </Box>
                  <Box fontSize="12.5px" fontWeight={400} color="#c3c2d4">-</Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  fontSize="13px"
                  color="#6f6e84"
                  padding="4px 0">
                  <Box display="flex" >
                    <Box display="flex" sx={{ cursor: 'help' }}>合计</Box>
                  </Box>
                  <Box fontSize="12.5px" fontWeight={400} color="#c3c2d4">-</Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  fontSize="13px"
                  color="#6f6e84"
                  padding="4px 0">
                  <Box display="flex" >
                    <Box display="flex" sx={{ cursor: 'help' }}>钱包</Box>
                    <Box component="div"
                      display="inline-flex"
                      bgcolor="#454258"
                      borderRadius="2px"
                      fontSize="10px"
                      lineHeight="16px"
                      color="#c3c2d4"
                      padding="1px 4px 1px 5px"
                      letterSpacing=".06em"
                      marginLeft="6px"
                    >USDC</Box>
                  </Box>
                  <div className={classes.itemR}>
                    $
                    {formatNumber(accountInfo.free_collateral)}
                    <div>
                      <span>{'→'}</span>
                      $
                      {formatNumber((Number(accountInfo.free_collateral) - Number(amount)).toString())}
                    </div>
                  </div>
                </Box>
                <Button
                  onClick={() => setIsConfirm(!isConfirm)}
                  variant="contained"
                  sx={{
                    width: '100%',
                    backgroundColor: '#303044',
                  }}>确认提现</Button>
              </Box>

            </Box>
            {/* 确认提现 */}
            <div className={classes.confirm} style={{ display: `${isConfirm ? '' : 'none'}` }}>
              <Box margin="auto">
                <Box display="flex" flexDirection="column" bgcolor="#232334" borderRadius="12px" boxSizing="border-box">
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    fontWeight={500}
                    fontSize="20px"
                    lineHeight="24px"
                    padding="24px 20px 20px 28px"
                    color="#f7f7f7"
                  >
                    <Box>确认提现</Box>
                    <div onClick={() => setIsConfirm(!isConfirm)} className={classes.close}>X</div>
                  </Box>
                  <Box display="flex" justifyContent="space-between" padding="0 28px 24px" flexDirection="column" flex="1 1 100%" overflow="scroll" width='100%'>
                    <p className={classes.feeExplain}>将对此笔快速提现收取
                      <strong>$--</strong>
                      的费用。您的资金将立即发送，并会在提现交易确认后出现在您的钱包中。
                    </p>
                    <div className={classes.errorMsg}>
                      出现问题。请稍后重试。
                    </div>
                    <Button
                      variant="contained"
                      onClick={handleSubmit}
                      sx={{
                        width: '100%',
                        backgroundColor: '#5973fe',
                        marginTop: '12px',
                      }}>提现</Button>
                    <p className={classes.feeExplain} style={{ color: '#6f6e84', marginTop: '12px' }}>提现一旦发起无法撤回。</p>
                  </Box>
                </Box>
              </Box>
            </div>
          </Box>
        </Box>
      </Box>
    </Box>

  )
};