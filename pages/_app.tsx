import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { Provider } from 'react-redux'
import store from '../state/store'

import '../styles/globals.css'




function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
            <div id='log' className="overflow-y-auto"></div>
        </Provider>
    )
}
export default MyApp
