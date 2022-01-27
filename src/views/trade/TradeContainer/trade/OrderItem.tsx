import { Box, ButtonBase, Drawer, styled, Tooltip  } from '@material-ui/core'
import  React, { FC } from 'react'
import { makeStyles } from '@material-ui/styles'
import Image from 'next/image'
import { DrawerDetails } from './DrawerDetails'
import { IconFont } from 'src/components/IconFont'
import { OrderTypeForC } from 'src/store/order/const'

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
    borderLeft: '1px solid #2d2d3d',
  },
  clearPosition: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '13px',
    width: '32px',
    height: '32px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#303044',
      borderRadius: '8px',
    },
  },
  closeDrawer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '20px',
    fontWeight: 700,
    width: '32px',
    height: '32px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#303044',
      borderRadius: '8px',
    },
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
interface OrderItemProps { 
  status: string,
  side: string,
  size: string, //数量
  remaining_size: string, //剩余
  price: string,
  created_at: string,
  type: string,
  trigger_price: string,
  expire_at: string,
}
export const OrderItem: FC<OrderItemProps> = (props) => {
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
              { props.side.toLowerCase() == 'buy' &&
                <IconFont name="icon-yuanquankong" color='#3fb68b'></IconFont>
              }
              { props.side.toLowerCase() == 'sell' &&
                <IconFont name="icon-yuanquankong" color='#ff5353'></IconFont>
              }
            </Box>
            <Box display="flex" alignItems="center" fontSize="14px" marginLeft="10px">{ OrderTypeForC[props.type] }</Box>
          </Box>
          <Box display="flex" alignItems="center" flexBasis="10%" width="10%" >
            <Box className={`${classes.direction} ${props.side.toLowerCase() == 'buy' ? classes.buy : classes.sell}`}>{ props.side }</Box>
          </Box>
          <Box display="flex" alignItems="center" flexBasis="28%" width="28%" >
            <Box display="flex" flexDirection="column" justifyContent="center" fontSize="12px">
              <Box height="19px" lineHeight="16px">{ props.size}</Box>
              <Box height="19px" lineHeight="16px" color="#6f6e84">{ Number(props.size) - Number(props.remaining_size)}</Box>
            </Box>
          </Box>
          <Box display="flex" alignItems="center" flexBasis="18%" width="18%" >
            <Box display="flex" fontSize="13px" >{ `$${props.price}` }</Box>
          </Box>
          <Box display="flex" alignItems="center" flexBasis="12%" width="12%" >
            <Box display="flex" fontSize="13px" >{ props.trigger_price }</Box>
          </Box>
          <Box display="flex" alignItems="center" flexBasis="13%" width="13%" >
            <Box display="flex" fontSize="13px" >{ props.expire_at }</Box>
          </Box>
          <Box display="flex" alignItems="center" flexBasis="4%" width="4%" >
            <Tooltip title="清仓" placement="left-start">
              <Box className={classes.clearPosition}>
                <IconFont name="icon-guanbi" color="#C3C2D3"></IconFont>
              </Box>
            </Tooltip>
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
                <Box className={classes.closeDrawer} fontSize="20px"
                  onClick={toggleDrawer('right', false)} >
                  <IconFont name='icon-guanbi'></IconFont>
                </Box>
              </Box>
              <Box flexGrow={1} display="flex" flexDirection="column" justifyContent="space-between" padding="0 28px 24px 28px">
                <Box display="flex" flexDirection="column" >
                  {
                    Object.keys(props).map((item, index) => { 
                      return (
                        <DrawerDetails
                          key={index}
                          k={ item }
                          v={props[item]}
                        />
                      )
                    })
                  }
                  
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