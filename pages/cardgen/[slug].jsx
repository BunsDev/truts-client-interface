import React, { useEffect, useState } from 'react'
import styles from './cardgen.module.scss'
import axios from 'axios'
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
function Comment({ comment, address, rating, profile_img, openModel, data, openConnectWallet, highlight, slug, twitter_slug }) {

    const [wrapText, setwrapText] = useState(true);
    const [ratingLoading, setratingLoader] = useState(false);

    const [thumbsUp, setThumbsUp] = useState(data.thumbs_up);
    const [thumbsDown, setThumbsDown] = useState(data.thumbs_down);


    const giveThumbs = async (type) => {
        console.log("rating ", type)
        let wallet_state = JSON.parse(window.localStorage.getItem('wallet_state'));
        if (!wallet_state) {
            return openConnectWallet(true);
        }
        else {
            setratingLoader(true);
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
        let wallet_state = JSON.parse(window.localStorage.getItem('wallet_state'));
        if (!wallet_state) {
            return openConnectWallet(true)
        }
        try {
            let res = await axios.post(`${API}/review/rate-review`, {
                "review_id": data._id,
                "wallet_address": wallet_state.wallet_address,
                "type": type,
                "chain": wallet_state.chain
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

    let p_img = (profile_img) ? profile_img : "/hero-bg.jpg"
    let cmtStyle = styles.comment
    if (highlight) {
        cmtStyle = cmtStyle + ' ' + styles.highlight
    }
    return (
        <div className={cmtStyle}>
            <div className={styles.profileName}>
                <img style={{ gridArea: 'a' }} src={p_img} alt="" onError={(e) => { e.target.src = '/hero-bg.jpg' }} />
                <h1 onClick={() => {
                    navigator.clipboard.writeText(address);
                }}
                    style={{ cursor: "pointer" }}
                >{address.slice(0, 5) + "..." + address.slice(-4)} </h1>
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

                        giveThumbs('up');
                    }} />
                        <p>{thumbsUp}</p>
                    </> : <><img src="/mini-loader.gif" alt="" /><p> </p></>}
                </span>
                <span>
                    {(!ratingLoading) ? <>
                        <img src="/thumbs-down.png" alt="" onClick={async () => {

                            giveThumbs('down');
                        }} />
                        <p>{thumbsDown}</p>
                    </> : <> <img src="/mini-loader.gif" alt="" /> <p> </p></>}
                </span>
                <span>
                    <img src="/tips.png" alt="" onClick={() => { openModel() }} />
                    <p>{(data.chain == 'sol') ? 'Tip SOL' : 'Tip MATIC'}</p>
                </span>
                {/* <span>
                    <img src="/share.png" alt="" onClick={() => { openNewTab(`http://twitter.com/share?text=Discovering ${data.dao_name} (@${twitter_slug}) on Truts.xyz (@trutsxyz) &url=https://www.truts.xyz/dao/${slug}/${data._id}`) }} />
                </span> */}
            </div>
        </div>
    )
}


// get-review-by-id?rid=${rid}
export default function Index({ ele }) {

    useEffect(() => {
        let body = document.querySelector('body');
        body.style.width = "800px"
        body.style.height = "418px"
        body.style.overflow = "hidden"
    })

    return (
        <div className={styles.cardCon}>
            <Comment key={"comment"}
                comment={ele.review_desc}
                address={ele.public_address}
                rating={ele.rating}
                profile_img={ele.profile_img}
                data={ele}
                openConnectWallet={() => {

                }}
                openModel={() => {

                }}
                slug={""}
                twitter_slug={""} />
        </div>
    )
}

export async function getServerSideProps(ctx) {
    let { slug } = ctx.query
    // Fetch data from external API
    let api_res = await axios.get(`https://7cjecbsr4a.us-west-2.awsapprunner.com/review/get-review-by-id?rid=${slug}`)
    let review = api_res.data;
    // Pass data to the page via props
    return { props: { ele: review } }
}


