import React, { useEffect, useState } from 'react'
import styles from './daoPage.module.scss'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Nav from '../../components/Nav';
import DaoCard from '../../components/DaoCard';
import axios from 'axios'
import { useRouter } from 'next/router'
import Tip from '../../utils/tip';

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


function DaoPage() {

    const router = useRouter()
    const slug = router.query.slug

    const [walletModelVisible, setwalletModelVisible] = useState(false);

    //Tipping modules


    useEffect(() => {
        slug && fetchData()
    }, [slug])

    const [dao_data, setdao_data] = useState(null);
    const [dao_list, setdao_list] = useState(null);

    const fetchData = async () => {

        console.log(slug);
        try {
            const res = await axios.get(`${API}/dao/get-dao-by-slug?slug=${slug}`)
            console.log(res.data)
            if (res.data.status) {
                setdao_data(res.data.data)
            }
            else {
                alert("DAO NOT FOUND");
            }
        }
        catch (er) {
            console.log(er);
        }

        try {
            const db_res = await axios.get(`${API}/dao/get-dao-list`)
            if (db_res.data) {
                setdao_list(db_res.data)
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

    if (!dao_data) {
        return (
            <h1>

            </h1>
        )
    }

    if (!dao_list) {
        return (
            <h1>

            </h1>
        )
    }

    let uniqueCategories = new Set([...dao_data.dao_category])

    return (
        <>
            <div className={styles.con}>
                <WalletModal visible={walletModelVisible} setvisible={setwalletModelVisible} />
                <Nav />
                <div className={styles.cover}>
                    <img src={(dao_data.dao_cover) ? dao_data.dao_cover : "/dao-cover.png"} alt="" />
                    <div className={styles.gradient} />
                    <div className={styles.daoInfo}>
                        <h1>{dao_data.dao_name} <img src="/verified.png" alt="" /> </h1>
                        <span className={styles.subRatingCon}>
                            <Starrating rating={dao_data.average_rating} />
                            <div className={styles.subRating}>
                                125 reviews
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
                <div className={styles.titleBar}>
                    <h1>Reviews</h1>
                    <div className={styles.btns}>
                        <button onClick={() => {
                            window.location.href = `../set-review/${dao_data._id}`
                        }}>Add a Review</button>
                        <button onClick={() => {
                            navigator.clipboard.writeText(`Daoverse.com/dao/${slug}`);
                        }} id={"clipboard"} className={styles.slug}>{`Daoverse.com/dao/${slug}`}<span className={styles.copy}></span></button>
                    </div>
                </div>
                <div className={styles.contentCon}>
                    <div className={styles.content}>
                        <div className={styles.dials} >
                            <span className={styles.dialRow}>
                                <div name={"q1"} className={styles.dialCon}>
                                    <Dial
                                        percent={dao_data.question_list_rating.q1} />
                                    <p>Relate to the vibes!</p>
                                </div>
                                <div name={"q2"} className={styles.dialCon}>
                                    <Dial
                                        percent={dao_data.question_list_rating.q2} />
                                    <p>says their opinions are been heard</p>
                                </div>
                                <div name={"q3"} className={styles.dialCon}>
                                    <Dial
                                        percent={dao_data.question_list_rating.q3} />
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
                                        percent={dao_data.question_list_rating.q4} />
                                    <p>DAO’s onboarding experience</p>
                                </div>
                                <div name={"q5"} className={styles.dialCon}>
                                    <Dial
                                        percent={dao_data.question_list_rating.q5} />
                                    <p>says DAO  great organizational structure</p>
                                </div>
                                <div name={"q6"} className={styles.dialCon}>
                                    <Dial
                                        percent={dao_data.question_list_rating.q6} />
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
                                    openModel={() => {
                                        setwalletModelVisible(true);
                                    }}
                                />
                            }).reverse()

                        }

                        <button className={styles.seeMore}>See more</button>

                    </div>
                    <div className={styles.rightNav}>
                        <div className={styles.socials}>
                            <button style={{ background: "#1da1f2" }}>
                                <img src="/twitter-white.png" alt="" />
                                <p>10K followers</p>
                            </button>
                            <button style={{ background: "#F7F7F7" }}>
                                <img src="/web-outline.png" alt="" />
                                <p style={{ color: "black" }}>{dao_data.slug}.com</p>
                            </button>
                            <button style={{ background: "#4962FE" }}>
                                <img src="/discord-white.png" alt="" />
                                <p>5K members</p>
                            </button>
                            <button style={{ background: "#F7F7F7" }}>
                                <img src="/web-outline.png" alt="" />
                                <p style={{ color: "black" }}>{dao_data.slug}.xyz</p>
                            </button>
                        </div>

                        <div className={styles.daoInfoPane}>
                            <span className={styles.qn}>
                                <h3>What is it?</h3>
                                <p>Think of them like an internet-native business that`s collectively owned and managed by its members. </p>
                            </span>
                            <span className={styles.qn}>
                                <h3>What problem does it solve?</h3>
                                <p>DAOs don`t need a central authority. Instead, the group makes decisions collectively, and payments are automatically authorized when votes pass.</p>
                            </span>
                            <span className={styles.qn}>
                                <h3>Vision</h3>
                                <p>Votes tallied, and outcome implemented automatically without trusted intermediary.</p>
                            </span>
                            <span className={styles.qn}>
                                <h3>Type of DAO</h3>
                                <p>{[...uniqueCategories][0]} {[...uniqueCategories][1]}</p>
                            </span>
                            <span className={styles.qn}>
                                <h3>URL Slug</h3>
                                <p>{"Daoverse.app/dao/" + dao_data.slug}</p>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.footer}>
                <h3>Other similar DAOs</h3>
                <div className={styles.daoList}>
                    {
                        dao_list.map((ele, idx) => {
                            if (idx < 5) {
                                return <DaoCard link={ele.slug} cover={ele.dao_cover} name={ele.dao_name} rating={parseInt(ele.average_rating)} key={idx + "daolist"} />
                            }
                        })
                    }

                </div>

            </div>

        </>
    )
}

const WalletModal = ({ setvisible, visible }) => {

    const CONNECT_WALLET = 'CONNECT_WALLET';
    const WRONG_NETWORK = 'WRONG_NETWORK';
    const TIP_REVIEWER = 'TIP_REVIEWER';
    const SUCCESS = 'SUCESS';
    const FAILURE = 'FAILURE'

    const [dialogType, setdialogType] = useState(CONNECT_WALLET);

    let { currentAccount, payWithMetamask, connectWallet, checkConnectedWallet, changenetwork } = Tip(setdialogType);

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

    let wrongNetwork = <>
        <div className={styles.wallets}>
            <h1 className={styles.title}>Wrong Network</h1>
            <p className={styles.subTitle}>Please switch to Matic network in your Wallet</p>
            <div className={styles.connectBtn} onClick={() => {
                changenetwork();
            }}>
                <img src="/polygon.png" alt="" />
                <p>Switch to Polygon Chain</p>
            </div>
        </div>
    </>


    let tipReviewer = <>
        <div className={styles.wallets}>
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
                await payWithMetamask();
            }}>
                {/* <img src="/polygon.png" alt="" /> */}
                <p>Tip it!</p>
            </div>
        </div>
    </>

    let success = <>
        <div className={styles.wallets}>
            <div className={styles.finalPrompt}>
                <img src="/sucess_tick.png" alt="" />
                <p>Transaction successful. Thank you for your contribution and gratuity.</p>
            </div>
        </div>
    </>

    let failure = <>
        <div className={styles.wallets}>
            <div className={styles.finalPrompt}>
                <img src="/oops.png" alt="" />
                <p>Transaction unsuccessful. Can you please try again :)</p>
            </div>
        </div>
    </>

    const selector = () => {
        if (dialogType == CONNECT_WALLET) {
            return wallets
        }
        else if (dialogType == WRONG_NETWORK) {
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

function Comment({ comment, address, rating, profile_img, openModel }) {
    let p_img = (profile_img) ? profile_img : "/herobg.png"
    return (
        <div className={styles.comment}>
            <div className={styles.profileName}>
                <img style={{ gridArea: 'a' }} src={p_img} alt="" />
                <h1>{address.slice(0, 5) + "..." + address.slice(-6, -1)}</h1>
                <Starrating rating={rating} />
            </div>
            <p className={styles.commentText}>
                {comment}
            </p>
            <div className={styles.likes}>
                <span>
                    <img src="/thumbs-up.png" alt="" />
                    <p>234</p>
                </span>
                <span>
                    <img src="/thumbs-down.png" alt="" />
                    <p>234</p>
                </span>
                <span>
                    <img src="/tips.png" alt="" onClick={openModel} />
                    {/* <p>234</p> */}
                </span>
            </div>
        </div>
    )
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


export default DaoPage