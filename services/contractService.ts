import { MichelsonMap, TezosToolkit } from '@taquito/taquito'
import { char2Bytes } from '@taquito/utils'
import axios from 'axios'
import { useAppDispatch, useAppSelector } from '../state/hooks'
import { Tezos } from './walletService'

let wallet_public_key = process.env.WALLET_PUBLIC_KEY
let marketplace_contract_address = process.env.MARKETPLACE_CONTRACT_ADDRESS
let atf_token_contract_address = process.env.ATF_TOKEN_CONTRACT_ADDRESS
let ap_token_contract_address = process.env.ACTION_CONTRACT_ADDRESS
let marketplace_contract = Tezos.wallet.at(marketplace_contract_address!)
let atf_token_contract = Tezos.contract.at(atf_token_contract_address!)
let ap_token_contract = Tezos.contract.at(ap_token_contract_address!)

export const getAPBalance = async (token: any) => {
    let rtr
    try {
        rtr = await axios.get('/api/getAPBalance?', { params: { token } })
    } catch (err) {}
    if (rtr) {
        return rtr.data.balance
    }
    return 0
}

export const getATFBalance = async (token: any) => {
    let rtr
    try {
        rtr = await axios.get('/api/getATFBalance?', { params: { token } })
    } catch (err) {}
    if (rtr) {
        return  rtr.data.balance
    }
    return 0
}

export const buyNfts = async ({ nfts, address, totalAP, totalATF }: any) => {
    try {
        let jwt = await axios.post('api/login', {
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD,
        })
        jwt = jwt.data.token
        let { methodsObject } = await marketplace_contract
        let atf_token_methods = (await atf_token_contract).methodsObject
        let ap_token_methods = (await ap_token_contract).methodsObject
        const config = {
            headers: { Authorization: `Bearer ${jwt}` },
        }
        let batch = Tezos.wallet.batch([])
        totalATF != 0 &&
            batch
                .withContractCall(
                    atf_token_methods.approve({
                        value: 0,
                        spender: marketplace_contract_address,
                    }) as any
                )
                .withContractCall(
                    atf_token_methods.approve({
                        value: Math.round(totalATF * 10**5),
                        spender: marketplace_contract_address,
                    }) as any
                )
                console.log(totalAP,totalAP * 10**5)
        totalAP != 0 &&
            batch
                .withContractCall(
                    ap_token_methods.approve({
                        value: 0,
                        spender: marketplace_contract_address,
                    }) as any
                )
                .withContractCall(
                    ap_token_methods.approve({
                        value: Math.round(totalAP * 10**5),
                        spender: marketplace_contract_address,
                    }) as any
                )
        nfts.forEach((nft: any) => {
            console.log(nft,nft.Detail.detail.swap_id)
            batch.withContractCall(
                methodsObject.collect({
                    to_: address,
                    amount_ft: nft.Detail.detail.priceATF
                        ? Math.round(nft.Detail.detail.priceATF * 10**5)
                        : Math.round(nft.Detail.detail.priceAP * 10**5),
                    token_symbol: nft.Detail.detail.priceATF ? 'ATF' : 'AP',
                    swap_id: nft.Detail.detail.swap_id,
                }) as any
            )
        })

        await (await batch.send()).confirmation()
        nfts.forEach(async (nft: any) => {
            console.log(nft)
            try {
                await axios.delete('/api/nft/' + nft.Detail.id_detail, config)
            } catch (error) {}
        })

        return true
    } catch(err) {
        console.log(err)
        return false
    }
}
