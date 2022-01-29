import React, { FC, useEffect, useRef, useState } from 'react';
import { Box, Button, InputBase, styled } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { AssetSelect } from './AssetSelect'
import { OperationType } from 'src/store/trade/const';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { setOperationType } from 'src/store/trade';
import { contractAddress, Ether, tokenAddress } from 'src/sdk/ether';
import { BigNumber } from '@ethersproject/bignumber';
import { useWeb3React } from '@web3-react/core';
import { Alert } from 'src/components/Alert';

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
  newDeposit: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '11px',
    lineHeight: '16px',
    backgroundColor: '#5973fe',
    margin: '1px 0',
    padding: '0 5px',
    marginRight: '8px',
    borderRadius: '16px',
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
  borderRadius: '8px',
})

enum ButtonStatus {
  deposit,
  approve,
  loading,
}

export const DepositBox: FC = () => {
  const classes = useStyles()
  const { account } = useWeb3React()
  const [amount, setAmount] = useState('')
  const ether = useRef<Ether>(null)
  const [tokenInfo, setTokenInfo] = useState<any>({})
  const [btnStatus, setBtnStatus] = useState(ButtonStatus.deposit)
  const {
    trade: { operationType },
  } = useSelector((state: RootState) => state)
  const dispatch = useDispatch()


  useEffect(() => {
    ether.current = Ether.getInstance()
    async function init() {
      const tokenResult = await ether.current.getTokenDetailV2(tokenAddress)
      console.log(tokenResult)
      setTokenInfo(tokenResult)
    }
    init()
  }, [ether])

  const handlerOperation = (type: OperationType) => {
    if (operationType == type) {
      dispatch(setOperationType(null))
    } else {
      dispatch(setOperationType(type))
    }
  }

  async function checkApplet(amountBig: BigNumber) {
    const allowanceRes = await ether.current.getTokenAllowance(tokenAddress, account, contractAddress)
    if (amountBig.gt(allowanceRes)) {
      setBtnStatus(ButtonStatus.approve)
    } else {
      setBtnStatus(ButtonStatus.deposit)
    }
  }

  const handleSubmit = () => {
    (async function () {
      const contr = ether.current.getPerpetualContract()
      const amountBig = BigNumber.from(10).pow(tokenInfo.decimals).mul(amount || 0)
      try {
        await contr.deposit(account, tokenAddress, amountBig.toString())
        Alert.success('充值成功')
        dispatch(setOperationType(null))
      } catch (error) {
        Alert.error('充值失败')
      }
    })()
  }

  const handleApprove = () => {
    const amountBig = BigNumber.from(10).pow(tokenInfo.decimals).mul(amount || 0)
    setBtnStatus(ButtonStatus.loading)
    ether.current.approve(tokenAddress, '0x4F091e8f52092E7Ce70Fc385ae3B2d1301476293', amountBig.toString()).then(() => {
      setTimeout(() => {
        Alert.success('授权成功')
        setBtnStatus(ButtonStatus.deposit)
      }, 15000)
    }).catch(() => {
      setBtnStatus(ButtonStatus.approve)
      Alert.error('授权失败')
    })
  }

  const changeAmount = (value: string) => {
    setAmount(value)
    checkApplet(BigNumber.from(10).pow(tokenInfo.decimals).mul(value || 0))
  }

  const ButtonMap = (key: ButtonStatus) => {
    const buttonStyle = {
      width: '100%',
      backgroundColor: '#5973fe',
      borderRadius: '8px',
    }
    const buttonObj = {
      [ButtonStatus.deposit]: <Button sx={buttonStyle} onClick={handleSubmit} variant="contained">确认充值</Button>,
      [ButtonStatus.approve]: <Button sx={buttonStyle} onClick={handleApprove} variant="contained">授权</Button>,
      [ButtonStatus.loading]: <Button sx={buttonStyle}>loading...</Button>,
    }
    return buttonObj[key]
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
        <Box>充值</Box>
        <div onClick={() => handlerOperation(OperationType.deposit)} className={classes.close}>X</div>
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
              <Box display="flex" flexDirection="column" width='100%' marginBottom="10px">
                <div className={classes.itemK}>资产</div>
                <div className={classes.itemV}>
                  <AssetSelect></AssetSelect>
                </div>
              </Box>
              <Box display="flex" flexDirection="column" width='100%' marginBottom="10px">
                <div className={classes.itemK}>金额</div>
                <div className={classes.itemV} style={{ backgroundColor: '#232334' }}>
                  <Input placeholder="0.0000" onChange={(e) => changeAmount(e.target.value)}></Input>
                </div>
              </Box>
              <Box
                width='100%'
                fontSize="13px"
                lineHeight="16px"
                borderRadius="6px"
                color="#c3c2d4"
                bgcolor="#171722"
                marginBottom="16px"
              >
                <Box
                  display="flex"
                  fontSize="15px"
                  lineHeight="20px"
                  color="#f7f7f7"
                  marginBottom="4px"
                >
                  <span className={classes.newDeposit}>新建</span>Testnet deposits
                </Box>
                <Box></Box>Testnet deposits are processed on Layer 2 and do not require gas fees. Your deposit will be transferred directly to your dYdX account, not your wallet.
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
              <Box width="100%" color="#6f6e84">{ButtonMap(btnStatus)}</Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>

  )
};