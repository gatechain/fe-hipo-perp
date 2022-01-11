import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Layout } from 'src/layout';
import { ThemeProvider } from 'src/theme';
import { Provider } from 'react-redux'
import { store } from 'src/store';
import { NoSsr } from '@material-ui/core';

function App({ Component, pageProps }: AppProps) {
  return <Provider store={store}>
    <ThemeProvider>
    <Layout>
      <NoSsr>
        <Component {...pageProps} />
      </NoSsr>
    </Layout>
    </ThemeProvider>
  </Provider>
}

export default App
