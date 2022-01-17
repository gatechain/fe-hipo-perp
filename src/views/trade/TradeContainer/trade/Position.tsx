import { Box, Tooltip, Typography, TooltipProps, tooltipClasses  } from '@material-ui/core'
import React, { FC } from 'react'
import { makeStyles, styled } from '@material-ui/styles'
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
  positionK: {

  },
  positionV: {
    fontSize: '16px',
    lineHeight: '20px',
    display: 'flex',
    flexDirection: 'column',
  },
  unit:{
    fontSize: '13px',
    fontWeight: 500,
    backgroundColor: '#303044',
    color: '#c3c2d4',
    padding: '2px 6px',
    letterSpacing: '.06em',
    borderRadius: '4px',
    marginLeft: '2px',
    lineHeight: '16px',
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
          <Box display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            minHeight='74px'
            borderRadius="8px"
            marginBottom="24px"
            padding='16px'
            sx={{ background:'linear-gradient(342.62deg,#23222e -9.23%,#303047 110.36%)' }}
          >
            <div className={classes.unit}>无</div>
          </Box>
          
          <Box display="flex" height="76px" sx={{ '>div:last-child': { textAlign:'right' } }}>
            <div className={classes.positionItem}>
              <div className={classes.positionK}>
              <Box display="flex">
                <Tool
                  title='杠杆'
                  explain="杠杆将更改您的收益或损失乘数。增加您的杠杆会增加您的交易在相同价格波动下获利/亏损的金额。"
                ></Tool>
                </Box>
              </div>
              <div className={classes.positionV}>
                <div>
                  -
                </div>
              </div>
            </div>
            <div className={classes.positionItem}>
              <div className={classes.positionK}>
              <Box display="flex" justifyContent="end">
                  <Tool
                    title='清算价格'
                    explain="如果{SMBOL}的预言机价格降到清算价格以下，您的头寸将被强制平仓。清算后，您的头寸将被自动平仓，并按至少1%来对清算费用进行估价（可能会更高，具体取决于清算时的流动性）。                    "
                  ></Tool>
                </Box>
              </div>
              <div className={classes.positionV}>
                <div>
                  -
                </div>
              </div>
            </div>
          </Box>
          <Box display="flex" height="76px" sx={{ '>div:last-child': { textAlign:'right' } }}>
            <div className={classes.positionItem}>
              <div className={classes.positionK}>
              <Box display="flex">
                  <Tool
                    title='清算价格'
                    explain="如果SMBOL的预言机价格降到清算价格以下，您的头寸将被强制平仓。清算后，您的头寸将被自动平仓，并按至少1%来对清算费用进行估价（可能会更高，具体取决于清算时的流动性）。"
                  ></Tool>
                </Box>
              </div>
              <div className={classes.positionV}>
                <div>
                  -
                </div>
              </div>
            </div>
            <div className={classes.positionItem}>
              <div className={classes.positionK}>
              <Box display="flex" justifyContent="end">
                  <Tool
                    title='未实现盈亏'
                    explain="如果您以当前指数价格将当前头寸剩余部分平仓，则为总损益。如果将头寸平仓或更改头寸侧（从多头到空头，或从空头到多头），则重置。"
                  ></Tool>
                </Box>
              </div>
              <div className={classes.positionV}>
                <div>
                  -
                </div>
              </div>
            </div>
          </Box>
        </Box>
        <Box display="flex" flex="0 1 50%" flexDirection="column" paddingLeft="18px">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            height="32px"
            fontSize="13px"
            lineHeight="16px"
            borderBottom='1px solid #2d2d3d'
            padding="0 12px"
          >
            <Box color="#6f6e84">开仓均价</Box>
            <Box fontSize="12.5px" lineHeight="16px" fontWeight={400}>-</Box>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            height="32px"
            fontSize="13px"
            lineHeight="16px"
            borderBottom='1px solid #2d2d3d'
            padding="0 12px"
          >
            <Box color="#6f6e84">开仓均价</Box>
            <Box fontSize="12.5px" lineHeight="16px" fontWeight={400}>-</Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
  
}