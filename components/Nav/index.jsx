import styles from './nav.module.scss'
import { useState } from 'react';
import stringSimilarity from "string-similarity";
import { useEffect } from 'react';


const openNewTab = (url) => {
    if (url.length < 1) return
    let a = document.createElement('a');
    a.target = '_blank';
    a.href = url;
    a.click();
}

const openMetaMask = async () => {
    let ethereum = window.ethereum
    let accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    console.log(accounts);
    return accounts[0]
}

function Nav({ topSearchVisible, data }) {
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
        <div className={search_style}>
            <img className={styles.logo} onClick={() => { window.location.href = '/' }} src="/logo.png" alt="" />
            <SearchComp data={data} topSearchVisible={topSearchVisible} />
            <ul>
                <li>Add a dao</li>
                <li>Discover DAOs</li>
                <li>
                    <button onClick={async (e) => {
                        if (!wallet) {
                            let res = await openMetaMask();
                            window.localStorage.setItem('wallet', res);
                            setwallet(res);
                        }
                    }} >{(wallet) ? wallet.slice(0, 5) + "..." + wallet.slice(-6, -1) : "Connect wallet"}</button>
                </li>
            </ul>
        </div>
    )
}

function SearchComp({ topSearchVisible, data }) {

    const [suggestionVisible, setsuggestionVisible] = useState(false)

    const [searchTerm, setsearchTerm] = useState("");

    let search_style = styles.searchComp;
    if (topSearchVisible) {
        search_style = styles.searchComp + ' ' + styles.searchCompDisable
    }

    const [inputFocus, setinputFocus] = useState(false);

    return (
        <div className={search_style}>
            <input type="text" value={searchTerm}
                onFocus={() => {
                    setinputFocus(true);
                }}
                onBlur={() => {
                    setinputFocus(false);
                }}
                onChange={(e) => { setsearchTerm(e.target.value) }}
                onClick={() => {
                    setsuggestionVisible(true);
                }} />
            <img className={styles.searchIcon} src="search-icon.png" alt="" />
            {(suggestionVisible && inputFocus) &&
                <div className={styles.suggestionCon} key="nav">
                    {
                        rankToSearch(searchTerm, data)
                    }
                </div>}
        </div>
    )
}

const rankToSearch = (searchTerm, data) => {
    let List = data.map((ele, idx) => {
        let rank = Math.max(stringSimilarity.compareTwoStrings(searchTerm, ele.dao_name.toLowerCase()), stringSimilarity.compareTwoStrings(searchTerm, ele.dao_name))
        return [rank, idx]
    });

    let ranklist = List.sort((a, b) => { return a[0] - b[0] }).reverse();

    let searchlist = ranklist.map((ele) => {
        return data[ele[1]]
    })

    return searchlist.map((value, idx) => {
        if (idx < 5) {
            return (<div key={value.dao_name}
                className={styles.suggestion}
                onClick={() => { openNewTab(`${window.location.href}/dao/${value.slug}`); }}
            >
                <img style={{ gridArea: "a" }} src={value.dao_logo} alt="" />
                <h1 style={{ gridArea: "b" }}>{value.dao_name}</h1>
                <h2 style={{ gridArea: "c" }}>quick brief about project</h2>
                <p style={{ gridArea: "d" }}>128 reviews</p>
            </div>)
        }
    })
}

export default Nav;