import React from 'react'
import styles from './daoList.module.scss'
import Nav from '../../components/Nav/';
import { useState } from 'react';

function index() {
    return (
        <div className={styles.con}>
            <Nav />
            <h1>Our DAO Library</h1>
            <p>Discover our 500+ DAOs across 7 different categories</p>
            <div className={styles.col2}>
                <div className={styles.leftNav}>
                    <Filter list={[
                        'Ratings (High to Low)',
                        'Ratings (Low to High)',
                        'Sort by name (A-Z)'
                    ]} />
                    {/* Second filter */}
                    <Filter list={[
                        'All',
                        'Social',
                        'Investment',
                        'Service',
                        'Protocol',
                        'NFT',
                        'Marketplace'
                    ]} />
                </div>
                <div className={styles.cardCon}>
                    <DaoCard />
                    <DaoCard />
                    <DaoCard />
                    <DaoCard />
                    <DaoCard />
                    <DaoCard />
                    <DaoCard />
                    <DaoCard />
                    <DaoCard />
                    <DaoCard />
                    <DaoCard />
                    <DaoCard />
                </div>
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

function Filter({ list }) {
    const [selected, setSelected] = useState(0);

    return (
        <div className={styles.filter}>
            <div className={styles.filterHead}>
                <h3>Sort by</h3>
                <p>Reset</p>
            </div>
            <div className={styles.filterBody}>
                {
                    list.map((ele, idx) => {
                        return (
                            <span key={"fil" + idx} onClick={() => { setSelected(idx) }}>
                                <p>{ele}</p>
                                <button style={(idx == selected) ? { background: 'linear-gradient(90deg, #5e1ed1 0%, #3065f3 100%)' } : {}}>
                                    <img src="/check.svg" alt="" />
                                </button>
                            </span>
                        )
                    })
                }
            </div>
        </div>
    )
}

function DaoCard() {
    return (
        <div className={styles.daoCard}>
            <img className={styles.cardCover} src="https://assets.hongkiat.com/uploads/minimalist-dekstop-wallpapers/4k/original/14.jpg?3" alt="" />
            <div className={styles.info}>
                <p>Bankless DAO</p>
                <Starrating rating={4} />
                <span className={styles.socialIcon}>
                    <img src="/twitter-grey.png" alt="" />
                    <img src="/discord-grey.png" alt="" />
                    <img src="/web-grey.png" alt="" />
                </span>
            </div>
        </div>
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
                        <img key={"i" + ele} src={img_src} alt="" />
                    )
                })
            }
        </div>
    )
}


export default index