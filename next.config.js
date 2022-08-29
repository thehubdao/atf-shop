/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    typescript: { ignoreBuildErrors: true },
    images: {
        domains: ['gateway.pinata.cloud', 'ipfs.io'],
    },
    env:{
        WERT_PARTNER_ID: process.env.WERT_PARTNER_ID,
        WERT_ORIGIN: process.env.WERT_ORIGIN,
        TOKEN_CONTRACT_ADDRESS: process.env.TOKEN_CONTRACT_ADDRESS,
        WERT_PRIVATE_KEY: process.env.WERT_PRIVATE_KEY,
        SWAP_CONTRACT_ADDRESS:process.env.SWAP_CONTRACT_ADDRESS,
    },
    async redirects() {
        return [
            {
                source: '/docs/mghdao_engl_whitepaper.pdf',
                destination: '/docs/mgh_whitepaper_v3.pdf',
                permanent: true,
            },
            {
                source: '/wp-content/uploads/2021/06/mghdao_engl_whitepaper_20210626_print-1.pdf',
                destination: '/docs/mgh_whitepaper_v3.pdf',
                permanent: true,
            },
            {
                source: '/valuation',
                destination: 'https://app.metagamehub.io/valuation',
                permanent: true,
            },
        ]
    },
    async rewrites() {
        return [
            {
                source: '/api/loginGetNonce',
                destination: 'https://atf-test.backendboyz.repl.co/api/loginGetNonce',
            },
            {
                source: '/api/loginWallet',
                destination: 'https://atf-test.backendboyz.repl.co/api/loginWallet',
            },
            {
                source: '/api/validate-token',
                destination: 'https://atf-test.backendboyz.repl.co/api/validate-token',
            }
        ]
    },
}
