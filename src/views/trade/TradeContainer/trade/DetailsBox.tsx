import { Box, ButtonBase, styled } from '@material-ui/core'
import React, { FC } from 'react'
import Image from 'next/image'
import { makeStyles } from '@material-ui/styles'
import { DetailsItem } from './DetailsItem'
import { IconFont } from 'src/components/IconFont'

const useStyles = makeStyles({
  btnBox: {
    display: 'flex',
    marginTop: '24px',
    '& >button:not(:last-child)': {
      marginRight:'20px',
    },
  },
})

const CancelBtn = styled(ButtonBase)({
  height: '28px',
  fontSize: '13px',
  fontWeight: 500,
  background: '#303044',
  borderRadius: '24px',
  padding: '0 16px',
  color: '#c3c2d4',
})


export const DetailsBox: FC = () => {
  const classes = useStyles()

  return (
    <Box
      flexGrow={1}
      position="relative"
      width="100%"
      height="100%"
      sx={{ overflowY: 'scroll', '&::-webkit-scrollbar': { display: 'none' }  }}
    >  
      <Box position="absolute" width="100%" display="flex" padding="40px">
        <Box display="flex" paddingBottom="28px" width="100%">
          <Box flex='0 0 50%' paddingRight="18px" alignItems="center">
            <Box display="flex" alignItems="center" fontSize="22px" fontWeight={700} color="#c3c2d4">
              <Box display="flex" width="36px" height="36px" marginRight="14px">
                <Image width="36px" height="36px" src="/images/btc.svg" alt=""></Image>
              </Box>
              Cosmos
            </Box>
            <Box marginTop="20px" color="#c3c2d4" fontSize="14px">
              Cosmos是互联应用程序和服务不断扩展的生态系统，是为去中心化的未来而打造。
            </Box>
            <Box marginTop="8px" color="#6f6e84" fontSize="14px">
              Cosmos应用程序和服务使用跨链通信(IBC)协议进行连接。这一创新使您能够在完全独立的去中心化区块链中自由交易资产和数据。
            </Box>
            <Box className={classes.btnBox}>
              <CancelBtn>
                白皮书
                <Box display="flex" fontSize="13px" marginLeft="3px">
                  <IconFont name="icon-tiaozhuan-zhuanqu" color="#c3c2d4"></IconFont>
                </Box>
              </CancelBtn>
              <CancelBtn>
                网站
                <Box display="flex" fontSize="13px" marginLeft="3px">
                  <IconFont name="icon-tiaozhuan-zhuanqu" color="#c3c2d4"></IconFont>
                </Box>
              </CancelBtn>
            </Box>

          </Box>
          <Box flex='0 0 50%' paddingLeft="18px" fontSize="14px">
            <DetailsItem k="市场名称" v="ATOM-USD" isAsset={false}></DetailsItem>
            <DetailsItem k="市场名称" v="ATOM-USD" isAsset={false}></DetailsItem>
            <DetailsItem k="市场名称" v="0.01" isAsset={false}></DetailsItem>
            <DetailsItem k="市场名称" v="1.0" isAsset={false}></DetailsItem>
            <DetailsItem k="市场名称" v="ATOM-USD" isAsset={false}></DetailsItem>
            <DetailsItem k="市场名称" v="ATOM-USD"isAsset={false}></DetailsItem>
            <DetailsItem k="市场名称" v="ATOM-USD" isAsset={true}></DetailsItem>
            <DetailsItem k="市场名称" v="ATOM-USD" isAsset={true}></DetailsItem>
            <DetailsItem k="市场名称" v="ATOM-USD" isAsset={true}></DetailsItem>
            <DetailsItem k="市场名称" v="ATOM-USD" isAsset={true}></DetailsItem>
          </Box>
        </Box>
      </Box>
    </Box>
  )
  
}