import React, { FC } from 'react';
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Box } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  explain: {
    maxWidth: '232px',
    textAlign: 'center',
    marginBottom: '20px',
  },
}))

export const AccoungInfoSection: FC = () => {
  const classes = useStyles()
  return (
    <Box fontSize={14}  display="flex" flexDirection="column" color="#c3c2d4" px="20px" pt="18px" pb="14px" borderBottom="1px solid #2d2d3d" height={180}>
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" width='100%' height='100%' flex="1 1 auto">
        <div className={classes.explain}>连接您的以太坊钱包，以存入资金和开始交易。</div>
        <Button variant="contained" >链接钱包</Button>
      </Box>
      
    </Box>
    
  )
};