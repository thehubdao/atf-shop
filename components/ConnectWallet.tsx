import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../state/hooks'
import { BeaconWallet } from '@taquito/beacon-wallet'
import {
    connectWallet,
    disconnectWallet,
    _walletConfig,
} from '../state/walletActions'

interface IConnectWallet {
    buttonStyle: string
    connectText?: string,
}

const ConnectWallet = ({connectText, buttonStyle}: IConnectWallet) => {
    const dispatch = useAppDispatch()
    const { user }: any = useAppSelector((state) => state.account.walletConfig)
    const [wallet, setWallet] = useState<null | BeaconWallet>(null)
    const [Tezos, setTezos] = useState(null
    )

    const handleConnectWallet = async () => {
        await dispatch(connectWallet())
    }

    const handleDisconnectWallet = async () => {
        await dispatch(disconnectWallet())
    }
    /*     useEffect(() => {
            
            ;(async () => {
                setTezos(new TezosToolkit("https://mainnet-tezos.giganode.io"))
                if (wallet === null) {
                    const _wallet = new (
                        await import('@taquito/beacon-wallet')
                    ).BeaconWallet({ name: 'Demo' })
                    setWallet(_wallet)
                    Tezos.setWalletProvider(_wallet)
                    setIsMount(true)
                }
            })()
        }, []) */

    return (
        <>
            <div className="flex flex-col pt-20 items-center justify-center space-y-5 font-jost">
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
