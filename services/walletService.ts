import { SigningType } from '@airgap/beacon-sdk'
import axios from 'axios'
const {char2Bytes } = require('@taquito/utils')
export const getNonce = async (address: any) => {
    console.log(address)
    return (await axios.post('/api/loginGetNonce', { address })).data
}

export const login = async (address: any, wallet: any) => {
    let nonce = await getNonce(address)
   
    const bytes = char2Bytes(nonce + '')
    const payloadBytes = '05' + '0100' + char2Bytes(bytes.length+"") + bytes
    console.log((await axios.post('api/loginWallet', {
        signature: (
            await wallet.client.requestSignPayload({
                signingType: SigningType.MICHELINE,
                payload: payloadBytes,
            })
        ).signature,
        address: address,
    })).data)
}
