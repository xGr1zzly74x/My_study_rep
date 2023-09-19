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

export const auth_selector = {
    get_auth: (state) => state.auth.check
    //получение глобальной переменной
    //const now_login = useSelector(auth_selector.get_auth)
}

//слайс можно экспортить только дефолтным способом!
export default s_login


