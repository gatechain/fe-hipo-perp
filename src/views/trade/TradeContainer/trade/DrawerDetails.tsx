import { Box } from '@material-ui/core'
import  React, { FC } from 'react'
import { makeStyles } from '@material-ui/styles'
// import Image from 'next/image'
const useStyles = makeStyles({
  itemK: {
    color:'rgb(111, 110, 132)',
  },
  direction: {
    display: 'inline-flex',
    padding: '2px 6px',
    fontSize: '13px',
    fontWeight: 500,
    borderRadius: '4px',
  },
  buy: {
    color: '#3fb68b',
    backgroundColor: 'rgba(63,182,139,.1)',
  },
  sell: {
    color: '#ff5353',
    backgroundColor: 'rgba(255,83,83,.1)',
  },
  
})


interface DirectionItemProps { 
  k: string,
  v: string,
}

export const DrawerDetails: FC<DirectionItemProps> = (props) => {
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
      <Box className={classes.itemK}>{props.k}</Box>
      { props.k == 'direction' && <Box className={`${classes.direction} ${props.v == 'buy' ? classes.buy : classes.sell}`}>{ props.v }</Box>}

      {props.k != 'direction' && <Box>{ props.v }</Box>}
      
    </Box>
  )
  
}