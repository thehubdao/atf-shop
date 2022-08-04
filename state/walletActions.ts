import { NetworkType } from '@airgap/beacon-sdk'
import { MichelsonMap, TezosToolkit } from '@taquito/taquito'
import * as actions from './actionType'
import { login, wallet_instance, Tezos } from '../services/walletService'
import dynamic from 'next/dynamic'
const walletService = dynamic(
    () => import('../services/walletService') as any,
    {
        ssr: false,
    }
)

export const connectWallet = () => {
    return async (dispatch: any) => {
        try {
            let user = {}
            Tezos.setWalletProvider(wallet_instance)
            let activeAccount = await wallet_instance.client.getActiveAccount()
            if (!activeAccount) {
                await wallet_instance.requestPermissions({
                    network: {
                        type: NetworkType.CUSTOM,
                        rpcUrl: 'https://ghostnet.smartpy.io',
                    },
                })
                activeAccount = await wallet_instance.client.getActiveAccount()
            }
            const userAddress = await wallet_instance.getPKH()
            let { token, refreshToken } = await (walletService as any).login(
                activeAccount?.address,
                activeAccount?.publicKey,
                wallet_instance
            )
            user = {
                userAddress: userAddress,
                wallet_instance: wallet_instance,
                token,
                refreshToken,
            }
            dispatch(_walletConfig(user))
            /* Tezos.wallet
            .at('KT1KjBqutGmS7gJV4q8e8WYeN7Js2bxYgJYd')
            .then((c: any) => {
                let methods = c.parameterSchema.ExtractSignatures()
                console.log(JSON.stringify(methods, null, 2))
            })
            .catch((error: any) => console.log(`Error: ${error}`)) */
            //Mint NFT
            /* Tezos.wallet
                .at('KT1KRvqRLoDQCFLmLS3kkEunkBoirLVZ79VJ')
                .then(async (contract: any) => {
                    let { methods } = contract
                    let nftMetaData = new MichelsonMap({
                        prim: 'map',
                        args: [{ prim: 'string' }, { prim: 'bytes' }],
                    })
                    /*                 await methods
                .mint(
                    10,
                    nftMetaData,
                    1,
                    'tz1YFDoai1cLcDKP958RUdkQ7xdUsqhFjATJ'
                )
                .send()

            await methods
                .update_operators([
                    {
                        add_operator: {
                            owner: 'tz1YFDoai1cLcDKP958RUdkQ7xdUsqhFjATJ',
                            operator:
                                'KT1AixfDL1nuWD2fHfQ1DEtvwzhd7Rtj97WP',
                            token_id: 10,
                        },
                    },
                ])
                .send() */
            /*     Tezos.wallet
                        .at('KT1LqLtQsGy96SQwRERhYP4XuukF9L2tEpNT')
                        .then(async (contract: any) => {
                            let { methods } = contract
                                                    await methods
                        .approve('KT1AixfDL1nuWD2fHfQ1DEtvwzhd7Rtj97WP', 0)
                        .send()
                    await methods
                        .approve(
                            'KT1AixfDL1nuWD2fHfQ1DEtvwzhd7Rtj97WP',
                            100
                        )
                        .send() 

                            //Call marketplace contract
                                                       Tezos.wallet
                        .at('KT1AixfDL1nuWD2fHfQ1DEtvwzhd7Rtj97WP')
                        .then((contract: any) => {
                            let { methods } = contract

                            methods.addToMarketplace({regular:''},8,'KT1AixfDL1nuWD2fHfQ1DEtvwzhd7Rtj97WP',10,Date.now(),Date.now()+1,{general:''},'ATF',null,false)
    
    
                                
                        })  
                        })
                }) */
            /*             Tezos.wallet
                .at('KT1AixfDL1nuWD2fHfQ1DEtvwzhd7Rtj97WP')
                .then((contract: any) => {
                    let { methodsObject } = contract
                    console.log(
                        new Date(1659135449 * 1000).toISOString(),
                        new Date(1659221820 * 1000).toISOString()
                    )
                    console.log(
                        methodsObject
                            .addToMarketplace({
                                recipient: { general: '' },
                                swap_type: { regular: '' },
                                token_id: 20,
                                token_origin:
                                    'KT1KRvqRLoDQCFLmLS3kkEunkBoirLVZ79VJ',
                                token_price: 10,
                                start_time: new Date(
                                    1659135449 * 1000
                                ).toISOString(), //new Date(1659058945*1000).toISOString(),
                                end_time: new Date(
                                    1659221820 * 1000
                                ).toISOString(), //new Date(1659145320*1000).toISOString(),
                                token_symbol: 'ATF',
                                accepted_tokens: [],
                                is_multi_token: false,
                            })
                            .send()
                    )
                }) */
        } catch (error) {
            console.log(error)
            dispatch({
                type: actions.CONNECT_WALLET_ERROR,
            })
        }
    }
}

export const _walletConfig = (user: any) => {
    return {
        type: actions.CONNECT_WALLET,
        user,
    }
}

export const disconnectWallet = () => {
    return async (dispatch: any) => {
        dispatch({
            type: actions.DISCONNECT_WALLET,
        })
        if (wallet_instance) {
            await wallet_instance.client.clearActiveAccount()
        }
    }
}
