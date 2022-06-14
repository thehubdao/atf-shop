import { TezosToolkit } from '@taquito/taquito'

import { BeaconWallet } from '@taquito/beacon-wallet'

const Tezos = new TezosToolkit('https://mainnet-tezos.giganode.io')

const wallet = new BeaconWallet({ name: 'Beacon + Taquito' })

Tezos.setWalletProvider(wallet)

export const connectToWallet = async () => {
        return await wallet.client.requestPermissions();
}

