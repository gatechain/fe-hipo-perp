import { FC, useMemo } from 'react'
import { Box, BoxProps, useTheme } from '@material-ui/core'
// import I18N from 'src/utils/I18N'
import { SelectMarkets } from './SelectMarkets'

export const TradeTop: FC = () => {
  const theme = useTheme()

  const BoxPropsRest: BoxProps = useMemo(() => {
    return {
      height: 48,
      borderBottom: `1px solid ${theme.palette.secondary.main}`,
      color: theme.palette.secondary.main,
    } as BoxProps
  }, [theme])

  return (
    <Box {...BoxPropsRest}>
      <SelectMarkets imgUrl='/images/btc.svg' symbol='BTC-USDT'/>
    </Box>
  )
}