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
import Popup from './general/Popup'

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
    const { walletLogin }: any = useAppSelector((state) => state.walletLogin)
    const [isActive, setIsActive] = useState(false)
    const handleConnectWallet = async () => {
        await dispatch(connectWallet(walletLogin))
    }

    const handleDisconnectWallet = async () => {
        await dispatch(disconnectWallet(walletLogin))
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
            <div>
                <div
                    onClick={() => {
                        walletLogin?.isWeb3Auth ? null : setIsActive(true)
                        user.wallet_instance
                            ? handleDisconnectWallet()
                            : handleConnectWallet()
                    }}
                    className={buttonStyle}
                >
                    {user.wallet_instance
                        ? 'Disconnect Wallet'
                        : connectText || 'Connect Wallet'}
                </div>
            </div>
            </div>

            
            {isActive && (
                <div className="rounded-full m-auto mt-10  p-4 w-44 cursor-pointer text-center font-medium self-center ">
                    <Popup
                        title={'Warning Note'}
                        message="Please open your Wallet, press connect button and sign the required message. After signing come back to the shop, this may take a moment."
                        buttonText="OK"
                        onButtonClick={() => {
                            setIsActive(false)
                        }}
                        onExit={() => {
                            setIsActive(false)
                        }}
                    />
                </div>
            )}
        </>
    )
}

export default ConnectWallet
