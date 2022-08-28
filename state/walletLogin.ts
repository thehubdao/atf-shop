import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    walletLogin: {}
}

export const walletLoginSlice = createSlice({
    name: 'walletLogin',
    initialState,
    reducers: {
        setWalletLogin: (state, { payload }) => {
            state.walletLogin = payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setWalletLogin } =
    walletLoginSlice.actions

export default walletLoginSlice.reducer
