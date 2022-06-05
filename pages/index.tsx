import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react';
import { Toolbar } from '../components';

import ShopCard from '../components/ShopCard';
import { BsFilterRight } from "react-icons/bs"


const Home: NextPage = () => {
    const [openFilter, setOpenFilter] = useState(false)
    const [filter, setFilter] = useState<string[]>([])

    const updateFilter = (name: string) => {
        const index = filter.findIndex(item => item === name);
        if (index === -1) {
            setFilter(filter => [...filter, name])
        } else {
            setFilter(filter => filter.filter(item => item !== name))
        }
    }

    return (
        <>
            <Head>
                <title>ATF Shop</title>
            </Head>

            {openFilter &&
                <>
                    <div onClick={() => setOpenFilter(false)} className='w-screen h-screen absolute inset-0 bg-black/20 z-20' />
                    <div className='fixed flex flex-col justify-between bottom-0 left-0 p-5 w-screen min-h-[80vh] bg-white z-20 animate__animated animate__fadeInUpBig animate__faster shadow-round rounded-t-2xl'>

                        <div className='flex flex-col space-y-2 font-jost'>
                            <p className='text-3xl mb-5 font-sans'>Filters</p>

                            <div onClick={() => updateFilter("Event")} className={`${filter.indexOf("Event") !== -1 && "border border-black"} rounded-xl bg-gray-100 p-3 text-xl cursor-pointer`}>
                                Event
                            </div>

                            <div onClick={() => updateFilter("Clothes")} className={`${filter.indexOf("Clothes") !== -1 && "border border-black"} rounded-xl bg-gray-100 p-3 text-xl cursor-pointer`}>
                                Clothes
                            </div>

                            <div onClick={() => updateFilter("Goodies")} className={`${filter.indexOf("Goodies") !== -1 && "border border-black"} rounded-xl bg-gray-100 p-3 text-xl cursor-pointer`}>
                                Goodies
                            </div>

                            <div onClick={() => updateFilter("Real Life")} className={`${filter.indexOf("Real Life") !== -1 && "border border-black"} rounded-xl bg-gray-100 p-3 text-xl cursor-pointer`}>
                                Real Life
                            </div>

                            <div onClick={() => updateFilter("Metaverse Only")} className={`${filter.indexOf("Metaverse Only") !== -1 && "border border-black"} rounded-xl bg-gray-100 p-3 text-xl cursor-pointer`}>
                                Metaverse Only
                            </div>

                        </div>

                        <div className='flex items-center font-jost w-full justify-center space-x-10'>
                            <p onClick={() => setOpenFilter(false)} className='text-xl cursor-pointer'>Dismiss</p>
                            <div onClick={() => setOpenFilter(false)} className='bg-[#020202] text-[#FDE100] rounded-full p-4 w-30 text-center font-jost text-lg cursor-pointer'>
                                Apply
                            </div>

                        </div>
                    </div>
                </>
            }

            <main className="flex flex-col p-5">

                <div className='flex space-x-5 items-center mb-5 font-jost -mt-5'>
                    <input placeholder='Search' className='bg-gray-100 rounded-full p-3 outline-none grow' />
                    <BsFilterRight onClick={() => setOpenFilter(!openFilter)} className='text-3xl cursor-pointer' />

                </div>

                <p className='font-bold text-3xl mb-5'>Shop</p>


                <div className="grid grid-cols-2 gap-5 place-items-center">
                    <ShopCard id="1" price={2400} title="CASQUETTE TRUCKER LOSC RED WHITE" image="/images/nft.png" />
                    <ShopCard id="2" price={2400} title="CASQUETTE TRUCKER LOSC RED WHITE" image="/images/nft.png" />
                    <ShopCard id="3" price={2400} title="CASQUETTE TRUCKER LOSC RED WHITE" image="/images/nft.png" />

                </div>

            </main>
        </>
    )
}


export default Home
