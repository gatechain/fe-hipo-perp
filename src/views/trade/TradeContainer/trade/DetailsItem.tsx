import { Box } from '@material-ui/core'
import  React, { FC } from 'react'
import { makeStyles } from '@material-ui/styles'
const useStyles = makeStyles({
  itemK: {
    color: '#6f6e84',
    fontWeight: 500,
  },
  itemV: {
    display: 'flex',
    color: '#c3c2d4',
    fontSize: '13px',
  },
})


interface DetailItemProps { 
  k: string,
  v: string,
  isAsset: boolean,
}

export const DetailsItem: FC<DetailItemProps> = (props) => {
  const classes = useStyles()
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      fontSize="13px"
      height="32px"
      borderBottom="1px solid rgb(45, 45, 61)"
      padding="0 12px"
    >  
      <Box className={classes.itemK}>{props.k}</Box>
      <Box className={classes.itemV}>
        <Box>
          {props.v}
        </Box>
        {
          props.isAsset &&
          <Box
            height="16px"
            fontSize="10px"
            flex="inline-flex"
            bgcolor="#303044"
            color="#c3c2d4"
            borderRadius="2px"
            letterSpacing=".06em"
            padding="0 3px 0 4px"
            marginLeft="4px"
          >
            Atom
          </Box>
        }
       
      </Box>    
      
    </Box>
  )
  
}