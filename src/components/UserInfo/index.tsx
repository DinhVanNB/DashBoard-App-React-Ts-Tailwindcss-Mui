import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux"
import useValidate from "../../hooks/useValidate"
import validateSchema from "../../utils/validate/validateSchema"
import { setAccessToken, setAppToast, setLoading } from "../../redux/appSlice"
import { editUserInfo, fetchUserInfo } from "../../redux/userSlice"
import userApi from "../../api/userApi"
import {useEffect} from 'react'
import UserProfile from "./UserProfile";
import UserDetails from "./UserDetails";
import { useSearchParams } from "react-router-dom";



export default function UserInfo(){
    const [searchParams] =useSearchParams()
    const paramsSearch:string = '?' + searchParams.toString()
    useEffect(()=>{ 
        handleGetUser(paramsSearch)
        // eslint-disable-next-line 
    },[paramsSearch])

    const dispatch = useDispatch();
    const {language} = useSelector((state:RootState)=>state.appState)
    const {singleUser:user} = useSelector((state:RootState)=>state.user)
    const valid:any= useValidate({
        initialData:{
            firstName: '',
            lastName:'',
            email:'',
            phone:'',
        },
        dataSet:user,
        language,
        formId: 'formEdit',
        onError:(err:any)=> dispatch(setAppToast(err)), 
        validateSchema :validateSchema,
        onSubmit: (data:any)=>handleEdit(data),
    })


    const handleGetUser=async(params:string)=>{
        try{
            dispatch(setLoading(true))
            const {status, result}= await userApi.onGetUserById(params);
            if(result?.data?.transaction && result?.data?.transaction !=='') dispatch(setAccessToken(result.data.transaction));
            if(status>300) dispatch(setAppToast({status, message: result.message}));
            if(status===200) dispatch(fetchUserInfo(result?.data?.data))
            dispatch(setLoading(false))
        }
        catch(e){
            dispatch(setAppToast({message:`Connect error!!`, status:403}))
            dispatch(setLoading(false))
        }
      }
    
      const handleEdit =async(data:any)=>{
        try{
            dispatch(setLoading(true))
            const {status, result} = await userApi.onEdit(data);
            if(result?.data?.transaction && result?.data?.transaction !=='') dispatch(setAccessToken(result.data.transaction));
            dispatch(setAppToast({status, message: result.message}));
            if(status===201) dispatch(editUserInfo(result?.data?.data))
            dispatch(setLoading(false))
        }
        catch(e){
            dispatch(setAppToast({message:`Connect error!!`, status:403}))
            dispatch(setLoading(false))
        }
      }

    return(
        <Grid container spacing={3}>
            <Grid item xs={12} md={4} >
                <UserProfile valid={valid}  user={user}/> 
            </Grid>
            <Grid item xs={12} md={8} >
                <UserDetails valid={valid} user={user}/>
            </Grid>
        </Grid>
    )
}

