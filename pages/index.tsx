import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Toolbar } from '../components'

import ShopCard from '../components/ShopCard'
import { BsFilterRight } from 'react-icons/bs'

import products from '../data/products.json'
import Filter from '../components/Filter'
import Link from 'next/link'
import axios from 'axios'

const Home: NextPage = () => {
    const [openFilter, setOpenFilter] = useState(false)
    const [slide, setSlide] = useState(0)
    const [nfts, setNfts] = useState([])
    const [events, setEvents] = useState([])
    const [metaverseEvents, setMetaverseEvents] = useState([])
    const [apparels, setApparels] = useState([])

    const getNFTs = async () => {
        let call = await axios.get('/api/nfts')
        console.log(call.data.products)
        setNfts(call.data.products)
    }

    const getEvents = async () => {
        console.log("Get events")
        let call = await axios.get('/api/events')
        console.log(call.data.products)
        setEvents(call.data.products)
        console.log("Events")
    }

    const getMetaverseEvents = async () => {
        let call = await axios.get('/api/metaverseEvents')
        console.log(call.data.products)
        setMetaverseEvents(call.data.products)
    }

    const getApparels = async () => {
        let call = await axios.get('/api/apparels')
        console.log(call.data.products)
        setApparels(call.data.products)
    }

    useEffect(() => {
        getNFTs();
        getEvents();
        getMetaverseEvents();
        getApparels();
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

{/*                 <div className="flex justify-between items-end pb-3 mt-10">
                    <p className="text-xl">Apparel</p>
                    <Link href="/apparel">
                        <a className="text-gray-500 font-jost">See all</a>
                    </Link>
                </div>

                <div className="flex space-x-5 overflow-x-auto no-scroll-bar max-w-full">
                    {products
                        .filter((product) => product.category === 'apparel')
                        .map((product:any) => (
                            <ShopCard
                                key={product.id}
                                product={product}
                                classes="min-w-[12rem]"
                            />
                        ))}
                </div> */}

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
                                classes="min-w-[12rem]"
                            />
                        ))}
                </div>

                <div className="flex justify-between items-end pb-3 mt-10">
                    <p className="text-xl">Apparels</p>
                    <Link href="/apparel">
                        <a className="text-gray-500 font-jost">See all</a>
                    </Link>
                </div>

                <div className="flex space-x-5 overflow-x-auto no-scroll-bar max-w-full">
                    {apparels
                        .map((apparel:any) => (
                            <ShopCard
                                key={apparel.id_product}
                                product={apparel}
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

export default Home
