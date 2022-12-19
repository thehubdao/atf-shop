import Link from 'next/link'
import { ProductData } from '../lib/types'
import { useAppSelector } from '../state/hooks'

interface ShopCardProps {
    product: ProductData,
    category: string,
    classes?: string
}

const ShopCard = ({ product, category, classes }: ShopCardProps) => {
    const { user }: any = useAppSelector((state) => state.account.walletConfig)

    return (
        <Link href={`/detail?id=${product.id_product}&category=${category}`}>
            <a
                className={`${classes} cursor-pointer relative rounded-xl bg-gray-100 items-center justify-start pt-10 flex flex-col w-40 h-56 overflow-hidden`}
            >

                {product?.Detail?.detail?.priceAP && (
                    <div className="absolute top-2 z-20 left-2 rounded-xl flex space-x-3 items-center justify-center min-w-max px-2 bg-white">
                        <p className="font-bold text-sm">
                            {product.Detail.detail.priceAP} AP
                        </p>
                    </div>
                )}

                {product?.Detail?.detail?.priceATF && (
                    <div
                        className={`absolute top-2 z-20 right-2 rounded-xl flex space-x-3 items-center justify-center min-w-max px-2 bg-white`}
                    >
                        <p className="font-bold text-sm">
                            {product.Detail.detail.priceATF} ATF
                        </p>
                    </div>
                )}


                <img src={product.Detail.miniature} className="h-24 w-auto" />

                {product.category === 'apparel' && (
                    <div className="font-jost absolute bottom-16 z-10 bg-[#020202] rounded-xl text-[#FDE100] px-2 py-1 text-xs cursor-pointer">
                        {user.wallet_instance ? "Buy digital twin" : "Get digital twin"}
                    </div>
                )}

                {product.category === 'events' && (
                    <div className="font-jost absolute bottom-16 z-10 bg-[#020202] rounded-xl text-[#FDE100] px-2 py-1 text-xs cursor-pointer">
                        {user.wallet_instance ? "Buy metaverse ticket" : "Get metaverse ticket"}
                    </div>
                )}

                {product?.Detail?.detail?.buyLevel && (
                    <div
                        className={`absolute bottom-14 right-2 z-20 rounded-xl flex space-x-3 items-center justify-center min-w-max px-2 bg-white`}
                    >
                        <p className="font-bold text-sm">
                            LVL {product.Detail.detail.buyLevel}
                        </p>
                    </div>
                )}

                <div className="absolute bg-indigo-800 w-[120%] h-20 -rotate-6 -bottom-2 px-5 py-5 flex items-center justify-center">
                    <p className="text-white text-center rotate-6 font-jost font-medium text-xs">
                    {product?.Detail?.detail?.name}
                    </p>
                </div>
            </a>
        </Link>
    )
}

export default ShopCard
