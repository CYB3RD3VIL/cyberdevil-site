import { initSentry } from '../lib/sentry';
import '../styles/globals.css'
import type { AppProps } from 'next/app'

initSentry();
export default function App({ Component, pageProps }: AppProps) { return (<><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/><Component {...pageProps} /></>);
  return <Component {...pageProps} />
}
