import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../state/hooks'
import { BeaconWallet } from '@taquito/beacon-wallet'
import {
    connectWallet,
    disconnectWallet,
    _walletConfig,
} from '../state/walletActions'
import { linkWallet } from '../services/walletService'

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
    const { walletLogin } = useAppSelector(
        (state) => state.walletLogin
    )
    const handleConnectWallet = async () => {
        await dispatch(connectWallet(walletLogin))

    }

    const handleDisconnectWallet = async () => {
        await dispatch(disconnectWallet())
    }

    return (
        <>
            <div>{user?.walletAddress}</div>
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
