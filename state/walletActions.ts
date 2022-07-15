import { NetworkType } from '@airgap/beacon-sdk'
import { TezosToolkit } from '@taquito/taquito'
import * as actions from './actionType'
import { login } from '../services/walletService'

export const connectWallet = ({ wallet, Tezos }:any) => {
  return async (dispatch:any) => {
    
      var payload = {user:{}}
      Tezos.setWalletProvider(wallet)
      let activeAccount = await wallet.client.getActiveAccount()
      if (!activeAccount) {
        await wallet.requestPermissions()
        activeAccount = await wallet.client.getActiveAccount()
      }
      const userAddress = await wallet.getPKH()
      await login(activeAccount.publicKey,wallet)
      payload.user = {
        address: userAddress,
      }
      dispatch(_walletConfig(payload.user))
    } 
  
}

export const _walletConfig = (user:any) => {
  return {
    type: actions.CONNECT_WALLET,
    user,
  }
}

export const disconnectWallet = ({ wallet, setTezos }:any) => {
  return async (dispatch:any) => {
    setTezos(new TezosToolkit('https://ithacanet.smartpy.io'))
    dispatch({
      type: actions.DISCONNECT_WALLET,
    })
    if (wallet) {
      await wallet.client.removeAllAccounts()
      await wallet.client.removeAllPeers()
      await wallet.client.destroy()
    }
  }
}

