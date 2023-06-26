import { Box, Typography } from "@mui/material";
import { themeOptions } from "../../themes/theme";
import {lime, grey} from '@mui/material/colors'
import { CircularProgressbar } from "react-circular-progressbar";


const colors = {
    lime,
    grey
}

interface propsType {
    progress: number
    title: string
    subtitle: string
    increase: string
    icon: React.ReactNode
}

const BoxData = (props:propsType)=>{
    const { progress, icon, title, subtitle,increase} = props
    return(
        <Box width='100%' borderRadius='1vmin'
            bgcolor={themeOptions.palette.gray.lighter}
            boxShadow={`0px 0px 1px 1px ${colors.grey[400]}`}
            p='1vmin'
        >
            <Box display='flex' justifyContent="space-between" alignItems='center' gap={2}>
                <Box flex={2} display='flex' flexDirection='column' justifyContent='center' alignItems='flex-start' gap={1}>
                    {icon}
                    <Typography variant='h4' fontWeight='600' >
                        {title}
                    </Typography>
                </Box>
                <Box textAlign='center' flex={1} >   
                    <CircularProgressbar  
                        styles={{
                            path: {stroke: themeOptions.palette.blue.dark},
                            trail: {stroke: colors.grey[400]},
                        }} 
                        value={progress}
                        maxValue={100}
                    />
                </Box>
              
            </Box>
            <Box display='flex' justifyContent='space-between' mt='5px'>
                <Typography flex={2} variant='h5' >
                    {subtitle}
                </Typography>
                <Typography flex={1} variant='h5' textAlign='center' fontStyle='italic' color={themeOptions.palette.green.darker}>
                    {increase}
                </Typography>
            </Box>
        </Box>
    )
}

export default BoxData;