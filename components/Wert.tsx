import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import WertModule from '@wert-io/module-react-component'
import { signSmartContractData } from '@wert-io/widget-sc-signer'
import { useEffect, useState } from 'react'
import { Toolbar } from '../components'
import { useAppDispatch, useAppSelector } from '../state/hooks'

import { v4 as uuidv4, v4 } from 'uuid'
import {
    connectWallet,
    disconnectWallet,
    _walletConfig,
} from '../state/walletActions'

const Wert = ({walletAddress}:{walletAddress:string}) => {
    const user = useAppSelector((state) => state.account.walletConfig.user)
    const signedData = signSmartContractData(
        {
            address: user,
            commodity: 'EURL',
            commodity_amount: 0,
            pk_id: 'key1',
            sc_address:
                process.env.TOKEN_CONTRACT_ADDRESS!,
            sc_id: v4(),
            sc_input_data: '',
        },
        process.env.WERT_PRIVATE_KEY!
    )

    return (
        <WertModule className ="w-full h-full"
            options={{
                ...signedData,
                partner_id:
                    process.env.WERT_PARTNER_ID!,
                origin: process.env.WERT_ORIGIN!,
                theme: 'white',
                commodities: 'EURL',
                address: `${walletAddress}`,
                listeners: {
                    error: (name: any, message: any) =>
                        console.log(name, message),
                },
            }}
        />
    )
}

export default Wert
