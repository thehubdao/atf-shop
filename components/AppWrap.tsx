import type { AppProps } from 'next/app'
import Layout from './Layout'
const ConnectWallet = dynamic(() => import('./ConnectWallet'), {
    ssr: false,
}) as any
import { useAppSelector } from '../state/hooks'
import dynamic from 'next/dynamic'
import { getLinkedCheck } from '../services/commonService'

export function AppWrap({ Component, pageProps }: any) {
    const { user }: any = useAppSelector((state) => state.account.walletConfig)

    return (
        <>
     {user.wallet_instance ? (
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                ) : (
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
                )}
        </>
    )
}

