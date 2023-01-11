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
import { Web3Auth } from '@web3auth/modal'
import { OpenloginAdapter } from '@web3auth/openlogin-adapter'
interface IConnectWallet {
    buttonStyle: string
    containerStyle: string
    connectText?: string
}

let web3auth:any = null

const ConnectWallet = ({
    connectText,
    buttonStyle,
    containerStyle,
}: IConnectWallet) => {
    const dispatch = useAppDispatch()
    const { user }: any = useAppSelector((state) => state.account.walletConfig)
    const { walletLogin }: any = useAppSelector((state) => state.walletLogin)
    const [isActive, setIsActive] = useState(false)
    const handleConnectWallet = async (isWeb3Auth:boolean) => {

        await dispatch(connectWallet(walletLogin,isWeb3Auth))
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

    const initModal= async () => {
        const _web3auth = new Web3Auth({
        clientId: process.env.WEB3AUTH_PROJECT_ID!, // get it from Web3Auth Dashboard
        web3AuthNetwork: 'cyan',
        chainConfig: {
            chainNamespace: 'other', // for all non EVM and SOLANA chains, use "other"
            rpcTarget: 'https://ghostnet.smartpy.io',
            displayName: 'Tezos',
            blockExplorer: 'https://tzstats.com',
            ticker: 'XTZ',
            tickerName: 'Tezos',
        },
    })
    
    const openloginAdapter = new OpenloginAdapter({
        adapterSettings: {
            uxMode: 'popup',
        },
    })
    
    _web3auth.configureAdapter(openloginAdapter)
    await _web3auth.initModal()
    web3auth = _web3auth
    console.log(web3auth)
}
    return (
        <>
            <div className={containerStyle}>
            <div>
                <div
                    onClick={() => {
                         setIsActive(true)
                        user.wallet_instance
                            ? handleDisconnectWallet()
                            : handleConnectWallet(false)
                    }}
                    className={buttonStyle}
                >
                    {user.wallet_instance
                        ? 'Disconnect Wallet'
                        : connectText || 'Connect Wallet'}
                </div>
            </div>
            </div>
            <div className={containerStyle}>
            <div>
                <div
                    onClick={async () => {
                        await initModal()
                        user.wallet_instance
                            ? handleDisconnectWallet()
                            : handleConnectWallet(true)
                    }}
                    className={buttonStyle}
                >
                    {user.wallet_instance
                        ? 'Disconnect Web3Auth'
                        : connectText || 'Connect Web3Auth'}
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

export { web3auth}

export default ConnectWallet
