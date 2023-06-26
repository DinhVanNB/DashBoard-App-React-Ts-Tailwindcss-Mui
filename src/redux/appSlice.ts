import {createSlice} from '@reduxjs/toolkit'

const appSlice = createSlice({
    name:'appState',
    initialState:{
        accessToken:'',
        stateRoutes:'dashboard',
        language:'vi',
        message:'',
        status:0,
        isLoading:false
    },
    reducers:{
        setAccessToken:(state,action)=>{
            state.accessToken = action.payload
        },
        clearAccessToken: (state)=>{
            state.accessToken = ''
        },
        setAppState: (state, action)=>{
            state.stateRoutes = action.payload;
        },
        setAppToast: (state,action)=>{
            state.message = action.payload.message
            state.status = action.payload.status
        },
        toggleLanguage: (state)=>{
            state.language = state.language==='vi'? 'en': 'vi'
        },
        setLoading: (state,action)=>{
            state.isLoading = action.payload
        }
    }
});

export const {setAccessToken, clearAccessToken, setAppToast, setAppState,toggleLanguage , setLoading} = appSlice.actions;

export default appSlice.reducer;