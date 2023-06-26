import { AddIcCallIcon, MailOutlineIcon, PersonAddIcon, PostAddIcon } from "../../configs/constant";
import { themeOptions } from "../../themes/theme";
import BoxData from "./BoxData";
import ChartBar from "./ChartBar";
import ChartLine from "./ChartLine";
import {Box, Grid} from '@mui/material'
import { grey } from '@mui/material/colors';

export default function Home(){

    return(
        <>
            <Box >
                <Grid  container spacing={2}>
                    <Grid className=' box-border' p='1vmin' item   xs={12} sm={6} md={3} display='flex' alignItems='center' justifyContent='center'>
                        <BoxData  progress={60} title='21,200' subtitle='Emails' increase='+6%'  
                            icon={<MailOutlineIcon sx={{fontSize:'24px'}} />}
                        />
                    </Grid>
                    <Grid   className=' box-border' p='1vmin' item xs={12} sm={6} md={3}  display='flex' alignItems='center' justifyContent='center'>
                        <BoxData  progress={80} title='8,200' subtitle='Contacts' increase='+10%'  
                            icon={<AddIcCallIcon sx={{fontSize:'24px'}} />}
                        />
                    </Grid>
                    <Grid  className=' box-border' p='1vmin' item xs={12} sm={6} md={3}  display='flex' alignItems='center' justifyContent='center'>
                        <BoxData  progress={70} title='16,600' subtitle='Blogs' increase='+16%'  
                            icon={<PostAddIcon sx={{fontSize:'24px'}} />}
                        />
                    </Grid>
                    <Grid  className=' box-border' p='1vmin' item xs={12} sm={6} md={3}  display='flex' alignItems='center' justifyContent='center'>
                        <BoxData  progress={90} title='10,400' subtitle='Users' increase='+12%'  
                            icon={<PersonAddIcon sx={{fontSize:'24px'}} />}
                        />
                    </Grid>
                    <Grid className=' box-border' p='1vmin' height='calc(35vh + 5vw)'  item xs={12} lg={6} >
                        <Box  boxShadow={`0px 0px 3px 1px ${grey[400]}`} borderRadius='1vmin' height='100%' width='100%'  bgcolor={themeOptions.palette.gray.lighter} >
                            <ChartLine/>
                        </Box>
                    </Grid>
                    <Grid  className=' box-border' p='1vmin'  height='calc(35vh + 5vw)'  item xs={12} lg={6}  >
                        <Box boxShadow={`0px 0px 3px 1px ${grey[400]}`} borderRadius='1vmin' height='100%' width='100%'  bgcolor={themeOptions.palette.gray.lighter} >
                            <ChartBar/>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
};