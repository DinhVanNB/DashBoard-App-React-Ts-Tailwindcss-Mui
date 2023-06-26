import { Container, Link, Stack, Typography, useMediaQuery } from "@mui/material";
import theme from "../../themes/theme";
import {useSelector, useDispatch} from 'react-redux';
import { toggleLanguage } from "../../redux/appSlice";

const AuthFooter =()=>{
    const isScreenSM = useMediaQuery(theme.breakpoints.down('sm'));
    const {language} = useSelector((state:RootState)=>state.appState)
    const dispatch = useDispatch();


    return(
        <Container className=" max-w-screen-xl">
            <Stack 
                justifyContent={isScreenSM?"center":"space-between"}
                direction={isScreenSM?"column":"row"} 
                spacing={isScreenSM? 1:3} 
                textAlign={isScreenSM?"center":"inherit"}
            >
                <Typography variant="subtitle2">
                    This site is protected by <u className=" cursor-pointer">Privacy Policy</u>
                </Typography>

                <Stack 
                    direction={isScreenSM?"column":"row"}
                    spacing={isScreenSM? 1:3}
                    textAlign={isScreenSM?"center":"inherit"}
                >
                    <Typography 
                        className=" cursor-pointer"  
                        variant="subtitle2"
                        onClick={()=>dispatch(toggleLanguage())}
                    >
                       { language==='vi'? 'English' :'Việt Nam' }
                    </Typography>
                    <Typography 
                        variant="subtitle2" 
                        component={Link} 
                        target="_blank"
                        underline="hover"
                        href="https://material-ui.com"
                    >
                        MUI
                    </Typography>
                    <Typography className=" cursor-pointer" variant="subtitle2">Privacy Policy</Typography>
                </Stack>
            </Stack>
        </Container>
    )
}

export default AuthFooter;