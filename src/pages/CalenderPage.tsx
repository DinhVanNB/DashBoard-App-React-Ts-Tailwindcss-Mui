import { Box, Stack, Typography } from "@mui/material";
import HelmetTitle from "../components/HelmetTitle";

export default function CalenderPage(){

    return(
        <>
            <HelmetTitle title="Lịch  | Calender"/>
            <Stack  spacing={2}>
                <Stack direction='row' justifyContent='space-between' alignItems='center'>
                    <Stack >
                        <Typography variant='h3'>
                            Calender
                        </Typography>
                        <Typography variant='h5' color='green'>
                            Calender Details!
                        </Typography>
                    </Stack>
                </Stack>
                <Box mt='16px' p='8px'>
                    {/* <Calendar/> */}
                </Box>
            </Stack>
        </>
    )
}