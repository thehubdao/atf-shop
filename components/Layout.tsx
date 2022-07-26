import WertModule from '@wert-io/module-react-component'
import 'animate.css'
import { useState } from 'react'
import Profile from '../pages/profile'

import { useAppSelector } from '../state/hooks'
import Toolbar from './general/Toolbar'
import Wert from './Wert'

const Layout = ({ children }: any) => {
    const [nextPage, setNextPage] = useState(false)
    // const { chainId } = useAppSelector(state => state.account)

    if(!nextPage) return (<Profile setNextPage = {setNextPage} />)
    return (
        <div className="h-screen">
            <WertModule
                className="w-full h-full"
                options={{
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
    /*  return (
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
