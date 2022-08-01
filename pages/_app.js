import '../styles/globals.css'
import NextNProgress from "nextjs-progressbar";
import { chain, createClient } from 'wagmi'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { WagmiConfig } from 'wagmi'
import Script from 'next/script';
import { publicProvider } from 'wagmi/providers/public'

import { configureChains } from 'wagmi';
const { chains, provider } = configureChains(
  [chain.polygon, chain.polygonMumbai, chain.mainnet],
  [publicProvider()],
)


// export const client = createClient({
//   autoConnect: true,
//   connectors({ chainId }) {
//     //const chain = chains.find((x) => x.id === chainId) ?? defaultChain
//     console.log(chains);
//     const rpcUrl =
//       chains.find((x) => { console.log(x.id, chainId); return x.id === chainId })?.rpcUrls?.[0] ??
//       chain.mainnet.rpcUrls[0]
//     console.log(chainId)
//     return [
//       new MetaMaskConnector(),
//       new CoinbaseWalletConnector({
//         chains,
//         options: {
//           rpc: { [chain.id]: rpcUrl },
//         },
//       }),
//       new WalletConnectConnector({
//         chains,
//         options: {
//           qrcode: true,
//           rpc: { [chain.id]: rpcUrl },
//         },
//       }),
//     ]
//   },
// })

export const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'truts',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
  ],
  provider
})

let GOOGLE_ANALYTICS_ID = 'G-DGWXPLZZMM'

function MyApp({ Component, pageProps }) {
  return <WagmiConfig client={client}>
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
  </WagmiConfig>
}

export default MyApp
