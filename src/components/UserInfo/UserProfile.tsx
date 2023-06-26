import { Avatar, Box, Card, CardContent, Divider, IconButton, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { REACT_APP_PUBLIC_URL } from '../../configs/constant';

interface propsType{
    valid:any
    user:any
}

export default function UserProfile({valid,user}:propsType){
    const {handleBlur, handleChange} = valid
    const [img, setImg] = useState('')
    const [coverImg, setCoverImg] = useState('')
    const {userLogin} = useSelector((state:RootState)=>state.user)

    const handleUpload= (e:React.ChangeEvent<HTMLInputElement>)=>{
        try{
            if (!e.target.files) return;
            e.target.name ==='image'? 
            setImg(URL.createObjectURL(e?.target?.files[0]))
            :
            setCoverImg(URL.createObjectURL(e?.target?.files[0]))
            handleChange(e);
        }
        catch(err){
            
        }
   };

    return(
        <Card sx={{'& .MuiIconButton-root':{p:0}, '& .MuiCardContent-root':{':last-child':{p:0}}}}>
            <Box sx={{position: "relative"}}>
                <IconButton
                    disabled={user?.id!==userLogin?.id}
                    sx={{ height: 120, width:'100%'}}
                    component="label">
                    <Avatar
                        variant='square'
                        src={coverImg!==''? coverImg: (user?.image?`${REACT_APP_PUBLIC_URL}${JSON.parse(user?.coverPhoto)}`||'':'')}
                        sx={{ height: '100%', width:'100%'}} />
                    <input
                        onChange={handleUpload}
                        onBlur={handleBlur}
                        hidden
                        accept="image/*"
                        name="coverPhoto"
                        type="file"
                    />
                </IconButton>

                <IconButton
                    disabled={user?.id!==userLogin?.id}
                    sx={{ height: 80, width: 80 ,zIndex: 1, bottom: -40, position: "absolute", left: "50%", right: "50%", transform: "translateX(-50%)"}}
                    component="label" >
                    <Avatar
                        src={img!==''? img: (user?.image?`${REACT_APP_PUBLIC_URL}${(JSON.parse(user?.image))[0]}`||'':'')}
                        sx={{ height: 80, width: 80,border: "2px solid white"}} />
                    <input
                        hidden
                        onChange={handleUpload}
                        onBlur={handleBlur}
                        accept="image/*"
                        name="image"
                        type="file"
                    />
                </IconButton>
            </Box>
            
            <CardContent sx={{mt:6}} >
                <Stack alignItems='center'>
                    <Typography variant="h5">
                        {user?.firstName? `${user.firstName} ${user?.lastName}` : " " }
                    </Typography>
                    <Typography color="textSecondary" variant="body2">
                        {user?.roleId}
                    </Typography>
                    <Typography color="textSecondary" variant="body2">
                        {user?.address}
                    </Typography>
                    <Typography color="textSecondary" variant="body2">
                        {user?.about}
                    </Typography>
                </Stack>

                <Divider />

                <Stack py={1} direction='row' justifyContent='space-around' alignItems='center'>
                    <Typography>{user?.posts?.length || 0} Post</Typography>
                    <Typography>{user?.reviews?.length || 0} Message</Typography>
                </Stack>
            </CardContent>
        </Card>
    )
}