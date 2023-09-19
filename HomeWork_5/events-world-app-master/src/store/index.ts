import { configureStore } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import {persistReducer} from "redux-persist"
import { combineReducers } from "@reduxjs/toolkit"
import slice_login from "../store/slice_login"

const persistConfig = {
    key: "root",
    version: 1,
    storage
}

//Для сохранения state при обновлении страницы
const reducer = combineReducers({
    auth: slice_login.reducer
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
    reducer: {
    reducer: persistedReducer}
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>