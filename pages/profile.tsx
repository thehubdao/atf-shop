import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react';
import { Toolbar } from '../components';

import ShopCard from '../components/ShopCard';
import ShopItemDetail from '../components/ShopItemDetail';


const Home: NextPage = () => {

    const [openDetail, setOpenDetail] = useState(false)

    return (
        <>
            <Head>
                <title>ATF Shop</title>
            </Head>

            <div className='flex flex-col pt-20 items-center justify-center space-y-5 font-jost'>
                <div className='rounded-full mt-10 bg-[#020202] text-[#FDE100] p-4 cursor-pointer w-44 text-center font-medium self-center'>
                    Connect Wallet
                </div>
                <div className='rounded-full mt-10 border border-black p-4 cursor-pointer w-44 text-center font-medium self-center'>
                    My Orders
                </div>
            </div>


        </>
    )
}


export default Home
