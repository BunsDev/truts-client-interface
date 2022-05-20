import axios from 'axios';
import React, { useState, useEffect} from 'react';

const apiKeyEth = 'J38UZ9EWYD7F2T5RV1YMA9E37P8JCMHPQK';

const apiEndpointEth = `https://api.etherscan.io/api`;

export function GetERC20TokenTransferEventsByAddress(contractAddress, address, page, offset, startBlock, endBlock, sort) {
    const url = apiEndpointEth + `?module=account
        &action=tokentx
        &contractaddress=${contractAddress}
        &address=${address}
        &page=${page}
        &offset=${offset}
        &startblock=${startBlock}
        &endblock=${endBlock}
        &sort=${sort}
        &apikey=${apiKeyEth}`;
    
    const [erc20transferEvent, setErc20TransferEvent] = useState(null);

    useEffect(() => {
        axios.get(url)
            .then(response => {
                setErc20TransferEvent(response.data);
            })
    }, [url]);

    return erc20transferEvent;
};

export function GetNormalTransactionsByAddress(address, startBlock, endBlock, page, offset, sort) {
    const url = apiEndpointEth + `?module=account
        &action=txlist
        &address=${address}
        &startblock=${startBlock}
        &endblock=${endBlock}
        &page=${page}
        &offset=${offset}
        &sort=${sort}
        &apikey=${apiKeyEth}`;
    
    const [transactions, setTransactions] = useState(null);

    useEffect(() => {
        axios.get(url)
            .then(response => {
                setTransactions(response.data);
            })
    }, [url]);

    return transactions;
};

export function GetERC721TokenTransferEventsByAddress(contractAddress, address, page, offset, startBlock, endBlock, sort) {
    const url = apiEndpointEth + `?module=account
        &action=tokenfttx
        &contractaddress=${contractAddress}
        &address=${address}
        &page=${page}
        &offset=${offset}
        &startblock=${startBlock}
        &endblock=${endBlock}
        &sort=${sort}
        &apikey=${apiKeyEth}`;
    
    const [erc721TransferEvent, setErc721TransferEvent] = useState(null);

    useEffect(() => {
        axios.get(url)
            .then(response => {
                setErc721TransferEvent(response.data);
            })
    }, [url]);

    return erc721TransferEvent;
};

export function GetERC20TokenTotalSupplyByContractAddress(contractAddress) {
    const url = apiEndpointEth + `?module=stats
        &action=tokensupply
        &contractaddress=${contractAddress}
        &apikey=${apiKeyEth}`;
    
    const [erc20TotalSupply, setErc20TotalSupply] = useState(null);

    useEffect(() => {
        axios.get(url)
            .then(response => {
                setErc20TotalSupply(response.data);
            })
    }, [url]);

    return erc20TotalSupply; 
    // as shown in the relevant schema, the result is returned in the token's smallest decimal representation.
    // E.g. a token with a balance of 215.241526476136819398 and 18 decimal places will be returned as 215241526476136819398
};

export function GetERC20TokenAmountBalanceForTokenContractAddress(contractAddress, address) {
    const url = apiEndpointEth + `?module=account
        &action=tokenbalance
        &contractaddress=${contractAddress}
        &address=${address}
        &tag=latest
        &apikey=${apiKeyEth}`;
    
    const [erc20TokenAmountBalance, setErc20TokenAmountBalance] = useState(null);

    useEffect(() => {
        axios.get(url)
            .then(response => {
                setErc20TokenAmountBalance(response.data);
            })
    }, [url]);

    return erc20TokenAmountBalance;
    // as shown in the relevant schema, the result is returned in the token's smallest decimal representation.
    // E.g. a token with a balance of 215.241526476136819398 and 18 decimal places will be returned as 215241526476136819398
};