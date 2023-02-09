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
import { decrease, increase, removeItem, restartBasket } from '../state/basket'
import { IoMdClose } from 'react-icons/io'
import { getLocal } from '../lib/local'
import axios from 'axios'
import {
    buyNfts,
    getAPBalance,
    getATFBalance,
} from '../services/contractService'
import Modal from '../components/Modal'
import BasketModalConfirm from '../components/modalBodies/BasketModalConfirm'
import { _walletConfig } from '../state/walletActions'
import { setBalances } from '../state/balances'

const Basket: NextPage = () => {
    const dispatch = useAppDispatch()
    const { basketItems } = useAppSelector((state) => state.basket)
    const [basketList, setBasketList] = useState<any[]>([])
    const { user } = useAppSelector((state) => state.account.walletConfig)
    const [isConfirmedModal, setIsConfirmedModal] = useState<boolean>(false)
    const [isSuccesfulModal, setIsSuccesfulModal] = useState<boolean>(false)
    const [isWaitingModal, setIsWaitingModal] = useState<boolean>(true)
    const { walletLogin } = useAppSelector((state) => state.walletLogin)

    const { nfts, events, metaverseEvents, apparel } = useAppSelector(state => state.data)
    const allData = nfts.concat(events, metaverseEvents, apparel)

    useEffect(() => {
        basketItems.forEach((item) => {
            console.log(item)
            setBasketList((basketList: any) => {
                return [
                    ...basketList,
                    {
                        /*                         ...allData.filter((product: any) => {
                                                    return product.id_product == item.id
                                                })[0], */
                        count: item.count,
                        id_product: item.id_product,
                        Detail: item.Detail
                    },
                ]
            })
        })
        return () => {
            setBasketList([])
        }
    }, [basketItems])

    // useEffect(() => {
    //     let getNfts = async () => {
    //         let call = await axios.get('/api/nfts')
    //         basketItems.forEach((item) => {
    //             setBasketList((basketList) => {
    //                 return [
    //                     ...basketList,
    //                     {
    //                         ...call.data.products.filter((nft: any) => {
    //                             return nft.id_product == item.id
    //                         })[0],
    //                         count: item.count,
    //                     },
    //                 ]
    //             })
    //         })
    //     }
    //     getNfts()
    //     return () => {
    //         setBasketList([])
    //     }
    // }, [basketItems])

    const calcTotalAP = () => {
        let totalAP: number = 0
        basketList.map((item) => {
            totalAP += item?.Detail?.detail?.priceAP
                ? item?.Detail?.detail?.priceAP * (item.count || 1)
                : 0
        })
        return totalAP
    }

    const calcTotalATF = () => {
        let totalATF: number = 0
        basketList.map((item) => {
            totalATF += item?.Detail?.detail?.priceATF
                ? item?.Detail?.detail?.priceATF * (item.count || 1)
                : 0
        })
        return totalATF
    }

    const handleConfirmModal = async () => {
        console.log(basketList)
        let buyConfirm = await buyNfts({
            nfts: basketList,
            jwt: user.token,
            address: user.userAddress,
            totalAP,
            totalATF,
        })

        setIsSuccesfulModal(buyConfirm)
        setIsWaitingModal(false)
        if (buyConfirm) {
            dispatch(restartBasket())
            let userToken = (walletLogin as any)?.isValidLogin
                ? (walletLogin as any)?.token
                : user.token
            dispatch(
                setBalances({
                    atfBalance: await getATFBalance(userToken),
                    apBalance: await getAPBalance(userToken),
                })
            )
        }
    }

    const bodyModal = () => {
        return (
            <BasketModalConfirm
                isWaiting={isWaitingModal}
                isConfirmed={isConfirmedModal}
                isSuccesful={isSuccesfulModal}
                setIsWaiting={setIsWaitingModal}
                setIsConfirmed={setIsConfirmedModal}
                setIsSuccesful={setIsSuccesfulModal}
                handleConfirmModal={handleConfirmModal}
            />
        )
    }

    const handleCloseModal = () => {
        setIsConfirmedModal(false)
        setIsSuccesfulModal(false)
        setIsWaitingModal(true)
    }

    const handleChooseTitle = () => {
        if (!isConfirmedModal) {
            return 'Confirm Purchase'
        } else if (isWaitingModal) {
            return 'Waiting Purchase'
        } else if (isSuccesfulModal) {
            return 'Purchase Succesful'
        }
        return 'Purchase Denied'
    }
    let totalAP = calcTotalAP(),
        totalATF = calcTotalATF()

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
                    {basketList.map((item) => {
                        return (
                            <div
                                key={item?.id_product}
                                className="flex items-center space-x-5"
                            >
                                <img
                                    src={item?.Detail?.miniature}
                                    className="h-auto w-10"
                                />
                                <p className="font-medium text-xs w-full">
                                    {item?.Detail?.detail?.name}
                                </p>
                                <BsTrash
                                    onClick={() => {
                                        dispatch(removeItem(`${item?.Detail?.id_detail}`))
                                    }}
                                    className="text-3xl cursor-pointer"
                                />
                                <div className="flex items-center space-x-2">
                                    <BsDash
                                        onClick={() => dispatch(decrease(`${item?.Detail?.id_detail}`))}
                                        className="text-2xl rounded-full bg-gray-200 p-1 cursor-pointer"
                                    />
                                    <p className="text-lg font-jost">
                                        {item.count}
                                    </p>
                                    <BsPlus
                                        onClick={() => dispatch(increase(`${item?.Detail?.id_detail}`))}
                                        className="text-2xl rounded-full bg-gray-300 p-1 cursor-pointer"
                                    />
                                </div>
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
                        )
                    })}
                </div>

                <hr className="mt-10" />

                <div className="flex items-center justify-between mt-5">
                    <p className="font-light">Grand Total</p>
                    <div className="flex flex-col min-w-max">
                        <p className="font-bold">{totalAP} AP</p>
                        <p className="font-bold">{totalATF} ATF</p>
                    </div>
                </div>

                <Modal
                    title={handleChooseTitle()}
                    body={bodyModal}
                    buttonText="Continue"
                    buttonClassName="rounded-full m-auto mt-10 bg-[#020202] text-[#FDE100] p-4 w-44 cursor-pointer text-center font-medium self-center"
                    closeExtraFunction={handleCloseModal}
                />
            </main>
        </>
    )
}

export default Basket
