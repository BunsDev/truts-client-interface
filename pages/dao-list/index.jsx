import React from 'react'
import styles from './daoList.module.scss'
import Nav from '../../components/Nav/';
import { useState, useEffect } from 'react';
import DaoCard from '../../components/DaoCard';
import axios from 'axios';
import Loader from '../../utils/Loader';

const API = process.env.API;

function DaoList() {

    const [dao_list, setdao_list] = useState(null);
    const [selectedTab, setselectedTab] = useState('all');

    useEffect(() => {
        let query_category = window.location.href.split('=')[1];
        if (query_category) {
            setselectedTab(query_category);
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
            <Loader />
        )
    }

    return (
        <div className={styles.con}>
            <Nav />
            <h1 className={styles.title}>Our community library</h1>
            <p className={styles.subText}>Explore our 300+ communities and find the one that fits you</p>
            <div className={styles.m_filters}>
                <select onChange={(e) => {
                    setselectedTab(e.target.value);
                }} name="" id="">
                    {[
                        'all', 'Service', 'Investment', 'Social', 'Community', 'Education', 'Media', 'Collector', 'Art', 'Sports', 'Legal'
                    ].map((ele, idx) => {
                        return (
                            <option key={ele + idx} value={ele}>{ele}</option>
                        )
                    })
                    }
                </select>

                <select name="" id="">
                    {[
                        'Ratings (High to Low)',
                        'Ratings (Low to High)',
                        'Sort by name (A-Z)'
                    ].map((ele, idx) => {
                        return (
                            <option key={ele + idx} value={ele}>{ele}</option>
                        )
                    })
                    }
                </select>
            </div>
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
                        'all', 'Service', 'Investment', 'Social', 'Community', 'Education', 'Media', 'Collector', 'Art', 'Sports', 'Legal'
                    ]} selectedTab={selectedTab} setselectedTab={setselectedTab} />
                </div>

                <div className={styles.cardCon}>
                    {
                        dao_list.map((ele, idx) => {
                            if (selectedTab == 'all') {
                                return (
                                    <DaoCard
                                        link={ele.slug}
                                        data={ele}
                                        key={'c' + idx + selectedTab}
                                    />
                                )
                            } else {

                                if (ele.dao_category.includes(selectedTab)) {
                                    return <DaoCard
                                        link={ele.slug}
                                        data={ele}
                                        key={'c' + idx + selectedTab}
                                    />
                                }
                            }
                        }).reverse()
                    }
                </div>
            </div>
            <div className={styles.footer}>
                <h2 className={styles.footerTitle}>
                    Love what we do? Truts your guts and join us now!
                </h2>
                <span className={styles.socialIcon}>
                    <img onClick={() => { openNewTab('https://twitter.com/trutsxyz') }} src="/twitter-grey.png" alt="" />
                    {/* <img src="/discord-grey.png" alt="" /> */}
                    <img onClick={() => { openNewTab('https://truts.xyz') }} src="/web-grey.png" alt="" />
                </span>
                <p className={styles.footerSubTitle}></p>
            </div>
        </div >
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