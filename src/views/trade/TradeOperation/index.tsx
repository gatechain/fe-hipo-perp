import { Box } from '@material-ui/core';
import { FC } from 'react';
// import { AccoungInfoSection } from './AccoungInfoSection'
import { MarketSelectionMenu } from './MarketSelectionMenu'


export const TradeOperation: FC = () => {
  
  return (
    <Box  width={324}  >
      {/* <AccoungInfoSection/> */}
      <MarketSelectionMenu/>
    </Box>
  )
  
}