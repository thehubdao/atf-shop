import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';


const Exchange: NextPage = () => {
    const [valueATF, setValueATF] = useState(0)


    return (
        <>
            <Head>
                <title>ATF Shop</title>
            </Head>

            <div className="flex flex-col pt-20 p-5 items-center justify-center space-y-10">

                <IoMdClose onClick={() => history.back()} className="absolute top-3 right-3 text-5xl cursor-pointer bg-gray-200 p-2 rounded-full" />

                <p className='font-jost text-2xl'>Top Up Action Points</p>

                <div className='flex space-x-5'>
                    <p onClick={() => { setValueATF(100) }} className='font-jost cursor-pointer text-sm border border-black p-1 rounded max-w-max'>100 ATF</p>
                    <p onClick={() => { setValueATF(1000) }} className='font-jost cursor-pointer text-sm border border-black p-1 rounded max-w-max'>1000 ATF</p>
                    <p onClick={() => { setValueATF(10000) }} className='font-jost cursor-pointer text-sm border border-black p-1 rounded max-w-max'>10000 ATF</p>
                </div>

                <div className='flex flex-col space-y-5'>
                    <div className='flex items-center space-x-3'>
                        <input type="number" value={valueATF} className='bg-gray-100 font-jost p-2 rounded-xl w-20' />
                        <p>ATF</p>
                    </div>

                    <div className='flex items-center space-x-3'>
                        <input type="number" className='bg-gray-100 font-jost p-2 rounded-xl w-20' />
                        <p>AP</p>
                    </div>
                </div>



                <p className='font-jost'>1ATF = XAP</p>

                <div className='rounded-full font-jost border border-black p-4 cursor-pointer w-44 text-center font-medium self-center'>
                    Review
                </div>
            </div>
        </>
    )
}


export default Exchange
