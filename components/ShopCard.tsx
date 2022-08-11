import Link from 'next/link'
import { ProductData } from '../lib/types'

interface ShopCardProps {
    product: ProductData
    classes?: string
}

const ShopCard = ({ product, classes }: ShopCardProps) => {
    return (
        <Link href={`/detail?id=${product.id_product}`}>
            <a
                className={`${classes} cursor-pointer relative rounded-xl bg-gray-100 items-center justify-start pt-8 flex flex-col w-40 h-56 overflow-hidden`}
            >
                {product?.Detail?.detail?.buyLevel && (
                    <div
                        className={`absolute left-2 top-2 rounded-xl flex space-x-3 items-center justify-center min-w-max px-2 bg-white`}
                    >
                        <p className="font-bold text-sm">
                            LVL {product.Detail.detail.buyLevel} 
                        </p>
                    </div>
                )}
                {product?.Detail?.detail?.priceAP && (
                    <div className="absolute top-2 right-2 rounded-xl flex space-x-3 items-center justify-center min-w-max px-2 bg-white">
                        <p className="font-bold text-sm">
                            {product.Detail.detail.priceAP} AP
                        </p>
                    </div>
                )}

                {product?.Detail?.detail?.priceATF && (
                    <div
                        className={`absolute  top-2 right-2 rounded-xl flex space-x-3 items-center justify-center min-w-max px-2 bg-white`}
                    >
                        <p className="font-bold text-sm">
                            {product.Detail.detail.priceATF} ATF
                        </p>
                    </div>
                )}

                <img src={product.Detail.miniature} className="h-24 w-auto" />

                {product.category === 'apparel' && (
                    <div className="font-jost absolute bottom-16 z-10 bg-[#020202] rounded-xl text-[#FDE100] px-2 py-1 text-xs cursor-pointer">
                        Buy digital twin
                    </div>
                )}

                {product.category === 'events' && (
                    <div className="font-jost absolute bottom-16 z-10 bg-[#020202] rounded-xl text-[#FDE100] px-2 py-1 text-xs cursor-pointer">
                        Buy metaverse ticket
                    </div>
                )}

                <div className="absolute bg-indigo-800 w-[120%] h-20 -rotate-6 -bottom-2 px-5 py-5 flex items-center justify-center">
                    <p className="text-white text-center rotate-6 font-jost font-medium text-xs">
                        {product.Detail.detail.name}
                    </p>
                </div>
            </a>
        </Link>
    )
}

export default ShopCard
