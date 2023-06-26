import { Box,  Stack, Typography } from "@mui/material";
import HelmetTitle from "../components/HelmetTitle";
import UserInfo from "../components/UserInfo";



export default function UserInfoPage(){

    return(
        <>
            <HelmetTitle title={`Thông tin tài khoản | User's Info`}/>
            <Stack spacing={2}>
                <Stack  >
                    <Typography variant='h3'>
                        User profile
                    </Typography>
                    <Typography variant='h5' color='green'>
                        Details!
                    </Typography>
                </Stack>
                <Box  mt='16px' p='8px'>
                   <UserInfo/>
                </Box>
            </Stack>
        </>
    )

}