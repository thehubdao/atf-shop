import { MichelsonMap, TezosToolkit } from '@taquito/taquito'
import { char2Bytes } from '@taquito/utils'
import axios from 'axios'
import { Tezos } from './walletService'

let wallet_public_key = process.env.WALLET_PUBLIC_KEY
let nft_contract_address = process.env.NFT_CONTRACT_ADDRESS
let marketplace_contract_address = process.env.MARKETPLACE_CONTRACT_ADDRESS
let nft_contract = Tezos.contract.at(nft_contract_address!)
let marketplace_contract = Tezos.wallet.at(marketplace_contract_address!)
let atf_token_contract_address = process.env.ATF_TOKEN_CONTRACT_ADDRESS
let atf_token_contract = Tezos.contract.at(atf_token_contract_address!)

export const getAPBalance = async (address: any) => {
    let { ledger }: any = await (
        await Tezos.contract.at(process.env.ACTION_CONTRACT_ADDRESS!)
    ).storage()
    let rtr
    try {
        rtr = await ledger.get(address + '')
    } catch (err) {}
    if (rtr != undefined) {
        return rtr.toNumber()
    }
    return 0
}

export const getATFBalance = async (address: any) => {
    let { ledger }: any = await (
        await Tezos.contract.at(process.env.ATF_TOKEN_CONTRACT_ADDRESS!)
    ).storage()

    let rtr
    try {
        rtr = await ledger.get(address + '')
    } catch (err) {}
    if (rtr != undefined) {
        return rtr.toNumber()
    }
    return 0
}

export const buyNfts = async ({ nfts, jwt, address }: any) => {
    try {
        let { methodsObject } = await marketplace_contract
        let tokensMethodsObject = (await atf_token_contract).methodsObject
        const config = {
            headers: { Authorization: `Bearer ${jwt}` },
        }
        let batch = Tezos.wallet.batch([])
        let total: number = 0
        nfts.forEach((nft: any) => {
             total += nft.Detail.detail.priceATF
                ? nft.Detail.detail.priceATF
                : nft.Detail.detail.priceAP
            batch.withContractCall(
                methodsObject.collect({
                    to_: address,
                    amount_ft: nft.Detail.detail.priceATF
                        ? nft.Detail.detail.priceATF
                        : nft.Detail.detail.priceAP,
                    token_symbol: nft.Detail.detail.priceATF ? 'ATF' : 'AP',
                    swap_id: nft.Detail.detail.swap_id,
                }) as any
            )
        })
        batch
            .withContractCall(
                tokensMethodsObject.approve({
                    value: 0,
                    spender: marketplace_contract_address,
                }) as any
            )
            .withContractCall(
                tokensMethodsObject.approve({
                    value: total,
                    spender: marketplace_contract_address,
                }) as any
            )
        await (await batch.send()).confirmation()
        nfts.forEach(async (nft: any) => {
            console.log(nft, config.headers.Authorization)
            try {
                await axios.delete('/api/nft/' + nft.id_product, config)
            } catch (error) {}
        })
        return true
    } catch {
        return false
    }
}
