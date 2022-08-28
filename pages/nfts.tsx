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
import { useAppSelector } from '../state/hooks'

const NFTs: NextPage = () => {
    const { nfts } = useAppSelector(state => state.data)
    const [openFilter, setOpenFilter] = useState(false)
    // const [nfts, setNfts] = useState([])

    // useEffect(() => {
    //     let getNfts = async () => {
    //         let call = await axios.get('/api/nfts')
    //         setNfts(call.data.products)
    //     }
    //     getNfts()
    // }, [])
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

                {/* <div className='w-screen -ml-5 mb-5 h-auto '>
                    <img src="/images/banner-2.jpg" className={`w-full`} />
                </div> */}

                <p className="font-bold text-3xl mb-5">NFTs</p>

                <div className="grid grid-cols-2 place-items-center gap-5">
                    {nfts.map((nft: any) => (
                        <ShopCard
                            key={nft.id_product}
                            product={nft}
                            category="nfts"
                            classes="min-w-[10rem]"
                        />
                    ))}
                </div>
            </main>
        </>
    )
}

export default NFTs
