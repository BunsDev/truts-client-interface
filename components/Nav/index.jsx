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

function Nav({ topSearchVisible, outline }) {

    useEffect(() => {
        if (!window.Buffer) {
            window.Buffer = Buffer;
        }
    }, [])

    const { activeConnector, connectAsync, connectors, isConnected, isConnecting, pendingConnector } = useConnect();
    const { disconnectAsync } = useDisconnect()
    const { data: walletData, isError, isLoading } = useAccount()

    let search_style = styles.nav;
    if (topSearchVisible) {
        search_style = styles.nav + ' ' + styles.topNavSearch
    }

    return (
        <div className={search_style} style={(outline) ? { borderBottom: '1px solid rgb(209, 209, 209)' } : {}}>
            <Link href={'/'} passHref>
                <img className={styles.logo} src="/logo.png" alt="" />
            </Link>
            <SearchComp topSearchVisible={topSearchVisible} />
            <ul>
                {/* <li onClick={() => {
                    openNewTab(`${location.href.split('/')[0]}/dao-form`)
                }} >Add a Dao</li> */}
                <Link href={'/dao-list'} passHref>
                    <li>Discover Communities</li>
                </Link>
                {(!isConnecting) && <>
                    {(!isConnected) ? <>
                        <li className={styles.walletWrapper}>
                            <button>
                                {"Connect wallet"}
                            </button>
                            <div className={styles.walletOptions}>
                                {
                                    connectors.map((connector) => {
                                        console.log(connector.ready);
                                        return (
                                            <button className={styles.option}
                                                disabled={!connector.ready}
                                                key={connector.id}
                                                onClick={() => { connectAsync(connector) }}
                                            >
                                                <img src={(connector.name == 'MetaMask') ? "/metamask.png" : "/wallet-connect.png"} alt="" />
                                                {connector.name}
                                                {!connector.ready && '(unsupported)'}
                                                {isConnecting &&
                                                    connector.id === pendingConnector?.id &&
                                                    ' (connecting)'}
                                            </button>)
                                    })
                                }
                            </div>
                        </li>
                    </> : <>
                        {(!isLoading && !isConnecting) && <li className={styles.walletWrapper}>
                            <button className={styles.disconnectWallet} onClick={() => { disconnectAsync() }}>
                                {(walletData?.address) ? walletData.address.slice(0, 5) + "..." + walletData.address.slice(-4) : ""}
                            </button>
                        </li>}
                    </>
                    }</>}

            </ul>
        </div >
    )
}

Nav.defaultProps = {
    outline: false
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

export default Nav;