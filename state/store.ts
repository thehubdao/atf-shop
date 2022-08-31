import {
    combineReducers,
    configureStore,
    getDefaultMiddleware,
} from '@reduxjs/toolkit'

import basketReducer from './basket'
import dataReducer from './data'
import persistedReducer from './wallet'
import walletLoginReducer from './walletLogin'
import balancesReducer from './balances'
const store = configureStore({
    reducer: {
        basket: basketReducer,
        account: persistedReducer,
        data: dataReducer,
        walletLogin: walletLoginReducer,
        balance: balancesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false,
        }),
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
