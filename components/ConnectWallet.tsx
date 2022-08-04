import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '../state/hooks'
import {
    connectWallet,
    disconnectWallet,
    _walletConfig,
} from '../state/walletActions'

const ConnectWallet = () => {
    const dispatch = useAppDispatch()
    const { user } = useAppSelector((state) => state.account.walletConfig)

    const handleConnectWallet = async () => {
        await dispatch(connectWallet())
    }

    const handleDisconnectWallet = async () => {
        await dispatch(disconnectWallet())
    }

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
                <Link href="/orders">
                    <a className="rounded-full mt-10 border border-black p-4 cursor-pointer w-44 text-center font-medium self-center">
                        My Orders
                    </a>
                </Link>
            </div>
        </>
    )
}

export default ConnectWallet
