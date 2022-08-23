import type { AppProps } from 'next/app'
import { Router } from 'next/router'
import { Provider } from 'react-redux'

import store from '../state/store'
import Layout from '../components/Layout'

import '../styles/globals.css'

import Head from 'next/head'
import { checkJWT, getUser } from '../services/walletService'
import Script from 'next/script'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        ;(window as any).getAppInfo = async (options: {
            os: string
            token: string
            refreshToken: string
        }) => {
            let { user_id } = (await checkJWT(options.token)).data
            let { walletAddress } = (await getUser(user_id)).data
            let walletLogin = {}
            if (user_id && walletAddress) {
                //1. Validate if token is valid
                walletLogin = {
                    // 2. If user does have a wallet, call balances from contracts and show them in the shop.
                    walletAddress,
                    isValidLogin: true,
                }
            } else {
                //3. If user doesn't have a wallet -> connect wallet page
                walletLogin = {
                    walletAddress,
                    isValidLogin: false,
                }
            }
            ;(window as any).walletLogin = walletLogin
        }
        window.addEventListener('message', (ev) => {console.log(ev,"EVENT")})
    }, [])
    return (
        <>
            <Head>
                <Script>
                    {async function getAppInfo(options: {
                        os: string
                        token: string
                        refreshToken: string
                    }) {
                        let { user_id } = (await checkJWT(options.token)).data
                        let { walletAddress } = (await getUser(user_id)).data
                        let walletLogin = {}
                        if (user_id && walletAddress) {
                            //1. Validate if token is valid
                            walletLogin = {
                                // 2. If user does have a wallet, call balances from contracts and show them in the shop.
                                walletAddress,
                                isValidLogin: true,
                            }
                        } else {
                            //3. If user doesn't have a wallet -> connect wallet page
                            walletLogin = {
                                walletAddress,
                                isValidLogin: false,
                            }
                        }
                        ;(window as any).walletLogin = walletLogin
                    }}
                </Script>
            </Head>
            <Provider store={store}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </Provider>
        </>
    )
}
export default MyApp
