import HelmetTitle from "../components/HelmetTitle";
import TableUsers from "../components/TableUsers";
import {Box, Typography, Stack } from "@mui/material";

export default function UsersPage(){

    return(
        <>
            <HelmetTitle title="Users Manager | Trang quản lý tài khoản"/>
            <Stack spacing={2}>
                <Stack >
                        <Typography variant='h3'>
                            Manage Team
                        </Typography>
                        <Typography variant='h5' color='green'>
                            Team Detail!
                        </Typography>
                </Stack> 
                <Box mt='16px' p='8px'>
                    <TableUsers/>
                </Box>
            </Stack>
        </>
    )
}