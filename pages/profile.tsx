import Head from 'next/head'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import {
    _walletConfig,
} from '../state/walletActions'
const ConnectWallet = dynamic(() => import('../components/ConnectWallet'), {
    ssr: false,
}) as any

const Profile: NextPage = () => {
    return (
        <>
            <Head>
                <title>ATF Shop</title>
            </Head>
            <ConnectWallet
                buttonStyle="rounded-full mt-10 bg-[#020202] text-[#FDE100] p-4 cursor-pointer w-44 text-center font-medium self-center"
                containerStyle="flex flex-col pt-20 items-center justify-center space-y-5 font-jost"
            />
        </>
    )
}

export default Profile
