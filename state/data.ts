import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    nfts: [],
    events: [],
    metaverseEvents: [],
    apparel: []
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setNFTs: (state, { payload }) => {
            state.nfts = payload
        },
        setEvents: (state, { payload }) => {
            state.events = payload
        },
        setMetaverseEvents: (state, { payload }) => {
            state.metaverseEvents = payload
        },
        setApparel: (state, { payload }) => {
            state.apparel = payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setNFTs, setEvents, setMetaverseEvents, setApparel } =
    dataSlice.actions

export default dataSlice.reducer
