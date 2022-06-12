import '../styles/globals.css'
import NextNProgress from "nextjs-progressbar";
import { chain, createClient } from 'wagmi'

import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { Provider } from 'wagmi'

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

function MyApp({ Component, pageProps }) {
  return <Provider client={client}>
    <NextNProgress color="#2e68f5" />
    <Component {...pageProps} />
  </Provider>
}

export default MyApp
