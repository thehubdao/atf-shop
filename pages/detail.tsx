import { useRouter } from 'next/router'
import 'animate.css'
import { IoMdClose } from 'react-icons/io'
import products from '../data/products.json'
import { addItem, removeItem, increase, decrease } from '../state/basket'
import { useAppDispatch, useAppSelector } from '../state/hooks'
import { useEffect, useState } from 'react'
import { BsDash, BsFileMinus, BsPlus } from 'react-icons/bs'
import useSWR from 'swr'
import Loader from '../components/general/Loader'
import Error from '../components/general/Error'
import { ProductData } from '../lib/types'
import axios from 'axios'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const ShopItemDetail = () => {
    const router = useRouter()
    const { id, category } = router.query
    const dispatch = useAppDispatch()
    const { basketItems } = useAppSelector((state) => state.basket)
    const { nfts, events, metaverseEvents, apparel } = useAppSelector(state => state.data)
    const { user }: any = useAppSelector((state) => state.account.walletConfig)
    const [inBasketCount, setInBasketCount] = useState(0)
    const [loading, setLoading] = useState(false)
    const [basketPopUp, setBasketPopUp] = useState(false)
    // const [nfts, setNfts] = useState([])

    let [product, setProduct] = useState<any>()
    // const { data, error } = useSWR(`https://atf-test.backendboyz.repl.co/api/product/${id}`, fetcher)
    // const product = data

    // useEffect(() => {
    //     let getNfts = async () => {
    //         let call = await axios.get('/api/nfts')
    //         setNfts(call.data.products)
    //     }
    //     getNfts()
    // }, [])
    useEffect(() => {
        let products: any[] = [];

        if (category === "nfts") {
            products = nfts
        } else if (category === "events") {
            products = events
        } else if (category === "metaverseEvents") {
            products = metaverseEvents
        } else if (category === "apparel") {
            products = apparel
        }

        setProduct(products.filter((product: any) => product.id_product == id)[0])

        // setProduct(nfts.filter((product: any) => product.id_product == id)[0])

    }, [nfts, events, metaverseEvents, apparel])

    useEffect(() => {
        if (id) {
            const item = basketItems.find((item) => item.id === id)
            item && setInBasketCount(item.count)
        }
        return () => setInBasketCount(0)
    }, [basketItems])

    const addToBasket = () => {
        if (!user.wallet_instance) return
        if (id) {
            dispatch(addItem({ id: id, count: 1, Detail: product.Detail }))
        }
        setBasketPopUp(true)
        setTimeout(() => {
            setBasketPopUp(false)
        }, 2000)
    }

    // if (error || !id) return <Error />
    if (!product) {
        return <Loader />
    }
    return product.Detail ? (
        <div className="w-screen min-h-screen animate__animated animate__fadeIn bg-gray-50 flex flex-col items-center">
            {basketPopUp && (
                <p className="font-jost text-xs p-2 absolute -top-4 right-2 bg-white border border-black rounded shadow-2xl z-30 max-w-[95vw]">
                    Item has been added to the basket
                </p>
            )}

            <IoMdClose
                onClick={() => history.back()}
                className="absolute top-3 right-3 text-5xl cursor-pointer bg-gray-200 p-2 rounded-full"
            />

            <p className="font-bold text-3xl max-w-[80%] p-5 self-start">
                {product?.Detail?.detail?.name}{' '}
                {product?.Detail?.detail?.buyLevel
                    ? '- LVL ' + product?.Detail?.detail?.buyLevel
                    : ''}
            </p>

            <img
                src={product.Detail.miniature}
                className="h-auto w-1/2 mb-10 mt-5"
            />

            <div className="fixed bottom-5 z-10 shadow-2xl rounded-full flex items-center justify-between w-[95%] p-2 bg-gray-50">
                <div className="flex flex-col">
                    {product.Detail?.detail.priceAP && (
                        <p className="font-bold text-xl ml-10">
                            {product.Detail?.detail.priceAP} AP
                        </p>
                    )}
                    {product.Detail?.detail.priceATF && (
                        <p className="font-bold text-xl ml-10">
                            {product.Detail?.detail.priceATF} ATF
                        </p>
                    )}
                </div>

                {inBasketCount === 0 ? (
                    <div
                        onClick={addToBasket}
                        className={`${!user.wallet_instance && "opacity-40 cursor-default"} relative bg-[#020202] text-[#FDE100] rounded-full p-4 font-jost text-lg cursor-pointer min-w-max text-center`}
                    >
                        Add to basket
                        {basketPopUp && <div className='h-full w-full absolute inset-0 bg-[#FDE100] text-[#020202] rounded-full animate__animated animate__fadeIn p-4 font-jost text-lg text-center'>Added</div>}
                    </div>
                ) : (
                    <div className="flex items-center space-x-5">
                        <BsDash
                            onClick={() => dispatch(decrease(id))}
                            className="text-5xl rounded-full bg-gray-200 p-2 cursor-pointer"
                        />
                        <p className="text-xl font-jost">{inBasketCount}</p>
                        <BsPlus
                            onClick={() => dispatch(increase(id))}
                            className="text-5xl rounded-full bg-gray-300 p-2 cursor-pointer"
                        />
                    </div>
                )}
            </div>

            <div className="w-full bg-white p-5 font-jost font-light">
                {product.Detail?.detail.description}
            </div>

            <div className="bg-white flex flex-col w-full px-5 pb-10">
                <div className="max-w-max bg-[#020202] rounded-full text-[#FDE100] font-jost p-2 text-xs mb-10">
                    Include Metaverse
                </div>
                <div className="grid grid-cols-2 justify-items-center ">
                    <div className="bg-gray-200 animate-pulse rounded-xl h-44 w-36" />
                    <div className="bg-gray-200 animate-pulse rounded-xl h-56 w-36" />
                    <div className="bg-gray-200 animate-pulse rounded-xl h-36 w-36" />
                </div>
            </div>
        </div>
    ) : (
        <></>
    )
}

export default ShopItemDetail
