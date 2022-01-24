import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Layout } from 'src/layout'
import { ThemeProvider } from 'src/theme'
import { Provider } from 'react-redux'
import { store } from 'src/store'
import Web3ReactProvider from 'src/web3React/Web3ReactProvider'

function App({ Component, pageProps }: AppProps) {
  return <Provider store={store}>
    <Web3ReactProvider>
      <ThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Web3ReactProvider>
  </Provider>
}

export default App
