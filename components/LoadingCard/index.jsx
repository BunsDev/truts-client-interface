import React from 'react'
import styles from './loadingcard.module.scss'

function LoadingCard() {
    return (
        <div className={styles.daoCard}>
            <span className={styles.cardCover}>

            </span>
            <div className={styles.info}>
                <div className={styles.text}>

                </div>
                <div className={styles.text}>

                </div>
            </div>
        </div>
    )
}

export default LoadingCard