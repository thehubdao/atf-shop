import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import Loader from '../components/general/Loader'
import Wert from '../components/Wert'
import { isWeb3 } from '../services/walletService'
import { useAppDispatch, useAppSelector } from '../state/hooks'
const ConnectWallet = dynamic(() => import('../components/ConnectWallet'), {
    ssr: false,
}) as any

const WertWrap = () => {
    const { user } = useAppSelector((state) => state.account.walletConfig)
    const { walletLogin } = useAppSelector((state) => state.walletLogin)
    const [_isWeb3, _setIsWeb3] = useState(false)
    const [isValidLoginMobile, setIsValidLoginMobile] = useState(false)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const web3Check = async () => {
            _setIsWeb3( isWeb3(user))
            setIsValidLoginMobile((walletLogin as any)?.isValidLogin)
        }

        web3Check()
    }, [user, walletLogin])
    useEffect(() => {
        const interval = setInterval(() =>setLoading(false),1000)
    })
    if (loading) return <Loader/>
        return !user.wallet_instance && !isValidLoginMobile ? (
            <div className="font-jost w-[70%] m-auto text-center my-10">
                <p className="font-bold">Connect Web3 Wallet</p>
                <p>A connected Web3 wallet is needed to purchase ATF tokens.</p>
                <div className="flex flex-col mt-10 font-bold">
                    <ConnectWallet
                        buttonStyle="rounded-full mt-10 bg-[#020202] text-[#FDE100] p-4 cursor-pointer w-44 text-center font-medium self-center"
                        containerStyle="flex flex-col pt-0 items-center justify-center space-y-5 font-jost"
                    />
                </div>
            </div>
        ) : (
            <Wert
                walletAddress={
                    isValidLoginMobile
                        ? (walletLogin as any).walletAddress
                        : user.userAddress
                }
            />
        )
}

export default WertWrap