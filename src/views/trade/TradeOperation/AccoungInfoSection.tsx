import React, { FC, ReactNode, useMemo } from 'react';
import { Button, Tooltip, Typography, TooltipProps, tooltipClasses } from '@material-ui/core'
import { makeStyles, styled } from '@material-ui/styles'
import { Box } from '@material-ui/core'
import { OperationType } from 'src/store/trade/const';
import { setOperationType } from 'src/store/trade';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import ConnectWallet from 'src/components/ConnectWallet';
import { ConnectButtonStatus } from 'src/store/network/const';
import { HpButton } from 'src/components/HpButton';
import { setOpenSignModal } from 'src/store/network';

const useStyles = makeStyles(() => ({
  explain: {
    maxWidth: '232px',
    textAlign: 'center',
    marginBottom: '20px',
  },
  accountItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '20px',
    marginTop: '4px',
  },
  itemR: {
    display: 'flex',
    fontSize: '12.5px',
    lineHeight: '16px',
    '&>div': {
      display: 'flex',
      '&>span': {
        display: 'inline',
        margin: '0 4px',
      },
    },
  },
  spanGreen: {
    color: '#3fb68b',
  },
  spanRed: {
    color: '#ff5353',
  },

}))
const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} placement="bottom" />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#454258',
    color: '#c3c2d4',
    width: 250,
    fontSize: '13px',
    lineHeight: '16px',
    margin: '10px 10px 10px 30px',
    padding: '12px',
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
          <Typography sx={{ fontSize: '13px' }} color="inherit">{props.title}</Typography>
          <span>{props.explain}</span>
        </React.Fragment>
      }>
      <div style={{ cursor: 'help' }}>{props.title}</div>
    </HtmlTooltip>
  )
}

interface Props { }
const buttonStyle = {
  fontSize: '14px',
  fontWeight: 500,
  backgroundColor: '#303044',
  height: '28px',
  lineHeight: '16px',
  borderRadius: '24px',
  padding: '0 10px',
  marginRight: '6px',
}

export const AccoungInfoSection: FC<Props> = ({
}) => {
  const classes = useStyles()
  const {
    trade: { operationType },
    network: { connectButtonStatus, isExists },
  } = useSelector((state: RootState) => state)
  const dispatch = useDispatch()

  const handlerOperation = (type: OperationType) => {
    if (operationType == type) {
      dispatch(setOperationType(null))
    } else {
      dispatch(setOperationType(type))
    }
  }

  const AccountInfoEle = () => {
    return <>
      <div className={classes.accountItem} style={{ height: '18px', marginBottom: '16px' }}>
        账户
        <Box>
          <Button
            variant="contained"
            onClick={() => handlerOperation(OperationType.withdraw)}
            sx={buttonStyle}>提现</Button>
          <Button
            variant="contained"
            onClick={() => handlerOperation(OperationType.deposit)}
            sx={buttonStyle}>充值</Button>
        </Box>
      </div>
      <div className={classes.accountItem}>
        <Box display="flex">
          <Tool title="购买力" explain="增加您ATOM-USD头寸的总可用购买力。您的购买力将根据您选择的市场而变化。"></Tool>
        </Box>
        <div className={classes.itemR}>
          $22,123.43
          <div>
            <span>{'→'}</span>
            $123.43
          </div>
        </div>
      </div>
      <div className={classes.accountItem}>
        <Box display="flex">
          <Tool title="账户净值" explain="您的账户总价值。"></Tool>
        </Box>
        <div className={classes.itemR}>
          $123.43
          <div>
            <span>{'→'}</span>
            $123.43
          </div>
        </div>
      </div>
      <div className={classes.accountItem}>
        <Box display="flex">
          <Tool title="杠杆使用" explain="敞口头寸使用的总杠杆百分比。"></Tool>
        </Box>
        <div className={classes.itemR}>
          $123.43
          <div>
            <span className={classes.spanGreen}>{'→'}</span>
            $123.43
          </div>
        </div>
      </div>
      <div className={classes.accountItem}>
        <Box display="flex">
          <Tool title="账户杠杆" explain="基于您所有敞口头寸的账户杠杆。由于您的账户是交叉杠杆交易账户，因此每个敞口头寸都有其自己的杠杆，同时也会影响您的整体账户杠杆。"></Tool>
        </Box>
        <div className={classes.itemR}>
          $123.43
          <div>
            <span>{'→'}</span>
            $123.43
          </div>
        </div>
      </div>
    </>
  }

  const TipBox = (reactNode: ReactNode) => {
    return <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" width='100%' height='100%' flex="1 1 auto">
      <div className={classes.explain}>
        {reactNode}
      </div>
    </Box>
  }

  const handleLogin = () => {
    dispatch(setOpenSignModal(true))
  }

  const SwitchEle = {
    [ConnectButtonStatus.connect]: AccountInfoEle(),
    [ConnectButtonStatus.chainChanged]: TipBox(<>要完成dYdX入门培训，请将您的钱包网络设置为“Ropsten测试网络”。</>),
    [ConnectButtonStatus.disconnect]: TipBox(<>连接您的以太坊钱包，以存入资金和开始交易。 <ConnectWallet /></>),
    authorize: TipBox(
      <Box display="flex" flexDirection="column" alignItems="center" component="div" >
        <Typography component="p" mb={2}>
          欢迎回来！您需要找回一条密钥
        </Typography>
        <HpButton onClick={handleLogin}>找回密钥</HpButton>
      </Box >,
    ),
  }

  const Status = useMemo(() => {
    if (connectButtonStatus === ConnectButtonStatus.connect && !isExists) {
      return 'authorize'
    }
    return connectButtonStatus
  }, [connectButtonStatus, isExists])

  return (
    <Box
      fontSize={14}
      display="flex"
      flexDirection="column"
      color="#c3c2d4"
      px="20px"
      pt="18px"
      pb="14px"
      borderBottom="1px solid #2d2d3d"
      height={180}
    >
      {SwitchEle[Status]}
    </Box>
  )
};