import { TezosToolkit } from '@taquito/taquito'

import { BeaconWallet } from '@taquito/beacon-wallet'

import { SigningType } from '@airgap/beacon-sdk'

const Tezos = new TezosToolkit('https://mainnet-tezos.giganode.io')

const wallet = new BeaconWallet({ name: 'Beacon + Taquito' })

Tezos.setWalletProvider(wallet)

export const connectToWallet = async () => {
    return await wallet.client.requestPermissions()
}

export const getNonce = async (address: any) =>
    await fetch('http://localhost:8080/api/loginGetNonce', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }),
    }).then((json) => json.json())

export const login = async () => {
        
    let address = await connectToWallet()
    let nonce = await getNonce(address)
    console.log(nonce)
    console.log(
        await fetch('http://localhost:8080/api/loginWallet', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                signature: await wallet.client.requestSignPayload({
                    signingType: SigningType.RAW,
                    payload: 'Nonce: ' + nonce,
                }),
                address: address,
            }),
        }).then((json) => json.json())
    )
}
