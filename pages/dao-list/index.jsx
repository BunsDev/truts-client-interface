import React from 'react'
import styles from './daoList.module.scss'
import Nav from '../../components/Nav/';
import { useState, useEffect } from 'react';
import DaoCard from '../../components/DaoCard';
import axios from 'axios';
import Loader from '../../utils/Loader';
import Head from 'next/head'
import Footer from '../../components/Footer'

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

    const [selectedSort, setselectedSort] = useState('_');
    const sortBy = (type) => {
        console.log(type)
        let filters = [
            'Ratings (High to Low)',
            'Ratings (Low to High)',
            'Sort by name (A-Z)'
        ]

        let selection = filters.indexOf(type);
        setselectedSort(type)
        if (selection == 0) {
            setdao_list((ele) => {
                return [...ele.sort((a, b) => {
                    return b.average_rating - a.average_rating
                })]
            })
        }
        else if (selection == 1) {
            setdao_list((ele) => {
                return [...ele.sort((a, b) => {
                    return b.average_rating - a.average_rating
                }).reverse()]
            })
        }
        else if (selection == 2) {
            setdao_list((ele) => {
                return [...ele.sort((a, b) => {
                    return a.slug.charCodeAt(0) - b.slug.charCodeAt(0)
                })]
            })
        }
        else {
            setdao_list((ele) => {
                return [...ele.sort((a, b) => {
                    return b.review_count - a.review_count
                })]
            })
        }
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
                            'Ratings (High to Low)',
                            'Ratings (Low to High)',
                            'Sort by name (A-Z)'
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
                            'Ratings (High to Low)',
                            'Ratings (Low to High)',
                            'Sort by name (A-Z)'
                        ]}
                            selectedTab={selectedSort} setselectedTab={sortBy}
                            reset={() => {
                                sortBy('default');
                            }}
                        />
                        {/* Second filter */}
                        <Filter list={[
                            'all', 'Service', 'Investment', 'Social', 'Community', 'Education', 'Media', 'Collector', 'Art', 'Sports', 'Legal'
                        ]} selectedTab={selectedTab} setselectedTab={setselectedTab} reset={() => { setselectedTab('all') }} />
                    </div>

                    <div className={styles.cardCon} key={selectedSort + selectedTab}>
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