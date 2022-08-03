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
         return (
        <>
            <div className="flex flex-col w-screen relative">
                <Toolbar />
                <div className="w-full h-full relative">
                    {children}
                </div>
            </div>

        </> 
    )
}

export default Layout
