import React from 'react'
import styles from './footer.module.scss'
import Link from 'next/link'
//COMPONENTS


//ASSETS
import web_w from '../../assets/icons/web_white.svg'
import twitter_w from '../../assets/icons/twitter_white.svg'
import discord_w from '../../assets/icons/discord_white.svg'

const openNewTab = (url) => {
    if (url.length < 1) return
    let a = document.createElement('a');
    a.target = '_blank';
    a.href = url;
    a.click();
}

export default function Component() {
    return (
        <div className={styles.footer}>
            <h1 className={styles.footerTitle}>Love what we do? Truts your guts and join us now!</h1>
            <button onClick={() => {
                openNewTab('https://discord.truts.xyz/')
            }} className={styles.footer_btn}>Join Truts</button>
            <ul className={styles.links}>
                <a href='#'><li>Home</li></a>
                <Link href={'/dao-form'} passHref>
                    <li>Add a DAO</li>
                </Link>
                <Link href={'/dao-list'} passHref>
                    <li>Explore DAOs</li>
                </Link>
                <Link href={'/dao-list'} passHref>
                    <li>Review DAOs</li>
                </Link>
                <li onClick={() => {
                    window.location.href = "mailto:contact@truts.xyz?subject=Subject&body=message%20goes%20here";
                }}>Contact Us</li>
            </ul>
            <span className={styles.socialIcons}>
                <img onClick={() => {
                    openNewTab('https://twitter.truts.xyz/')
                }} src={twitter_w.src} alt="" />
                <img onClick={() => {
                    openNewTab('https://discord.truts.xyz/')
                }} src={discord_w.src} alt="" />
                <a href="#">
                    <img src={web_w.src} alt="" />
                </a>
            </span>
            {/* <ul className={styles.tnc}>
                <li>Terms & Conditions</li>
                <li>Privacy Policy</li>
            </ul> */}
        </div >
    )
}

