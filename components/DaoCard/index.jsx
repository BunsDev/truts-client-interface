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
                <p className={styles.daoName}>{limitText(data.dao_name)} <img src="/verified.png" alt="" />
                    {(data.dao_name.length >= 18) && <div className={styles.toolTip}>
                        {data.dao_name}
                    </div>}
                </p>
                <span className={styles.rating}>
                    <div className={styles.ratingBox}>
                        <p>{"4.0"}</p> <img src="/star-filled.png" alt="" />
                    </div>
                    <p className={styles.noReviews}>{data.review_count} reviews</p>
                </span>
                <span className={styles.socialIcon}>

                    <img style={{ marginLeft: '0' }} src="/web-grey.png" onClick={() => { openNewTab(data.website_link) }} alt="" />
                    <img src="/twitter-grey.png" onClick={() => { openNewTab(data.twitter_link) }} alt="" />
                    <p>{numFormatter(data.twitter_followers)}</p>
                    <img src="/discord-grey.png" onClick={() => { (data.discord_link.length > 1) && openNewTab(data.discord_link) }} alt="" />
                    <p>{(data.discord_members > 0) ? numFormatter(data.discord_members) : 'n/a'}</p>
                </span>
            </div>
        </div>
    )
}

function limitText(text) {
    if (text.length < 18) return text;
    let snippedText = text.substring(0, 18);
    return snippedText + "..."
}

function numFormatter(num) {
    if (num > 999 && num < 1000000) {
        return (num / 1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million 
    } else if (num > 1000000) {
        return (num / 1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million 
    } else if (num < 900) {
        return num; // if value < 1000, nothing to do
    }
}


export default DaoCard