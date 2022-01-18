import React, { FC, useState } from 'react';
import { Box, Button, InputBase, styled } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { HTooltip } from './HTooltips'
import { AssetSelect } from './AssetSelect'

const useStyles = makeStyles({
  close: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    fontSize:'12px',
    cursor :'point',
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
    justifyContent:'flex-end',
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
    padding:'10px 12px',
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
    left:'0',
    top: '0',
    backdropFilter:'blur(6px)',
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

export const DepositBox: FC = () => {
  const classes = useStyles()  
  const [isConfirm, setIsConfirm] = useState(false)
  return (
    <Box display="flex" flexDirection="column" width="100%" height="100%">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems= "center"
        fontWeight={500}
        fontSize="20px"
        lineHeight="24px"
        padding="24px 20px 20px 28px"
        color="#f7f7f7"
      >
        <Box>提现</Box>
        <div className={classes.close}>X</div>
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
                <Button variant="contained"
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
                </Button>
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
                <HTooltip isImg={true} title="提现类型" explain="dYdX支持两种从Layer 2提现的类型。快速提现会产生小额费用，但不需要gas，并会立即发送提现请求。通常出金は手数料はかかりませんが、2ステップの手続きが必要で所要時間がはるかに長く、ユーザーがGas手数料を負担しなければなりません。"></HTooltip>
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
                  <Input placeholder="0.0000"></Input>
                  <Box component="div"
                    display="flex"
                    fontSize="12px"
                    color="#6f6e84"
                    padding="0 12px"
                    letterSpacing=".04em"
                  >最大值</Box>
                </div>
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
              color="#6f6e84">
              <Button
                onClick={()=>setIsConfirm(!isConfirm)}
                variant="contained"
                sx={{
                  width: '100%',
                  backgroundColor: '#303044',
                }}>确认充值</Button>
              </Box>
              
            </Box>
           
          </Box> 
        </Box>
      </Box>
    </Box>
    
  )
};