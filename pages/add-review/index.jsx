
import styles from './review.module.scss'
import { useEffect, useState } from 'react';
import DaoCard from '../../components/DaoCard';
import Nav from '../../components/Nav';
import axios from 'axios';
import { useRouter } from 'next/router'

const API = process.env.API

export default function Index() {

    const [reviewDesc, setreviewDesc] = useState('');
    const [tc, settc] = useState(false);
    const [data, setdata] = useState(null);
    const [dao_list, setdao_list] = useState(null);

    useEffect(() => {
        let cookie = window.getCookie = function (name) {
            var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
            if (match) return match[2];
        }
        getDetails(cookie)
    }, [])


    const getDetails = async (cookie) => {
        let id = cookie('target')
        let guild_list = window.location.href.split('=')[1];
        guild_list = guild_list.split(',');

        try {
            let res = await axios.get(`${process.env.API}/dao/get-dao-by-id?id=${id}`);
            //console.log(guild_list);
            console.log(res.data.data.guild_id);
            if (id) {
                if (guild_list.includes(res.data.data.guild_id)) {
                    setdata(res.data.data);
                }
                else {
                    alert("Please join the Discord");
                }
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

    useEffect(() => {
        setformData((f) => {
            f['review_desc'] = reviewDesc;
            return { ...f }
        })
    }, [reviewDesc])

    const [formData, setformData] = useState({
        "rating": 0,
        "review_desc": "string",
        "resonate_vibes_rate": 0,
        "onboarding_exp": 0,
        "opinions_matter": 0,
        "great_org_structure": 0,
        "friend_recommend": 0,
        "great_incentives": 0,
    })

    console.log(formData);

    if (!data) {
        return (
            <h1></h1>
        )
    }


    if (!dao_list) {
        return (
            <h1>

            </h1>
        )
    }

    return (
        <>
            <div className={styles.addReview}>
                <Nav />
                <div>
                    <div className={styles.breadCrum}>
                        <img src="left-arrow.png" alt="" />
                        <span>
                            <p>Add review for</p>
                            <h3>{data.dao_name}</h3>
                        </span>
                    </div>
                    <div className={styles.reviewForm}>

                        <p className={styles.title}>Rate your experience</p>
                        <Rating
                            setrating={(rating) => {
                                setformData((f) => {
                                    f['rating'] = rating;
                                    return { ...f };
                                })
                            }}
                        />
                        <div className={styles.desc}>
                            <p className={styles.title}>Tell us about your experience</p>
                            <textarea
                                value={reviewDesc}
                                onChange={(e) => {
                                    setreviewDesc(e.target.value)
                                }} placeholder='This is where you will write your review. Explain what happened, and leave out offensive words. Keep your feedback honest, helpful and constructive.' name="" id="" cols="30" rows="10"></textarea>
                        </div>
                        <div className={styles.dialCon}>
                            <p className={styles.title}>Please rate the following experiences</p>
                            <div className={styles.col}>
                                <div className={styles.c1}>
                                    <div className={styles.dial}>
                                        <p className={styles.dialTitle}>Do you resonate with the vibes in the DAO community?</p>
                                        <SliderComp
                                            setter={(value) => {
                                                setformData((f) => {
                                                    f['resonate_vibes_rate'] = value;
                                                    return { ...f };
                                                })
                                            }}
                                        />
                                    </div>
                                    <div className={styles.dial}>
                                        <p className={styles.dialTitle}>Do you believe your opinions matter in the DAO community?</p>
                                        <SliderComp
                                            setter={(value) => {
                                                setformData((f) => {
                                                    f['opinions_matter'] = value;
                                                    return { ...f };
                                                })
                                            }}
                                        />
                                    </div>
                                    <div className={styles.dial}>
                                        <p className={styles.dialTitle}>Would you recommed this DAO/community to your friend?</p>
                                        <SliderComp
                                            setter={(value) => {
                                                setformData((f) => {
                                                    f['friend_recommend'] = value;
                                                    return { ...f };
                                                })
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className={styles.c2}>
                                    <div className={styles.dial}>
                                        <p className={styles.dialTitle}>How would you rate the DAO’s onboarding experience?</p>
                                        <SliderComp
                                            setter={(value) => {
                                                setformData((f) => {
                                                    f['onboarding_exp'] = value;
                                                    return { ...f };
                                                })
                                            }}
                                        />
                                    </div>
                                    <div className={styles.dial}>
                                        <p className={styles.dialTitle}>Do you think that DAO has great organizational structure?</p>
                                        <SliderComp
                                            setter={(value) => {
                                                setformData((f) => {
                                                    f['great_org_structure'] = value;
                                                    return { ...f };
                                                })
                                            }}
                                        />
                                    </div>
                                    <div className={styles.dial}>
                                        <p className={styles.dialTitle}>Do you think there are great incentives for DAO members?</p>
                                        <SliderComp
                                            setter={(value) => {
                                                setformData((f) => {
                                                    f['great_incentives'] = value;
                                                    return { ...f };
                                                })
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.tc}>
                                <input value={tc} onChange={() => {
                                    settc(!tc);
                                }} className={styles.checkbox} type="checkbox" />
                                <p>I confirm this review is about my own genuine experience. I am eligible to leave this review, and have not been offered any incentive or payment to leave a review for this company.</p>
                            </div>
                            <button className={styles.btnFilled} onClick={() => {
                                tc && postReview(formData, data.dao_name, data.guild_id);
                            }} >Post the review</button>
                        </div>
                    </div>
                </div>

                <div className={styles.rightSidebar}>
                    <h3>Recent reviews</h3>
                    <div className={styles.scrollBar}>
                        <div className={styles.reviewCard + ' ' + styles.r1}>
                            <p>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint.</p>
                            <div className={styles.profile}>
                                <img className={styles.commaFloat} src="/comma-float.png" alt="" />
                                <img style={{ gridArea: 'a' }} className={styles.profileImg} src="https://assets-global.website-files.com/5ec7dad2e6f6295a9e2a23dd/5edfa7c6f978e75372dc332e_profilephoto1.jpeg" alt="" />
                                <p>Van Goh</p>
                                <Starrating rating={4} />
                            </div>
                        </div>
                        <div className={styles.reviewCard + ' ' + styles.r1}>
                            <p>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint.</p>
                            <div className={styles.profile}>
                                <img className={styles.commaFloat} src="/comma-float.png" alt="" />
                                <img style={{ gridArea: 'a' }} className={styles.profileImg} src="https://assets-global.website-files.com/5ec7dad2e6f6295a9e2a23dd/5edfa7c6f978e75372dc332e_profilephoto1.jpeg" alt="" />
                                <p>Van Goh</p>
                                <Starrating rating={4} />
                            </div>
                        </div>
                        <div className={styles.reviewCard + ' ' + styles.r1}>
                            <p>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint.</p>
                            <div className={styles.profile}>
                                <img className={styles.commaFloat} src="/comma-float.png" alt="" />
                                <img style={{ gridArea: 'a' }} className={styles.profileImg} src="https://assets-global.website-files.com/5ec7dad2e6f6295a9e2a23dd/5edfa7c6f978e75372dc332e_profilephoto1.jpeg" alt="" />
                                <p>Van Goh</p>
                                <Starrating rating={4} />
                            </div>
                        </div>
                        <div className={styles.reviewCard + ' ' + styles.r1}>
                            <p>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint.</p>
                            <div className={styles.profile}>
                                <img className={styles.commaFloat} src="/comma-float.png" alt="" />
                                <img style={{ gridArea: 'a' }} className={styles.profileImg} src="https://assets-global.website-files.com/5ec7dad2e6f6295a9e2a23dd/5edfa7c6f978e75372dc332e_profilephoto1.jpeg" alt="" />
                                <p>Van Goh</p>
                                <Starrating rating={4} />
                            </div>
                        </div>
                        <div className={styles.reviewCard + ' ' + styles.r1}>
                            <p>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint.</p>
                            <div className={styles.profile}>
                                <img className={styles.commaFloat} src="/comma-float.png" alt="" />
                                <img style={{ gridArea: 'a' }} className={styles.profileImg} src="https://assets-global.website-files.com/5ec7dad2e6f6295a9e2a23dd/5edfa7c6f978e75372dc332e_profilephoto1.jpeg" alt="" />
                                <p>Van Goh</p>
                                <Starrating rating={4} />
                            </div>
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
                        <img key={"i" + ele} src={img_src} alt=""
                        />
                    )
                })
            }
        </div>
    )
}


function SliderComp({ setter }) {
    const [sliderValue, setsliderValue] = useState(50);

    useEffect(() => {
        setter(sliderValue);
    }, [sliderValue])

    return (
        <div className={styles.slider}>
            <span className={styles.sliderComp}>
                <div
                    className={styles.sliderBarBg} />
                <div
                    style={{ width: `${Math.min(sliderValue, 97)}%` }}
                    className={styles.sliderBar} />
                <input type="range"
                    min="0" max="100" step="1"
                    value={sliderValue}
                    onChange={(e) => {
                        setsliderValue(parseInt(e.target.value));
                    }}
                />
            </span>
            <p className={styles.value} >{sliderValue}%</p>
        </div>
    )
}

function Rating({ setrating }) {
    const [rating, setRating] = useState(0);
    const [saveRating, setSaveRating] = useState(0);
    const [hover, sethover] = useState(false);

    useEffect(() => {
        setrating(rating);
    }, [rating])

    return (
        <div className={styles.ratingComp}>
            {
                [1, 2, 3, 4, 5].map((ele) => {
                    let img_src = '/star-blank.png';
                    if (ele <= rating) {
                        img_src = '/star-filled.png';
                    }
                    return (
                        <img
                            key={"st" + ele}
                            src={img_src} alt=""
                            onMouseEnter={(e) => {
                                setRating(ele)
                            }}
                            onClick={() => {
                                setSaveRating(ele);
                            }}
                            onMouseLeave={() => {
                                if (rating != saveRating) {
                                    setRating(saveRating);
                                }
                            }}
                        />
                    )
                })
            }
        </div>
    )
}

//Post review


const openMetaMask = async () => {
    let wallet = window.localStorage.getItem('wallet');
    if (!wallet) {
        let ethereum = window.ethereum
        let accounts = await ethereum.request({ method: 'eth_requestAccounts' })
        console.log(accounts);
        window.localStorage.setItem('wallet', accounts[0]);
        wallet = accounts[0];
    }
    return wallet
}


const postReview = async (formData, dao_name, guild_id) => {
    let public_address = await openMetaMask();
    console.log("Review Post started");
    let postData = {
        ...formData,
        "dao_name": dao_name,
        "guild_id": guild_id,
        "public_address": public_address,
    }
    window.location.href = `${API}/review/add-review?data=${JSON.stringify(postData)}`
}

/* 
question format

1 4
2 5
3 6

*/