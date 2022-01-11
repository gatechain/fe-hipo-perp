import { FC, useMemo } from "react"
import { Box, BoxProps, useTheme } from "@material-ui/core"

export const TradeTop: FC = () => {
	const theme = useTheme()

	const BoxPropsRest: BoxProps = useMemo(() => {
		return {
			height: 48,
			border: `1px solid ${theme.palette.secondary.main}`,
			color: theme.palette.secondary.main
		} as BoxProps
	}, [theme])

	return <Box {...BoxPropsRest}>TradeTop</Box>
}