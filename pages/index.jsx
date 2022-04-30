import Head from 'next/head'
import Image from 'next/image'
import styles from './index/index.module.scss'
import Nav from '../components/Nav';
import { useState, useEffect } from 'react';
import axios from 'axios';
import stringSimilarity from "string-similarity";
import ClipboardJS from 'clipboard'

const openNewTab = (url) => {
  if (url.length < 1) return
  let a = document.createElement('a');
  a.target = '_blank';
  a.href = url;
  a.click();
}

const API = process.env.API

export default function Home() {
  const [selectedTab, setselectedTab] = useState('all');
  const [searchVisible, setSearchVisible] = useState(false);
  const [topSearchVisible, settopSearchVisible] = useState(false);

  // data states
  const [daoList, setdaoList] = useState([]);
  const [leaderboard, setleaderboard] = useState([])

  useEffect(() => {
    getDaolistAPI(setdaoList);
    getLeaderboard(setleaderboard)
  }, [])


  useEffect(() => {
    let sec2 = document.querySelector('#sec2');

    window.addEventListener('scroll', (e) => {
      if (sec2.getBoundingClientRect().y < 0) {

        // console.log("transition t");
        settopSearchVisible(true);


      } else {

        // console.log("transition x");
        settopSearchVisible(false);

      }
    })

  }, [])

  const [searchTerm, setsearchTerm] = useState("");

  return (
    <div className={styles.container}>
      <Head>
        <title>DAOverse</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.hero}>
        <Nav data={daoList} topSearchVisible={topSearchVisible} />
        <div className={styles.title}>
          <h3>Review DAOs to</h3>
          <h3 className={styles.titleBlue}>Earn Rewards!</h3>
        </div>
        <p className={styles.subTitle}>Unlock rewards for learning, contributing and reviewing DAOs Anonymously!</p>
        <SearchComp data={daoList} />
      </div>

      <section className={styles.homepage}>
        <div id={'sec2'} className={styles.sec2}>
          <div style={{ gridArea: 'a', background: "url(ha.png)" }} >
            <h3 style={{ width: '270px' }}>Earn <span className={styles.text_red}>cool  rewards</span> for reviewing DAOs</h3>
          </div>
          <div style={{ gridArea: 'b', background: "url(hb.png)" }} >
            <h3 style={{ width: '240px' }}><span className={styles.text_lpurple}>Discover, Join and Contribute</span> to DAOs </h3>
          </div>
          <div style={{ gridArea: 'c', background: "url(hc.png)" }} >
            <h3 style={{ width: '525px' }}>100% fully<span className={styles.text_purple}> On-chain</span> and <span className={styles.text_purple}>Anonymous</span></h3>
          </div>
          <div style={{ gridArea: 'd', background: "url(hd.png)" }} >
            <h3 style={{ width: '525px' }}>Earn tips for your<span className={styles.text_gold}> genuine reviews</span></h3>
          </div>
        </div>

        <div className={styles.sec3}>
          <div className={styles.sec3Title}>
            <h1>Our DAO Library</h1>
            {/* <p>We are adding more DAOs everyday. If you don’t see a DAO below and want us to list it here, </p>
            <p className={styles.blueText}>please submit your request here 🡥</p> */}
          </div>

          <div className={styles.tagtabs} >
            {
              ['all', 'social', 'investment', 'service', 'protocol', 'NFT', 'marketplace']
                .map((tag) => {
                  let class_list = styles.tab;
                  if (tag == selectedTab) { class_list = class_list + ' ' + styles.selected }
                  return (
                    <div key={"t" + tag} onClick={() => {
                      setselectedTab(tag);
                    }} className={class_list}>
                      {tag}
                    </div>
                  )
                })
            }
          </div>

          <div className={styles.daoListContainer}>
            {/* List of daos */}
            {
              daoList.map((ele, idx) => {
                if (selectedTab == 'all') {
                  return (
                    <DaoCard link={ele.slug} data={ele} key={'c' + idx + selectedTab} />
                  )
                } else {
                  if (ele.dao_category.includes(selectedTab)) {
                    return <DaoCard link={ele.slug} data={ele} key={'c' + idx + selectedTab} />
                  }
                }
              })
            }
          </div>
          <button className={styles.seeMoreBtn}>
            See more
          </button>
        </div>

        <div className={styles.leaderboard}>
          <h1 className={styles.leaderboardTitle}>
            Our DAO Leaderboard
          </h1>
          <div className={styles.tableHead}>
            <p className={styles.th1}>Position</p>
            <p className={styles.th2}>Name of the DAO</p>
            <p className={styles.th3}>Ratings</p>
            <p className={styles.th4}>Socials</p>
          </div>
          {
            leaderboard.map((ele, idx) => {
              if (idx < 10) {
                let medal = '/medal-blank.png';

                if (idx == 0) {
                  medal = 'medal-gold.png';
                }
                if (idx == 1) {
                  medal = 'medal-silver.png';
                }
                if (idx == 2) {
                  medal = 'medal-bronze.png';
                }

                return (
                  <div key={"m" + ele.dao_name} className={styles.tableBody}>
                    <span className={styles.tb1} onClick={() => {
                      openNewTab(`${window.location.href}/dao/${ele.slug}`);
                    }}>
                      <p>#{idx + 1}</p>
                      <img src={medal} alt="" />
                    </span>
                    <span className={styles.tb2}
                      onClick={() => {
                        openNewTab(`${window.location.href}/dao/${ele.slug}`);
                      }}
                    >{ele.dao_name}</span>
                    <span className={styles.tb3}><Starrating rating={ele.average_rating} />{<p>(456)</p>}</span>
                    <span className={styles.tb4}>
                      <img onClick={() => { openNewTab(ele.twitter_link) }} src="/twitter-white.png" alt="" />
                      <img onClick={() => { openNewTab(ele.discord_link) }} src="/discord-white.png" alt="" />
                      <img onClick={() => { openNewTab(ele.website_link) }} src="/web-white.png " alt="" />
                    </span>
                  </div>
                )
              }
            })
          }
        </div>
        <div className={styles.reviews}>
          <img className={styles.floathdown} src="/float-thumbs-down.png" alt="" />
          <img className={styles.floathup} src="/float-thumbs-up.png" alt="" />
          <img src="" alt="" />
          <h1 className={styles.reviewTitle}>
            Recent reviews
          </h1>
          <div className={styles.reviewCon}>
            <div className={styles.reviewCard + ' ' + styles.r1}>
              <p>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint.</p>
              <div className={styles.profile}>
                <img className={styles.commaFloat} src="/comma-float.png" alt="" />
                <img style={{ gridArea: 'a' }} className={styles.profileImg} src="https://assets-global.website-files.com/5ec7dad2e6f6295a9e2a23dd/5edfa7c6f978e75372dc332e_profilephoto1.jpeg" alt="" />
                <p>Van Goh</p>
                <p className={styles.dao_name}>Uniswap</p>
                <Starrating rating={4} />
              </div>
            </div>
            <div className={styles.reviewCard + ' ' + styles.r2}>
              <p>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint.</p>
              <div className={styles.profile}>
                <img className={styles.commaFloat} src="/comma-float.png" alt="" />
                <img style={{ gridArea: 'a' }} className={styles.profileImg} src="https://assets-global.website-files.com/5ec7dad2e6f6295a9e2a23dd/5edfa7c6f978e75372dc332e_profilephoto1.jpeg" alt="" />
                <p>Van Goh</p>
                <p className={styles.dao_name}>Uniswap</p>
                <Starrating rating={4} />
              </div>
            </div>
            <div className={styles.reviewCard + ' ' + styles.r3}>
              <p>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint.</p>
              <div className={styles.profile}>
                <img className={styles.commaFloat} src="/comma-float.png" alt="" />
                <img style={{ gridArea: 'a' }} className={styles.profileImg} src="https://assets-global.website-files.com/5ec7dad2e6f6295a9e2a23dd/5edfa7c6f978e75372dc332e_profilephoto1.jpeg" alt="" />
                <p>Van Goh</p>
                <p className={styles.dao_name}>Uniswap</p>
                <Starrating rating={4} />
              </div>
            </div>
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
      </section >
    </div >
  )
}

function SearchComp({ data }) {
  const [searchTerm, setsearchTerm] = useState("");
  const [inputFocus, setinputFocus] = useState(false);

  return (
    <div className={styles.searchComp}>
      <input value={searchTerm} 
      placeholder={'Search your DAO here'}
      type="text" onChange={(e) => { setsearchTerm(e.target.value) }}
        onFocus={() => {
          setinputFocus(true);
        }}
        onBlur={() => {
          setinputFocus(false);
        }}
      />
      <img className={styles.searchIcon} src="search-blue.png" alt="" />
      <div className={styles.suggestionCon}>
        <div className={styles.suggestionCon} key={"home"}>
          {
            (searchTerm.length > 0 && inputFocus) && rankToSearch(searchTerm, data)
          }
        </div>
      </div>
    </div>
  )
}

function DaoCard({ data, link }) {
  let cover = (data.dao_cover) ? data.dao_cover : "https://assets.hongkiat.com/uploads/minimalist-dekstop-wallpapers/4k/original/14.jpg?3";

  return (
    <div className={styles.daoCard} onClick={() => {
      openNewTab(`${window.location.href}/dao/${link}`)
    }}>
      <img className={styles.cardCover} src={cover} alt="" />
      <div className={styles.info}>
        <p>{data.dao_name} <img src="/verified.png" alt="" /> </p>
        <span className={styles.rating}>
          <div className={styles.ratingBox}>
            <p>{"4.0"}</p> <img src="/star-filled.png" alt="" />
          </div>
          <p className={styles.noReviews}>{Math.floor(Math.random() * 100)} reviews</p>
        </span>
        <span className={styles.socialIcon}>
          <img src="/twitter-grey.png" onClick={() => { openNewTab(data.twitter_link) }} alt="" />
          <img src="/discord-grey.png" onClick={() => { openNewTab(data.discord_link) }} alt="" />
          <img src="/web-grey.png" onClick={() => { openNewTab(data.website_link) }} alt="" />
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

// Api calls

//get list of daos
const getDaolistAPI = async (setter) => {
  let url = `${API}/dao/get-dao-list`;
  let res = await axios.get(url);
  console.log(res.data)
  setter(res.data);
}

//get Leaderboard
const getLeaderboard = async (setter) => {
  let url = `${API}/dao/get-dao-list`;
  let res = await axios.get(url);
  console.log(res.data)
  setter(res.data);
}

const rankToSearch = (searchTerm, data) => {
  let List = data.map((ele, idx) => {
    let rank = Math.max(stringSimilarity.compareTwoStrings(searchTerm, ele.dao_name.toLowerCase()), stringSimilarity.compareTwoStrings(searchTerm, ele.dao_name))
    return [rank, idx]
  });

  let ranklist = List.sort((a, b) => { return a[0] - b[0] }).reverse();

  let searchlist = ranklist.map((ele) => {
    return data[ele[1]]
  })

  return searchlist.map((value, idx) => {
    if (idx < 5) {
      return (<div key={value.dao_name}
        className={styles.suggestion}
        onClick={() => { openNewTab(`${window.location.href}/dao/${value.slug}`); }}
      >
        <img style={{ gridArea: "a" }} src={value.dao_logo} alt="" />
        <h1 style={{ gridArea: "b" }}>{value.dao_name}</h1>
        <h2 style={{ gridArea: "c" }}>quick brief about project</h2>
        <p style={{ gridArea: "d" }}>128 reviews</p>
      </div>)
    }
  })
}


