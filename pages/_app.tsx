import type { AppProps } from 'next/app'
import { Router } from 'next/router'
import { Provider } from 'react-redux'
import store from '../state/store'
import { persistor } from '../state/store'
import Layout from '../components/Layout'

import '../styles/globals.css'

import Head from 'next/head'
import { checkJWT, getUser } from '../services/walletService'
import Script from 'next/script'
import { useEffect } from 'react'
import axios from 'axios'
import { useAppDispatch } from '../state/hooks'
import { setWalletLogin } from '../state/walletLogin'
import { PersistGate } from 'redux-persist/integration/react'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </PersistGate>
            </Provider>
        </>
    )
}
export default MyApp
