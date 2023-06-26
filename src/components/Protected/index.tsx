import React, { useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import userApi from "../../api/userApi";
import { logOut } from "../../redux/userSlice";
import { clearAccessToken } from "../../redux/appSlice";
import { Navigate } from "react-router-dom";
import { routes } from "../../configs/routes";


interface ChildType {
    children: React.ReactElement
} 

const Protected =({children}: ChildType)=>{
    const {message} = useSelector((state:RootState)=>state.appState)
    const {isLogin} = useSelector((state:RootState)=>state.user)
    const dispatch  = useDispatch();
    const validMessage= (message==='Please relog account!!'|| message==='Your account loged other client!!')

    useEffect(()=>{(async()=>{
        if(validMessage){
            await userApi.onLogout();
            dispatch(logOut())
            dispatch(clearAccessToken())
        }
    })()
    },[validMessage,dispatch])

   
    return isLogin?  children : <Navigate to={routes.login.path} replace={true}/>
}

export default Protected;