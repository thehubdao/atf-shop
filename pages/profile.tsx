import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Toolbar } from '../components'
import { useAppDispatch, useAppSelector } from '../state/hooks'
import { connect, disconnect, setChain, setAddress } from '../state/account'
import ShopCard from '../components/ShopCard'
import ShopItemDetail from '../components/ShopItemDetail'
import {connectToWallet} from '../services/walletService'

const Home: NextPage = () => {
    const dispatch = useAppDispatch()
    const [openDetail, setOpenDetail] = useState(false)
    const { address } = useAppSelector(state => state.account)

    useEffect(() => {console.log(address,"ADDRESS")})
    return (
        <>
            <Head>
                <title>ATF Shop</title>
            </Head>

            <div className="flex flex-col pt-20 items-center justify-center space-y-5 font-jost">
                <div
                    onClick={async () => {
                        const connectedWallet = await connectToWallet()
                        dispatch(connect(connectedWallet))
                    }}
                    className="rounded-full mt-10 bg-[#020202] text-[#FDE100] p-4 cursor-pointer w-44 text-center font-medium self-center"
                >
                    Connect Wallet
                </div>
                <div className="rounded-full mt-10 border border-black p-4 cursor-pointer w-44 text-center font-medium self-center">
                    My Orders
                </div>
            </div>
        </>
    )
}

export default Home
