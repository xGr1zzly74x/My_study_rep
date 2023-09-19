import {createSlice} from "@reduxjs/toolkit"

const s_login = createSlice({
    name: 'auth',
    initialState: {
        check: false,
        
    },
    reducers:{
        change_auth(state, action) {
            state.check = action.payload.check
        }
    }
})

export const {change_auth} = s_login.actions
export const {slice_login} = s_login.reducer


