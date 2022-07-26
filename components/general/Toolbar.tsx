import { useState } from 'react'
import Link from 'next/link'
import { HiMenuAlt4, HiOutlineExclamationCircle } from 'react-icons/hi'
import { MdClose } from 'react-icons/md'
import { BsCart, BsCart2, BsPerson } from 'react-icons/bs'
import { useAppSelector } from '../../state/hooks'
import { Button, Modal } from 'flowbite-react'
import React from 'react'
import Wert from '../Wert'
import WertModal from '../Modal'

const Toolbar = ({ dark }: any) => {
    const [open, setOpen] = useState(false)
    const [show, setShow] = useState(true)
    const { basketItems } = useAppSelector((state) => state.basket)
    const user = useAppSelector((state) => state.account.walletConfig.user)
    console.log(user)
    
    return (
        <div className="w-full flex items-center justify-between py-3 px-5">
            <Link href="/">
                <a>
                    <img src="/images/atf-logo.png" className="h-12" />
                </a>
            </Link>
            <WertModal walletAddress={user.address}/>

            <div className="flex items-center space-x-5">
                <Link href="/basket">
                    <a className="relative">
                        <BsCart className="text-3xl" />
                        {basketItems.length > 0 && (
                            <div className="absolute h-3 w-3 -top-0 -right-1 rounded-full bg-red-500" />
                        )}
                    </a>
                </Link>

                <Link href="/profile">
                    <a>
                        <BsPerson className="text-4xl" />
                    </a>
                </Link>
            </div>
        </div>
    )
}

export default Toolbar
