import { Box, Button, FormHelperText, FormLabel, Grid, IconButton, InputAdornment, Link, OutlinedInput, Stack, Typography } from "@mui/material";
import { useState } from "react";
import {useSelector , useDispatch} from 'react-redux';
import { routes } from "../../configs/routes";
import {Link as RouterLink} from 'react-router-dom';
import SocialButton from "./SocialButton";
import useValidate from "../../hooks/useValidate";
import { setAppToast, setLoading } from "../../redux/appSlice";
import validateSchema from "../../utils/validate/validateSchema";
import userApi from "../../api/userApi";
import { VisibilityIcon, VisibilityOffIcon } from "../../configs/constant";

const FormRegister =()=>{
    const [showPass, setShowPass] = useState(false)
    const {language} = useSelector((state:RootState)=>state.appState)
    const dispatch = useDispatch();

    const {errors, data, setErrors, resetForm, handleBlur, handleChange, handleSubmit} =useValidate({
        initialData:{
            firstName: '',
            lastName:'',
            email:'',
            password:'',
            comfirmPassword:'',
            phone:'',
        },
        language,
        formId: 'formRegister',
        validateSchema :validateSchema,
        onError:(err:{})=> dispatch(setAppToast(err)), 
        onSubmit: (data:{})=> hanldeRegister(data),
        onBlur: (data:object, error:string, name:string) =>{if(error==='' && name==='email') handleCheckMail(data)}
    
    })

    const hanldeRegister = async(data:{}) =>{
        try{
            dispatch(setLoading(true))
            const {status, result} = await userApi.onRegister(data);
            dispatch(setAppToast({status, message: result.message}));
            status===201 && resetForm();
            dispatch(setLoading(false))
        }
        catch(e){
            dispatch(setAppToast({message:`Connect error!!`, status:403}))
            dispatch(setLoading(false))
        }
    
       
    };

    const handleCheckMail = async(data:object)=>{
        try{
            const {result} = await userApi.onCheckExistEmail(data);
            setErrors({...errors,email:result.message})
        }
        catch(e){
            
        }
    };

    return(
        <>
            <Stack mb={3} direction='row' className="justify-between items-center" >
                    <Typography variant="h3">
                        Register
                    </Typography>
                    <Link component={RouterLink} underline="hover" to={routes.login.path}>
                        {`Already have an account?`}
                    </Link>
                </Stack>
            <form id='formRegister'  onSubmit={handleSubmit}>
                <Grid container spacing={2} >
                    <Grid item xs={12} md={6} >
                        <Stack spacing={1}>
                            <label htmlFor="firstName-sigup">First Name*</label>
                            <OutlinedInput
                                type="text"
                                id="firstName-sigup"
                                name="firstName"
                                placeholder="John"
                                fullWidth
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error = {errors.firstName ? true : false}
                            />
                            {errors.firstName && (
                                <FormHelperText error >
                                    {errors.firstName}
                                </FormHelperText>
                            )}
                        </Stack>
                    </Grid>
                    <Grid  item xs={12} md={6} >
                        <Stack spacing={1}>
                            <label htmlFor="lastName-sigup">Last Name*</label>
                            <OutlinedInput
                                type="text"
                                id="lastName-sigup"
                                name="lastName"
                                placeholder="Doe"
                                fullWidth
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error = {errors.lastName ? true : false}
                            />
                            {errors.lastName && (
                                <FormHelperText error>
                                    {errors.lastName}
                                </FormHelperText>
                            )}
                        </Stack>
                    </Grid> 
                    
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <label htmlFor="email-sigup">Email*</label>
                            <OutlinedInput
                                fullWidth
                                id='email-sigup'
                                name="email"
                                type='text'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                placeholder="demo@company.com"
                                error={errors.email && errors.email!=='Email can use!!' ? true: false}
                            />
                            {errors.email && (
                                <FormHelperText error={ errors.email!=='Email can use!!' ? true: false} >
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </Stack>
                    </Grid>

                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <label htmlFor="password-signup">Password*</label>
                            <OutlinedInput
                                fullWidth
                                id="password-signup"
                                type={showPass ? 'text' : 'password'}
                                name="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={errors.password ? true: false}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={()=>setShowPass(prev=>!prev)}
                                            edge="end"
                                            size='medium'
                                        >
                                            {showPass ?  <VisibilityIcon />:<VisibilityOffIcon /> }
                                        </IconButton>
                                    </InputAdornment>
                                }
                                placeholder="******"
                            />
                            { errors.password && (
                                <FormHelperText error >
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </Stack>
                    </Grid>

                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <label htmlFor="passwordComfirm-signup">Comfirm Password*</label>
                            <OutlinedInput
                                fullWidth
                                id="passwordComfirm-signup"
                                type='password'
                                name="comfirmPassword"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                placeholder="******"
                                error={errors.comfirmPassword ? true: false}
                            />
                            { errors.comfirmPassword && (
                                <FormHelperText error >
                                    { errors.comfirmPassword }
                                </FormHelperText>
                            )}
                        </Stack>
                    </Grid>

                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <label htmlFor="phone-signup">Phone*</label>
                            <OutlinedInput
                                fullWidth
                                id="phone-signup"
                                type='text'
                                name="phone"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                error={errors.phone ? true: false}
                            />
                            { errors.phone && (
                                <FormHelperText error >
                                    {errors.phone}
                                </FormHelperText>
                            )}
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <label htmlFor="address-signup">Address</label>
                            <OutlinedInput
                                fullWidth
                                id="address-signup"
                                type='text'
                                name="address"
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                            
                        </Stack>
                    </Grid>

                    <Grid item  xs={12}>
                        <FormLabel  id="label-controlled-radio-buttons-group" >Gender</FormLabel>                   
                        <Box>
                            <input  type="radio" id="genderNam" name="gender" value='Nam' onChange={handleChange} onBlur={handleBlur}/>
                            &nbsp;
                            <label htmlFor="genderNam">Nam</label>
                            &nbsp;&nbsp;&nbsp;
                            <input defaultChecked  type="radio" name="gender" id="genderNu" value='Nữ' onChange={handleChange} onBlur={handleBlur}/>
                            &nbsp;
                            <label htmlFor="genderNu">Nữ</label>
                        </Box>
                        <IconButton  
                            onChange={handleChange}
                            onBlur={handleBlur} 
                            component="label"
                            color="primary"
                            sx={{fontSize:'13px'}}
                        >
                            { data?.image?.['0']?.name || 'Upload Avatar' } 
                            <input
                                hidden
                                accept="image/*"
                                name="image"
                                type="file"
                            />
                        </IconButton>
                        
                    </Grid>
                    <Grid item xs={12}>
                        <Typography  variant="body2">
                            By Signing up, you agree to our &nbsp;
                            <u style={{cursor:'pointer', color:'blue'}}>
                                Terms of Service
                            </u>
                            &nbsp; and &nbsp;
                            <u style={{cursor:'pointer', color:'blue'}}>
                                Privacy Policy
                            </u>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            disableElevation
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Create Account
                        </Button>
                    </Grid>
                    <SocialButton caption="Register with"/>
                </Grid>
            </form>
        </>

    )
}

export default FormRegister;