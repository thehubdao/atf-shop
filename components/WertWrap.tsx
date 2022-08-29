import Wert from '../components/Wert'
import {useAppSelector } from '../state/hooks'
import ConnectWallet from './ConnectWallet'

const WertWrap = () => {
    const { user } = useAppSelector((state) => state.account.walletConfig)
    console.log(user, "USER")
    return !user.wallet_instance ? (
        <div className="font-jost w-[70%] m-auto text-center my-10">
            <p className="font-bold">Connect Web3 Wallet</p>
            <p>
                A connected Web3 wallet is needed to purchase ATF tokens.
            </p>
            <div className="flex flex-col mt-10 font-bold">
                <ConnectWallet
                    buttonStyle="rounded-full mt-10 bg-[#020202] text-[#FDE100] p-4 cursor-pointer w-44 text-center font-medium self-center"
                    containerStyle="flex flex-col pt-0 items-center justify-center space-y-5 font-jost"
                />
            </div>
        </div>
    ) : (
        <Wert walletAddress={user.userAddress} />
    )
}

export default WertWrap
