import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { Provider } from 'react-redux'
import store from '../state/store'

import '../styles/globals.css'




function MyApp({ Component, pageProps }: AppProps) {

/* useEffect(() => {
        ;(function () {
            var old = console.log
            var logger = document.getElementById('log')
            console.log = function (message) {
                let params = arguments
                if (typeof message == 'object') {
                            (logger as any).innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + '<br />';
                } else {
                    (logger as any).innerHTML += message + '<br />';
                }
            }
        })()
        console.log("CONSOLE SHOWING")
    },[]) */

    return (
        <Provider store={store}>
            <Component {...pageProps} />
            <div id='log' className="overflow-y-auto"></div>
        </Provider>
    )
}
export default MyApp
