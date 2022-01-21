import React, { FC } from 'react';
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { TransactionType } from 'src/store/market/const';
import { setTransactionType } from 'src/store/market';


const useStyles = makeStyles({
  typeSelection: {
    fontWeight: 500,
    display: 'flex',
    height: '40px',
    width: '100%',
    backgroundColor: '#171722',
    borderRadius: '6px',
    cursor: 'pointer',
    marginBottom: '14px',
    position: 'relative',
    '&:before': {
      display:'block',
      content: '""',
      boxSizing: 'border-box',
      height: '40px',
      width: '50%',
      position: 'absolute',
      top: '0',
      left: '0',
      backgroundColor: '#232334',
      borderRadius: '6px',
      transition: 'all .2s ease-in-out',
    },
  },
  typeItem: {
    fontSize: '14px',
    lineHeight: '18px',
    display: 'flex',
    flex: '0 0 50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#6f6e84',
    transition: 'color .2s ease-in-out',
    zIndex: 1,
    borderRadius: '2px',
  },
  buyColor: {
    color: '#3fb68b',
    border: '2px solid #3fb68b',
    borderRadius: '6px',
  },
  sellColor: {
    color: '#ff5353 ',
    border: '2px solid #ff5353',
    borderRadius: '6px',
  },
})


export const TransactionTypeBox: FC = () => {
  const classes = useStyles()  
  const type = useSelector((state: RootState) => state.market.transactionType)
  const dispatch = useDispatch()
  const handlerTransactionType = (transactionType: TransactionType) => { 
    dispatch(setTransactionType(transactionType))
  }
  return (
    <Box className={classes.typeSelection}>
      <Box className={`${classes.typeItem} ${type == TransactionType.sell ? classes.sellColor : ''}`}
        onClick={() => handlerTransactionType(TransactionType.sell)}
      >卖出</Box>
      <Box className={`${classes.typeItem} ${type == TransactionType.buy ? classes.buyColor : ''}`}
        onClick={() => handlerTransactionType(TransactionType.buy)}
      >买入</Box>
    </Box>
    
  )
};