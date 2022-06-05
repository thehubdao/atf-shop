import "animate.css"
import { IoMdClose } from "react-icons/io"


interface ShopItemDetailProps {
    price: number;
    title: string;
    image: string;
    onDismiss: () => void;
}


const ShopItemDetail = ({ price, title, image, onDismiss }: ShopItemDetailProps) => {
    return (
        <div className='w-screen min-h-screen animate__animated animate__fadeIn bg-gray-50 flex flex-col items-center'>
            <IoMdClose onClick={onDismiss} className="absolute top-3 right-3 text-3xl cursor-pointer" />


            <p className='font-bold text-3xl max-w-[70%] p-5 self-start'>{title}</p>

            <img src={image} className='h-auto w-1/2' />

            <div className='self-end m-5 rounded-full flex space-x-3 items-center justify-center min-w-max px-5 py-2 bg-white'>
                <p className='font-bold text-3xl'>{price}</p>
            </div>

            <div className="w-full bg-white p-5">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
            </div>

            <div className="bg-white flex flex-col w-full px-5 pb-10">
                <div className='max-w-max bg-[#020202] rounded-xl text-[#FDE100] font-medium px-2 py-1 text-xs mb-5'>
                    Include Metaverse
                </div>
                <div className="grid grid-cols-2 justify-evenly">
                    <div className="bg-gray-200 animate-pulse rounded-xl h-44 w-36" />
                    <div className="bg-gray-200 animate-pulse rounded-xl h-56 w-36" />
                    <div className="bg-gray-200 animate-pulse rounded-xl h-36 w-36" />
                </div>
            </div>

        </div>
    )
}

export default ShopItemDetail
