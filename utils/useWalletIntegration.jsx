import {
    useAccount,
    useConnect,
    useDisconnect,
    useEnsName,
    useSignMessage,
    useNetwork,
    useSendTransaction,
} from 'wagmi';

import { useEffect } from 'react';

import { Buffer } from "buffer";

let useWalletIntegration = () => {

    useEffect(() => {
        if (!window.Buffer) {
            window.Buffer = Buffer;
        }
    }, [])

    const { connectAsync, connectors, isLoading, pendingConnector } = useConnect();
    const { disconnectAsync } = useDisconnect()
    const { data: walletData, address, isConnected, connector, isConnecting } = useAccount();

    return ({
        connectAsync, disconnectAsync, connectors, isConnected, isConnecting, pendingConnector, walletData, isLoading
    })
}

export default useWalletIntegration