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
        <p>Thank you for reviewing with us. Join Truts discord community to get exclusive rewards and opportunities.</p>

        <span className={styles.btns}>
            <button className={styles.primaryBtn} onClick={() => {
                openNewTab('https://discord.com/invite/96nAdBJ2Kj');
            }}>Join Truts Community</button>
        </span>

    </>

    let new_dao = <>
        <img src="/sucess_tick.png" className={styles.sc_tick} alt="" />
        <p>Congratulations! You have successfully submitted the application to list your DAO. Now sit back and relax. If we need more information, we will reach out to you. Otherwise, you are all set and you will see your DAO listed in a day or two :)</p>

        <span className={styles.btns}>
            <button className={styles.primaryBtn} onClick={() => {
                openNewTab('https://discord.com/invite/96nAdBJ2Kj');
            }}>Join Truts Community</button>
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

    const getMessage = () => {
        if (state == 'success') {
            return success
        }
        else if (state == 'duplicate_review') {
            return duplicate_review
        }
        else if (state == 'new_dao') {
            return new_dao
        }
        else {
            return failed
        }
    }

    return (

        <div className={styles.con}>
            <Nav />
            <div className={styles.messageCon}>
                {getMessage()}
            </div>
            <div className={styles.footer}>
                <h2 className={styles.footerTitle}>
                    Love what we do? Truts your guts and join us now!
                </h2>
                <span className={styles.socialIcon}>
                    <img onClick={() => { openNewTab('https://twitter.com/trutsxyz') }} src="/twitter-grey.png" alt="" />
                    <img src="/discord-grey.png" alt="" onClick={() => { openNewTab('https://discord.truts.xyz') }} />
                    <img onClick={() => { openNewTab('https://truts.xyz') }} src="/web-grey.png" alt="" />
                </span>
                <p className={styles.footerSubTitle}></p>
            </div>
        </div>
    )
}

export default DaoForm