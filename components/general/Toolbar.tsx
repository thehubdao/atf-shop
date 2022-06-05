import { useState } from "react"
import Link from 'next/link'
import { HiMenuAlt4 } from "react-icons/hi"
import { MdClose } from "react-icons/md"
import { BsCart, BsCart2, BsPerson } from "react-icons/bs"


const Toolbar = ({ dark }: any) => {
    const [open, setOpen] = useState(false)

    return (
        <div className="w-full flex items-center justify-between p-2">
            <img src="/images/atf-logo.png" className="h-12"/>

            <div className="flex items-center space-x-5">
                <Link href="/basket">
                    <a><BsCart className="text-3xl" /></a>
                </Link>

                <Link href="/profile">
                    <a><BsPerson className="text-4xl" /></a>
                </Link>

            </div>

        </div>

    )
}

export default Toolbar
