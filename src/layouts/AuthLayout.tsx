import { Outlet } from "react-router-dom"
import ScrollTop from "../components/ScrollTop";
import { AuthFooter, AuthHeader } from "../components/Auth";
import { Container, Grid, alpha } from "@mui/material";
import { logoImg } from "../configs/constant";


const AuthLayout =()=>{
    
    return(
        <Grid 
            container 
            direction="column"
            justifyContent="space-between" 
            className=" min-h-screen"
            sx={{
                background:`linear-gradient(0.45turn, #fafafb 0%, rgba(249,249,250,0.7) 100% ), -20%/contain no-repeat url(${logoImg})`
            }}
        >
            <ScrollTop/>
            <Grid item xs={12}>
                <AuthHeader/>
            </Grid>
            <Grid item xs={12}>
                <Container 
                    maxWidth='xs' 
                    sx={{
                        boxShadow:`0px 2px 8px ${alpha('rgb(67,67,67)', 0.15)}`,
                        pb:3,
                        pt:3,
                        bg:'#fff',
                        borderRadius:'1vmin'
                    }}

                >
                    <Outlet/>
                </Container>
            </Grid>
            <Grid item  xs={12}>
                <AuthFooter/>
            </Grid>
        </Grid>
        
    )
}

export default AuthLayout;