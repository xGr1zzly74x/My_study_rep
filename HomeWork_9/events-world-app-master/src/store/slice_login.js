import {createSlice} from "@reduxjs/toolkit"

const s_login = createSlice({
    name: 'all_store',
    initialState: {
        auth: false,
        theme: false,
        
    },
    reducers:{
        change_auth(state, action) {
            state.auth = action.payload.auth
        },
        change_theme(state, action){
            state.theme = action.payload.theme
        }
    }
})

export const {change_auth}  = s_login.actions
export const {change_theme} = s_login.actions

export const auth_selector = {
    get_auth: (state) => state.all_store.auth
}

export const theme_selector = {
    get_theme: (state) => state.all_store.theme
}

//слайс можно экспортить только дефолтным способом!
export default s_login

//Очистить sore -> localStorage
//localStorage.clear()

//получение глобальной переменной
//const now_login = useSelector(auth_selector.get_auth)


