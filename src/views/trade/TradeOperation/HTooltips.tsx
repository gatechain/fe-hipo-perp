import React, { FC } from 'react';
import {  Tooltip, Typography, TooltipProps, tooltipClasses } from '@material-ui/core'
import { styled } from '@material-ui/styles'
import Image from 'next/image'

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} placement="bottom"/>
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#454258',
    color: '#c3c2d4',
    width: 250,
    fontSize: '13px',
    lineHeight: '16px',
    margin: '10px 10px 10px 30px',
    padding:'12px',
    filter: 'drop-shadow(0 0 44px #171722)',
    overflow: 'hidden',
  },
}));
export interface ToolProps {
  title: string;
  explain: string;
  isImg:boolean
}
export const HTooltip: FC<ToolProps> = (props) => {
  return (
    <HtmlTooltip
      title={
        <React.Fragment>
          <Typography sx={{ fontSize: '13px', fontWeight:500 }} color="inherit">{ props.title}</Typography>
          <span>{ props.explain}</span>
        </React.Fragment>
      }>
      <div style={{ cursor: 'help', display: 'flex', justifyContent: 'center' }} >
        {props.isImg ? <Image src="/images/btc.svg" width='16px' height="16px" alt=""></Image> : props.title}
        
      </div>
    </HtmlTooltip>
  )
}


