
import { Button, Theme, useTheme } from "@material-ui/core"
import { blue } from "@material-ui/core/colors"
import { makeStyles, styled, withStyles, WithStyles } from "@material-ui/styles"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { FC } from "react"


// hooks api
const useStyles = makeStyles<Theme>((theme) => ({
	root: {
	color: theme.palette.primary.main
	}
}))

// styled components api
const MyComponents = styled('div')<Theme>(({theme}) => ({
	color: theme.palette.success.main
}))

// Higher-order components api
const styles = {
	root: {
		color: blue[100]
	}
}
const HigherOrderComponent:FC<WithStyles<typeof styles>> = (props) => {
	const {classes, children} = props
	return <Button className={classes.root}>{children}</Button>
}
const HOCButton = withStyles(styles)(HigherOrderComponent)

const DemoPage: NextPage = (props) => {
	const {query} = useRouter()
	const theme = useTheme()
	const classes = useStyles()
	const {pair} = query
	return <div className={classes.root}>
		{pair}
		{theme.palette.primary.main}
		<Button color="primary" variant="contained">demo</Button>
		<MyComponents>My styled Components</MyComponents>
		<HOCButton>HOCButton</HOCButton>
	</div>
}



export default DemoPage