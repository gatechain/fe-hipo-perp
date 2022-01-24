import { Box, ButtonBase, Drawer, styled  } from '@material-ui/core'
import  React, { FC } from 'react'
import { makeStyles } from '@material-ui/styles'
import Image from 'next/image'
import { DrawerDetails } from './DrawerDetails'

const useStyles = makeStyles({
  itemBox: {
    display: 'flex',
    padding: '0 16px',
    height: '48px',
    borderBottom: ' 1px solid #2d2d3d',
    color: '#C3C2D3',
    bgcolor: '#1c1c28',
    width: '100%',
    '&:hover': {
      backgroundColor: '#232334',
      color: '#f7f7f7',
      cursor: 'pointer',
    },
  },
  direction: {
    fontWeight: 500,
    display: 'inline-flex',
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '13px',
  },
  sell: {
    backgroundColor: 'rgba(255,83,83,.1)',
    color: '#ff5353',
  },
  buy: {
    backgroundColor: 'rgba(63,182,139,.1)',
    color: '#3fb68b',
  },
  drawer: {
    width: '300px',
    height: '100%',
    backgroundColor: '#1c1c28',
    borderLeft:'1px solid #2d2d3d',
  },
})

const CancelBtn = styled(ButtonBase)({
  height: '36px',
  fontSize: '14px',
  fontWeight: 500,
  background: '#303044',
  borderRadius: '8px',
  padding: '0 16px',
  color: '#ff5353',
})

export const OrderItem: FC = () => {
  const classes = useStyles()
  
  const [state, setState] = React.useState({ right: false });

  const toggleDrawer =
    (anchor: string, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }
        setState({ 'right' : open });
      };

  return (
    <Box>  
       <React.Fragment key="right"> 
        <Box className={classes.itemBox} onClick={toggleDrawer('right', true)}>
          <Box display="flex" alignItems="center" flexBasis="15%" width="15%" >
            <Box width="16px" height="16px" display="flex" >
              <Image width="16px" height="16px" src="/images/btc.svg" alt=""></Image>
            </Box>
            <Box display="flex" alignItems="center" fontSize="14px" marginLeft="10px">限价</Box>
          </Box>
          <Box display="flex" alignItems="center" flexBasis="10%" width="10%" >
            <Box className={`${classes.direction} ${classes.buy}`}>买入</Box>
          </Box>
          <Box display="flex" alignItems="center" flexBasis="28%" width="28%" >
            <Box display="flex" flexDirection="column" justifyContent="center" fontSize="12px">
              <Box height="19px" lineHeight="16px">100.000</Box>
              <Box height="19px" lineHeight="16px" color="#6f6e84">0.000</Box>
            </Box>
          </Box>
          <Box display="flex" alignItems="center" flexBasis="18%" width="18%" >
            <Box display="flex" fontSize="13px" >$33.00</Box>
          </Box>
          <Box display="flex" alignItems="center" flexBasis="17%" width="17%" >
            <Box display="flex" fontSize="13px" >-</Box>
          </Box>
          <Box display="flex" alignItems="center" flexBasis="8%" width="8%" >
            <Box display="flex" fontSize="13px" >4周</Box>
          </Box>
          <Box display="flex" alignItems="center" flexBasis="4%" width="4%" >
            <Box display="flex" fontSize="13px" >4周</Box>
          </Box>
        </Box>
        <Drawer
          anchor="right"
          open={state.right}
          onClose={toggleDrawer('right', false)}
        >
          <Box className={classes.drawer}>
            <Box display="flex" flexDirection="column" height='100%'>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center" fontSize="20px"
                fontWeight={500}
                padding="24px 20px 20px 28px"
              >
                <Box display="flex" alignItems="center" >
                  <Box display="flex" height="24px" width="24px" marginRight="10px">
                    <Image width="24px" height="24px" src="/images/btc.svg" alt=""></Image>
                  </Box>
                  <Box display="flex">限价订单</Box>
                </Box>
                <Box component="div" onClick={toggleDrawer('right', false)} >X</Box>
              </Box>
              <Box flexGrow={1} display="flex" flexDirection="column" justifyContent="space-between" padding="0 28px 24px 28px">
                <Box display="flex" flexDirection="column" >
                  <DrawerDetails k="市场" v="ATOM-USD" />
                  <DrawerDetails k="direction" v="sell"/>
                  <DrawerDetails k="状态" v="开仓"/>
                </Box>
                <CancelBtn>取消订单</CancelBtn>
              </Box>

            </Box>
          </Box>
        </Drawer>
      </React.Fragment> 
    </Box>
  )
  
}