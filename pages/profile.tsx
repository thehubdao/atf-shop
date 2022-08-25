import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import {
    _walletConfig,
} from '../state/walletActions'
const ConnectWallet = dynamic(() => import('../components/ConnectWallet'), {
    ssr: false,
}) as any
const Profile: NextPage = () => {
    return <><ConnectWallet /><div id="textTest"></div></>
}

export default Profile
