//import { client} from "./App.jsx"
import React, { useState, useEffect } from 'react'
import { Provider, WagmiProvider, chain, createClient, defaultChains } from 'wagmi'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
//import { client} from "./Connect.jsx"


//import CoinbaseWalletSDK from "@coinbase/wallet-sdk";


//chains: [defaultChains, chain.mainnet, chain.optimism]
const chains = [chain.polygon, chain.polygonMumbai];
const defaultChain = chain.mainnet

//const chains = [chain.polygonMainnet, chain.polygonTestnetMumbai]

//const chainId = 137;



import {
    useAccount,
    useSigner,
    useContract,
    useConnect,
    useDisconnect,
    useEnsAvatar,
    useEnsName,
    useSendTransaction,
    useSignMessage
} from 'wagmi';



function MultiWallet({ setwalletAddress, styles }) {

    const { currentAccount, setCurrentAccount } = useState('');
    const { data: account, data: accountData } = useAccount();
    const { data: ensAvatar } = useEnsAvatar({ addressOrName: account?.address })
    const { data: ensName } = useEnsName({ address: account?.address })
    const { connectAsync, connectors, pendingConnector } = useConnect();
    const { disconnectAsync } = useDisconnect()
    const { address, isConnected, connector : activeConnector, isConnecting } = useAccount();

    let wallets = <>
        <div className={styles.wallets}>
            <h1 className={styles.title}>Connect Wallet</h1>
            <div className={styles.box}>
                <div className={styles.option} onClick={() => {
                    checkConnectedWallet();
                }}>
                    <img src="/metamask.png" alt="" />
                    <p>Metamask</p>
                </div>
                <div className={styles.option}>
                    <img src="/wallet-connect.png" alt="" />
                    <p>Wallet Connect</p>
                </div>
            </div>
        </div>
    </>

    const { data_sign, isError, isLoading, isSuccess, signMessage } = useSignMessage({
        message: 'Please sign the message to post the Review',
    })


    useEffect(() => {
        if (isSuccess) {
            setwalletAddress(account?.address);
            disconnect();
        }
    }, [isSuccess])

    useEffect(() => {
        if (activeConnector) {
            signMessage();
        }
    }, [activeConnector])

    return (
        <div className={styles.walletPop}>
            <div className={styles.walletCon}>

                {/* {!activeConnector ?
                <div  >
                    {connectors.map((connector) => (
                        <button
                            className="tip-reviewer-button"
                            disabled={!connector.ready}
                            key={connector.id}
                            onClick={() => connect(connector)}
                        >
                            {connector.name}
                            {!connector.ready && ' (unsupported)'}
                            {isConnecting &&
                                connector.id === pendingConnector?.id &&
                                ' (connecting)'}
                        </button>
                    ))}
                </div> :
                <button className="tip-reviewer-button" onClick={disconnect}>{account?.address}</button>
            } */}
                {
                    <div className={styles.wallets}>
                        <h1 className={styles.title}>Connect Wallet</h1>
                        <div className={styles.box}>
                            {connectors.map((connector) => (
                                <div className={styles.option} disabled={!connector.ready}
                                    key={connector.id}
                                    onClick={() => connect(connector)}>
                                    <img src={(connector.name == 'MetaMask') ? "/metamask.png" : "/wallet-connect.png"} alt="" />
                                    <p>{connector.name}
                                        {!connector.ready && ' (unsupported)'}
                                        {isConnecting &&
                                            connector.id === pendingConnector?.id &&
                                            ' (connecting)'}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default MultiWallet
