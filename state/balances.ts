import { createSlice } from '@reduxjs/toolkit'
 

const initialState = { balances: {
    atfBalance: 0,
    apBalance: 0,
} }

export const balanceSlice = createSlice({
    name: 'balances',
    initialState,
    reducers: {
        setBalances: (state, { payload }) => {
            state.balances = payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setBalances, } =
balanceSlice.actions

export default balanceSlice.reducer
