
import { Button, Theme, useTheme } from "@material-ui/core"
import { blue } from "@material-ui/core/colors"
import { makeStyles, styled, withStyles, WithStyles } from "@material-ui/styles"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "src/store"
import { decrement, increment, incrementByAmount } from "src/store/test"


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
	const count = useSelector((state: RootState) => state.test.value)
	const dispatch = useDispatch()
	const theme = useTheme()
	const classes = useStyles()
	const {pair} = query
	return <div className={classes.root}>
		{pair}
		{theme.palette.primary.main}
		<Button color="primary" variant="contained" onClick={() => dispatch(increment())}>demo: increment</Button>
		<Button color="primary" variant="contained" onClick={() => dispatch(incrementByAmount(3))}>demo: increment + 3</Button>
		<Button color="primary" variant="contained" onClick={() => dispatch(decrement())}>demo: decrement</Button>
		<MyComponents>My styled Components</MyComponents>
		<HOCButton>HOCButton</HOCButton>
		<Button variant="contained">redux-value: {count}</Button>
	</div>
}

export default DemoPage