import { Box, CssBaseline } from '@material-ui/core'
import React, { FC } from 'react'
import { GlobalHeader } from './GlobalHeader';


export const Layout: FC = ({children}) => {
	return <React.Fragment>
		<CssBaseline />
		<Box id="app" display="flex" flexDirection="column">
			<GlobalHeader />
			<Box flexGrow={1}>
				{children}
			</Box>
		</Box>
	</React.Fragment>
}