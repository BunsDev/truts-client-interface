import React, { useState, useEffect } from 'react'
import styles from './daoForm.module.scss'
import Nav from '../../components/Nav'
import axios from 'axios'


let formObject = {
    "dao_name": "string",
    "dao_category": [
        "string"
    ],
    "dao_logo": "string",
    "dao_cover_photo": "string",
    "mission_of_dao": "string",
    "dao_description": "string",
    "discord_link": "string",
    "twitter_link": "string",
    "website_link": "string",
    "mirror_link": "string",
    "additional_link": "string",
    "additional_details": "string"
}

const openNewTab = (url) => {
    if (url.length < 1) return
    let a = document.createElement('a');
    a.target = '_blank';
    a.href = url;
    a.click();
}

function DaoForm() {

    const [formData, setFormData] = useState({});

    const [catInput, setcatInput] = useState('');
    const [daoCatList, setdaoCatList] = useState([]);

    const [imgSrc, setimgSrc] = useState({
        logo: '',
        cover: ''
    })

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


    let formHandler = (e) => {
        setFormData((obj) => {
            obj[e.target.name] = e.target.value;
            return { ...obj }
        })
    }

    const submitForm = async () => {

        // if (!(formData.dao_cover?.length && formData.dao_logo?.length)) {
        //     alert("Please Upload the Cover image and DAO logo");
        //     return null
        // }

        if (!(daoCatList?.length)) {
            alert("Please add DAO category");
            return null
        }
        let url = `${process.env.API}/dao/create-new-dao-v2`
        let res = await axios.post(url, { ...formData, dao_category: daoCatList });
        if (res.status == 201) {
            window.location.href = './redirect/success'
        }
        else {
            window.location.href = './redirect/failed'
        }
        console.log(res);
    }

    useEffect(() => {
        //submitSampleData();
    }, [])



    return (

        <div className={styles.con}>
            <Nav />
            <form className={styles.form} onSubmit={(e) => { e.preventDefault(); submitForm() }}>
                <h1 className={styles.title}>Fill these details to list your Community</h1>
                <p className={styles.subtitle}>Please fill the required information to list your DAO on Truts</p>

                <span className={styles.input}>
                    <p>Name of the Community</p>
                    <input required name={'dao_name'} type="text" onChange={formHandler} />
                </span>

                <span className={styles.input} id={"catlist"}>
                    <p>Category of your DAO (example: Service, Collectors, DeFi) <small>(Enter ` <strong>,</strong> ` to add a Category)</small> </p>
                    <div className={styles.categoryInput}>
                        {
                            <>
                                {
                                    daoCatList.map((ele, idx) => {
                                        return (
                                            <div
                                                onClick={() => {
                                                    setdaoCatList((cl) => {
                                                        return cl.filter(c => (c == ele) ? false : true)
                                                    })
                                                }}
                                                key={"daoTag" + idx} className={styles.catTag}>
                                                {ele}
                                                <div className={styles.close}>
                                                    <img src="/crossmark.png" alt="" />
                                                </div>
                                            </div>
                                        )
                                    })

                                }
                            </>
                        }
                        {(daoCatList.length < 3) && <span className={styles.catInput}>
                            <input placeholder='Category' value={catInput} type="text"
                                onChange={(e) => {
                                    setcatInput(e.target.value);
                                }}
                                onKeyUpCapture={(e) => {
                                    if (e.key == ',' || e.key == 'Enter') {

                                        setdaoCatList((list) => {
                                            let item = catInput;
                                            if (e.key == ',') {
                                                item = item.slice(0, -1);
                                            }
                                            if (item.length < 1) return [...list]
                                            list = [...list, item];
                                            return [...list]
                                        })
                                        setcatInput('');
                                    }
                                }}
                            />
                        </span>}
                    </div>
                </span>

                <span className={styles.input}>
                    <p>Whats your community`s mission statement?</p>
                    <input required name={'dao_mission'} placeholder='Please keep it within 1 or 2 lines' type="text" onChange={formHandler} />
                </span>

                <span className={styles.input}>
                    <p>A brief description of the community</p>
                    <textarea required name={'description'} placeholder='Please keep it within 1 or 2 lines' type="text" onChange={formHandler} />
                </span>

                <div className={styles.fourCfourR}>
                    <span className={styles.input}>
                        <p>Discord link</p>
                        <input required name={'discord_link'} placeholder='Paste it here, it will link automatically' type="text" onChange={formHandler} />
                    </span>
                    <span className={styles.input}>
                        <p>Twitter link</p>
                        <input required name={'twitter_link'} placeholder='Paste it here, it will link automatically' type="text" onChange={formHandler} />
                    </span>
                    <span className={styles.input}>
                        <p>Website link</p>
                        <input required name={'website_link'} placeholder='Paste it here, it will link automatically' type="text" onChange={formHandler} />
                    </span>
                    <span className={styles.input}>
                        <p>Mirror link</p>
                        <input required name={'mirror_link'} placeholder='Paste it here, it will link automatically' type="text" onChange={formHandler} />
                    </span>
                </div>

                <span name={'website_link'} className={styles.input}>
                    <p>Discord guild ID</p>
                    <input name={'guild_id'} placeholder='Paste it here, it will link automatically' type="text" onChange={formHandler} />
                </span>

                {/* <span className={styles.input}>
                    <p>Slug</p>
                    <input placeholder='Paste it here, it will link automatically' type="text" />
                </span> */}

                <button type='submit' className={styles.submit}>Submit</button>

            </form>

            <div className={styles.footer}>
                <h2 className={styles.footerTitle}>
                    Love what we do? Truts your guts and join us now!
                </h2>
                <span className={styles.socialIcon}>
                    <img onClick={() => { openNewTab('https://twitter.com/trutsxyz') }} src="/twitter-grey.png" alt="" />
                    <img src="/discord-grey.png" onClick={() => { openNewTab('https://discord.truts.xyz') }} alt="" />
                    <img onClick={() => { openNewTab('https://truts.xyz') }} src="/web-grey.png" alt="" />
                </span>
                <p className={styles.footerSubTitle}></p>
            </div>
        </div>
    )
}


export default DaoForm