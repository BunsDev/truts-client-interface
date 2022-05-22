import Head from 'next/head'
import Image from 'next/image'
import styles from './index/index.module.scss'
import Nav from '../components/Nav';
import { useState, useEffect,useCallback } from 'react';
import axios from 'axios';
import stringSimilarity from "string-similarity";
import ClipboardJS from 'clipboard'
import DaoCard from '../components/DaoCard';
import Loader from '../utils/Loader';
import _ from 'lodash'
 
//import addSampleData from './../addSampleData'
//build
const openNewTab = (url) => {
  if (url.length < 1) return
  let a = document.createElement('a');
  a.target = '_blank';
  a.href = url;
  a.click();
}

const API = process.env.API
const CATEGORY_LIST = ['all', 'Service', 'Investment', 'Social', 'Community', 'Education', 'Media', 'Collector', 'Art', 'Sports', 'Event']


export default function Home({ daoList_ssr, leaderboard_ssr }) {

  const [selectedTab, setselectedTab] = useState('all');
  const [topSearchVisible, settopSearchVisible] = useState(false);

  //data states
  const [daoList, setdaoList] = useState(daoList_ssr);
  const [leaderboard, setleaderboard] = useState(leaderboard_ssr)

  useEffect(() => {
    getDynamicCategoryDaoList(setdaoList);
  }, [])

  useEffect(() => {
    //Floating search bar
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

  }, [daoList])

  return (
    <>
      {(daoList.length < 1) && <Loader />}
      <div className={styles.container_desktop}>
        <Head>
          <title>Truts</title>
          <meta name="description" content="discover web3 communities effectively" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.hero}>
          <Nav data={daoList} topSearchVisible={topSearchVisible} />
          <div className={styles.title}>
            <h3>Review web3 communities,</h3>
            <h3 className={styles.titleBlue}>Earn Rewards!</h3>
          </div>
          <p className={styles.subTitle}>Discover cool communities Learn, Contribute and Earn with communities you love and Truts</p>
          <SearchComp data={daoList} />
        </div>

        <section className={styles.homepage}>
          <div id={'sec2'} className={styles.sec2}>
            <div className={styles.r1} style={{ backgroundColor: "#121212" }} >
              <span>
                <h3 style={{ color: "#EB6079" }} >400+</h3>
                <p>Communities listed and verified</p>
              </span>

              <span style={{
                border: "1.25px solid #3f3f3f8d", padding: "0 50px", borderTopColor: "#121212",
                borderBottomColor: "#121212",
              }} >
                <h3 style={{ color: "#E1BA9D" }}>1000+</h3>
                <p>Reviews Posted and Counting</p>
              </span>

              <span>
                <h3 style={{ color: "#C09DFF" }}>500+</h3>
                <p>Individuals joined Web3 using Truts</p>
              </span>
            </div>
            <div className={styles.r2} >
              <span style={{ backgroundImage: "url('/d_daoinfo_1.png')" }}>
                <h3>100% fully <span className={styles.text_purple}>On-chain, Anonymous</span> and Gasless</h3>
              </span>
              <span style={{ backgroundImage: "url('/d_daoinfo_2.png')" }}>
                <h3>Earn tips for your <span className={styles.text_gold}>genuine reviews</span></h3>
              </span>
              <span style={{ backgroundImage: "url('/d_daoinfo_3.png')" }}>
                <h3><span className={styles.text_lpurple}>Discover, Join and Contribute</span>to DAOs</h3>
              </span>
            </div>
          </div>

          <div className={styles.sec3}>
            <div className={styles.sec3Title}>
              <h1>Our wall of communities</h1>
              {/* <p>We are adding more DAOs everyday. If you don’t see a DAO below and want us to list it here, </p>
            <p className={styles.blueText}>please submit your request here 🡥</p> */}
            </div>

            <div className={styles.tagtabs} >
              {
                CATEGORY_LIST
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
                daoList[selectedTab].map((ele, idx) => {
                  return (
                    <DaoCard link={ele.slug} data={ele} key={'c' + idx + selectedTab} />
                  )
                }).splice(0, 20)
              }
            </div>
            {<button className={styles.seeMoreBtn} onClick={() => {
              openNewTab(`${location.href.split('/')[0]}/dao-list`);
            }}>
              See more
            </button>}
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
              leaderboard.map((elex, idx) => {
                if (idx < 10) {
                  let medal = '/medal-blank.png';
                  let ele = elex;
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
                      <span className={styles.tb3}><Starrating rating={ele.average_rating} />{<p>({ele.review_count})</p>}</span>
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
                <p>SuperteamDAO is a crazy community, being build by crazy people, helping Web3 flourish alll around, making solana a global enabler for web3. Super cool floks backing super cool projects. Definitely community to be part off. 🚀🚀</p>
                <div className={styles.profile}>
                  <img className={styles.commaFloat} src="/comma-float.png" alt="" />
                  <img style={{ gridArea: 'a' }} className={styles.profileImg} src="/hero-bg.jpg" alt="" />
                  <p>0x...f4b1</p>
                  <p className={styles.dao_name}>SuperteamDAO</p>
                  <Starrating rating={5} />
                </div>
              </div>
              <div className={styles.reviewCard + ' ' + styles.r2}>
                <p>Yooo Memers, The OG Lords of memes at one place. Crazy community for crazy people. Find your vibe here at one place. Post memes and engage and share it with memers... Definitely a place to be for the🚀 folks..</p>
                <div className={styles.profile}>
                  <img className={styles.commaFloat} src="/comma-float.png" alt="" />
                  <img style={{ gridArea: 'a' }} className={styles.profileImg} src="/hero-bg.jpg" alt="" />
                  <p>0x...e631</p>
                  <p className={styles.dao_name}>MemeDAO</p>
                  <Starrating rating={4} />
                </div>
              </div>
              <div className={styles.reviewCard + ' ' + styles.r3}>
                <p>I joined the BanklessDAO discord in December last year and was initially intimidated by the number of channels there, which is why I just left it as is. Meanwhile, as I had been reading their State of DAO newsletter and following all the activities on Twitter, I decided to give it another shot and took up the First Quest onboarding sequence on discord...</p>
                <div className={styles.profile}>
                  <img className={styles.commaFloat} src="/comma-float.png" alt="" />
                  <img style={{ gridArea: 'a' }} className={styles.profileImg} src="/hero-bg.jpg" alt="" />
                  <p>0x...df60</p>
                  <p className={styles.dao_name}>Bankless DAO</p>
                  <Starrating rating={5} />
                </div>
              </div>
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

        </section >
      </div >
      <div className={styles.container_mobile}>
        <Nav data={daoList} topSearchVisible={topSearchVisible} />
        <div className={styles.m_hero}>
          <div className={styles.title}>
            <h3>Review web3 communities,</h3>
            <h3 className={styles.titleBlue}>Earn Rewards!</h3>
            <p className={styles.subTitle}>Discover cool communities; Learn, Contribute and Earn with communities you love and Truts</p>
            <SearchComp data={daoList} />
          </div>
        </div>
        <div className={styles.infoCards}>
          <div className={styles.infoCard}
            style={{ backgroundImage: "url('/m_daoinfo_1.png')" }}
          />
          <div className={styles.infoCard}
            style={{ backgroundImage: "url('/m_daoinfo_2.png')" }}
          />
          <div className={styles.infoCard}
            style={{ backgroundImage: "url('/m_daoinfo_3.png')" }}
          />
        </div>
        <div className={styles.m_daoListContainer}>
          <h1>Our wall of communities</h1>
          <select onChange={(e) => {
            setselectedTab(e.target.value)
          }} >
            {
              CATEGORY_LIST.map((ele, idx) => {
                return (
                  <option key={"idx" + idx} value={ele}>{ele}</option>
                )
              })
            }
          </select>
          <div className={styles.m_daoList}>
            {
              daoList[selectedTab].map((ele, idx) => {
                return (
                  <DaoCard link={ele.slug} data={ele} key={'c' + idx + selectedTab} />
                )
              }).splice(0, 20)
            }
            {<button className={styles.seeMoreBtn} onClick={() => {
              openNewTab(`${location.href.split('/')[0]}/dao-list`);
            }}>
              See more
            </button>}
          </div>
          <h1>Our DAO Leaderboard</h1>
          <div className={styles.leaderboard}>
            {
              leaderboard.map((ele, idx) => {
                let medal;
                switch (idx) {
                  case 0: medal = "/medal-gold.png"; break;
                  case 1: medal = "/medal-silver.png"; break;
                  case 2: medal = "/medal-bronze.png"; break;
                  case 3: medal = "/4-medal.png"; break;
                  case 4: medal = "/5-medal.png"; break;
                  default: "/medal-blank.png"
                }
                return (
                  <div key={idx + "l"} className={styles.m_leaderboard_row}>
                    <span className={styles.m_leaderboardEntry} onClick={() => {
                      openNewTab(`${window.location.href}/dao/${ele.slug}`);
                    }}>
                      <img style={{ gridArea: "a" }} className={styles.medal} src={medal} alt="" />
                      <h3>{ele?.dao_name}</h3>
                      <Starrating rating={ele.average_rating} />
                      <p className={styles.noReviews} >({ele?.review_count})</p>
                    </span>
                  </div>
                )
              }).splice(0, 5)
            }
          </div>
          <h1>Recent Reviews</h1>
          <div className={styles.recentReviews}>
            <div className={styles.reviewCard + ' ' + styles.r1}>
              <p>SuperteamDAO is a crazy community, being build by crazy people, helping Web3 flourish alll around, making solana a global enabler for web3. Super cool floks backing super cool projects. Definitely community to be part off. 🚀🚀</p>
              <div className={styles.profile}>
                <img className={styles.commaFloat} src="/comma-float.png" alt="" />
                <img style={{ gridArea: 'a' }} className={styles.profileImg} src="/hero-bg.jpg" alt="" />
                <p>0x...f4b1</p>
                <p className={styles.dao_name}>SuperteamDAO</p>
                <Starrating rating={5} />
              </div>
            </div>
            <div className={styles.reviewCard + ' ' + styles.r2}>
              <p>Yooo Memers, The OG Lords of memes at one place. Crazy community for crazy people. Find your vibe here at one place. Post memes and engage and share it with memers... Definitely a place to be for GFD🚀 folks..</p>
              <div className={styles.profile}>
                <img className={styles.commaFloat} src="/comma-float.png" alt="" />
                <img style={{ gridArea: 'a' }} className={styles.profileImg} src="/hero-bg.jpg" alt="" />
                <p>0x...e631</p>
                <p className={styles.dao_name}>MemeDAO</p>
                <Starrating rating={4} />
              </div>
            </div>
            <div className={styles.reviewCard + ' ' + styles.r3}>
              <p>I joined the BanklessDAO discord in December last year and was initially intimidated by the number of channels there, which is why I just left it as is. Meanwhile, as I had been reading their State of DAO newsletter and following all the activities on Twitter, I decided to give it another shot...</p>
              <div className={styles.profile}>
                <img className={styles.commaFloat} src="/comma-float.png" alt="" />
                <img style={{ gridArea: 'a' }} className={styles.profileImg} src="/hero-bg.jpg" alt="" />
                <p>0x...DF60</p>
                <p className={styles.dao_name}>Bankless DAO</p>
                <Starrating rating={5} />
              </div>
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
        </div>
      </div>
    </>
  )
}

//SSR DATA HOME PAGE
export async function getServerSideProps(ctx) {
  // Fetch data from external API
  let res = await Promise.all(
    [getDaolistAPI(), getLeaderboard()]
  )
  // Pass data to the page via props
  return { props: { daoList_ssr: res[0], leaderboard_ssr: res[1] } }
}

// API CALLS

//get list of daos
const getDaolistAPI = async (setter) => {
  //gets initial 20 doas
  let url = `${API}/dao/get-dao-list?limit=20&page=1`;
  let res = await axios.get(url);
  let dao_data_obj = {};
  CATEGORY_LIST.forEach((ele) => {
    dao_data_obj[ele] = [];
  })
  dao_data_obj['all'] = res.data.results
  return dao_data_obj;
}

//get Leaderboard
const getLeaderboard = async (setter) => {
  let url = `${API}/dao/leaderboard`;
  let res = await axios.get(url);
  //console.log(res.data)
  return res.data
}

//get 20 Dynamic category based Daos  

const getDynamicCategoryDaoList = async (setter) => {
  CATEGORY_LIST.forEach((cat) => {
    if (cat == 'all') return
    let url = `${API}/dao/similar?category=${cat}&page=1&limit=20`;
    axios.get(url).then((res) => {
      setter((prev) => {
        prev[cat] = res.data.results;
        return { ...prev }
      })
    });
  })
}


function SearchComp() {
  const [searchTerm, setsearchTerm] = useState("");
  const [inputFocus, setinputFocus] = useState(false);

  const [data, setdata] = useState([]);

  const fetchData = async (term) => {
    if(!(term.length > 0)) return
    console.log('search --> ', term)
    let res = await axios.get(`${API}/search/${term}`);
    (res.data.length > 0) && setdata([...res.data]);
  }

  let throttleFetch = useCallback(
    _.debounce(term => fetchData(term),100),
    [],
  )

  return (
    <div className={styles.searchComp}>
      <input value={searchTerm}
        placeholder={'Search your DAO here'}
        type="text" onChange={(e) => { setsearchTerm(e.target.value); throttleFetch(e.target.value) }}
        onFocus={() => {
          setinputFocus(true);
        }}
        onBlur={() => {
          setTimeout(() => { setinputFocus(false) }, 500)
        }}
      />
      <img className={styles.searchIcon} src="search-blue.png" alt="" />
      <div className={styles.suggestionCon}>
        <div className={styles.suggestionCon} key={"home"}>
          {
            (searchTerm.length > 0 && inputFocus) && <RankToSearch data={data} />
          }
        </div>
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


const RankToSearch = ({ data }) => {
  if (data?.length < 0) {
    return []
  }

  return data.map((value, idx) => {
    if (idx < 5) {
      return (<div key={value.dao_name}
        className={styles.suggestion}
        onClick={() => { openNewTab(`${window.location.href}/dao/${value.slug}`); }}
      >
        <img style={{ gridArea: "a" }} src={value.dao_logo} alt="" />
        <h1 style={{ gridArea: "b" }}>{value.dao_name}</h1>
        <h2 className={styles.sug_desc} style={{ gridArea: "c" }}>{value.dao_mission.slice(0, 50)}{(value.dao_mission.length > 10) ? '...' : ''}</h2>
        <p style={{ gridArea: "d" }}>{value.review_count} reviews</p>
      </div>)
    }
  })
}


