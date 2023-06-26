import { Button, Checkbox, FormControlLabel, FormHelperText, Grid, IconButton, InputAdornment, Link, OutlinedInput, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import {Link as RouterLink, useNavigate } from "react-router-dom";
import { routes } from "../../configs/routes";
import { VisibilityIcon, VisibilityOffIcon } from "../../configs/constant";
import SocialButton from "./SocialButton";
import {useSelector, useDispatch} from 'react-redux'
import useValidate from "../../hooks/useValidate";
import validateSchema from "../../utils/validate/validateSchema";
import { clearAccessToken, setAccessToken, setAppToast, setLoading } from "../../redux/appSlice";
import { logIn, logOut, toggleRemember } from "../../redux/userSlice";
import userApi from "../../api/userApi";



const FormLogin =()=>{
    const [showPass, setShowPass] = useState(false);
    const {isLogin, isRemember, userLogin} =useSelector((state:RootState)=>state.user)
    const {language} =useSelector((state:RootState)=>state.appState)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {errors, resetForm, handleBlur, handleChange, handleSubmit} =
     useValidate({
        language:language,
        initialData:{
            email:'',
            password:''
        },
        formId: 'formLogin',
        validateSchema: validateSchema,
        onError:(err:{})=>dispatch(setAppToast(err)),
        onSubmit: (data:{})=>handleLogin(data),
        dataSet: isRemember? userLogin: null
    })

    const handleLogin = async(data:{})=>{
        try{
            dispatch(setLoading(true))
            const {result, status} = await userApi.onLogin(data)
            if(status>300) dispatch(setAppToast({message:result.message,status}));
            if(status===200){
                dispatch(logIn({...result.data,...data}));
                dispatch(setAccessToken(result.accessToken));
                resetForm();
                navigate(routes.dashboard.path)
            }
            dispatch(setLoading(false))
        }
        catch(e){
            dispatch(setAppToast({message:`Can't connect to server`, status:403}))
        }
    }

    const handleLogout = async()=>{
        try{
            const {result , status} = await userApi.onLogout();
            dispatch(setAppToast({message:result.message,status}))
            dispatch(logOut())
            dispatch(clearAccessToken())
        }
        catch(e){
            dispatch(setAppToast({message:`Connect error!!`, status:403}))
        }
    }


    return(
        <>
            <Stack mb={3} direction='row' className="justify-between items-center" >
                <Typography variant="h3">
                    Login
                </Typography>
                <Link component={RouterLink} underline="hover" to={routes.register.path}>
                    {`Don't have an account?`}
                </Link>
            </Stack>
            <form id="formLogin"  onSubmit={handleSubmit}>
                <Grid container gap={3}>
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <label htmlFor="email-sigin"  >
                                Email Address
                            </label>
                            <OutlinedInput 
                                disabled={isLogin}
                                fullWidth
                                id="email-sigin"
                                name="email"
                                type="text"
                                placeholder="demo@company.com"
                                error={errors.email ? true: false}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            {
                                errors.email  && (
                                    <FormHelperText error>
                                        {errors.email}
                                    </FormHelperText>
                                )
                            }
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <label htmlFor="pass-sigin">
                            Password
                            </label>
                            <OutlinedInput
                                disabled={isLogin}
                                id="pass-sigin"
                                name="password"
                                type={showPass? "text": "password"}
                                fullWidth
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={errors.password? true:false}
                                placeholder="******"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            size="medium"
                                            edge="end"
                                            onClick={()=>setShowPass(prev=>!prev)}
                                        >
                                            {
                                                showPass ? 
                                                <VisibilityOffIcon/>
                                                :
                                                <VisibilityIcon/>
                                            }
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            {
                                errors.password && (
                                    <FormHelperText error>
                                        {errors.password}
                                    </FormHelperText>
                                )
                            }
                        </Stack>
                    </Grid>

                    <Grid item xs={12}>
                        <Stack direction="row" className=" justify-between items-center">
                            <FormControlLabel onClick={()=>dispatch(toggleRemember())} control={<Checkbox checked={isRemember} color="primary" />} label="Remember me"/>
                            <Typography className=" text-blue-500 cursor-pointer hover:underline">
                                Forgot password?
                            </Typography>
                        </Stack>
                    </Grid>

                    <Grid item xs={12}>
                        {
                            isLogin?
                            <Button
                                onClick={handleLogout}
                                color="primary"
                                fullWidth
                                size="large"
                                disableElevation
                                type="button"
                                variant="contained"
                            >
                                Logout
                            </Button>
                            :
                            <Button
                                color="primary"
                                fullWidth
                                size="large"
                                disableElevation
                                type="submit"
                                variant="contained"
                            >
                                Login
                            </Button>
                        }
                    </Grid>

                    <SocialButton caption="Login with"/>
                </Grid>
            </form>
        </>
        
    )
}

export default FormLogin;