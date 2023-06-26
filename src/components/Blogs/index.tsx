import { Box, Button, Dialog, Stack, Typography } from "@mui/material";
import { themeOptions } from "../../themes/theme";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Add } from "../../configs/constant";
import MultiBlogs from "./MultiBlogs";
import AddNewBlog from "./AddNewBlog";

export default function Blogs(){
    const [openModal, setOpenModal] = useState(false)
    const {isLogin} = useSelector((state:RootState)=>state.user)


    return(
        <>
         <Stack  spacing={2}>
                <Stack direction='row' justifyContent='space-between' alignItems='center'>
                    <Stack >
                        <Typography variant='h3'>
                            Blog
                        </Typography>
                        <Typography variant='h5' color='green'>
                            New Post!
                        </Typography>
                    </Stack>
                    {
                        isLogin &&  
                        <Button onClick={()=>setOpenModal(true)} startIcon={<Add/>} variant="contained" 
                            sx={{backgroundColor:`${themeOptions.palette.blue.light}`, p:'1vmin', fontWeight:600, color:'grey'}}>
                            Add New Post!
                        </Button>
                    }
                
                </Stack>
                <Box  p='8px'>
                    <MultiBlogs/>
                </Box>
            </Stack>
            <Dialog 
                open={openModal}
                // onClose={()=>setOpenModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
               <AddNewBlog setOpenModal={setOpenModal}/>
            </Dialog>
        </>
    )
}