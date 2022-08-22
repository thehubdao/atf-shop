import {
    combineReducers,
    configureStore,
    getDefaultMiddleware,
} from '@reduxjs/toolkit'

import basketReducer from './basket'
import persistedReducer from './wallet'

const combinedReducer = combineReducers({
    basket: basketReducer,
    account: persistedReducer,
})

const rootReducer = (state: any, action: any) => {
    console.log(action.type, "ACTION")
    if (action.type === 'basket/restartBasket') {
        console.log("RESTART BASKET")
        const { persistedReducer } = state
        state = { persistedReducer }
    }
    return combinedReducer(state, action)
}

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
