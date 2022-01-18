import { Box } from '@material-ui/core';
import { FC, useEffect, useState } from 'react';
import { AccoungInfoSection, OperationType } from './AccoungInfoSection'
import { TradeBox } from './TradeBox'
import { WithDrawBox } from './WithdrawBox'
import { DepositBox } from './DepositBox'



export const TradeOperation: FC = () => {
  const [operationType, setOperationType] = useState<OperationType>()
  

  useEffect(() => {
    console.log(operationType, 'operationType')
  }, [operationType])

  return (
    <Box width={324} height="calc(100vh - 69px - 47px)" display="flex" flexDirection="column" >
      <AccoungInfoSection onChange={setOperationType} />
      {/*  */}
      <Box width="100%" flexGrow={1} display="flex" flexDirection="column" >
        {(operationType !== 'withdraw' && operationType !== 'deposit') ? <TradeBox ></TradeBox> : ''}
        {operationType === 'withdraw' ? <WithDrawBox ></WithDrawBox> : ''}
        {operationType === 'deposit' ? <DepositBox ></DepositBox> : ''}
      </Box>
      
    </Box>
  )
  
}