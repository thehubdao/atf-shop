import { configureStore } from '@reduxjs/toolkit'

import basketReducer from "./basket"
import accountReducer from "./account"

const store =  configureStore({
  reducer: {
    basket: basketReducer,
    account: accountReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store