import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const WertWrap = dynamic(() => import('../components/WertWrap'), {
    ssr: false,
}) as any

const Home: NextPage = () => {

    return <WertWrap/>
}

export default Home
