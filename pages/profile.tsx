import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '../state/hooks'
import {
    connectWallet,
    disconnectWallet,
    _walletConfig,
} from '../state/walletActions'
const ConnectWallet = dynamic(() => import('../components/ConnectWallet'), {
    ssr: false,
}) as any
const Profile: NextPage = () => {
    return <ConnectWallet />
}

export default Profile
