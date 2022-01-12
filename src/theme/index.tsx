import { FC } from 'react'
import { createTheme } from '@material-ui/core'
import { ThemeProvider as MUIStyleThemeProvider } from '@material-ui/styles'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core'

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1c1c22',
      dark: '#1c1c22',
    },
  },
})

export const ThemeProvider: FC = ({ children }) => {
  return <MUIStyleThemeProvider theme={theme}>
    <MuiThemeProvider theme={theme}>
      {children}
    </MuiThemeProvider>
  </MUIStyleThemeProvider>
}