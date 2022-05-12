import Onboard from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'
import walletConnectModule from '@web3-onboard/walletconnect'
import magicModule from '@web3-onboard/magic'
import coinbaseModule from '@web3-onboard/coinbase'
import icon from '../public/Truts.png'
import logo from '../public/star-filled.png'//just for now

const INFURA_ID = '7cedc93bca594509a5abbaae985320a6'

const MAINNET_RPC_URL = `https://mainnet.infura.io/v3/${INFURA_ID}`

const injected = injectedModule()
const coinbase = coinbaseModule()
const walletConnect = walletConnectModule()
const magic = magicModule({
  apiKey: 'pk_live_8B1592809A36F4A6',
  userEmail: localStorage.getItem('magicUserEmail')
})

const onboard = Onboard({
  wallets: [
    injected, 
    walletConnect,
    magic,
    coinbase
  ],
  chains: [
    {
      id: '0x1',
      token: 'ETH', 
      label: 'Ethereum Mainnet',
      rpcUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`
    },
    {
      id: '0x3',
      token: 'tROP',
      label: 'Ethereum Ropsten Testnet',
      rpcUrl: `https://ropsten.infura.io/v3/${INFURA_ID}`
    },
    {
      id: '0x4',
      token: 'rETH',
      label: 'Ethereum Rinkeby Testnet',
      rpcUrl: `https://rinkeby.infura.io/v3/${INFURA_ID}`
    },
    {
      id: '0x89',
      token: 'MATIC',
      label: 'Matic Mainnet',
      rpcUrl: 'https://polygon-rpc.com/'
    },
    {
      id: '0x13881',
      token: 'MATIC',
      label: 'Mumbai Testnet',
      rpcUrl: 'https://rpc-mumbai.maticvigil.com'
    }
  ],
  appMetadata: {
    name: 'Truts',
    icon: icon,
    logo: logo,
    description: 'Login with Blocknative',
    recommendedInjectedWallets: [ 
      { name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
      { name: 'MetaMask', url: 'https://metamask.io' }
    ]
  }
})

const wallets = await onboard.connectWallet()

console.log(wallets)