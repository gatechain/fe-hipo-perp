import { Box } from '@material-ui/core'
import { FC } from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  bottomBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRight:'1px solid #2d2d3d',
    width:'36px',
    height:'100%',
  },
})

export const OrderBookFoot: FC = () => {
  const classes = useStyles()
  return <Box
    display="flex"
    alignItems="center"
    position="absolute"
    bottom={0} left={0}
    height="36px"
    width="100%"
    pr='24px'
    borderTop='1px solid #2d2d3d'
    color="#6f6e84"
    component="div">
    
    <div className={classes.bottomBtn}>+</div>
    <div className={classes.bottomBtn}>-</div>
    <Box
      display="flex"
      flexGrow={1}
      justifyContent="flex-end"
      alignItems="center"
      fontSize="12px">0.01</Box>
  </Box>
}