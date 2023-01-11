import Layout from './Layout'
import { useAppSelector } from '../state/hooks'
import dynamic from 'next/dynamic'
import { getLinkedCheck } from '../services/commonService'
import { Web3Auth } from '@web3auth/modal'
import { OpenloginAdapter } from '@web3auth/openlogin-adapter'
import { useEffect } from 'react'

const web3auth = new Web3Auth({
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

web3auth.configureAdapter(openloginAdapter)
export default function AppWrap({ Component, pageProps }: any) {
    const { user }: any = useAppSelector((state) => state.account.walletConfig)
    useEffect(() => {
        const initModal = async () => {
            try{
            await web3auth.initModal()
            }catch(err) {console.log(err)}
        }
        initModal()
    },[])
    return (
        <>
     {/* {!user.wallet_instance ? ( */}
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                {/* ) : (
                    <div className="font-jost w-[70%] m-auto text-center my-10">
                        <p className="font-bold">Connect Web3 Wallet</p>
                        <p>
                            A connected Web3 wallet is needed to enter the shop.
                        </p>
                        {getLinkedCheck() && <p>You connected a wallet different from the one linked to your email, please connect the correct wallet</p>}
                        <div className="flex flex-col mt-10 font-bold">
                            <ConnectWallet
                                buttonStyle="rounded-full mt-10 bg-[#020202] text-[#FDE100] p-4 cursor-pointer w-44 text-center font-medium self-center"
                                containerStyle="flex flex-col pt-0 items-center justify-center space-y-5 font-jost"
                            />
                        </div>
                    </div>
                )} */}
        </>
    )
}

export {web3auth}
