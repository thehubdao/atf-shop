import { Component, useEffect, useState } from 'react'
import Link from 'next/link'
import { BsCart, BsCart2, BsPerson, BsPlus } from 'react-icons/bs'
import { useAppSelector } from '../../state/hooks'
import { checkJWT } from '../../services/walletService'
import Modal from '../Modal'
import { getAPBalance, getATFBalance } from '../../services/contractService'
import { isWeb3 } from '../../services/walletService'
import Wert from '../modalBodies/Wert'

const Toolbar = ({ dark }: any) => {
    const { basketItems } = useAppSelector((state) => state.basket)
    const { user } = useAppSelector((state) => state.account.walletConfig)
    const [_isWeb3, _setIsWeb3] = useState(false)
    const [balances, setBalances] = useState<any>(null)

    useEffect(() => {
        const web3Check = async () => {
            _setIsWeb3(await isWeb3(user))
            setBalances({
                atfBalance: await getATFBalance(user.userAddress),
                apBalance: await getAPBalance(user.userAddress),
            })
        }
        web3Check()
    }, [user])

    const modalBody = () => {
        return (<div className="h-fit overflow-hidden">
            <Wert isWalletConect={_isWeb3}/>
        </div>)
    }

    return (
        <div className="w-full flex items-center justify-between py-3 px-5">
            <div className="flex md:space-x-5">
                <Link href="/">
                    <a className='max-h-12'>
                        <img src="/images/atf-logo.png" className="h-12 w-20" />
                    </a>
                </Link>
                {<Modal
                    title='Buy ATF Tokens'
                    body={modalBody}
                    buttonText='Buy tokens'
                    buttonClassName="bg-[#ffe000] text-black active:bg-yellow font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                />}
                {_isWeb3 && balances && (
                    <div className="flex flex-col justify-start items-stretch space-y-1">
                        <div className="flex items-center space-x-2">
                            <p className="text-sm px-2 py-0.5 min-w-[60px] bg-gray-200 rounded-full">
                                {`${balances.atfBalance} ATF`}
                            </p>
                            <BsPlus className="rounded-full border border-black text-xl" />
                        </div>

                        <div className="flex items-center space-x-2">
                            <p className="text-sm px-2 py-0.5 min-w-[60px] bg-gray-200 rounded-full">
                                {`${balances.apBalance} AP`}
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
                {_isWeb3 && (
                    <Link href="/basket">
                        <a className="relative">
                            <BsCart className="text-3xl" />
                            {basketItems.length > 0 && (
                                <div className="absolute h-3 w-3 -top-0 -right-1 rounded-full bg-red-500" />
                            )}
                        </a>
                    </Link>
                )}

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
