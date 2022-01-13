import { Box } from '@material-ui/core';
import { FC } from 'react';
import { AccoungInfoSection } from './AccoungInfoSection'
import { TradeBox } from './TradeBox'


export const TradeOperation: FC = () => {
  
  return (
    <Box  width={324}  >
      <AccoungInfoSection />
      <TradeBox/>
    </Box>
  )
  
}