import { SigningType } from '@airgap/beacon-sdk'
import { BeaconWallet } from '@taquito/beacon-wallet'
import { InMemorySigner } from '@taquito/signer'
import { TezosToolkit } from '@taquito/taquito'
import axios from 'axios'
const { char2Bytes } = require('@taquito/utils')

interface loginResult {
    statusCode: number
    msg: string
    token: string
    refreshToken: string
}
export const Tezos = new TezosToolkit('https://ghostnet.smartpy.io')

let wallet_instance: any = null

export const getWalletInstance = () => {
    if (!wallet_instance)
        wallet_instance = new BeaconWallet({
            name: 'ATF Beacon',
        })
    return wallet_instance
}

const notifyMobile = (result: loginResult) => {
    const aWindow: any = window as any
    if (aWindow.webkit?.messageHandlers?.web3LoginHandler) {
        aWindow.webkit?.messageHandlers?.web3LoginHandler.postMessage(result)
    }
    if (aWindow.androidWeb3) {
        aWindow.androidWeb3.onLoginResult(JSON.stringify(result))
    }
}

export const getNonce = async (address: any) => {
    return (await axios.post('/api/loginGetNonce', { address })).data
}

export const login = async (
    address: any,
    publicKey: any,
    wallet: any,
    activeAccount: any,
    isWeb3Auth: boolean
) => {
    const {nonce} = await getNonce(activeAccount.address)
    const bytes = char2Bytes(nonce + '')
    const payloadBytes = '05' + '0100' + char2Bytes(bytes.length + '') + bytes
    let signature: any
    if (isWeb3Auth) {
        const signer = new InMemorySigner(activeAccount.sk)
        signature = (await signer.sign(payloadBytes)).sig
    } else {
        signature = (
            await wallet.client.requestSignPayload({
                signingType: SigningType.MICHELINE,
                payload: payloadBytes,
            })
        ).signature
    }
    console.log(signature)
    const callData = (
        await axios.post('/api/loginWallet', {
            signature,
            address,
            publicKey,
        })
    ).data
    callData.wallet_instance = wallet_instance
    try {
        notifyMobile(callData)
        return callData
    } catch (err) {
        console.log(err)
    }
}

export const checkJWT = async (jwt: any) => {
    try {
        return (
            await axios.get('/api/validate-token', {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            })
        ).data
    } catch (err) {
        return {}
    }
}

export const getUser = async (id_user: any, jwt: any) => {
    if (id_user)
        return (
            await axios.get(`/api/get-users?user_id=${id_user}&email=`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            })
        ).data
    else return {}
}

export const linkWallet = async (jwt: any, walletAddress: any) => {
    return (
        await axios.put(
            `/api/user/update`,
            { walletAddress },
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
        )
    ).data
}
export const isWeb3 = (user: any) => {
    if ((window as any)?.walletLogin?.isValidLogin) return true
    if (user.wallet_instance) return true

    return false
}
