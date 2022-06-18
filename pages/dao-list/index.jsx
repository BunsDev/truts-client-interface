import React from 'react'
import styles from './daoList.module.scss'
import Nav from '../../components/Nav/';
import { useState, useEffect } from 'react';
import DaoCard from '../../components/DaoCard';
import axios from 'axios';
import Loader from '../../utils/Loader';
import Head from 'next/head'
import Footer from '../../components/Footer'
import Component from '../../components/Footer';

const API = process.env.API;

function DaoList() {


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
                setdao_list(db_res.data.results.sort((a, b) => {
                    return b.review_count - a.review_count
                }))
            }
            else {
                alert("network error");
            }
        }
        catch (er) {
            console.log(er);
        }
    }

    const [selectedSort, setselectedSort] = useState('Sort by Review count');
    const sortBy = (type) => {
        setselectedSort(type)
    }

    const returnDaoList = (dao_list_comp) => {
        // 'Sort by Review count',
        // 'Sort by name (A-Z)',
        // 'Ratings (High to Low)',
        // 'Ratings (Low to High)',
        let sortedDaoList = dao_list;
        if (selectedSort == 'Ratings (Low to High)') {
            sortedDaoList = [...dao_list.sort((a, b) => {
                return b.average_rating - a.average_rating
            }).reverse()]
        }
        else if (selectedSort == 'Ratings (High to Low)') {
            sortedDaoList = [...dao_list.sort((a, b) => {
                return b.average_rating - a.average_rating
            })]
        }
        else if (selectedSort == 'Sort by name (A-Z)') {
            sortedDaoList = [...dao_list.sort((a, b) => {
                return a.slug.charCodeAt(0) - b.slug.charCodeAt(0)
            })]
        }
        else {
            sortedDaoList = [...dao_list.sort((a, b) => {
                return b.review_count - a.review_count
            })]
        }

        return dao_list_comp(sortedDaoList)

    }

    console.log(selectedTab)

    if (!dao_list) {
        return (
            <Loader />
        )
    }

    return (
        <>
            <Head>
                <title>Truts</title>
                <meta name="description" content="Discover web3 communities that vibes with you from a list of thousands of communities across different categories (service, investment, media, social) and know all about them" />
                <link rel="icon" href="/favicon.png" />
            </Head>
            <div className={styles.con}>
                <Nav data={dao_list} topSearchVisible={true} outline={true} />
                <h1 className={styles.title}>Our community library</h1>
                <p className={styles.subText}>Explore our 480+ communities and find the one that fits you</p>
                <div className={styles.m_filters}>
                    <select onChange={(e) => {
                        setselectedTab(e.target.value);
                    }} name="" id="">
                        {[
                            'all', 'Service', 'Investment', 'Social', 'Community', 'Education', 'Media', 'Collector', 'Art', 'Sports', 'Legal'
                        ].map((ele, idx) => {
                            return (
                                <option onClick={() => { sortBy(ele) }} key={ele + idx} value={ele}>{ele}</option>
                            )
                        })
                        }
                    </select>

                    <select name="" id="" onChange={(e) => {
                        sortBy(e.target.value)
                    }}>
                        {[
                            'Sort by Review count',
                            'Sort by name (A-Z)',
                            'Ratings (High to Low)',
                            'Ratings (Low to High)',
                        ].map((ele, idx) => {
                            return (
                                <option onClick={() => { sortBy(ele) }} key={ele + idx} value={ele}>{ele}</option>
                            )
                        })
                        }
                    </select>
                </div>
                <div className={styles.col2}>
                    <div className={styles.leftNav}>
                        <Filter list={[
                            'Sort by Review count',
                            'Sort by name (A-Z)',
                            'Ratings (High to Low)',
                            'Ratings (Low to High)',
                        ]}
                            selectedTab={selectedSort} setselectedTab={sortBy}
                            reset={() => {
                                sortBy('Sort by Review count');
                            }}
                        />
                        {/* Second filter */}
                        <Filter list={[
                            'all', 'Service', 'Investment', 'Social', 'Community', 'Education', 'Media', 'Collector', 'Art', 'Sports', 'Legal'
                        ]} selectedTab={selectedTab} setselectedTab={setselectedTab} reset={() => { setselectedTab('all') }} />
                    </div>

                    <div className={styles.cardCon} key={selectedSort + selectedTab}>
                        {
                            returnDaoList((sortedDaoList) => {
                                return sortedDaoList.map((ele, idx) => {
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
                                })
                            })
                        }
                    </div>
                </div>

            </div >
            <Footer />
        </>
    )
}

function Filter({ list, selectedTab, setselectedTab, reset }) {

    return (
        <div className={styles.filter}>
            <div className={styles.filterHead}>
                <h3>Sort by</h3>
                <p onClick={() => {
                    reset();
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