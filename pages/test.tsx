import type { NextPage } from 'next'
import Head from 'next/head'
import { Suspense } from 'react'
import Link from 'next/link'
import { useLoader, Canvas } from '@react-three/fiber'
import {useGLTF} from "@react-three/drei"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'
import Model from '../components/Model'


const Test: NextPage = () => {

    return (
        <>
            <Head>
                <title>ATF Shop</title>
            </Head>


            <main className="flex flex-col p-5">
                <div className="flex space-x-5 items-center mb-5 font-jost -mt-5">
                    <input
                        placeholder="Search"
                        className="bg-gray-100 rounded-full p-3 outline-none grow"
                    />

                </div>

                <div className="w-full -ml-5 mb-5 h-auto ">
                    <img src="/images/banner-home.jpg" className={`w-full`} />
                </div>

                <p className="font-bold text-3xl">Shop</p>

                <div className="flex justify-between items-end pb-3 mt-10">
                    <p className="text-xl">NFTs</p>
                    <Link href="/nfts">
                        <a className="text-gray-500 font-jost">See all</a>
                    </Link>
                </div>

                <div className="w-screen h-screen bg-red-500">

                    <Canvas className=''>
                        <Suspense fallback={null}>
                            <Model />
                        </Suspense>
                    </Canvas>

                </div>

                <div className="flex justify-between items-end pb-3 mt-10">
                    <p className="text-xl">Events</p>
                    <Link href="/events">
                        <a className="text-gray-500 font-jost">See all</a>
                    </Link>
                </div>

                <div className="flex justify-between items-end pb-3 mt-10">
                    <p className="text-xl">Metaverse Events</p>
                    <Link href="/metaverse-events">
                        <a className="text-gray-500 font-jost">See all</a>
                    </Link>
                </div>

                <div className="flex justify-between items-end pb-3 mt-10">
                    <p className="text-xl">Apparels</p>
                    <Link href="/apparel">
                        <a className="text-gray-500 font-jost">See all</a>
                    </Link>
                </div>

            </main>
        </>
    )
}

export default Test
