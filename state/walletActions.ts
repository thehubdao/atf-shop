import * as actions from './actionType'
import {
    login,
    getWalletInstance,
    Tezos,
    linkWallet,
} from '../services/walletService'
import dynamic from 'next/dynamic'
import { NetworkType } from '@airgap/beacon-sdk'
import storage from 'redux-persist/lib/storage'
const wallet_instance = getWalletInstance()

export const connectWallet = (walletLogin: any) => {
    return async (dispatch: any) => {
        console.log(await storage.getItem('root'), 'STORAGE')
        try {
            let user = {}
            Tezos.setWalletProvider(wallet_instance)
            let activeAccount = await wallet_instance.client.getActiveAccount()
            if (!activeAccount) {
                await wallet_instance.requestPermissions({
                    network: {
                        type: NetworkType.CUSTOM,
                        rpcUrl: 'https://ghostnet.smartpy.io',
                    },
                })
                activeAccount = await wallet_instance.client.getActiveAccount()
            }
            if (
                (walletLogin as any)?.token &&
                !(walletLogin as any)?.isValidLogin &&
                activeAccount?.address
            ) {
                console.log(
                    await linkWallet(
                        (walletLogin as any).token,
                        activeAccount?.address
                    )
                )
            }
            const userAddress = await wallet_instance.getPKH()
            let { token, refreshToken } = await login(
                activeAccount?.address,
                activeAccount?.publicKey,
                wallet_instance
            )
            user = {
                userAddress: userAddress,
                wallet_instance: wallet_instance,
                token,
                refreshToken,
            }
            dispatch(_walletConfig(user))
        } catch (error) {
            console.log(error)
            dispatch({
                type: actions.CONNECT_WALLET_ERROR,
            })
        }
    }
}

export const _walletConfig = (user: any) => {
    return {
        type: actions.CONNECT_WALLET,
        user,
    }
}

export const disconnectWallet = () => {
    return async (dispatch: any) => {
        dispatch(_walletConfig({}))
        if (wallet_instance) {
            await wallet_instance.client.clearActiveAccount()
        }
    }
}
