import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : 'user',
    initialState:{
        userInfo:{}
    },

    reducers :{
        fetchUser(state , action){
            const storedUser = JSON.parse(localStorage.getItem('user'));
            state.userInfo = storedUser || action.payload;
        },
        clearUser(state ){
            state.userInfo ={}
            localStorage.removeItem('user')
        },
        changeUserBalance(state , action){
            state.userInfo.balance = action.payload
            localStorage.setItem('user', JSON.stringify(state.userInfo));
        }
    }
})

export const {fetchUser ,clearUser , changeUserBalance} = userSlice.actions 
export default userSlice.reducer