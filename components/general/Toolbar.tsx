import { useEffect, useState } from 'react'
import Link from 'next/link'
import { BsCart, BsCart2, BsPerson, BsPlus } from 'react-icons/bs'
import { useAppSelector } from '../../state/hooks'
import { checkJWT } from '../../services/walletService'

const isWeb3 = async (user: any) => {
    const aWindow: any = window as any
    //IOS case
    if (aWindow.webkit?.messageHandlers?.web3LoginHandler) {
        return true
    }
    //Android case
    if (aWindow.androidWeb3 && aWindow.androidWeb3?.wallet_instance) {
        if ((await checkJWT(aWindow.androidWeb3?.JWT)).data.user_id) return true
    }
    if (user.wallet_instance) return true

    return false
}

const Toolbar = ({ dark }: any) => {
    const { basketItems } = useAppSelector((state) => state.basket)
    const { user } = useAppSelector((state) => state.account.walletConfig)
    const [_isWeb3, _setIsWeb3] = useState(false)
    useEffect(() => {
        const web3Check = async () => _setIsWeb3(await isWeb3(user))
        web3Check()
    })
    return (
        <div className="w-full flex items-center justify-between py-3 px-5">
            <div className="flex space-x-5">
                <Link href="/">
                    <a>
                        <img src="/images/atf-logo.png" className="h-12" />
                    </a>
                </Link>

                {_isWeb3 && (
                    <div className="flex flex-col justify-start items-stretch space-y-1">
                        <div className="flex items-center space-x-2">
                            <p className="text-sm px-2 py-0.5 bg-gray-200 rounded-full">
                                1000 ATF
                            </p>
                            <BsPlus className="rounded-full border border-black text-xl" />
                        </div>

                        <div className="flex items-center space-x-2">
                            <p className="text-sm px-2 py-0.5 bg-gray-200 rounded-full">
                                500 AP
                            </p>
                            <Link href="/exchange">
                                <a>
                                    <BsPlus className="rounded-full border border-black text-xl" />
                                </a>
                            </Link>
                        </div>
                    </div>
                )}
            </div>

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
