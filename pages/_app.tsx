import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { Provider } from 'react-redux'
import store from '../state/store'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        (function (logger:any) {
            (console as any).old = console.log;
            console.log = function () {
                var output = "", arg, i;
        
                for (i = 0; i < arguments.length; i++) {
                    arg = arguments[i];
                    output += "<span class=\"log-" + (typeof arg) + "\">";
        
                    if (
                        typeof arg === "object" &&
                        typeof JSON === "object" &&
                        typeof JSON.stringify === "function"
                    ) {
                        output += JSON.stringify(arg);   
                    } else {
                        output += arg;   
                    }
        
                    output += "</span>&nbsp;";
                }
        
                logger.innerHTML += output + "<br>";
                (console as any).old.apply(undefined, arguments);
            };
        })(document.getElementById("log"));
    })
    return (
        <Provider store={store}>
            <Component {...pageProps} />
            <div id="log" className="overflow-y-auto"></div>
        </Provider>
    )
}
export default MyApp
