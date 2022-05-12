import Head from 'next/head'
import Image from 'next/image'
import styles from './index/index.module.scss'
import Nav from '../components/Nav';
import { useState, useEffect } from 'react';
import axios from 'axios';
import stringSimilarity from "string-similarity";
import ClipboardJS from 'clipboard'
import DaoCard from '../components/DaoCard';
import Loader from '../utils/Loader';

//import addSampleData from './../addSampleData'

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
    // getLeaderboard(setleaderboard)
    //addSampleData();
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

  }, [daoList])

  const [searchTerm, setsearchTerm] = useState("");

  const [visibleCardCountDivider, setvisibleCardCountDivider] = useState(1);

  // useEffect(() => {
  //   setvisibleCardCountDivider(Math.ceil(daoList.length / 20))
  // }, [daoList])



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
            <h3>Review DAOs to</h3>
            <h3 className={styles.titleBlue}>Earn Rewards!</h3>
          </div>
          <p className={styles.subTitle}>Search your DAOs to unlock rewards for learning, contributing and reviewing DAOs Anonymously!</p>
          <SearchComp data={daoList} />
        </div>

        <section className={styles.homepage}>
          <div id={'sec2'} className={styles.sec2}>
            {/* <div style={{ gridArea: 'a', background: "url(ha.png)" }} >
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
            </div> */}
            <div className={styles.r1} style={{ backgroundColor: "#121212" }} >
              <span>
                <h3 style={{ color: "#EB6079" }} >250+</h3>
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
                <h3>100% fully <span className={styles.text_purple}>On-chain Anonymous</span> and Gasless</h3>
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
              <h1>Our DAO Library</h1>
              {/* <p>We are adding more DAOs everyday. If you don’t see a DAO below and want us to list it here, </p>
            <p className={styles.blueText}>please submit your request here 🡥</p> */}
            </div>

            <div className={styles.tagtabs} >
              {
                ['all', 'Service', 'Investment', 'Social', 'Community', 'Education', 'Media', 'Collector', 'Art', 'Sports', 'Event']
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
                }).filter((ele) => {
                  if (ele) return true
                }).reverse().splice(0, 20)
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
              daoList.map((ele, idx) => {
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
                <p>Superteam is a community that helps and uplifts all it`s members and solana ecosystem. They help you grow both financially and socially. It`s not a DAO it`s a place where you make friends for life. The best part is there`s opportunity for people from all the areas be it dev, design, marketing, content or memes. Would definitely recommend everyone to have this super experience. WAGMI.</p>
                <div className={styles.profile}>
                  <img className={styles.commaFloat} src="/comma-float.png" alt="" />
                  <img style={{ gridArea: 'a' }} className={styles.profileImg} src="/hero-bg.jpg" alt="" />
                  <p>0x...35dc</p>
                  <p className={styles.dao_name}>SuperteamDAO</p>
                  <Starrating rating={5} />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.footer}>
            <h2 className={styles.footerTitle}>
              Love what we are doing? Join Truts to build together
            </h2>
            <span className={styles.socialIcon}>
              <img src="/twitter-grey.png" alt="" />
              <img src="/discord-grey.png" alt="" />
              <img src="/web-grey.png" alt="" />
            </span>
            <p className={styles.footerSubTitle}></p>
          </div>
        </section >
      </div >
      <div className={styles.container_mobile}>
        <Nav data={daoList} topSearchVisible={topSearchVisible} />
        <div className={styles.m_hero}>
          <div className={styles.title}>
            <h3>Review DAOs to</h3>
            <h3 className={styles.titleBlue}>Earn Rewards!</h3>
            <p className={styles.subTitle}>Search your DAOs to unlock rewards for learning, contributing and reviewing DAOs Anonymously!</p>
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
          <h1>Our DAO Library</h1>
          <select onChange={(e) => {
            setselectedTab(e.target.value)
          }} >
            {
              ['all', 'Service', 'Investment', 'Social', 'Community', 'Education', 'Media', 'Collector', 'Art', 'Sports', 'Event'].map((ele, idx) => {
                return (
                  <option key={"idx" + idx} value={ele}>{ele}</option>
                )
              })
            }
          </select>
          <div className={styles.m_daoList}>
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
              }).filter((ele) => {
                if (ele) return true
              }).reverse().splice(0, 20)
            }
            {<button className={styles.seeMoreBtn} onClick={() => {
              openNewTab(`${location.href.split('/')[0]}/dao-list`);
            }}>
              See more
            </button>}
          </div>
          <h1>Our DAO Leaderboard</h1>
          <div className={styles.leaderboard}>
            <div className={styles.m_leaderboard_row}>
              <span className={styles.m_leaderboardEntry} onClick={() => {
                openNewTab(`${window.location.href}/dao/${daoList[0].slug}`);
              }}>
                <img style={{ gridArea: "a" }} className={styles.medal} src="/medal-gold.png" alt="" />
                <h3>{daoList[0]?.dao_name}</h3>
                <Starrating rating={"4"} />
                <p className={styles.noReviews} >(456)</p>
              </span>
            </div>
            <div className={styles.m_leaderboard_row}>
              <span className={styles.m_leaderboardEntry} onClick={() => {
                openNewTab(`${window.location.href}/dao/${daoList[1].slug}`);
              }}>
                <img style={{ gridArea: "a" }} className={styles.medal} src="/medal-silver.png" alt="" />
                <h3>{daoList[1]?.dao_name}</h3>
                <Starrating rating={"4"} />
                <p className={styles.noReviews} >(456)</p>
              </span>
            </div>
            <div className={styles.m_leaderboard_row} onClick={() => {
              openNewTab(`${window.location.href}/dao/${daoList[2].slug}`);
            }}>
              <span className={styles.m_leaderboardEntry}>
                <img style={{ gridArea: "a" }} className={styles.medal} src="/medal-bronze.png" alt="" />
                <h3>{daoList[2]?.dao_name}</h3>
                <Starrating rating={"4"} />
                <p className={styles.noReviews} >(456)</p>
              </span>
            </div>
            <div className={styles.m_leaderboard_row} onClick={() => {
              openNewTab(`${window.location.href}/dao/${daoList[3].slug}`);
            }}>
              <span className={styles.m_leaderboardEntry}>
                <img style={{ gridArea: "a" }} className={styles.medal} src="/4-medal.png" alt="" />
                <h3>{daoList[3]?.dao_name}</h3>
                <Starrating rating={"4"} />
                <p className={styles.noReviews} >(456)</p>
              </span>
            </div>
            <div className={styles.m_leaderboard_row} style={{ borderColor: "transparent" }} onClick={() => {
              openNewTab(`${window.location.href}/dao/${daoList[4].slug}`);
            }}>
              <span className={styles.m_leaderboardEntry}>
                <img style={{ gridArea: "a" }} className={styles.medal} src="/5-medal.png" alt="" />
                <h3>{daoList[4]?.dao_name}</h3>
                <Starrating rating={"4"} />
                <p className={styles.noReviews} >(456)</p>
              </span>
            </div>
          </div>
          <h1>Recent Reviews</h1>
          <div className={styles.recentReviews}>
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
              <p>Yooo Memers, The OG Lords of memes at one place. Crazy community for crazy people. Find your vibe here at one place. Post memes and engage and share it with memers... Definitely a place to be for GFD🚀 folks..</p>
              <div className={styles.profile}>
                <img className={styles.commaFloat} src="/comma-float.png" alt="" />
                <img style={{ gridArea: 'a' }} className={styles.profileImg} src="https://assets-global.website-files.com/5ec7dad2e6f6295a9e2a23dd/5edfa7c6f978e75372dc332e_profilephoto1.jpeg" alt="" />
                <p>Van Goh</p>
                <p className={styles.dao_name}>Uniswap</p>
                <Starrating rating={4} />
              </div>
            </div>
          </div>
          <div className={styles.footer}>
            <h2 className={styles.footerTitle}>
              Love what we are doing? Join Truts to build together
            </h2>
            <span className={styles.socialIcon}>
              <img src="/twitter-grey.png" alt="" />
              <img src="/discord-grey.png" alt="" />
              <img src="/web-grey.png" alt="" />
            </span>
            <p className={styles.footerSubTitle}></p>
          </div>
        </div>
      </div>
    </>
  )
}


export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
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
          setTimeout(() => { setinputFocus(false) }, 500)
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
        <h2 className={styles.sug_desc} style={{ gridArea: "c" }}>{value.description.slice(0, 50)}{(value.description.length > 10) ? '...' : ''}</h2>
        <p style={{ gridArea: "d" }}>{value.review_count} reviews</p>
      </div>)
    }
  })
}


