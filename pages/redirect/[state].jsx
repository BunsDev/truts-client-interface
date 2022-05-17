import React, { useState, useEffect } from 'react'
import styles from './daoForm.module.scss'
import Nav from '../../components/Nav'
import axios from 'axios'
import { useRouter } from 'next/router'

const openNewTab = (url) => {
    if (url.length < 1) return
    let a = document.createElement('a');
    a.target = '_blank';
    a.href = url;
    a.click();
}

const API = process.env.API;

function DaoForm() {

    const [id, setid] = useState(null);

    useEffect(() => {
        let cookie = window.getCookie = function (name) {
            var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
            if (match) return match[2];
        }
        let id = cookie('target')
        setid(id);
    }, [])

    const router = useRouter()
    const state = router.query.state

    console.log(state)

    let success = <>
        <img src="/sucess_tick.png" className={styles.sc_tick} alt="" />
        <p>Congratulations! You have successfully submitted . Now sit back and relax. If we need more information, we will reach out to you. Otherwise, you are all set :)</p>

        <span className={styles.btns}>
            <button className={styles.primaryBtn} onClick={() => {
                window.location.href = '../'
            }}>Join Truts Community</button>
            <button onClick={() => {
                id && axios.get(`${API}/dao/redirect?id=${id}&url=${location.href}`).then((res, er) => {
                    location.href = res.data.url
                })
            }}>See Related Reviews</button>
        </span>

    </>

    let failed = <>
        <img src="/oops.png" className={styles.sc_oops} alt="" />
        <p>Oops, something went wrong. Can you please try again :(</p>
        <span className={styles.btns}>
            <button onClick={() => {
                window.location.href = '../'
            }}>Try again</button>
        </span>

    </>


    let duplicate_review = <>
        <img src="/oops.png" className={styles.sc_oops} alt="" />
        <p>Oops, Review already exist by this User</p>
        <span className={styles.btns}>
            <button onClick={() => {
                window.location.href = '../'
            }}>Try again</button>
        </span>

    </>

    if (!state) {
        return (
            <h1>

            </h1>
        )
    }

    return (

        <div className={styles.con}>
            <Nav />
            <div className={styles.messageCon}>
                {(state == 'success') ? success : ((state == 'duplicate_review') ? duplicate_review : failed)}
            </div>
            <div className={styles.footer}>
                <h2 className={styles.footerTitle}>
                    Love what we are doing? Join Truts to build together
                </h2>
                <span className={styles.socialIcon}>
                    <img onClick={() => { openNewTab('https://twitter.com/trutsxyz') }} src="/twitter-grey.png" alt="" />
                    {/* <img src="/discord-grey.png" alt="" /> */}
                    <img onClick={() => { openNewTab('https://truts.xyz') }} src="/web-grey.png" alt="" />
                </span>
                <p className={styles.footerSubTitle}></p>
            </div>
        </div>
    )
}

export default DaoForm