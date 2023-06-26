import { useEffect } from "react";
import { useLocation } from "react-router-dom"
import {useDispatch} from 'react-redux'
import { setAppState } from "../../redux/appSlice";


const ScrollTop=()=>{
    const {pathname} = useLocation();
    const dispatch = useDispatch();

    useEffect(()=>{
        window.scrollTo({
            top:0,
            left:0,
            behavior:'smooth'
        });
        dispatch(setAppState(pathname))
    },[pathname, dispatch])

    return null
}

export default ScrollTop;