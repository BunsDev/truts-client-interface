import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import styles from './daoPage.module.scss'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Nav from '../../components/Nav';
import DaoCard from '../../components/DaoCard';
import axios from 'axios'
import { useRouter } from 'next/router'
import Loader from '../../utils/Loader';
import LoadingCard from '../../components/LoadingCard';
import { BigNumber } from "@ethersproject/bignumber";

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


const API = process.env.API;

function Starrating({ rating }) {
    return (
        <div className={styles.ratingComp}>
            {
                [1, 2, 3, 4, 5].map((ele) => {
                    let img_src = "/star-blank.png"
                    if (ele <= rating) {
                        img_src = "/star-filled.png"
                    }
                    return (
                        <img key={"i" + ele} src={img_src} alt="" />
                    )
                })
            }
        </div>
    )
}
//
function DaoPage({ dao_data }) {

    const router = useRouter()
    const slug = router.query.slug


    const resize = () => {
        let bdy = document.querySelector('body');
        bdy.style.zoom = `${100}%`
        if (window.innerWidth >= 470 && window.innerWidth < 1440) {
            console.log(window.innerWidth)
            bdy.style.zoom = `${((window.innerWidth) / 1440) * 100}%`
        }
    }
    const fluidResize = () => {
        window.addEventListener('resize', resize)
        window.addEventListener('fullscreenchange', resize)
        window.addEventListener('webkitfullscreenchange', resize)
    }
    useEffect(() => {
        resize();
        fluidResize();
    }, [])

    useEffect(() => {
        if (!window.Buffer) {
            window.Buffer = Buffer;
        }
        fetchSimilar()
    }, [])

    const [dao_list, setdao_list] = useState([]);

    const [current_review_wallet_address, setcurrent_review_wallet_address] = useState('');

    const fetchSimilar = async () => {
        try {
            const db_res = await axios.get(`${API}/dao/similar?limit=5&page=1&category=${dao_data.dao_category[0]}`)
            if (db_res.data) {
                console.log(db_res.data.results)
                setdao_list(db_res.data.results)
            }
            else {
                alert("network error");
            }
        }
        catch (er) {
            console.log(er);
        }
    }


    const [showAlldials, setshowAlldials] = useState(true);

    const [m_btn, setm_btn] = useState(false);

    const [walletModelVisible, setwalletModelVisible] = useState(false);

    if (!dao_data) {
        return (
            <Loader />
        )
    }

    let uniqueCategories = new Set([...dao_data.dao_category])

    return (
        <>
            <Head>
                <title>{dao_data.dao_name}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="preload" as="image" href="/verified.png"></link>
                <link rel="icon" href="/favicon.png" />
                <meta name="description" content={dao_data.dao_mission || dao_data.description} />
            </Head>
            <div className={styles.main_con}>
                <WalletModal visible={walletModelVisible} setvisible={setwalletModelVisible} review_wallet_address={current_review_wallet_address} />
                <div className={styles.con}>
                    <InfoBar data={dao_data} />
                    <Nav topSearchVisible={true} outline={false} />
                    <div className={styles.cover}>
                        <img src={(dao_data.dao_cover) ? dao_data.dao_cover : "/dao-cover.png"} onError={(e) => { e.target.src = '/hero-bg.jpg' }} alt="" />
                        <div className={styles.gradient} />
                        <div className={styles.daoInfo}>
                            <h1>{dao_data.dao_name} <img src="/verified.png" alt="" /> </h1>
                            <span className={styles.subRatingCon}>
                                <Starrating rating={dao_data.average_rating} />
                                <div className={styles.subRating}>
                                    {dao_data.review_count} reviews
                                </div>
                            </span>
                            <div className={styles.tags}>
                                {
                                    [...uniqueCategories].map((cat) => {
                                        return <span
                                            onClick={() => {
                                                openNewTab(`${location.href.split('/')[0]}/dao-list?category=${cat}`)
                                            }}
                                            key={"cat" + cat}>{`${cat}`}</span>
                                    })
                                }
                            </div>
                        </div>
                    </div>

                    <div className={styles.contentCon}>
                        <div className={styles.content}>
                            <div className={styles.titleBar}>
                                <h1>Reviews</h1>
                                <div className={styles.btns}>
                                    <button onClick={() => {
                                        window.location.href = `../set-review/${dao_data._id}`
                                    }}>Add a Review</button>
                                </div>
                            </div>
                            <div className={styles.dials} key={dao_data.dao_name} >
                                <span className={styles.dialRow}>
                                    <div name={"q1"} className={styles.dialCon}>
                                        <Dial
                                            percent={getAverageRating(dao_data?.reviews, 'resonate_vibes_rate')} />
                                        <p>Relate to the vibes!</p>
                                    </div>
                                    <div name={"q2"} className={styles.dialCon}>
                                        <Dial
                                            percent={getAverageRating(dao_data?.reviews, 'opinions_matter')} />
                                        <p>says their opinions are been heard</p>
                                    </div>
                                    <div name={"q3"} className={styles.dialCon}>
                                        <Dial
                                            percent={getAverageRating(dao_data?.reviews, 'friend_recommend')} />
                                        <p>Would you recommend to join this DAO</p>
                                    </div>

                                    <button
                                        style={(!showAlldials) ? { transform: "rotate(180deg)" } : null}
                                        onClick={() => {
                                            setshowAlldials(!showAlldials);
                                        }}>
                                        <img src="/down-arrow.png" alt="" />
                                    </button>
                                </span>
                                {(!showAlldials) && <span style={(showAlldials) ? { display: 'none' } : null} className={styles.dialRow}>
                                    <div name={"q4"} className={styles.dialCon}>
                                        <Dial
                                            percent={getAverageRating(dao_data?.reviews, 'onboarding_exp')
                                            } />
                                        <p>DAO’s onboarding experience</p>
                                    </div>
                                    <div name={"q5"} className={styles.dialCon}>
                                        <Dial
                                            percent={getAverageRating(dao_data?.reviews, 'great_org_structure')
                                            } />
                                        <p>says DAO  great organizational structure</p>
                                    </div>
                                    <div name={"q6"} className={styles.dialCon}>
                                        <Dial
                                            percent={getAverageRating(dao_data?.reviews, 'great_incentives')} />
                                        <p>says DAO has great incentives for members</p>
                                    </div>
                                </span>}
                            </div>

                            {
                                dao_data.reviews.map((ele, idx) => {
                                    return <Comment
                                        key={idx + "comment"}
                                        comment={ele.review_desc}
                                        address={ele.public_address}
                                        rating={ele.rating}
                                        profile_img={ele.profile_img}
                                        data={ele}
                                        openModel={() => {
                                            setwalletModelVisible(true);
                                            setcurrent_review_wallet_address(ele.public_address)
                                        }}
                                    />
                                }).reverse()
                            }

                            {/* <button className={styles.seeMore}>See more</button> */}

                        </div>
                        <div className={styles.rightNav}>
                            <div className={styles.socials} id={"rightPane"}>
                                <button onClick={() => {
                                    openNewTab(dao_data.twitter_link)
                                }} className={styles.twitterBtn} style={{ borderColor: "#363636" }}>
                                    <img src="/twitter-white.png" alt="" />
                                    <p>{numFormatter(dao_data.twitter_followers)}</p>
                                </button>
                                <button
                                    onClick={() => {
                                        openNewTab(dao_data.website_link)
                                    }}
                                    className={styles.webBtn}>
                                    <img src="/web-outline.png" alt="" />
                                    <p >{(dao_data.website_link?.length > 1) ? shortenUrl(dao_data.website_link) : "n/a"}</p>
                                </button>
                                <button onClick={() => {
                                    openNewTab(dao_data.discord_link)
                                }} className={styles.discordBtn} style={{ borderColor: "#363636" }}>
                                    <img src="/discord-white.png" alt="" />
                                    <p>{(dao_data.discord_members > 0) ? numFormatter(dao_data.discord_members) : 'n/a'}</p>
                                </button>
                                <button className={styles.webBtn}
                                    onClick={() => {
                                        openNewTab(dao_data.website_link)
                                    }}
                                >
                                    <img src="/web-outline.png" alt="" />
                                    <p >{(dao_data.website_link?.length > 1) ? "Mirror" : "n/a"}</p>
                                </button>
                                <button className={styles.slug} onClick={(e) => {
                                    navigator.clipboard.writeText(`truts.xyz/dao/${slug}`);
                                    document.querySelector('#copyBtn').style.background = "url('/sucess.png')";
                                    document.querySelector('#copyText').innerText = "Copied to Clipboard";
                                }} id={"clipboard"} ><span id={"copyBtn"} className={styles.copy} /> <p id={"copyText"} className={styles.copyText}>{"truts.xyz/dao/" + dao_data.slug}</p><span id={"copyBtn"} className={styles.copyIcon} /> </button>
                            </div>

                            <div className={styles.daoInfoPane} >
                                {<span className={styles.qn}>
                                    <h3>What is it?</h3>
                                    {(dao_data.description) && <p>{dao_data.description}</p>}
                                </span>}
                                {(dao_data.dao_mission) && <span className={styles.qn}>
                                    {/* <h3>What problem does it solve?</h3> */}
                                    {(dao_data.dao_mission != dao_data.description) && <p>{dao_data.dao_mission}</p>}
                                </span>}
                                {/* <span className={styles.qn}>
                                <h3>Type of DAO</h3>
                                <p>{[...uniqueCategories][0]} {[...uniqueCategories][1]}</p>
                            </span>
                            <span className={styles.qn}>
                                <h3>URL Slug</h3>
                                <p>{"truts.xyz/dao/" + dao_data.slug}</p>
                            </span> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.footer}>
                    <h3>Other similar DAOs</h3>
                    <div className={styles.daoList}>
                        {(dao_list.length > 0) ?
                            dao_list.map((ele, idx) => {
                                if (idx < 4) {
                                    return <DaoCard link={ele.slug} data={ele} key={idx + "daolist"} />
                                }
                            })
                            :
                            <>
                                <LoadingCard />
                                <LoadingCard />
                                <LoadingCard />
                                <LoadingCard />
                            </>
                        }
                    </div>

                </div>
                <div className={styles.m_daopage}>
                    <Nav />
                    <div className={styles.cover}>
                        <img src={(dao_data.dao_cover) ? dao_data.dao_cover : "/dao-cover.png"} alt="" onError={(e) => { e.target.src = '/hero-bg.jpg' }} />
                        <div className={styles.gradient} />
                        <div className={styles.daoInfo}>
                            <h1>{dao_data.dao_name} <img src="/verified.png" alt="" /> </h1>
                            <span className={styles.subRatingCon}>
                                <Starrating rating={dao_data.average_rating} />
                                <div className={styles.subRating}>
                                    {dao_data.review_count} reviews
                                </div>
                            </span>
                            <div className={styles.tags}>
                                {
                                    [...uniqueCategories].map((cat) => {
                                        return <span
                                            onClick={() => {
                                                openNewTab(`${location.href.split('/')[0]}/dao-list?category=${cat}`)
                                            }}
                                            key={"cat" + cat}>{`${cat} DAO`}</span>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className={styles.m_content}>
                        <span className={styles.tabs}>
                            <h3 className={(!m_btn) && styles.selcted_tab} onClick={() => {
                                setm_btn(false);
                            }} >Overview</h3>
                            <h3 className={(m_btn) && styles.selcted_tab} onClick={() => {
                                setm_btn(true);
                            }} >Reviews</h3>
                        </span>

                        {(m_btn) && <div className={styles.review_con}>

                            <button className={styles.writeReviewBtn} onClick={() => {
                                window.location.href = `../set-review/${dao_data._id}`
                            }}>
                                Write a Review
                            </button>

                            <div className={styles.m_dialCon}>
                                <div className={styles.m_dial}>
                                    <Dial
                                        percent={getAverageRating(dao_data?.reviews, 'resonate_vibes_rate')} />
                                    <p>Relate to the vibes!</p>
                                </div>
                                <div className={styles.m_dial}>
                                    <Dial
                                        percent={getAverageRating(dao_data?.reviews, 'opinions_matter')} />
                                    <p>says their opinions are been heard</p>
                                </div>
                                <div className={styles.m_dial}>
                                    <Dial
                                        percent={getAverageRating(dao_data?.reviews, 'friend_recommend')} />
                                    <p>Would you recommend to join this DAO</p>
                                </div>
                                <div className={styles.m_dial}>
                                    <Dial
                                        percent={getAverageRating(dao_data?.reviews, 'onboarding_exp')} />
                                    <p>DAO’s onboarding experience</p>
                                </div>
                                <div className={styles.m_dial}>
                                    <Dial
                                        percent={getAverageRating(dao_data?.reviews, 'great_org_structure')} />
                                    <p>says DAO  great organizational structure</p>
                                </div>
                                <div className={styles.m_dial}>
                                    <Dial
                                        percent={getAverageRating(dao_data?.reviews, 'great_incentives')} />
                                    <p>says DAO has great incentives for members</p>
                                </div>
                            </div>

                            <div className={styles.reviewCardList}>
                                {
                                    dao_data.reviews.map((ele, idx) => {
                                        return <Comment
                                            key={idx + "comment"}
                                            comment={ele.review_desc}
                                            address={ele.public_address}
                                            rating={ele.rating}
                                            profile_img={ele.profile_img}
                                            data={ele}
                                            openModel={() => {
                                                setwalletModelVisible(true);
                                            }}
                                        />
                                    }).reverse()

                                }
                            </div>
                        </div>}
                        {(!m_btn) && <div className={styles.m_overview}>
                            <div className={styles.social_icons}>
                                <span style={{ backgroundColor: "" }}
                                    onClick={() => {
                                        openNewTab(dao_data.twitter_link);
                                    }}
                                >
                                    <img src="/twitter-white.png" alt="" />
                                </span>
                                <span style={{ backgroundColor: "#4962FE" }}
                                    onClick={() => {
                                        openNewTab(dao_data.discord_link);
                                    }}
                                >
                                    <img src="/discord-white.png" alt="" />
                                </span>
                                <span style={{ backgroundColor: "#121212" }}
                                    onClick={() => {
                                        openNewTab(dao_data.website_link);
                                    }}
                                >
                                    <img src="/web-white.png" alt="" />
                                </span>
                                <span style={{ backgroundColor: "#ffffff", border: "1px solid black" }}
                                    onClick={() => {
                                        //navigator.clipboard.writeText("https://truts.xyz/dao/" + dao_data.slug);
                                        openNewTab("https://truts.xyz/dao/" + dao_data.slug);
                                    }}
                                >
                                    <img src="/link_black.png" alt="" />
                                </span>
                            </div>
                            <div className={styles.daoInfoPane} >
                                {/* <span className={styles.tokenInfo}>
                                    <div><p></p><h3></h3></div>
                                    <div><p></p><h3></h3></div>
                                </span> */}
                                {<span className={styles.qn}>
                                    <h3>What is it?</h3>
                                    {(dao_data.description) && <p>{dao_data.description}</p>}
                                </span>}
                                {(dao_data.dao_mission) && <span className={styles.qn}>
                                    {/* <h3>What problem does it solve?</h3> */}
                                    {(dao_data.dao_mission != dao_data.description) && <p>{dao_data.dao_mission}</p>}
                                </span>}
                            </div>


                        </div>
                        }
                        <div className={styles.footer}>
                            <h2 className={styles.footerTitle}>
                                Love what we do? Truts your guts and join us now!
                            </h2>
                            <span className={styles.socialIcon}>
                                <img onClick={() => { openNewTab('https://twitter.com/trutsxyz') }} src="/twitter-grey.png" alt="" />
                                {/* <img src="/discord-grey.png" alt="" /> */}
                                <img onClick={() => { openNewTab('https://truts.xyz') }} src="/web-grey.png" alt="" />
                            </span>
                            <p className={styles.footerSubTitle}></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const getAverageRating = (list, key) => {
    let avg = 50;
    let sum = 0;
    if (list?.length > 0) {
        list.forEach((ele) => {
            sum = sum + ele[key];
        })
        avg = Math.ceil(sum / list.length);
    }

    return avg;
}

const InfoBar = ({ data }) => {

    const [infoBarVisible, setinfoBarVisible] = useState(false);

    useEffect(() => {
        let rightPane = document.querySelector('#rightPane')
        document.addEventListener('scroll', (e) => {
            if (rightPane.getBoundingClientRect().top < -260) {
                setinfoBarVisible((state) => {
                    if (!state) {
                        return !state
                    }
                    else {
                        return state
                    }
                });
                console.log("visible")
            }
            else {
                console.log("in-visible");
                setinfoBarVisible((state) => {
                    if (state) {
                        return !state
                    }
                    else {
                        return state
                    }
                });
            }
        })

    }, [])

    if (infoBarVisible) {
        return (
            <div className={styles.infoBar}>
                <div className={styles.profileName}>
                    <img style={{ gridArea: 'a' }} src={data.dao_cover} alt="" onError={(e) => { e.target.src = '/hero-bg.jpg' }} />
                    <h1>{data.dao_name}</h1>
                    <Starrating rating={data.average_rating} />
                </div>
                <p className={styles.noReviews}>
                    {data.review_count} Reviews
                </p>
                <span className={styles.infoBarBtns}>
                    <img onClick={() => {
                        openNewTab(data.twitter_link);
                    }} src="/twitter-white.png" alt="" />
                    <img onClick={() => {
                        openNewTab(data.discord_link);
                    }} src="/discord-white.png" alt="" />
                    <img onClick={() => {
                        openNewTab(data.website_link);
                    }} src="/web-white.png" alt="" />
                    <div className={styles.btns}>
                        <button onClick={() => {
                            window.location.href = `../set-review/${data._id}`
                        }}>Add a Review</button>
                    </div>
                </span>
            </div>

        )
    }
    else {
        return null
    }
}

const WalletModal = ({ setvisible, visible, review_wallet_address }) => {

    const CONNECT_WALLET = 'CONNECT_WALLET';
    const WRONG_NETWORK = 'WRONG_NETWORK';
    const TIP_REVIEWER = 'TIP_REVIEWER';
    const SUCCESS = 'SUCESS';
    const FAILURE = 'FAILURE';
    const INSUFFICIENT = 'INSUFFICIENT';

    const [dialogType, setdialogType] = useState(CONNECT_WALLET);

    const { activeConnector, connectAsync, connectors, isConnected, isConnecting, pendingConnector } = useConnect();
    const { disconnectAsync } = useDisconnect()
    const { data: walletData, isError, isLoading } = useAccount()

    const {
        activeChain,
        chains,
        error,
        isLoading: chain_loading,
        pendingChainId,
        switchNetwork,
    } = useNetwork()

    let ONE_MATIC = '1000000000000000000'

    const { data, isIdle, isError: tip_isError, isLoading: tip_Loading, isSuccess, sendTransaction } =
        useSendTransaction({
            request: {
                to: review_wallet_address,
                value: BigNumber.from(ONE_MATIC), // 1 Matic
            },
            onError(error) {
                console.log('Error', error);
                if (error.code == -32603) {
                    return setdialogType(INSUFFICIENT);
                }
                else return setdialogType(FAILURE);
            },
            onSuccess(data) {
                console.log('Success', data)
                setdialogType(SUCCESS);
            },
        })

    const scrollDisable = (control) => {
        if (control) {
            document.querySelector('body').style.overflow = "hidden";
        }
        else {
            console.log("enable scroll")
            document.querySelector('body').style.overflow = "auto";
        }
    }

    useEffect(() => {
        if (visible) {
            openModel();
        }
    }, [visible])

    const openModel = () => {
        scrollDisable(true);
    }

    const closeModel = () => {
        scrollDisable(false);
        setvisible(false);
    }

    let wallets = <>
        <div className={styles.wallets}>
            <h1 className={styles.title}>Connect Wallet</h1>
            <p className={styles.subTitle}>Please select one of the following to proceed</p>
            <div className={styles.box}>
                {
                    connectors.map((connector) => {
                        return (
                            <div key={connector.id} className={styles.option} onClick={() => {
                                connectAsync(connector);
                            }}>
                                <img src={(connector.name == 'MetaMask') ? "/metamask.png" : "/wallet-connect.png"} alt="" />
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
    </>

    let wrongNetwork = <>
        <div className={styles.wallets}>
            <h1 className={styles.title}>Wrong Network</h1>
            <p className={styles.subTitle}>Please switch to Matic network in your Wallet</p>
            <div className={styles.connectBtn} onClick={() => {
                switchNetwork(137);
            }}>
                <img src="/polygon.png" alt="" />
                <p>Switch to Polygon Chain</p>
            </div>
        </div>
    </>


    let tipReviewer = <>
        <div className={styles.wallets} key={"wallets"}>
            <h1 className={styles.title}>Tip the reviewer</h1>
            <p className={styles.subTitle}>Please note, tips are only possible on <strong>Polygon</strong></p>
            <div className={styles.tokenAmountBox}>
                <div className={styles.head}>
                    <p>Pay With</p>
                </div>
                <div className={styles.body}>
                    <span className={styles.token}>
                        <img src="/matic.png" alt="" />
                        <h2>MATIC</h2>
                    </span>
                    <h1 className={styles.amount}>1.00</h1>
                </div>
            </div>
            <div className={styles.connectBtn} onClick={async () => {
                (!tip_Loading) && sendTransaction();
            }}>
                {/* <img src="/polygon.png" alt="" /> */}
                {(!tip_Loading) ? <p>Tip it!</p> : <p>Waiting for transaction to complete...</p>}
            </div>
        </div>
    </>

    let success = <>
        <div className={styles.wallets} key={"success"}>
            <div className={styles.finalPrompt}>
                <img src="/sucess_tick.png" alt="" />
                <p>Transaction successful. Thank you for your contribution and gratuity.</p>
            </div>
        </div>
    </>

    let failure = <>
        <div className={styles.wallets} key={"failure"}>
            <div className={styles.finalPrompt}>
                <img src="/oops.png" alt="" />
                <p>Transaction unsuccessful. Can you please try again :)</p>
            </div>
        </div>
    </>

    let insufficient = <>
        <div className={styles.wallets} key={"balance"}>
            <div className={styles.finalPrompt}>
                <img src="/oops.png" alt="" />
                <p>Transaction unsuccessful. Please make sure you have enough tokens for Gas fee :)</p>
            </div>
        </div>
    </>

    const selector = () => {
        if (dialogType == CONNECT_WALLET) {
            if (!isConnecting && isConnected) {
                return setdialogType(WRONG_NETWORK);
            }
            return wallets
        }
        else if (dialogType == WRONG_NETWORK) {
            if (activeChain.id == 137) {
                return setdialogType(TIP_REVIEWER);
            }
            return wrongNetwork
        }
        else if (dialogType == TIP_REVIEWER) {
            return tipReviewer
        }
        else if (dialogType == SUCCESS) {
            return success
        }
        else if (dialogType == FAILURE) {
            return failure
        }
        else if (dialogType == INSUFFICIENT) {
            return insufficient
        }
    }

    if (visible) {
        return (
            <div className={styles.walletCon}>
                <div className={styles.walletModal}>
                    <img src={'/close.svg'} onClick={() => {
                        setdialogType(CONNECT_WALLET);
                        closeModel()
                    }} className={styles.closeIcon} />
                    {
                        selector(dialogType)
                    }
                </div>
            </div>
        )
    }
    else {
        return null
    }

}

const ConnectWalletModelSimple = ({ connectWalletModelVisible, setconnectWalletModelVisible }) => {
    const { activeConnector, connectAsync, connectors, isConnected, isConnecting, pendingConnector } = useConnect();
    const { disconnectAsync } = useDisconnect()
    const { data: walletData, isError, isLoading } = useAccount()

    if (connectWalletModelVisible) {
        return (
            <div className={styles.connectWalletModel}>
                <div className={styles.walletModal}>
                    <div className={styles.wallets}>
                        <h1 className={styles.title}>Connect Wallet</h1>
                        <p className={styles.subTitle}>Please select one of the following to proceed</p>
                        <div className={styles.box}>
                            {
                                connectors.map((connector) => {
                                    return (
                                        <div key={connector.id} className={styles.option} onClick={async () => {
                                            await connectAsync(connector);
                                            setconnectWalletModelVisible(false);
                                        }}>
                                            <img src={(connector.name == 'MetaMask') ? "/metamask.png" : "/wallet-connect.png"} alt="" />
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
    else {
        return (null)
    }
}

function Comment({ comment, address, rating, profile_img, openModel, data }) {

    const [wrapText, setwrapText] = useState(true);
    const [ratingLoading, setratingLoader] = useState(false);

    const [thumbsUp, setThumbsUp] = useState(data.thumbs_up);
    const [thumbsDown, setThumbsDown] = useState(data.thumbs_down);

    // thumbs_up: data.thumbs_up, thumbs_down: data.thumbs_down

    const { activeConnector, connectAsync, connectors, isConnected, isConnecting, pendingConnector } = useConnect();
    const { disconnectAsync } = useDisconnect()
    const { data: walletData, isError, isLoading } = useAccount()

    const [connectWalletModelVisible, setconnectWalletModelVisible] = useState(false);

    const giveThumbs = async (type) => {
        console.log("rating ", type)
        if (!isConnected) {
            setconnectWalletModelVisible(true);
        }
        else {
            if (type == 'up') {
                let res = await addRating(true);
                if (res) {
                    if (res.deleted == true) {
                        setThumbsUp(thumbsUp - 1);
                    }
                    else {
                        if (!res.unique) {
                            setThumbsDown(thumbsDown - 1);
                        }
                        setThumbsUp(thumbsUp + 1);
                    }
                }
            }
            else if (type == 'down') {
                let res = await addRating(false);
                if (res) {
                    if (res.deleted == true) {
                        setThumbsDown(thumbsDown - 1);
                    }
                    else {
                        if (!res.unique) {
                            setThumbsUp(thumbsUp - 1);
                        }
                        setThumbsDown(thumbsDown + 1);
                    }
                }
            }
        }
        setratingLoader(false);
    }

    const addRating = async (type) => {
        console.log("rating ", type)
        if (!isConnected) {
        }
        else {
            try {
                let res = await axios.post(`${API}/review/rate-review`, {
                    "review_id": data._id,
                    "wallet_address": walletData.address,
                    "type": type
                });
                console.log(res);
                if (res.status == 200) {
                    return { status: true, unique: res.data.unique, deleted: res.data.deleted };
                }
                else {
                    alert("network error");
                    return false;
                }
            }
            catch (er) {
                console.log(er)
                return false;
            }
        }
    }

    let p_img = (profile_img) ? profile_img : "/hero-bg.jpg"

    return (
        <div className={styles.comment}>
            <ConnectWalletModelSimple connectWalletModelVisible={connectWalletModelVisible} setconnectWalletModelVisible={setconnectWalletModelVisible} />
            <div className={styles.profileName}>
                <img style={{ gridArea: 'a' }} src={p_img} alt="" onError={(e) => { e.target.src = '/hero-bg.jpg' }} />
                <h1 onClick={() => {
                    navigator.clipboard.writeText(address);
                }}
                    style={{ cursor: "pointer" }}
                >{address.slice(0, 5) + "..." + address.slice(-4)}</h1>
                <Starrating rating={rating} />
            </div>
            <p className={styles.commentText}>
                {(comment.length >= 400) ? ((wrapText) ? (comment.substring(0, 400) + '....') : comment) : comment}
            </p>
            {(comment.length >= 400) && <button className={styles.read_more} onClick={() => {
                setwrapText(!wrapText);
            }} >{(wrapText) ? "Read more" : "Show less"}</button>}
            <div className={styles.likes}>
                <span>
                    {(!ratingLoading) ? <> <img src="/thumbs-up.png" alt="" onClick={() => {
                        setratingLoader(true);
                        giveThumbs('up');
                    }} />
                        <p>{thumbsUp}</p>
                    </> : <><img src="/mini-loader.gif" alt="" /><p> </p></>}
                </span>
                <span>
                    {(!ratingLoading) ? <>
                        <img src="/thumbs-down.png" alt="" onClick={async () => {
                            setratingLoader(true);
                            giveThumbs('down');
                        }} />
                        <p>{thumbsDown}</p>
                    </> : <> <img src="/mini-loader.gif" alt="" /> <p> </p></>}
                </span>
                <span>
                    <img src="/tips.png" alt="" onClick={() => { openModel() }} />
                </span>
            </div>
        </div>
    )
}


//SSR DATA DAO PAGE
export async function getServerSideProps(ctx) {
    let { slug } = ctx.query
    // Fetch data from external API
    let res = await fetchData(slug)
    // Pass data to the page via props
    return { props: { dao_data: res } }
}

const fetchData = async (slug) => {
    console.log(slug);
    try {
        const res = await axios.get(`${API}/dao/get-dao-by-slug?slug=${slug}`)
        if (res.data.status) {
            return JSON.parse(JSON.stringify(res.data.data))
        }
        else {
            alert("DAO NOT FOUND");
        }
    }
    catch (er) {
        console.log(er);
    }
    return null
}

function Dial({ percent }) {

    const [percentage, setpercentage] = useState(0);

    let min = -20;
    let max = 20

    useEffect(() => {
        setTimeout(() => {
            setpercentage(percent);
        }, 1000)
    }, [])

    return (
        <div className={styles.dl}>
            <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                strokeWidth={5.2}
                styles={{
                    // Customize the root svg element
                    root: {},
                    // Customize the path, i.e. the "completed progress"
                    path: {
                        // Path color
                        stroke: `rgba(49,99, 242)`,
                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: 'round',
                        // Customize transition animation
                        transition: 'stroke-dashoffset 0.5s ease 0s',
                        // Rotate the path
                        transform: 'rotate(0.25turn)',
                        transformOrigin: 'center center',
                    },
                    // Customize the circle behind the path, i.e. the "total progress"
                    trail: {
                        // Trail color
                        stroke: '#E4E2FB',
                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: 'butt',
                        // Rotate the trail
                        transform: 'rotate(0.25turn)',
                        transformOrigin: 'center center',
                    },
                    // Customize the text
                    text: {
                        // Text color
                        fill: '#0000000',
                        // Text size
                        fontSize: '0px',
                        fontWeight: 'bold'
                    },
                    // Customize background - only used when the `background` prop is true
                    background: {
                        fill: '#3e98c7',
                    },
                }}
            />
            <h1 className={styles.percentText}>
                {percentage}%
            </h1>

        </div>
    )
}

const openNewTab = (url) => {
    if (url.length < 1) return
    let a = document.createElement('a');
    a.target = '_blank';
    a.href = url;
    a.click();
}

function numFormatter(num) {
    if (num > 999 && num < 1000000) {
        return (num / 1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million 
    } else if (num > 1000000) {
        return (num / 1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million 
    } else if (num <= 999) {
        return num; // if value < 1000, nothing to do
    }
}

const shortenUrl = (url) => {
    let new_url = url.replace('https://', '').replace('http://', '').replace('www.', '').replace('/', '');
    if (new_url.length <= 18) {
        return new_url
    }
    else {
        return "Website"
    }
}

export default DaoPage