import { Box } from '@material-ui/core';
import { FC, useCallback } from 'react';
import { AccoungInfoSection } from './AccoungInfoSection'
import { TradeBox } from './TradeBox'
import { WithDrawBox } from './WithdrawBox'
import { DepositBox } from './DepositBox'
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { OperationType } from 'src/store/trade/const';



export const TradeOperation: FC = () => {
  const operationType = useSelector((state: RootState) => state.trade.operationType)

  const getTypeEle = useCallback(() => {
    const type = operationType ? operationType : 'default'
    const actions = {
      default: <TradeBox />,
      [OperationType.withdraw]: <WithDrawBox />,
      [OperationType.deposit]: <DepositBox />,
    }
    return actions[type]
  }, [operationType])

  return (
    <Box width={324} height="calc(100vh - 69px - 47px)" display="flex" flexDirection="column" borderRight="1px solid #2d2d3d">
      <AccoungInfoSection />
      <Box width="100%" flexGrow={1} display="flex" flexDirection="column" >
        {getTypeEle()}
      </Box>
    </Box>
  )

}