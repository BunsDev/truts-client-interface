import React, { useState, useEffect } from 'react'
import styles from './daoForm.module.scss'
import Nav from '../../components/Nav'
import axios from 'axios'
import { useRouter } from 'next/router'



function DaoForm() {


    const router = useRouter()
    const state = router.query.state

    let success = <>
        <img src="/sucess_tick.png" className={styles.sc_tick} alt="" />
        <p>Congratulations! You have successfully submitted . Now sit back and relax. If we need more information, we will reach out to you. Otherwise, you are all set :)</p>
        <button onClick={() => {
            window.location.href = '../'
        }}>Explore DAOverse</button>
    </>

    let failed = <>
        <img src="/oops.png" className={styles.sc_oops} alt="" />
        <p>Oops, something went wrong. Can you please try again :(</p>
        <button onClick={() => {
            window.location.href = '../'
        }}>Try again</button>
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
                {(state == 'success') ? success : failed}
            </div>
            <div className={styles.footer}>
                <h2 className={styles.footerTitle}>
                    Love what we are doing? Join DAOverse to build together
                </h2>
                <span className={styles.socialIcon}>
                    <img src="/twitter-grey.png" alt="" />
                    <img src="/discord-grey.png" alt="" />
                    <img src="/web-grey.png" alt="" />
                </span>
                <p className={styles.footerSubTitle}>or email us at: xyz@daoverse.com</p>
            </div>
        </div>
    )
}

export default DaoForm