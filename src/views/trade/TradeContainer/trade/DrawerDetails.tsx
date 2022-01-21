import { Box } from '@material-ui/core'
import  React, { FC } from 'react'
import { makeStyles } from '@material-ui/styles'
// import Image from 'next/image'
const useStyles = makeStyles({
  itemK: {
    color:'rgb(111, 110, 132)',
  },
  direction: {},
  
})

// enum OrderDirection { 
//   buy = 'buy',
//   sell = 'sell',
// }

// interface Direction { 
//   direction: OrderDirection
// }

export const DrawerDetails: FC = () => {
  const classes = useStyles()
  
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      fontSize="13px"
      height="32px"
      borderBottom="1px solid rgb(45, 45, 61)"
    >  
      <Box className={classes.itemK}>市场</Box>
      <Box>ATOM-USD</Box>
    </Box>
  )
  
}