import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Wert from '../components/Wert'
import { isWeb3 } from '../services/walletService'
import { useAppDispatch, useAppSelector } from '../state/hooks'
import { connectWallet } from '../state/walletAction'

const WertWrap = () => {
    const dispatch = useAppDispatch()
    const { user } = useAppSelector((state) => state.account.walletConfig)
    const [_isWeb3, _setIsWeb3] = useState(false)

    useEffect(() => {
        const checkWeb3 = async () => {
            await dispatch(connectWallet())
        }
        checkWeb3()
    }, [])
    useEffect(() => {
        _setIsWeb3(isWeb3(user))
    }, [user])

    return _isWeb3 ? <Wert walletAddress={user.userAddress} /> :  <div className='font-jost w-[70%] m-auto text-center my-10'>
    <p className='font-bold'>Connect Web3 Wallet</p>
    <p>A connected Web3 wallet is needed to purchase ATF tokens and interact with the shop.</p>
    <div className='flex flex-col mt-10 font-bold'>
        Connect your wallet to buy tokens
    </div>
</div>
}

export default WertWrap
