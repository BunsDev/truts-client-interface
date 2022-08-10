import React, { useState, useEffect } from 'react'
import styles from './daoForm.module.scss'
import Nav from '../../components/Nav'
import axios from 'axios'
import Footer from '../../components/Footer'

import {
    useAccount,
    useConnect,
    useDisconnect,
    useEnsName,
    useSignMessage,
    useNetwork,
} from 'wagmi';

const API = process.env.API

const getWalletIcon = (name) => {
    if (name == 'MetaMask') {
        return '/metamask.png'
    }
    else if (name == 'Coinbase Wallet') {
        return '/coinbase.png'
    }
    else if (name == 'WalletConnect') {
        return '/wallet-connect.png'
    }
    else {
        return '/wallet.png'
    }
}


let formObject = {
    "dao_name": "string",
    "dao_category": [
        "string"
    ],
    "dao_logo": "string",
    "dao_cover_photo": "string",
    "mission_of_dao": "string",
    "dao_description": "string",
    "discord_link": "string",
    "twitter_link": "string",
    "website_link": "string",
    "mirror_link": "string",
    "additional_link": "string",
    "additional_details": "string"
}

const openNewTab = (url) => {
    if (url.length < 1) return
    let a = document.createElement('a');
    a.target = '_blank';
    a.href = url;
    a.click();
}



function DaoForm() {

    const [formData, setFormData] = useState({});

    const [catInput, setcatInput] = useState('');
    const [daoCatList, setdaoCatList] = useState([]);
    const [connectWalletModelVisible, setconnectWalletModelVisible] = useState(false);
    const [loaderVisible, setloaderVisible] = useState(false);

    ; const [imgSrc, setimgSrc] = useState({
        logo: '',
        cover: ''
    })

    const CategoryChip = ({ name, idx }) => {
        const removeCat = () => {
            setdaoCatList((list) => {
                let newList = list.filter((ele, id) => {
                    if (idx == id) {
                        return false
                    }
                    return true
                })
                return [...newList]
            })
        }

        return (
            <span onClick={() => { removeCat() }} className={styles.chip}>{name}<img src='/close.png' /></span>
        )
    }

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

    let formHandler = (e) => {
        setFormData((obj) => {
            obj[e.target.name] = e.target.value;
            return { ...obj }
        })
    }

    const { connectAsync, connectors, isLoading, pendingConnector } = useConnect();
    const { disconnectAsync } = useDisconnect()
    const { address, isConnected ,connector,isConnecting } = useAccount();


    const [public_address, setpublic_address] = useState('');
    const { data: sign_data, isError: signError, isLoading: signLoading, isSuccess: signSucess, signMessage } = useSignMessage({
        message: formData.dao_name,
    })

    const submitForm = async (acc) => {
        console.log(acc);
        let walletAddress = public_address;

        if (acc) {
            if (acc.length > 1) {
                walletAddress = acc;
            }
        }

        if (!isConnected) {
            if (acc?.length > 1) {
                console.log("continue");
            }
            else {
                console.log(isConnected);
                return setconnectWalletModelVisible(true);
            }
        }

        if (!(daoCatList?.length)) {
            alert("Please add DAO category");
            return null
        }
        let url = `https://truts.herokuapp.com/dao/create-new-dao-v2`
        setloaderVisible(true);
        let res = await axios.post(url, { ...formData, dao_category: daoCatList, submitter_public_address: `${walletAddress}` });

        if (res.status == 201) {
            window.location.href = './redirect/new_dao'
        }
        else {
            window.location.href = './redirect/failed'
        }
        console.log(res);
    }

    useEffect(() => {
        //submitSampleData();
    }, [])


    const Loader = () => {
        return (
            <div className={styles.loader}>
                <div className={styles.wrapper}>
                    <h1>Please wait ! your Community is being uploaded</h1>
                    <img src="/black-loader.gif" alt="" />
                </div>
            </div>
        )
    }

    return (
        <>
            {(loaderVisible) && <Loader />}
            <div className={styles.con}>
                <ConnectWalletModelSimple submit_form={submitForm} connectWalletModelVisible={connectWalletModelVisible} setconnectWalletModelVisible={setconnectWalletModelVisible} setpublic_address={setpublic_address} />
                <Nav />
                <form className={styles.form} onSubmit={(e) => { e.preventDefault(); submitForm() }}>
                    <h1 className={styles.title}>Fill these details to list your Community</h1>
                    <p className={styles.subtitle}>Please fill the required information to list your DAO on Truts</p>

                    <span className={styles.input}>
                        <p>Name of the Community</p>
                        <input required name={'dao_name'} type="text" onChange={formHandler} />
                    </span>
                    <p className={styles.inputTitle}>What’s the category of your DAO?</p>
                    <div className={styles.categoryCon}>
                        <input type="text" value={catInput} onChange={(e) => {
                            setcatInput(e.target.value);
                        }} />
                        <span className={styles.addBtn} onClick={() => {
                            setdaoCatList((ele) => {
                                return [...ele, catInput.trim()]
                            })
                            setcatInput('');
                        }}>Add</span>
                    </div>
                    <div className={styles.categoryList}>
                        {
                            daoCatList.map((ele, idx) => {
                                return (
                                    <CategoryChip name={ele} key={'c' + idx} idx={idx} />
                                )
                            })
                        }

                    </div>

                    <span className={styles.input}>
                        <p>Whats your community`s mission statement?</p>
                        <input required name={'dao_mission'} placeholder='Please keep it within 1 or 2 lines' type="text" onChange={formHandler} />
                    </span>

                    <span className={styles.input}>
                        <p>A brief description of the community</p>
                        <textarea required name={'description'} placeholder='Please keep it within 1 or 2 lines' type="text" rows={8} onChange={formHandler} />
                    </span>

                    <div className={styles.fourCfourR}>
                        <span className={styles.input}>
                            <p>Discord link</p>
                            <input required name={'discord_link'} placeholder='Paste it here, it will link automatically' type="text" onChange={formHandler} />
                        </span>
                        <span className={styles.input}>
                            <p>Twitter link</p>
                            <input required name={'twitter_link'} placeholder='Paste it here, it will link automatically' type="text" onChange={formHandler} />
                        </span>
                        <span className={styles.input}>
                            <p>Website link</p>
                            <input required name={'website_link'} placeholder='Paste it here, it will link automatically' type="text" onChange={formHandler} />
                        </span>
                        <span className={styles.input}>
                            <p>Additional link</p>
                            <input required name={'mirror_link'} placeholder='Paste it here, it will link automatically' type="text" onChange={formHandler} />
                        </span>
                    </div>
                    {/* https://truts.herokuapp.com/dao/create-new-dao-v2 */}
                    <span name={'website_link'} className={styles.input}>
                        <p>Submiters Discord Id</p>
                        <input name={'submitter_discord_id'} placeholder='Example : sampleuser#8493' type="text" onChange={formHandler} />
                    </span>

                    {/* <span className={styles.input}>
                    <p>Slug</p>
                    <input placeholder='Paste it here, it will link automatically' type="text" />
                </span> */}

                    <button type='submit' className={styles.submit}>Submit</button>

                </form>
            </div>
            <Footer />
        </>
    )
}

const ConnectWalletModelSimple = ({ connectWalletModelVisible, setconnectWalletModelVisible, setpublic_address, submit_form }) => {
    const { connectAsync, connectors, isLoading, pendingConnector } = useConnect();
    const { disconnectAsync } = useDisconnect()
    const { address, isConnected ,connector,isConnecting } = useAccount();

    console.log(submit_form)

    useEffect(() => {

    })

    if (connectWalletModelVisible) {
        return (
            <div className={styles.connectWalletModel}>
                <div className={styles.walletModal}>
                    <div className={styles.wallets}>
                        <h1 className={styles.title}>Connect Wallet</h1>
                        <p className={styles.subTitle}>Please select one of the following to proceed</p>
                        <div className={styles.box}>
                            {
                                connectors.map((connector) => {
                                    return (
                                        <div key={connector.id} className={styles.option} onClick={async () => {
                                            let res = await connectAsync({connector});
                                            console.log('res', res);
                                            setpublic_address(res.account)
                                            console.log("submitform");
                                            submit_form(res.account)
                                            if (res) { setconnectWalletModelVisible(false) };
                                        }}>
                                            <img src={getWalletIcon(connector.name)} alt="" />
                                            <p> {connector.name}
                                                {!connector.ready && '(unsupported)'}
                                                {isConnecting &&
                                                    connector.id === pendingConnector?.id &&
                                                 ' (connecting)'}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (null)
    }
}

export default DaoForm