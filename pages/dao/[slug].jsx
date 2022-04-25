import React, { useEffect, useState } from 'react'
import styles from './daoPage.module.scss'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Nav from '../../components/Nav';
import DaoCard from '../../components/DaoCard';
import axios from 'axios'
import { useRouter } from 'next/router'


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
                                    return <span key={"cat" + cat}>{`${cat} DAO`}</span>
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

function Comment({ comment, address, rating, profile_img }) {
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
            {/* <div className={styles.likes}>
                <span>
                    <img src="/thumbs-up.png" alt="" />
                    <p>234</p>
                </span>
                <span>
                    <img src="/thumbs-down.png" alt="" />
                    <p>234</p>
                </span>
            </div> */}
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

export default DaoPage