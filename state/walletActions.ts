import { NetworkType } from '@airgap/beacon-sdk'
import { TezosToolkit } from '@taquito/taquito'
import * as actions from './actionType'
import { login, wallet_instance, Tezos } from '../services/walletService'

export const connectWallet = () => {
    return async (dispatch: any) => {
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
            const userAddress = await wallet_instance.getPKH()
            let { token, refreshToken } = await login(
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
        dispatch({
            type: actions.DISCONNECT_WALLET,
        })
        if (wallet_instance) {
            await wallet_instance.client.clearActiveAccount()
        }
    }
}
