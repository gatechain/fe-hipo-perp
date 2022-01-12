import { FC, useEffect } from "react"
import { Box } from "@material-ui/core"
import { TradeTop } from "./TradeTop"
import { TradeOperation } from "./TradeOperation"
import { TradeContainer } from "./TradeContainer"
import { useRouter } from "next/router"

export const TradeView: FC = () => {
	const router = useRouter()

	useEffect(() => {
		router.push('/trade/shallowrouter', undefined, {shallow: true})
		setTimeout(() => {
			router.push('/trade/2000-shallowrouter', undefined, { shallow: true })
		}, 2000)
	}, [])

	useEffect(() => {
		console.log(router.query.pair)
	}, [router.query.pair])

	return <Box display="flex" flexDirection="column" height="100%">
		<TradeTop />	
		<Box flexGrow={1} display="flex">
			<TradeOperation />
			<TradeContainer />
		</Box>
	</Box>
}