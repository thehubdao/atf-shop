import axios from 'axios'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { checkJWT, getUser } from '../services/walletService'
import { useAppDispatch } from '../state/hooks'
import { setWalletLogin } from '../state/walletLogin'

const WertWrap = dynamic(() => import('../components/WertWrap'), {
    ssr: false,
}) as any

const notifyMobile = (msg: any) => {
    const aWindow: any = window as any
    if (aWindow.webkit?.messageHandlers?.web3LoginHandler) {
        aWindow.webkit?.messageHandlers?.web3LoginHandler.postMessage(msg)
    }
    if (aWindow.androidWeb3) {
        aWindow.androidWeb3.onLoginResult(JSON.stringify(msg))
    }
}

const Home: NextPage = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        notifyMobile("LOADED")
        window.addEventListener('message', async (ev) => {
            let { options } = ev.data
            console.log(options)
            if (options) {
                console.log(options?.token)
                let { user_id } = await checkJWT(options?.token)
                let jwt = await axios.post('api/login', {
                  email: process.env.ADMIN_EMAIL,
                  password: process.env.ADMIN_PASSWORD,
              })
              jwt = jwt.data.token
                let { walletAddress } = await getUser(user_id, jwt)
                let walletLogin = {}
                if (user_id && walletAddress) {
                    //1. Validate if token is valid
                    walletLogin = {
                        // 2. If user does have a wallet, call balances from contracts and show them in the shop.
                        walletAddress,
                        isValidLogin: true,
                        token:options?.token
                    }
                } else {
                    //3. If user doesn't have a wallet -> connect wallet page
                    walletLogin = {
                        walletAddress,
                        token:options?.token,
                        isValidLogin: false,
                    }
                }
                console.log(walletLogin)
                dispatch(setWalletLogin(walletLogin))

            }
        })
    }, [])
    return <WertWrap/>
}

export default Home
