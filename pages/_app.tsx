import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Layout } from 'src/layout';
import { ThemeProvider } from 'src/theme';

function App({ Component, pageProps }: AppProps) {
  return <ThemeProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </ThemeProvider>
}

export default App
