/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode:true,
    swcMinify:true,
    images: {
        domains: ['gateway.pinata.cloud', 'ipfs.io', 'images.unsplash.com'],
    },
/*     typescript: { ignoreBuildErrors: true }, */
    env: {
        WERT_PARTNER_ID: process.env.WERT_PARTNER_ID,
        WERT_ORIGIN: process.env.WERT_ORIGIN,
        TOKEN_CONTRACT_ADDRESS: process.env.TOKEN_CONTRACT_ADDRESS,
        WERT_PRIVATE_KEY: process.env.WERT_PRIVATE_KEY,
        ACTION_CONTRACT_ADDRESS: process.env.ACTION_CONTRACT_ADDRESS,
        ATF_CONTRACT: process.env.ATF_CONTRACT,
        WALLET_PRIVATE_KEY: process.env.WALLET_PRIVATE_KEY,
        WALLET_PUBLIC_KEY: process.env.WALLET_PUBLIC_KEY,
        NFT_CONTRACT_ADDRESS: process.env.NFT_CONTRACT_ADDRESS,
        MARKETPLACE_CONTRACT_ADDRESS: process.env.MARKETPLACE_CONTRACT_ADDRESS,
        ATF_TOKEN_CONTRACT_ADDRESS: process.env.ATF_TOKEN_CONTRACT_ADDRESS,
        SWAP_CONTRACT_ADDRESS: process.env.SWAP_CONTRACT_ADDRESS,
        AP_TOKEN_CONTRACT_ADDRESS: process.env.AP_TOKEN_CONTRACT_ADDRESS,
        ADMIN_EMAIL: process.env.ADMIN_EMAIL,
        ADMIN_USERNAME: process.env.ADMIN_USERNAME,
        ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
        WEB3AUTH_PROJECT_ID: process.env.WEB3AUTH_PROJECT_ID,
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
                destination:
                    'https://atf-test.backendboyz.repl.co/api/loginGetNonce',
            },
            {
                source: '/api/loginWallet',
                destination: 'https://atf-test.backendboyz.repl.co/api/loginWallet',
            },
            {
                source: '/api/validate-token',
                destination:
                    'https://atf-test.backendboyz.repl.co/api/validate-token',
            },
            {
                source: '/api/nfts',
                destination: 'https://atf-test.backendboyz.repl.co/api/nfts',
            },
            {
                source: '/api/nft/:id',
                destination: 'https://atf-test.backendboyz.repl.co/api/nft/:id',
            },
            {
                source: '/api/metaverseEvents',
                destination:
                    'https://atf-test.backendboyz.repl.co/api/events/metaverse',
            },
            {
                source: '/api/apparels',
                destination: 'https://atf-test.backendboyz.repl.co/api/apparels',
            },
            {
                source: '/api/events',
                destination: 'https://atf-test.backendboyz.repl.co/api/events',
            },
            {
                source: '/api/get-users',
                destination: 'https://atf-test.backendboyz.repl.co/api/get-users',
            },
            {
                source: '/api/login',
                destination: 'https://atf-test.backendboyz.repl.co/api/login',
            },
            {
                source: '/api/getAPBalance',
                destination:
                    'https://atf-test.backendboyz.repl.co/api/getAPBalance',
            },
            {
                source: '/api/getATFBalance',
                destination:
                    'https://atf-test.backendboyz.repl.co/api/getATFBalance',
            },
            {
                source: '/api/user/update',
                destination: 'https://atf-test.backendboyz.repl.co/api/user/update',
            },
        ]
    },
}
