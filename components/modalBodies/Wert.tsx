import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import WertModule from '@wert-io/module-react-component'
import { signSmartContractData } from '@wert-io/widget-sc-signer'
import { useEffect, useState } from 'react'
import { Toolbar } from '..'
import { useAppDispatch, useAppSelector } from '../../state/hooks'
import dynamic from 'next/dynamic'

import { v4 as uuidv4, v4 } from 'uuid'
import {
    connectWallet,
    disconnectWallet,
    _walletConfig,
} from '../../state/walletActions'

const ConnectWallet = dynamic(() => import('../ConnectWallet'), {
    ssr: false,
}) as any

const Wert = ({ isWalletConect }: any) => {
    const user = useAppSelector((state) => state.account.walletConfig.user)

    let micheline_sc_params_string = JSON.stringify({
        entrypoint: 'buy',
        value: {
            prim: 'Pair',
            args: [
                { string: user.userAddress },
                { int: '1000000' },
            ],
        },
    })
        .split('')
        .map((c: any) => c.charCodeAt(0).toString(16).padStart(2, '0'))
        .join('')

    const signedData = signSmartContractData(
        {
            address: 'tz1T2uyYTshSGrEg13VGJFqsWwbi2H175hZb',
            commodity: 'XTZ',
            commodity_amount: 1,
            pk_id: 'key1',
            sc_address: process.env.SWAP_CONTRACT_ADDRESS!,
            sc_id: v4(),
            sc_input_data: micheline_sc_params_string,
        },
        process.env.WERT_PRIVATE_KEY!
    )

    return (
        <div className='overflow-x-hidden'>
            {
                !isWalletConect ? (
                    <div className='font-jost w-[70%] m-auto text-center my-10'>
                        <p className='font-bold'>Connect Web3 Wallet</p>
                        <p>A connected Web3 wallet is needed to purchase ATF tokens and interact with the shop.</p>
                        <div className='flex flex-col mt-10'>
                            <ConnectWallet
                                buttonStyle="rounded-full mt-10 bg-[#020202] text-[#FDE100] p-4 cursor-pointer w-44 text-center font-medium self-center"
                                containerStyle="flex flex-col pt-0 items-center justify-center space-y-5 font-jost"
                            />
                        </div>
                    </div>
                ) : (
                    <WertModule
                        className="h-[450px]"
                        options={{
                            ...signedData,
                            partner_id: process.env.WERT_PARTNER_ID!,
                            origin: process.env.WERT_ORIGIN!,
                            theme: 'white',
                            commodities: 'XTZ',
                            address: 'tz1T2uyYTshSGrEg13VGJFqsWwbi2H175hZb',
                            autosize: true,
                            width: 400,
                            listeners: {
                                error: (name: any, message: any) =>
                                    console.log(name, message),
                            },
                        }}
                    />
                )
            }
        </div>
    )
}

export default Wert
