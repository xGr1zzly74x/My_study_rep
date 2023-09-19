import { configureStore } from "@reduxjs/toolkit"
import {slice_login} from "./slice_login"

export const store = configureStore({
    reducer: {
        auth: slice_login
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState   = ReturnType<typeof store.getState>;