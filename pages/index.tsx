import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
const ConnectWallet = dynamic(() => import('../components/ConnectWallet'), {
    ssr: false,
}) as any
const Home: NextPage = () => {
    
    return <ConnectWallet/>
}

export default Home
