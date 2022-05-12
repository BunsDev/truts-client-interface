import { ethers } from 'ethers';
import MetamaskProvider from "@maticnetwork/metamask-provider"
import { useState } from 'react';
import sendMoney from './sendMoney.json'

const CONNECT_WALLET = 'CONNECT_WALLET';
const WRONG_NETWORK = 'WRONG_NETWORK';
const TIP_REVIEWER = 'TIP_REVIEWER';
const SUCCESS = 'SUCESS';
const FAILURE = 'FAILURE'

const Tip = (setdialogType,toAddress) => {

    //const contractABI = sendMoney.abi;

    const { currentAccount, setCurrentAccount } = useState('');

    let connected = false;
    let networkname1 = "polygon";
    const networks = {
        polygon: {
            chainId: "0x89",
            chainName: 'Polygon',
            nativeCurrency: {
                name: 'MATIC',
                symbol: 'MATIC',
                decimals: 18
            },
            rpcUrls: ['https://polygon-rpc.com'],
            blockExplorerUrls: ['https://www.polygonscan.com']
        }
    }

    async function payWithMetamask() {
        try {
            let ethereum = window.ethereum;

            // Request account access if needed
            await ethereum.enable();
            connected = await checkConnectedWallet();
            console.log("polygon connected :", connected);
            if (connected === true) {
                if (ethereum) {
                    const provider = new ethers.providers.Web3Provider(ethereum);
                    const signer = provider.getSigner();
                    let amountInEther = '1.0';
                    const sender = await signer.getAddress();
                    console.log("eth address:", signer, sender);
                    // Acccounts now exposed
                    let balance = await provider.getBalance(sender);
                    console.log(`The balance for ${sender} is ${balance}`)
                    if (balance !== 0 && balance >= Number(amountInEther)) {
                        const params = [{
                            from: sender,
                            to: toAddress,
                            value: ethers.utils.parseEther(amountInEther)._hex,
                        }];

                        console.log("params", params)
                        const transactionHash = await provider.send('eth_sendTransaction', params)
                        console.log('transactionHash is ' + transactionHash);
                        alert(`Congrats on making world better, Cheers. Check transaction confirmation here: https://polygonscan.com/tx/${transactionHash} `)
                        setdialogType(SUCCESS);
                    } else {
                        //alert(`Ssssh..! Low on funds, Top up your wallet with Matic to continue.`)
                        setdialogType(FAILURE);
                    }

                } else {
                    //alert(`Check..! If the Metamask is active`);
                    setdialogType(FAILURE);
                }
            } else {
                setdialogType(CONNECT_WALLET);
                //await payWithMetamask()
                // alert(`Please connect to polygon mainnet`);
            }


        } catch (error) {
            console.log(error)
            setdialogType(FAILURE);
        }
    }

    const changenetwork = async (networkName) => {
        try {
            if (window.ethereum) {
                await window.ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [{
                        ...networks[networkName]
                    }]
                });
                setdialogType(TIP_REVIEWER);
            } else {
                alert(`No Crypto wallet Found`);
            }
        } catch (error) {
            alert(error.message)
        }
    }

    const checkConnectedWallet = async () => {
        // Request account access if needed
        let connected = false;
        const { ethereum } = window;
        await ethereum.enable();
        const accounts = await ethereum.request({ method: 'eth_accounts' });

        if (accounts.length !== 0) {
            const account = accounts[0];

            let chainId = await ethereum.request({ method: 'eth_chainId' });
            console.log("The Chain Id is : " + chainId);

            const chainIdMatic = "0x89";
            if (chainId !== chainIdMatic) {

                console.log("Check if your metamask is connected to POLYGON Mainnet")
                //alert(`You are not connected to Polygon Mainnet, Press "OK" to connect.`);
                //changenetwork(networkname1);
                setdialogType(WRONG_NETWORK);

            } else {
                connected = true;
                setdialogType(TIP_REVIEWER);
                console.log('Authorized account found: ', account);
            }

            return connected;

        } else {
            console.log('No authorised account found');
            connectWallet();
        }
    };

    const connectWallet = async () => {
        const { ethereum } = window;

        if (!ethereum) {
            alert('Get Metamask..!');
            return;
        }

        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

        console.log('Connected to: ', accounts[0]);
        //setCurrentAccount(accounts[0]);
        window.localStorage.setItem('wallet', accounts[0]);
        // setupEventListner();

        //payWithMetamask();
        await checkConnectedWallet();
    }

    return {
        currentAccount, payWithMetamask, connectWallet, checkConnectedWallet, changenetwork: () => {
            changenetwork(networkname1)
        }
    }
}

export default Tip