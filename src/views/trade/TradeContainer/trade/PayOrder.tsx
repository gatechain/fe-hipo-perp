import { Box  } from '@material-ui/core'
import { FC } from 'react'
import { makeStyles } from '@material-ui/styles'
import { PayOrderItem } from './PayOrderItem'
const useStyles = makeStyles({
  unit: {
    fontSize: '10px',
    backgroundColor: '#303044',
    color: '#c3c2d4',
    padding: '1px 4px 1px 5px',
    letterSpacing: '.06em',
    borderRadius: '2px',
    marginLeft: '2px',
    lineHeight: '16px',
  },
  titleBox: {
    display:'flex',
    height: '100%',
    alignItems: 'center',
    flexShrink: 0,
    flexGrow: 0,
    cursor: 'pointer',
  },
  sortImg: {
    display:'flex',
    alignItems:'center',
    margin:'0 4px',
    width:'10px',
    height:'11px',
  },
})

export const PayOrder: FC = () => {
  const classes = useStyles()
  return (
    <Box  display="flex" flexDirection="column" bgcolor="#1c1c28" width='100%' height="100%">
      <Box
        display="flex"
        alignItems="center"
        fontSize="13px"
        lineHeight="16px"
        bgcolor="#171722"
        padding="0 16px"
        height="40px"
        color="#6f6e84"
        borderBottom="1px solid #2d2d3d"
        component="div"
      >
        <Box className={classes.titleBox} style={{ flexBasis: '7%', width: '7%' }}>
          时间
        </Box>
        <Box className={classes.titleBox} style={{ flexBasis: '23%', width: '23%' }}>
          市场
        </Box>
        <Box className={ classes.titleBox} style={{ flexBasis: '15%', width: '15%' }}>
          支付
        </Box>
        <Box className={classes.titleBox} style={{ flexBasis: '20%', width: '20%' }}>
          资金费率
        </Box>
        <Box className={classes.titleBox} style={{ flexBasis: '20%', width: '20%' }}>
          当前持仓
        </Box>
        <Box className={classes.titleBox} style={{ flexBasis: '12%', width: '12%' }}>
          预言机价格
        </Box>
      </Box>
      <Box flexGrow={1} position="relative">
         <Box
          position="absolute"
          display="flex"
          flexDirection="column"
          width="100%"
          height="100%"
          sx={{ overflowY: 'scroll', '&::-webkit-scrollbar': { display: 'none' } }}>
            <PayOrderItem />
          </Box>
        {/* <Box
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flex="1 1 auto"
          width="100%"
          height="100%"
          fontSize="15px"
          fontWeight="500"
          color="#c3c2d4"
          lineHeight="20px"
          
        >
          您没有资金支付记录。
        </Box>  */}

      </Box>

      
    </Box>
  )
  
}