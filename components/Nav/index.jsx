import styles from './nav.module.scss'
import { useState, useCallback } from 'react';
import stringSimilarity from "string-similarity";
import { useEffect } from 'react';
import _ from 'lodash'
import axios from 'axios'
import Link from 'next/link'

const API = process.env.API

const openNewTab = (url) => {
    if (url.length < 1) return
    let a = document.createElement('a');
    a.target = '_blank';
    a.href = url;
    a.click();
}

const openMetaMask = async () => {
    let ethereum = window.ethereum
    await window.ethereum.request({
        method: "wallet_requestPermissions",
        params: [
            {
                eth_accounts: {}
            }
        ]
    });

    let accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    console.log(accounts);
    return accounts[0]
}

function Nav({ topSearchVisible, data, outline }) {
    let search_style = styles.nav;
    if (topSearchVisible) {
        search_style = styles.nav + ' ' + styles.topNavSearch
    }

    const [wallet, setwallet] = useState(null);

    useEffect(() => {
        let wallet = window.localStorage.getItem('wallet');
        if (wallet) {
            setwallet(wallet);
        }
    }, [])

    return (
        <div className={search_style} style={(outline) ? { borderBottom: '1px solid rgb(209, 209, 209)' } : null}>
            <Link href={'/'}>
                <img className={styles.logo} src="/logo.png" alt="" />
            </Link>
            <SearchComp data={data} topSearchVisible={topSearchVisible} />
            <ul>
                <li onClick={() => {
                    openNewTab(`${location.href.split('/')[0]}/dao-form`)
                }} >Add a Dao</li>
                <li onClick={() => {
                    openNewTab(`${location.href.split('/')[0]}/dao-list`)
                }}>Discover Communities</li>
                <li>
                    {(wallet) ?
                        < button
                            className={styles.disconnectWallet}
                            onClick={async (e) => {
                                window.localStorage.removeItem('wallet');
                                setwallet(null);
                            }} >
                            {wallet.slice(0, 5) + "..." + wallet.slice(-4, -1)}
                        </button> :
                        < button
                            onClick={async (e) => {
                                if (!wallet) {
                                    let res = await openMetaMask();
                                    window.localStorage.setItem('wallet', res);
                                    setwallet(res);
                                }
                                else {
                                    window.localStorage.removeItem('wallet');
                                    setwallet(null);
                                }
                            }} >
                            {"Connect wallet"}
                        </button>
                    }

                </li>
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
            <img className={styles.searchIcon} src="search-icon.png" alt="" />
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
            return (<div key={value.dao_name}
                className={styles.suggestion}
                onClick={() => { openNewTab(`${window.location.href}/dao/${value.slug}`); }}
            >
                <img style={{ gridArea: "a" }} src={value.dao_logo} alt="" />
                <h1 style={{ gridArea: "b" }}>{value.dao_name}</h1>
                <h2 className={styles.sug_desc} style={{ gridArea: "c" }}>{value.dao_mission.slice(0, 50)}{(value.dao_mission.length > 10) ? '...' : ''}</h2>
                <p style={{ gridArea: "d" }}>{value.review_count} reviews</p>
            </div>)
        }
    })
}

export default Nav;