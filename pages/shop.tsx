import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Toolbar } from '../components'

import ShopCard from '../components/ShopCard'
import { BsFilterRight } from 'react-icons/bs'

import {isEmpty} from "lodash"

import products from '../data/products.json'
import Filter from '../components/Filter'
import Link from 'next/link'
import axios from 'axios'
import { setNFTs, setApparel, setEvents, setMetaverseEvents } from "../state/data";
import { useAppDispatch, useAppSelector } from '../state/hooks'
import { checkJWT, getUser } from '../services/walletService'
import { setWalletLogin } from '../state/walletLogin'
import ConnectWallet from '../components/ConnectWallet'

const Shop: NextPage = () => {
    const dispatch = useAppDispatch()
    const { nfts, events, metaverseEvents, apparel } = useAppSelector(state => state.data)
    const [openFilter, setOpenFilter] = useState(false)
    const [slide, setSlide] = useState(0)
    // const [nfts, setNfts] = useState([])
    // const [events, setEvents] = useState([])
    // const [metaverseEvents, setMetaverseEvents] = useState([])
    const [apparels, setApparels] = useState([])

    const getNFTs = async () => {
        let call = await axios.get('/api/nfts')
        !isEmpty(call.data.products) && dispatch(setNFTs(call.data.products))
        // setNfts(call.data.products)
    }

    const getEvents = async () => {
        let call = await axios.get('/api/events')
        !isEmpty(call.data.products) && dispatch(setEvents(call.data.products))
        // setEvents(call.data.products)
    }

    const getMetaverseEvents = async () => {
        let call = await axios.get('/api/metaverseEvents')
        !isEmpty(call.data.products) && dispatch(setMetaverseEvents(call.data.products))
        // setMetaverseEvents(call.data.products)
    }

    const getApparels = async () => {
        let call = await axios.get('/api/apparels')
        !isEmpty(call.data.products) && dispatch(setApparel(call.data.products))
        // setApparels(call.data.products)
    }

    useEffect(() => {
        getNFTs();
        getEvents();
        getMetaverseEvents();
        getApparels();
    }, [])
    
    useEffect(() => {
        window.addEventListener('message', async (ev) => {
            let { options } = ev.data
            if (options) {
                let { user_id } = await checkJWT(options?.token)
                let jwt = await axios.post('api/login', {
                  email: process.env.ADMIN_EMAIL,
                  password: process.env.ADMIN_PASSWORD,
              })
              jwt = jwt.data.token
                let { walletAddress } = await getUser(user_id, jwt)
                let walletLogin = {}
                if (user_id && walletAddress) {
                    //1. Validate if token is valid
                    walletLogin = {
                        // 2. If user does have a wallet, call balances from contracts and show them in the shop.
                        walletAddress,
                        isValidLogin: true,
                        token:options?.token,
                        isWeb3Auth: options?.isWeb3Auth
                    }
                }else {
                    console.log("User hasn't wallet")
                    //3. If user doesn't have a wallet -> connect wallet page
                    walletLogin = {
                        walletAddress,
                        token:options?.token,
                        isValidLogin: false,
                        isWeb3Auth: options?.isWeb3Auth
                    }
                }
                dispatch(setWalletLogin(walletLogin))
                // ;(window as any).walletLogin = walletLogin
                console.log(walletLogin)
            }
        })
    }, [])


    return (
        <>
            <Head>
                <title>ATF Shop</title>
            </Head>

            {openFilter && (
                <>
                    <div
                        onClick={() => setOpenFilter(false)}
                        className="w-screen h-screen absolute inset-0 z-20"
                    />
                    <Filter close={() => setOpenFilter(false)} />
                </>
            )}

            <main className="flex flex-col p-5">
                <div className="flex space-x-5 items-center mb-5 font-jost -mt-5">
                    <input
                        placeholder="Search"
                        className="bg-gray-100 rounded-full p-3 outline-none grow"
                    />
                    <BsFilterRight
                        onClick={() => setOpenFilter(!openFilter)}
                        className="text-3xl cursor-pointer"
                    />
                </div>

                <div className="w-full -ml-5 mb-5 h-auto ">
                    <img src="/images/banner-home.jpg" className={`w-full`} />
                </div>

                <p className="font-bold text-3xl">Shop</p>

                <div className="flex justify-between items-end pb-3 mt-10">
                    <p className="text-xl">Apparel</p>
                    <Link href="/apparel">
                        <a className="text-gray-500 font-jost">See all</a>
                    </Link>
                </div>

                <div className="flex space-x-5 overflow-x-auto no-scroll-bar max-w-full">
                    {apparel
                        .map((product:any) => (
                            <ShopCard
                                key={product.id}
                                product={product}
                                category="apparel"
                                classes="min-w-[12rem]"
                            />
                        ))}
                </div>

                <div className="flex justify-between items-end pb-3 mt-10">
                    <p className="text-xl">NFTs</p>
                    <Link href="/nfts">
                        <a className="text-gray-500 font-jost">See all</a>
                    </Link>
                </div>

                <div className="flex space-x-5 overflow-x-auto no-scroll-bar max-w-full">
                    {nfts
                        .map((nft:any) => (
                            <ShopCard
                                key={nft.id_product}
                                product={nft}
                                category="nfts"
                                classes="min-w-[12rem]"
                            />
                        ))}
                </div>

                <div className="flex justify-between items-end pb-3 mt-10">
                    <p className="text-xl">Events</p>
                    <Link href="/events">
                        <a className="text-gray-500 font-jost">See all</a>
                    </Link>
                </div>

                <div className="flex space-x-5 overflow-x-auto no-scroll-bar max-w-full">
                    {events
                        .map((event:any) => (
                            <ShopCard
                                key={event.id_product}
                                product={event}
                                category="events"
                                classes="min-w-[12rem]"
                            />
                        ))}
                </div>

                <div className="flex justify-between items-end pb-3 mt-10">
                    <p className="text-xl">Metaverse Events</p>
                    <Link href="/metaverse-events">
                        <a className="text-gray-500 font-jost">See all</a>
                    </Link>
                </div>

                <div className="flex space-x-5 overflow-x-auto no-scroll-bar max-w-full">
                    {metaverseEvents
                        .map((metaverseEvent:any) => (
                            <ShopCard
                                key={metaverseEvent.id_product}
                                product={metaverseEvent}
                                category="metaverseEvents"
                                classes="min-w-[12rem]"
                            />
                        ))}
                </div>


{/*                 <div className="flex justify-between items-end pb-3 mt-10">
                    <p className="text-xl">Events</p>
                    <Link href="/events">
                        <a className="text-gray-500 font-jost">See all</a>
                    </Link>
                </div>

                <div className="flex space-x-5 overflow-x-auto no-scroll-bar max-w-full">
                    {products
                        .filter((product) => product.category === 'events')
                        .map((product:any) => (
                            <ShopCard
                                key={product.id}
                                product={product}
                                classes="min-w-[12rem]"
                            />
                        ))}
                </div>

                <div className="flex justify-between items-end pb-3 mt-10">
                    <p className="text-xl">Metaverse Events</p>
                    <Link href="/metaverse-events">
                        <a className="text-gray-500 font-jost">See all</a>
                    </Link>
                </div>

                <div className="flex space-x-5 overflow-x-auto no-scroll-bar max-w-full">
                    {products
                        .filter(
                            (product) => product.category === 'metaverse-events'
                        )
                        .map((product:any) => (
                            <ShopCard
                                key={product.id}
                                product={product}
                                classes="min-w-[12rem]"
                            />
                        ))}
                </div> */}
            </main>
        </>
    )
    
}

export default Shop
