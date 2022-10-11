/** @type {import('next').NextConfig} */
module.exports = {
    images: {
        domains: ['gateway.pinata.cloud', 'ipfs.io', 'images.unsplash.com'],
    },
    typescript: { ignoreBuildErrors: true },
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
                    'https://prod.alltokenfootball.com/api/loginGetNonce',
            },
            {
                source: '/api/loginWallet',
                destination:
                    'https://prod.alltokenfootball.com/api/loginWallet',
            },
            {
                source: '/api/validate-token',
                destination:
                    'https://prod.alltokenfootball.com/api/validate-token',
            },
            {
                source: '/api/nfts',
                destination: 'https://prod.alltokenfootball.com/api/nfts',
            },
            {
                source: '/api/nft/:id',
                destination: 'https://prod.alltokenfootball.com/api/nft/:id',
            },
            {
                source: '/api/metaverseEvents',
                destination:
                    'https://prod.alltokenfootball.com/api/events/metaverse',
            },
            {
                source: '/api/apparels',
                destination:
                    'https://prod.alltokenfootball.com/api/apparels',
            },
            {
                source: '/api/events',
                destination: 'https://prod.alltokenfootball.com/api/events',
            },
        ]
    },
}
