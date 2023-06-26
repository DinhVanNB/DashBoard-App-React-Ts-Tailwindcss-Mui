import { Outlet } from "react-router-dom"
import ScrollTop from "../components/ScrollTop";
import SideMenu from "../components/SideMenu";
import { Box, IconButton, Stack } from "@mui/material";
import { FormatIndentDecreaseIcon } from "../configs/constant";
import TopBar from "../components/TopBar";
import { useState } from "react";
import { themeOptions } from "../themes/theme";


const MainLayout =()=>{
    const [toggled, setToggled] = useState(false);
    const [broken, setBroken] = useState(false);

    return(
        <>
            <ScrollTop/>
            <div style={{maxWidth:'100vw'}} className=" flex min-h-screen">
                <SideMenu setToggled={setToggled} broken={broken} toggled={toggled} setBroken={setBroken} />
                <Stack width='100%' borderLeft='1px solid #dedede'>
                    <Box borderBottom='1px solid #dedede' bgcolor={themeOptions.palette.gray.lighter} display='flex' width='100%'>
                        {
                            broken && 
                            <IconButton onClick={() => setToggled(!toggled)} sx={{width:'60px', height:'60px'}}>
                                <FormatIndentDecreaseIcon/>
                            </IconButton>
                        }
                        <Box width='100%'>
                            <TopBar/>
                        </Box>
                    </Box>
                    <Box m={4}>
                        <Outlet/>
                    </Box>
                </Stack>
             </div>
            
        </>
    )
}

export default MainLayout;