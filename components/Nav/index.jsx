import styles from './nav.module.scss'
import { useState, useCallback } from 'react';
import stringSimilarity from "string-similarity";
import { useEffect } from 'react';
import _ from 'lodash'
import axios from 'axios'
import Link from 'next/link'
const API = process.env.API

import {
    useAccount,
    useConnect,
    useDisconnect,
    useEnsName,
    useSignMessage,
    useNetwork,
    useSendTransaction,
} from 'wagmi';

import { Buffer } from "buffer";

const openNewTab = (url) => {
    if (url.length < 1) return
    let a = document.createElement('a');
    a.target = '_blank';
    a.href = url;
    a.click();
}


function Nav({ topSearchVisible, outline, openConnectWallet, getWalletAddress }) {

    useEffect(() => {
        if (!window.Buffer) {
            window.Buffer = Buffer;
        }
        setisPhantomInstalled(window.solana && window.solana.isPhantom)
    }, [])

    useEffect(() => {
        if (openConnectWallet) {
            setwalletPopUpVisible(true);
        }
    }, [openConnectWallet])

    const { connectAsync, connectors, isLoading, pendingConnector } = useConnect();
    const { disconnectAsync } = useDisconnect()
    const { address, isConnected, connector, isConnecting } = useAccount();
    const [isPhantomInstalled, setisPhantomInstalled] = useState(false);

    let search_style = styles.nav;
    if (topSearchVisible) {
        search_style = styles.nav + ' ' + styles.topNavSearch
    }

    const [walletState, setwalletState] = useState({});

    useEffect(() => {
        setwalletState(JSON.parse(localStorage.getItem('wallet_state')))
    }, [])

    useEffect(() => {

        if (isConnected) {
            setwalletState({ chain: 'eth', connected: true, wallet_address: address });
            window.localStorage.setItem('wallet_state', JSON.stringify({ chain: 'eth', connected: true, wallet_address: address }));
            setwalletPopUpVisible(false);
        }
        if (!isConnected && (!localStorage.getItem('wallet_state'))) {
            setwalletState({});
            window.localStorage.removeItem('wallet_state');
        }

    }, [isConnected])

    // wallet functions
    const disconnectWalletstate = async () => {
        if (walletState.chain = 'eth') {
            await disconnectAsync();
            setwalletState({});
            window.localStorage.removeItem('wallet_state');
        }
        else if (walletState.chain = 'sol') {
            window.solana.disconnect()
            setwalletState({});
            window.localStorage.removeItem('wallet_state');
        }
    }

    const connectEth = async (connetor) => {
        console.log('connector', connetor)
        let res = await connectAsync({connector:connetor});
        console.log(res);
        getWalletAddress && getWalletAddress(res.account);
    }



    const connectPhantom = async () => {
        try {
            const resp = await window.solana.connect();
            let wallet = resp.publicKey.toString()
            window.localStorage.setItem('wallet_state', JSON.stringify({ chain: 'sol', connected: true, wallet_address: wallet }));
            setwalletState({ chain: 'sol', connected: true, wallet_address: wallet });
            getWalletAddress && getWalletAddress(wallet);
            // 26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo 
            setwalletPopUpVisible(false);
        } catch (err) {
            // { code: 4001, message: 'User rejected the request.' }
        }
    }

    const [walletPopUpVisible, setwalletPopUpVisible] = useState(false);

    return (
        <>
            {(walletPopUpVisible) && <ConnectWalletModelSimple walletPopUpVisible={walletPopUpVisible} setwalletPopUpVisible={setwalletPopUpVisible} connectors={connectors} isConnecting={isConnecting} pendingConnector={pendingConnector} connectEth={connectEth} isPhantomInstalled={isPhantomInstalled} connectPhantom={connectPhantom} />}
            <div className={search_style} style={(outline) ? { borderBottom: '1px solid rgb(209, 209, 209)' } : {}}>
                <Link href={'/'} passHref>
                    <img className={styles.logo} src="/logo.png" alt="" />
                </Link>
                <SearchComp topSearchVisible={topSearchVisible} />
                <ul>
                    <Link href={'/add-your-community'} passHref>
                        <li>Add Community</li>
                    </Link>
                    <Link href={'/dao-list'} passHref>
                        <li>Discover Communities</li>
                    </Link>
                    <li className={styles.walletWrapper}>
                        {walletState.connected ?
                            <button className={styles.disconnectWallet} onClick={() => { disconnectWalletstate() }}>
                                {walletState.wallet_address.slice(0, 5) + '...' + walletState.wallet_address.slice(38)}
                            </button> :
                            <button onClick={() => { setwalletPopUpVisible(true) }}>
                                {"Connect wallet"}
                            </button>
                        }
                    </li>
                </ul>
            </div >
        </>
    )
}

Nav.defaultProps = {
    outline: false,
    openConnectWallet: false
}

const ConnectWalletModelSimple = ({ connectors, isConnecting, pendingConnector, connectAsync, setwalletPopUpVisible, walletPopUpVisible, isPhantomInstalled, connectPhantom, connectEth }) => {
    const getWalletIcon = (name) => {
        if (name == 'MetaMask') {
            return '/metamask.png'
        }
        else if (name == 'Coinbase Wallet') {
            return '/coinbase.png'
        }
        else if (name == 'WalletConnect') {
            return '/wallet-connect.png'
        }
        else {
            return '/wallet.png'
        }
    }

    return (
        <div className={styles.connectWalletModel}>
            <div className={styles.walletModal}>
                <img src={'/close.svg'} onClick={() => {
                    setwalletPopUpVisible(false)
                }} className={styles.closeIcon} />
                <div className={styles.wallets}>
                    <h1 className={styles.title}>Connect Wallet</h1>
                    <p className={styles.subTitle}>Please select one of the following to proceed</p>
                    <div className={styles.box}>
                        {(isPhantomInstalled) && <div className={styles.option} onClick={async () => {
                            connectPhantom()
                        }}>
                            <img src={'/phantom.avif'} alt="" />
                            <p>Phantom</p>
                            <p className={styles.subtext}>solana</p>
                        </div>}
                        {
                            connectors.map((connector) => {
                                return (
                                    <div key={connector.id} className={styles.option} onClick={async () => {
                                        connectEth(connector)
                                    }}>
                                        <img key={connector.name} src={getWalletIcon(connector.name)} alt="" />
                                        <p> {connector.name}
                                            {!connector.ready && '(unsupported)'}
                                            {isConnecting &&
                                                connector.id === pendingConnector?.id &&
                                                ' (connecting)'}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

function SearchComp({ topSearchVisible }) {

    const [suggestionVisible, setsuggestionVisible] = useState(false)

    const [searchTerm, setsearchTerm] = useState("");

    let search_style = styles.searchComp;
    if (topSearchVisible) {
        search_style = styles.searchComp + ' ' + styles.searchCompDisable
    }

    const [data, setdata] = useState([]);

    const fetchData = async (term) => {
        if (!(term.length > 0)) return
        console.log('search --> ', term)
        let res = await axios.get(`${API}/search/${term}`);
        (res.data.length > 0) && setdata([...res.data]);
    }

    let throttleFetch = useCallback(
        _.debounce(term => fetchData(term), 100),
        [],
    )


    const [inputFocus, setinputFocus] = useState(false);

    return (
        <div className={search_style}>
            <input type="text" value={searchTerm}
                onFocus={() => {
                    setinputFocus(true);
                }}
                onBlur={() => {
                    setTimeout(() => { setinputFocus(false) }, 500)
                }}
                onChange={(e) => { setsearchTerm(e.target.value); throttleFetch(e.target.value) }}
                onClick={() => {
                    setsuggestionVisible(true);
                }} />
            <img className={styles.searchIcon} src="/search-icon.png" alt="" />
            {(suggestionVisible && inputFocus) &&
                <div className={styles.suggestionCon} key="nav">
                    {
                        <RankToSearch data={data} />
                    }
                </div>}
        </div>
    )
}

const RankToSearch = ({ data }) => {
    if (data?.length < 0) {
        return []
    }

    return data.map((value, idx) => {
        if (idx < 5) {
            return (
                <Link href={`/dao/${value.slug}`}>
                    <div key={value.dao_name}
                        className={styles.suggestion}
                    >
                        <img style={{ gridArea: "a" }} src={value.dao_logo} alt="" onError={(e) => { e.target.src = '/hero-bg.jpg' }} />
                        <h1 style={{ gridArea: "b" }}>{value.dao_name}</h1>
                        <h2 className={styles.sug_desc} style={{ gridArea: "c" }}>{value.dao_mission.slice(0, 50)}{(value.dao_mission.length > 10) ? '...' : ''}</h2>
                        <p style={{ gridArea: "d" }}>{value.review_count} reviews</p>
                    </div>
                </Link>
            )
        }
    })
}

const getWalletIcon = (name) => {
    if (name == 'MetaMask') {
        return '/metamask.png'
    }
    else if (name == 'Coinbase Wallet') {
        return '/coinbase.png'
    }
    else if (name == 'WalletConnect') {
        return '/wallet-connect.png'
    }
    else {
        return '/wallet.png'
    }
}

export default Nav;