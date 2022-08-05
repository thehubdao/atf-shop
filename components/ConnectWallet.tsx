import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../state/hooks'
import { BeaconWallet } from '@taquito/beacon-wallet'
 import {
    connectWallet,
    disconnectWallet,
    _walletConfig,
} from '../state/walletActions'

const ConnectWallet = () => {
    const dispatch = useAppDispatch()
    const { user }:any = useAppSelector((state) => state.account.walletConfig)
    const [wallet, setWallet] = useState<null | BeaconWallet>(null)
    const [Tezos, setTezos] = useState(null
        )
    
    const handleConnectWallet = async () => {
        await dispatch(connectWallet())
    }

    const handleDisconnectWallet = async () => {
        await dispatch(disconnectWallet())
    }
/*     useEffect(() => {
        
        ;(async () => {
            setTezos(new TezosToolkit("https://mainnet-tezos.giganode.io"))
            if (wallet === null) {
                const _wallet = new (
                    await import('@taquito/beacon-wallet')
                ).BeaconWallet({ name: 'Demo' })
                setWallet(_wallet)
                Tezos.setWalletProvider(_wallet)
                setIsMount(true)
            }
        })()
    }, []) */

    return (
        <>
            <Head>
                <title>ATF Shop</title>
            </Head>

            <div className="flex flex-col pt-20 items-center justify-center space-y-5 font-jost">
                <div
                    onClick={
                        user.wallet_instance
                            ? handleDisconnectWallet
                            : handleConnectWallet
                    }
                    className="rounded-full mt-10 bg-[#020202] text-[#FDE100] p-4 cursor-pointer w-44 text-center font-medium self-center"
                >
                    {user.wallet_instance
                        ? 'Disconnect Wallet'
                        : 'Connect Wallet'}
                </div>
            </div>
        </>
    )
}

export default ConnectWallet
