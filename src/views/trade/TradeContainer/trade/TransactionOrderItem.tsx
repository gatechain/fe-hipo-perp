import { Box } from '@material-ui/core'
import  React, { FC } from 'react'
import { makeStyles } from '@material-ui/styles'

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

export const TransactionOrderItem: FC = () => {
  const classes = useStyles()

  return (
    <Box display="flex" height="48px" alignItems="center" padding="0 16px" fontSize="13px">  
      <Box display="flex" flexBasis="7%" width="7%" >
        <Box display="flex">5天</Box>
      </Box>
      <Box display="flex" flexBasis="14%" width="14%" >
        市场
      </Box>

      <Box display="flex" flexBasis="11%" width="11%" >
        <Box className={`${classes.direction} ${classes.buy}`}>买入</Box>
      </Box>
      
      <Box display="flex" alignItems="center" flexBasis="20%" width="20%" >
        <Box display="flex"  >11.0000</Box>
      </Box>
      <Box display="flex" alignItems="center" flexBasis="20%" width="20%" >
        <Box display="flex"  >$38.29</Box>
      </Box>

      <Box display="flex" alignItems="center" flexBasis="15%" width="15%" >
        <Box display="flex" flexDirection="column" justifyContent="center" fontSize="12px">
          <Box height="19px" lineHeight="16px">$420.86</Box>
          <Box height="19px" lineHeight="16px" color="#6f6e84">$0.21</Box>
        </Box>
      </Box>

      <Box display="flex" alignItems="center" flexBasis="13%" width="13%" >
        <Box display="flex"  >吃单</Box>
      </Box>
      
    </Box>
  )
  
}