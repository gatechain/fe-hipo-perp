import { Box, Theme } from "@material-ui/core";
import { makeStyles, styled, withStyles, WithStyles } from "@material-ui/styles"
import { FC } from "react";
import Image from 'next/image'

const useStyles = makeStyles<Theme>((theme) => ({
  
	
}))
export const TradeOperation: FC = () => {
  const classes = useStyles()
	return (
    <Box py="12px" width={324} height={47} borderBottom='1px solid #2d2d3d'>
      <Box display="flex" alignItems="center" justifyContent="space-between" px="20px">
        <Box display="flex" alignItems="center">
          <Box mr={1} width={24} height={24}>
            <Image width={24} height={24} src="/images/btc.svg" alt=""></Image>
          </Box>
          <span>ETH-USDT</span>
        </Box>
        <div>
          <span>交易对</span>
        </div>
      </Box>
    </Box>
  )
  
}