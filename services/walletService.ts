import { SigningType } from '@airgap/beacon-sdk'
import axios from 'axios'
const { char2Bytes } = require('@taquito/utils')

interface loginResult {
    statusCode: number
    msg: string
    token: string
    refreshToken: string
}

const notifyMobile = (result: loginResult) => {
    const aWindow: any = window as any
    //IOS case
    if (aWindow.webkit?.messageHandlers?.web3LoginHandler) {
        aWindow.webkit?.messageHandlers?.web3LoginHandler.postMessage(result)
    }
    //Android case
    console.log(aWindow.androidWeb3,"Left out")
    if (aWindow.androidWeb3) {
        console.log(aWindow.androidWeb3,"Joined")
        aWindow.androidWeb3.onLoginResult(JSON.stringify(result))
    }
    console.log(result)
}

export const getNonce = async (address: any) => {
    console.log(address)
    return (await axios.post('/api/loginGetNonce', { address })).data
}

export const login = async (address: any, wallet: any) => {
    const nonce = await getNonce(address)
    console.log(nonce,"Nonce")
    const bytes = char2Bytes(nonce + '')
    const payloadBytes = '05' + '0100' + char2Bytes(bytes.length + '') + bytes
    const callData = (
        await axios.post('api/loginWallet', {
            signature: (
                await wallet.client.requestSignPayload({
                    signingType: SigningType.MICHELINE,
                    payload: payloadBytes,
                })
            ).signature,
            address: address,
        })
    ).data
    try {
        notifyMobile(callData)
    } catch (err) {
        console.log(err)
    }
}
