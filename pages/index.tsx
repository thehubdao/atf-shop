import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import Wert from '../components/Wert'
import { isWeb3 } from '../services/walletService'
import { useAppDispatch, useAppSelector } from '../state/hooks'
import { connectWallet } from '../state/walletActions'
const WertWrap = dynamic(() => import('../components/WertWrap'), {
    ssr: false,
}) as any
const Home: NextPage = () => {

    return <WertWrap/>
}

export default Home
