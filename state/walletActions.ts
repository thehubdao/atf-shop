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
import { web3auth } from '../components/AppWrap'
import { hex2buf } from '@taquito/utils'
import { SafeEventEmitterProvider, WALLET_ADAPTER_TYPE } from '@web3auth/base'
import { InMemorySigner } from '@taquito/signer'
const tezosCrypto = require('@tezos-core-tools/crypto-utils')
/* import * as tezosCrypto from '@tezos-core-tools/crypto-utils' */
const wallet_instance = getWalletInstance()

export const connectWallet = (walletLogin: any, isWeb3Auth: boolean) => {
    return async (dispatch: any) => {
        try {
            let user = {}
            let activeAccount: any
            let userAddress: any

            if (isWeb3Auth) {
                const provider = (await web3auth.connect())!
                console.log(await web3auth.getUserInfo())
                const privateKey = (await provider.request({
                    method: 'private_key',
                })) as string
                const keyPair = tezosCrypto.utils.seedToKeyPair(
                    hex2buf(privateKey)
                )
                activeAccount = {
                    address: keyPair.pkh,
                    publicKey: keyPair.pk,
                    sk: keyPair.sk,
                }
                userAddress = activeAccount.address
                console.log(activeAccount)
                Tezos.setSignerProvider(
                    await InMemorySigner.fromSecretKey(keyPair?.sk)
                )
            } else {
                Tezos.setWalletProvider(wallet_instance)
                activeAccount = await wallet_instance.client.getActiveAccount()
                if (!activeAccount) {
                    await wallet_instance.requestPermissions({
                        network: {
                            type: NetworkType.CUSTOM,
                            rpcUrl: 'https://ghostnet.smartpy.io',
                        },
                    })
                    activeAccount =
                        await wallet_instance.client.getActiveAccount()
                }
                userAddress = await wallet_instance.getPKH()
            }

            if (
                (walletLogin as any)?.token &&
                !(walletLogin as any)?.isValidLogin &&
                activeAccount?.address
            ) {
                await linkWallet(
                    (walletLogin as any).token,
                    activeAccount?.address
                )
            }
            let { token, refreshToken } = await login(
                activeAccount?.address,
                activeAccount?.publicKey,
                isWeb3Auth ? web3auth : wallet_instance,
                activeAccount,
                isWeb3Auth
            )
            user = {
                userAddress,
                wallet_instance,
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

export const disconnectWallet = (walletLogin: any) => {
    const { isWeb3Auth } = walletLogin
    return async (dispatch: any) => {
        dispatch(_walletConfig({}))
        if (isWeb3Auth) {
            web3auth.logout({ cleanup: true })
        } else if (wallet_instance) {
            await wallet_instance.client.clearActiveAccount()
        }
    }
}
