import styles from './daocard.module.scss'
import Starrating from '../Starrating'

const openNewTab = (url) => {
    if (url.length < 1) return
    let a = document.createElement('a');
    a.target = '_blank';
    a.href = url;
    a.click();
}

function DaoCard({ data, link }) {
    let cover = (data.dao_cover) ? data.dao_cover : "https://assets.hongkiat.com/uploads/minimalist-dekstop-wallpapers/4k/original/14.jpg?3";
    return (
        <div className={styles.daoCard} onClick={() => {
            openNewTab(`${window.location.href.split('/')[0]}/dao/${link}`)
        }}>
            <img className={styles.cardCover} src={cover} alt="" />
            <div className={styles.info}>
                <p>{data.dao_name} <img src="/verified.png" alt="" /> </p>
                <span className={styles.rating}>
                    <div className={styles.ratingBox}>
                        <p>{"4.0"}</p> <img src="/star-filled.png" alt="" />
                    </div>
                    <p className={styles.noReviews}>{data.review_count} reviews</p>
                </span>
                <span className={styles.socialIcon}>

                    <img style={{ marginLeft: '0' }} src="/web-grey.png" onClick={() => { openNewTab(data.website_link) }} alt="" />
                    <img src="/twitter-grey.png" onClick={() => { openNewTab(data.twitter_link) }} alt="" />
                    <p>38K</p>
                    <img src="/discord-grey.png" onClick={() => { openNewTab(data.discord_link) }} alt="" />
                    <p>5K</p>
                </span>
            </div>
        </div>
    )
}



export default DaoCard