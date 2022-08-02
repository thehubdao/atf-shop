import WertModule from '@wert-io/module-react-component'
import { signSmartContractData } from '@wert-io/widget-sc-signer'
import 'animate.css'
import { useState } from 'react'
import { v4 } from 'uuid'
import Profile from '../pages/profile'

import { useAppSelector } from '../state/hooks'
import Toolbar from './general/Toolbar'
import Wert from './Wert'

const Layout = ({ children }: any) => {
    const [nextPage, setNextPage] = useState(true)
    // const { chainId } = useAppSelector(state => state.account)
    let micheline_sc_params_string = JSON.stringify({
        entrypoint: 'buy',
        value: {
            prim: 'Pair',
            args: [
                { string: 'tz1T2uyYTshSGrEg13VGJFqsWwbi2H175hZb' },
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
            sc_address: 'KT1E7yfz6NRvrZkHeuJvYKB9tZuqpTd3MyCe',
            sc_id: v4(),
            sc_input_data: micheline_sc_params_string,
        },
        process.env.WERT_PRIVATE_KEY!
    )
    //if (!nextPage) return <Profile setNextPage={setNextPage} />
    return (
        <div className="h-screen">
            <WertModule
                className="w-full h-full"
                options={{
                    ...signedData,
                    partner_id: process.env.WERT_PARTNER_ID!,
                    origin: process.env.WERT_ORIGIN!,
                    theme: 'white',
                    commodities: 'XTZ',
                    address: 'tz1T2uyYTshSGrEg13VGJFqsWwbi2H175hZb',
                    listeners: {
                        error: (name: any, message: any) =>
                            console.log(name, message),
                    },
                }}
            />
        </div>
    ) 
/*          return (
        <>
            <div className="flex flex-col w-screen relative">
                <Toolbar />
                <div className="w-full h-full relative">
                    {children}
                </div>
            </div>

        </> 
    ) */
}

export default Layout
