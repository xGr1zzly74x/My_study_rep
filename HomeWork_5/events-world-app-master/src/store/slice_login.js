import {createSlice} from "@reduxjs/toolkit"

const s_login = createSlice({
    name: 'all_store',
    initialState: {
        check: false,
        city: [],
        
    },
    reducers:{
        change_auth(state, action) {
            state.check = action.payload.check
        },

        add_city(state, action){
            state.city.push(action.payload)
        },

        del_city(state, action){
            state.city = []
        }
    }
})

export const {change_auth} = s_login.actions
export const {add_city}    = s_login.actions
export const {del_city}    = s_login.actions

export const auth_selector = {
    get_auth: (state) => state.auth.check
    //получение глобальной переменной
    //const now_login = useSelector(auth_selector.get_auth)
}

//слайс можно экспортить только дефолтным способом!
export default s_login

//Очистить sore -> localStorage
//localStorage.clear()


