import React from 'react'
import styles from './daoList.module.scss'
import Nav from '../../components/Nav/';
import { useState, useEffect } from 'react';
import DaoCard from '../../components/DaoCard';
import axios from 'axios';

const API = process.env.API;

function DaoList() {

    const [dao_list, setdao_list] = useState(null);
    const [selectedTab, setselectedTab] = useState('all');

    useEffect(() => {
        let query_category = window.location.href.split('=')[1];
        if (query_category) {
            setselectedTab(query_category.toLowerCase());
        }
        getDaoList();
    }, [])


    const getDaoList = async () => {
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

    console.log(selectedTab)

    if (!dao_list) {
        return (
            <h1>

            </h1>
        )
    }

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
                    ]}
                        selectedTab={'all'} setselectedTab={() => { }}
                    />
                    {/* Second filter */}
                    <Filter list={[
                        'all',
                        'social',
                        'investment',
                        'service',
                        'protocol',
                        'NFT',
                        'marketplace'
                    ]} selectedTab={selectedTab} setselectedTab={setselectedTab} />
                </div>
                <div className={styles.cardCon}>
                    {
                        dao_list.map((ele, idx) => {
                            if (selectedTab == 'all') {
                                return (
                                    <DaoCard
                                        cover={ele.dao_cover}
                                        name={ele.dao_name}
                                        link={ele.slug}
                                        data={ele}
                                        rating={ele.average_rating}
                                        key={'c' + idx + selectedTab} />
                                )
                            } else {

                                if (ele.dao_category.includes(selectedTab)) {
                                    return <DaoCard
                                        cover={ele.dao_cover}
                                        name={ele.dao_name}
                                        link={ele.slug}
                                        data={ele}
                                        rating={ele.average_rating}
                                        key={'c' + idx + selectedTab}
                                    />
                                }
                            }
                        })
                    }
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

function Filter({ list, selectedTab, setselectedTab }) {

    return (
        <div className={styles.filter}>
            <div className={styles.filterHead}>
                <h3>Sort by</h3>
                <p onClick={() => {
                    setselectedTab('all');
                }}>Reset</p>
            </div>
            <div className={styles.filterBody}>
                {
                    list.map((ele, idx) => {
                        return (
                            <span key={"fil" + idx} onClick={() => { setselectedTab(ele) }}>
                                <p>{ele}</p>
                                <button style={(ele == selectedTab) ? { background: 'linear-gradient(90deg, #5e1ed1 0%, #3065f3 100%)' } : {}}>
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


const openNewTab = (url) => {
    if (url.length < 1) return
    let a = document.createElement('a');
    a.target = '_blank';
    a.href = url;
    a.click();
}

export default DaoList