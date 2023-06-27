import {createSlice, current} from '@reduxjs/toolkit';

interface typeState {
    userLogin:any
    singleUser:any
    isLogin:boolean
    isRemember:boolean
}

const initialState:typeState ={
    userLogin:{},
    singleUser:{},
    isLogin:false,
    isRemember:false
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        logIn:(state,action)=>{
            state.userLogin = action.payload;
            state.isLogin = true;
        },
        logOut:(state)=>{
            state.isLogin = false;
            const {isRemember} = current(state)
            if(!isRemember){
                state.userLogin={}
            }
        },
        toggleRemember:(state)=>{
            const {isRemember} = current(state)
            state.userLogin={}
            state.isRemember = !isRemember 
            
        },
        fetchUserInfo: (state,action) =>{
            state.singleUser = action.payload
        },
        editUserInfo:(state,action)=>{
            const {userLogin} = current(state)
            if(userLogin.id === action.payload.id) state.userLogin ={...action.payload}
            state.singleUser = action.payload;
            state.isLogin = true
        }
    }
});


export const {logIn, logOut, toggleRemember, fetchUserInfo, editUserInfo} = userSlice.actions;

export default userSlice.reducer;