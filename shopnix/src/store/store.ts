import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as formReducer } from 'redux-form';
import reducerIsAuth from './reducers/UserSlice';
import reducerGoods from "./reducers/GoodsSlice";

const rootReducer = combineReducers({
  isAuth: reducerIsAuth,
    goods: reducerGoods,
    form: formReducer,
})


export const store = configureStore({
  reducer: rootReducer
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type AddSelector = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AddDispatch = typeof store.dispatch

