import '../styles/globals.css'
import NextNProgress from "nextjs-progressbar";
import { chain, createClient } from 'wagmi'

import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { Provider } from 'wagmi'
import Script from 'next/script';
const chains = [chain.polygon, chain.polygonMumbai];

export const client = createClient({
  autoConnect: true,
  connectors({ chainId }) {
    //const chain = chains.find((x) => x.id === chainId) ?? defaultChain
    console.log(chains);
    const rpcUrl =
      chains.find((x) => { console.log(x.id, chainId); return x.id === chainId })?.rpcUrls?.[0] ??
      chain.mainnet.rpcUrls[0]
    console.log(chainId)
    return [
      new InjectedConnector(),
      new WalletConnectConnector({
        chains,
        options: {
          qrcode: true,
          rpc: { [chain.id]: rpcUrl },
        },
      }),
    ]
  },
})

let GOOGLE_ANALYTICS_ID = 'G-DGWXPLZZMM'

function MyApp({ Component, pageProps }) {
  return <Provider client={client}>
    <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`} />

    <Script id='script' strategy="lazyOnload">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GOOGLE_ANALYTICS_ID}', {
        page_path: window.location.pathname,
        });
    `}
    </Script>
    <NextNProgress color="#2e68f5" />
    <Component {...pageProps} />
  </Provider>
}

export default MyApp
