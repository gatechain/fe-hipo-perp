import { Box, Tooltip, Typography, TooltipProps, tooltipClasses, Button  } from '@material-ui/core'
import React, { FC } from 'react'
import { makeStyles, styled } from '@material-ui/styles'
import { DetailsItem } from './DetailsItem';
const useStyles = makeStyles({
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 24px',
    borderRight: '1px solid #2d2d3d',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 500,
    color: '#6f6e84',
    backgroundColor: '#1c1c28',
  },
  itemActive: {
    backgroundColor: '#171722',
    color: '#f7f7f7',
  },
  itemCount: {
    fontSize: '10px',
    backgroundColor: '#303044',
    color: '#c3c2d4',
    padding: '1px 4px 1px 5px',
    letterSpacing: '.06em',
    borderRadius: '2px',
    marginLeft: '2px',
    lineHeight: '16px',
  },
  positionItem: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '14px',
    lineHeight: '18px',
    color: '#6f6e84',
    marginBottom: '8px',
    flex: '0 0 50%',
  },
  positionV: {
    fontSize: '16px',
    lineHeight: '20px',
    display: 'flex',
    flexDirection: 'column',
  },
  unit: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '13px',
    fontWeight: 500,
    backgroundColor: '#454258',
    color: '#c3c2d4',
    padding: '2px 6px',
    letterSpacing: '.06em',
    borderRadius: '4px',
    marginLeft: '2px',
    lineHeight: '16px',
  },
  positionType: {
    display: 'flex',
    alignItems: 'center',
    justifyContent:'space-between',
    width:'100%',
    minHeight:'74px',
    borderRadius:'8px',
    marginBottom:'24px',
    padding:'16px',
    background:'linear-gradient(342.62deg,#23222e -9.23%,#303047 110.36%)',
  },
  moreToLessBgColor: {
    background: 'linear-gradient(130.25deg,rgba(63,182,139,.16) .9%,rgba(63,182,139,0) 64.47%),linear-gradient(227.14deg,rgba(255,83,83,.16) 1.6%,rgba(255,83,83,0) 63.87%),linear-gradient(342.62deg,#23222e -9.23%,#303047 110.36%)',
  },
  more: {
    backgroundColor: 'rgba(63,182,139,.1)',
    color:'#3fb68b',
  },
  less: {
    backgroundColor: 'rgba(255,83,83,.1)',
    color: '#ff5353',
  },
  toBox: {
    display: 'flex',
    alignItems: 'center',
    fontSize:'12px',
    color: '#c3c2d4',
    fontWeight: 700,
  },
  toMore: {
    color: '#3fb68b',
  },
  toLess: {
    color: '#ff5353',
  },
  positionBox: {
    display:'flex',
    fontSize:'14px',
    color:'#6f6e84',
    marginBottom:'4px',
    fontWeight:500,
  },
})

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} placement="right"/>
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#454258',
    color: '#c3c2d4',
    width: 264,
    fontSize: '12px',
    lineHeight: '16px',
    margin: '10px 10px 10px 30px',
    padding:'12px',
    filter: 'drop-shadow(0 0 44px #171722)',
    overflow: 'hidden',
  },
}));
const Btn = styled(Button)({
  display: 'flex',
  alignItems: 'center',
  height: '36px',
  fontSize: '14px',
  padding: '0 10px',
  minWidth: '0',
  fontWeight: 500,
  backgroundColor: '#303044',
  color: '#ff5353',
  borderRadius: '8px',
  marginTop: '18px',
  '&:hover': {
    backgroundColor: '#303044',
  },
  
})
export interface ToolProps {
  title: string;
  explain: String;
}
const Tool: FC<ToolProps> = (props) => {
  return (
    <HtmlTooltip
      title={
        <React.Fragment>
          <Typography sx={{ fontSize: '13px' }} color="inherit">{ props.title}</Typography>
          <span>{ props.explain}</span>
        </React.Fragment>
      }>
      <div style={{ cursor: 'help' }}>{ props.title}</div>
    </HtmlTooltip>
  )
}

export const Position: FC = () => {
  const classes = useStyles()
  return (
    <Box display="flex" justifyContent="center" width="100%" height='100%' padding="32px 32px 0">      
      <Box display="flex" width='100%'>
        <Box flex="0 1 50%" display="flex" flexDirection="column" paddingRight="18px">
          <Box className={`${classes.positionType} `}>
            <Box display="flex">
              <Box className={`${classes.unit} `}>多头</Box>
              <Box display="flex">
                <Box className={classes.toBox} sx={{ margin: '0 6px' }}>→</Box>
                <Box className={`${classes.unit} ${classes.less}`}>空头</Box>
              </Box>
            </Box>
            <Box display="flex" flexDirection="column" justifyContent="flex-end">
              <Box className={classes.positionBox} sx={{ justifyContent:'flex-end' }}>89.0000</Box>
              <Box display="flex" alignItems="center" height="22px"  color="#f7f7f7" fontSize="16px" fontWeight={500}>
                <Box className={classes.toBox}>→</Box>
                <Box>11.0000</Box>
              </Box>
            </Box>
            
          </Box>
          
          <Box display="flex" height="76px" sx={{ '>div:last-child': { textAlign:'right' } }}>
            <Box className={classes.positionItem}>
              <Box >
              <Box display="flex">
                <Tool
                  title='杠杆'
                  explain="杠杆将更改您的收益或损失乘数。增加您的杠杆会增加您的交易在相同价格波动下获利/亏损的金额。"
                ></Tool>
                </Box>
              </Box>
              <Box className={classes.positionV}>
                <Box display="flex" flexDirection="column">
                  <Box className={classes.positionBox} sx={{ justifyContent:'flex-start' }}>0.29×</Box>
                  <Box display="flex" alignItems="center" height="22px"  color="#f7f7f7" fontSize="16px" fontWeight={500}>
                    <Box className={`${classes.toBox} ${classes.toMore}`} sx={{ marginRight:'4px' }}>→</Box>
                    <Box>0.28×</Box>
                  </Box>
                </Box>
                
              </Box>
            </Box>
            <Box className={classes.positionItem}>
              <Box >
              <Box display="flex" justifyContent="end">
                  <Tool
                    title='清算价格'
                    explain="如果{SMBOL}的预言机价格降到清算价格以下，您的头寸将被强制平仓。清算后，您的头寸将被自动平仓，并按至少1%来对清算费用进行估价（可能会更高，具体取决于清算时的流动性）。                    "
                  ></Tool>
                </Box>
              </Box>
              <Box className={classes.positionV}>
                <Box>
                  -
                </Box>
              </Box>
            </Box>
          </Box>
          <Box display="flex" height="76px" sx={{ '>div:last-child': { textAlign:'right' } }}>
            <Box className={classes.positionItem}>
              <Box>
              <Box display="flex">
                  <Tool
                    title='未实现盈亏'
                    explain="如果SMBOL的预言机价格降到清算价格以下，您的头寸将被强制平仓。清算后，您的头寸将被自动平仓，并按至少1%来对清算费用进行估价（可能会更高，具体取决于清算时的流动性）。"
                  ></Tool>
                </Box>
              </Box>
              <Box className={classes.positionV}>
                <Box display="flex" fontSize="16px" color="#ff5353">
                -$139.13 (-4.74%)
                </Box>
              </Box>
            </Box>
            <Box className={classes.positionItem}>
              <Box >
                <Box display="flex" justifyContent="end">
                  <Tool
                    title='已实现盈亏'
                    explain="如果您以当前指数价格将当前头寸剩余部分平仓，则为总损益。如果将头寸平仓或更改头寸侧（从多头到空头，或从空头到多头），则重置。"
                  ></Tool>
                </Box>
              </Box>
              <Box className={classes.positionV}>
                <Box>
                -
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box display="flex" flex="0 1 50%" flexDirection="column" paddingLeft="18px" fontSize="13px">
          <DetailsItem k="开仓均价" v="$33.00" isAsset={false}></DetailsItem>
          <DetailsItem k="平仓均价" v="ATOM-USD" isAsset={false}></DetailsItem>
          <DetailsItem k="净资产" v="$0.00" isAsset={false}></DetailsItem>
          <Btn>平仓头寸</Btn>
        </Box>
      </Box>
    </Box>
  )
}