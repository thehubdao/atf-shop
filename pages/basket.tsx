import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { BsDash, BsPlus, BsTrash } from 'react-icons/bs'
import { Toolbar } from '../components'

import ShopCard from '../components/ShopCard'
import ShopItemDetail from '../components/ShopItemDetail'
import { useAppDispatch, useAppSelector } from '../state/hooks'
import products from '../data/products.json'
import { ProductData, basketItem } from '../lib/types'
import { decrease, increase, removeItem } from '../state/basket'
import { IoMdClose } from 'react-icons/io'
import { getLocal } from '../lib/local'
import axios from 'axios'
import { buyNfts } from '../services/contractService'
import WertModal from '../components/Modal'

const Basket: NextPage = () => {
    const dispatch = useAppDispatch()
    const { basketItems } = useAppSelector((state) => state.basket)
    const [basketList, setBasketList] = useState<ProductData[]>([])
    const [nfts, setNfts] = useState<any>([])
    const { user } = useAppSelector((state) => state.account.walletConfig)

    useEffect(() => {
        let getNfts = async () => {
            let call = await axios.get('/api/nfts')
            basketItems.forEach((item) => {
                setBasketList((basketList) => {
                    return [
                        ...basketList,
                        {
                            ...call.data.products.filter((nft: any) => {
                                return nft.id_product == item.id
                            })[0],
                            count: item.count,
                        },
                    ]
                })
            })
        }
        getNfts()

        console.log(basketList)
        return () => {
            setBasketList([])
        }
    }, [basketItems])

    const calcTotalAP = () => {
        let totalAP: number = 0

        basketList.map((item) => {
            totalAP += item.Detail.detail.priceAP
                ? item.Detail.detail.priceAP * (item.count || 1)
                : 0
        })
        return totalAP
    }

    const calcTotalATF = () => {
        let totalATF: number = 0
        basketList.map((item) => {
            totalATF += item.Detail.detail.priceATF
                ? item.Detail.detail.priceATF * (item.count || 1)
                : 0
        })
        return totalATF
    }

    const bodyModal = () => {
        return (
            <div className='w-[80%] m-auto text-center my-10'>
                <p className='font-bold'>Confirm in-App Purchsae</p>
                <p>Click confirm to proceed with your order 1640 credits will be discounted from your connected web3 wallet.</p>
                <div className='flex flex-col mt-10'>
                    <button className="rounded-md my-3 bg-[#020202] text-white px-4 py-1 w-44 cursor-pointer text-center font-medium self-center">
                        Confirm
                    </button>
                    <button>
                        Back to ATF
                    </button>
                </div>
            </div>
        )
    }

    return (
        <>
            <Head>
                <title>ATF Shop</title>
            </Head>

            <main className="flex font-jost flex-col p-5 animate__animated animate__fadeIn">
                <IoMdClose
                    onClick={() => history.back()}
                    className="absolute top-3 right-3 text-5xl cursor-pointer bg-gray-200 p-2 rounded-full"
                />

                <p className="font-sans text-2xl">My basket</p>

                <hr className="my-10" />

                <div className="flex flex-col space-y-10 w-full">
                    {basketList.map((item) => (
                        <div
                            key={item.id_product}
                            className="flex items-center space-x-5"
                        >
                            <BsTrash
                                onClick={() => {
                                    console.log(item.id_product)
                                    dispatch(removeItem(item.id_product))
                                }}
                                className="text-3xl cursor-pointer"
                            />
                            <p className="font-medium text-xs w-full">
                                {item.Detail.detail.name}
                            </p>
                            {/*                             <div className="flex items-center space-x-2">
                                <BsDash
                                    onClick={() => dispatch(decrease(item.id_product))}
                                    className="text-2xl rounded-full bg-gray-200 p-1 cursor-pointer"
                                />
                                <p className="text-lg font-jost">
                                    {item.count}
                                </p>
                                <BsPlus
                                    onClick={() => dispatch(increase(item.id_product))}
                                    className="text-2xl rounded-full bg-gray-300 p-1 cursor-pointer"
                                />
                            </div> */}
                            <div className="flex flex-col min-w-max">
                                {item?.Detail?.detail?.priceAP && (
                                    <p className="font-medium">
                                        {item.Detail.detail.priceAP *
                                            (item.count || 1)}{' '}
                                        AP
                                    </p>
                                )}
                                {item?.Detail?.detail?.priceATF && (
                                    <p className="font-medium">
                                        {item.Detail.detail.priceATF *
                                            (item.count || 1)}{' '}
                                        ATF
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <hr className="mt-10" />

                <div className="flex items-center justify-between mt-5">
                    <p className="font-light">Grand Total</p>
                    <div className="flex flex-col min-w-max">
                        <p className="font-bold">{calcTotalAP()} AP</p>
                        <p className="font-bold">{calcTotalATF()} ATF</p>
                    </div>
                </div>

                <WertModal
                    title='Confirm Purchase'
                    body={bodyModal}
                    buttonText='Continue'
                    buttonClassName="rounded-full m-auto mt-10 bg-[#020202] text-[#FDE100] p-4 w-44 cursor-pointer text-center font-medium self-center"
                    buttonExtraFunction={() => buyNfts({ nfts: basketList, jwt: user.token, address: user.userAddress })}
                />
            </main>
        </>
    )
}

export default Basket
