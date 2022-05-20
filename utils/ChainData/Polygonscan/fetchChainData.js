import axios from 'axios';
import React, { useEffect, useState } from 'react';

const apiKeyPoly = 'NPXVU3VBGIEAIDHVR32R894M4EWSJN3XFB';

const apiEndpointPoly = `https://api.polygonscan.com/api/`;

export function GetERC20TokenTransferEventsByAddress(contractAddress, address, page, offset, startBlock, endBlock, sort) {
    const url = apiEndpointPoly+ `?module=account
        &action=tokentx
        &contractaddress=${contractAddress}
        &address=${address}
        &page=${page}
        &offset=${offset}
        &startblock=${startBlock}
        &endblock=${endBlock}
        &sort=${sort}
        &apikey=${apiKeyPoly}`;
    
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
    const url = apiEndpointPoly + `?module=account
        &action=txlist
        &address=${address}
        &startblock=${startBlock}
        &endblock=${endBlock}
        &page=${page}
        &offset=${offset}
        &sort=${sort}
        &apikey=${apiKeyPoly}`;
    
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
    const url = apiEndpointPoly + `?module=account
        &action=tokenfttx
        &contractaddress=${contractAddress}
        &address=${address}
        &page=${page}
        &offset=${offset}
        &startblock=${startBlock}
        &endblock=${endBlock}
        &sort=${sort}
        &apikey=${apiKeyPoly}`;
    
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
    const url = apiEndpointPoly + `?module=stats
        &action=tokensupply
        &contractaddress=${contractAddress}
        &apikey=${apiKeyPoly}`;
    
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
    const url = apiEndpointPoly + `?module=account
        &action=tokenbalance
        &contractaddress=${contractAddress}
        &address=${address}
        &tag=latest
        &apikey=${apiKeyPoly}`;
    
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