import styles from './daocard.module.scss'
import Starrating from '../Starrating'

const openNewTab = (url) => {
    if (url.length < 1) return
    let a = document.createElement('a');
    a.target = '_blank';
    a.href = url;
    a.click();
}

function DaoCard({ cover, name, rating, link }) {
    return (
        <div className={styles.daoCard} onClick={() => {
            openNewTab(`${window.location.href.split("/")[0]}/dao/${link}`)
        }}>
            <img className={styles.cardCover} src={cover} alt="" />
            <div className={styles.info}>
                <p>{name}</p>
                <span className={styles.rating}>
                    <div className={styles.ratingBox}>
                        <p>{"4.0"}</p> <img src="/star-filled.png" alt="" />
                    </div>
                    <p className={styles.noReviews}>{Math.floor(Math.random() * 100)} reviews</p>
                </span>
                <span className={styles.socialIcon}>
                    <img src="/twitter-grey.png" alt="" />
                    <img src="/discord-grey.png" alt="" />
                    <img src="/web-grey.png" alt="" />
                </span>
            </div>
        </div>
    )
}

DaoCard.defaultProps = {
    cover: "https://assets.hongkiat.com/uploads/minimalist-dekstop-wallpapers/4k/original/14.jpg?3", name: "Bankless DAO", rating: "4"
}

export default DaoCard