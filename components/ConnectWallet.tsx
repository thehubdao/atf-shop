import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../state/hooks'
import { BeaconWallet } from '@taquito/beacon-wallet'
import {
    connectWallet,
    disconnectWallet,
    _walletConfig,
} from '../state/walletActions'
import { linkWallet } from '../services/walletService'
import { setLinkedCheck } from '../services/commonService'

interface IConnectWallet {
    buttonStyle: string
    containerStyle: string
    connectText?: string
}

const ConnectWallet = ({
    connectText,
    buttonStyle,
    containerStyle,
}: IConnectWallet) => {
    const dispatch = useAppDispatch()
    const { user }: any = useAppSelector((state) => state.account.walletConfig)
    const [wallet, setWallet] = useState<null | BeaconWallet>(null)
    const [Tezos, setTezos] = useState(null)
    const { walletLogin }: any = useAppSelector((state) => state.walletLogin)
    const handleConnectWallet = async () => {
        await dispatch(connectWallet(walletLogin))
    }

    const handleDisconnectWallet = async () => {
        await dispatch(disconnectWallet())
    }

    useEffect(() => {
        if (walletLogin?.walletAddress != user?.userAddress) {
            setLinkedCheck(true)
            handleDisconnectWallet()
        } else if (walletLogin?.walletAddress == user?.userAddress) {
            setLinkedCheck(false)
        }
    }, [walletLogin])

    return (
        <>
            <div className={containerStyle}>
                <div
                    onClick={
                        user.wallet_instance
                            ? handleDisconnectWallet
                            : handleConnectWallet
                    }
                    className={buttonStyle}
                >
                    {user.wallet_instance
                        ? 'Disconnect Wallet'
                        : connectText || 'Connect Wallet'}
                </div>
            </div>
        </>
    )
}

export default ConnectWallet
