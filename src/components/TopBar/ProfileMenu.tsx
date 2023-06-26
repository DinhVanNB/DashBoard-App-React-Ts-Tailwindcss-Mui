import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { clearAccessToken, setAppToast } from '../../redux/appSlice';
import { Avatar, Menu, Box, IconButton, List, ListItemButton, ListItemIcon, ListItemText, MenuItem, Stack, Typography, Divider } from '@mui/material';
import { ExitToAppOutlinedIcon, PersonOutlineOutlinedIcon, REACT_APP_PUBLIC_URL } from '../../configs/constant';
import { themeOptions } from '../../themes/theme';
import React, { useState } from 'react';
import { routes } from '../../configs/routes';
import userApi from '../../api/userApi';
import { logOut } from '../../redux/userSlice';


const ProfileMenu =()=>{
    const {isLogin, userLogin:user} = useSelector((state:RootState)=>state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<any>(null);
    const open = Boolean(anchorEl);

    const handleNavigate =(endpoint:string)=>{
        if(isLogin){
            navigate(endpoint)
            return
        }
        dispatch(setAppToast({message:"You are not loged!", status:403}))
    }

    const handleClick = (event:React.MouseEvent) => {
        setAnchorEl(event.currentTarget);
     };

    const handleLogout = async()=>{
        try{
            const {result , status} = await userApi.onLogout();
            dispatch(setAppToast({message:result.message,status}))
            dispatch(logOut())
            dispatch(clearAccessToken())
        }
        catch(e){
            dispatch(setAppToast({message:`Connect error!!`, status:403}))
        }
    }


    const handleClose = () => {
        setAnchorEl(null);
    };

    return(
        <>
            <Box>
                <IconButton
                    size='small'
                    onClick={handleClick}
                >
                    <Avatar  
                        sx={{height:'30px', width:'30px',border:`1px solid ${themeOptions.palette.gray.light}`}} 
                        src={isLogin? user?.image?`${REACT_APP_PUBLIC_URL}${(JSON.parse(user?.image))?.['0']}`||'':'':''} 
                    />
                </IconButton>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        width: 200,
                        '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                        border:`1px solid ${themeOptions.palette.gray.light}`
                        },
                        '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                
                <MenuItem onClick={handleClose}>
                    <Avatar src={isLogin? user?.image?`${REACT_APP_PUBLIC_URL}${(JSON.parse(user?.image))[0]}`||'':'':''} />
                    <Stack>
                        {
                            isLogin ?
                            <>
                                <Typography variant="subtitle1">{user?.firstName +  user?.lastName}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {user?.roleId}
                                </Typography>
                            </>
                            :
                            <>
                                <Typography variant="body2" color="textSecondary">
                                    You are not loged!
                                </Typography>
                            </>
                        }
                    </Stack>
                </MenuItem>

                <Divider/>

                <List component='nav' sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: themeOptions.palette.gray.main } }}>
                    <ListItemButton onClick={()=> handleNavigate(`${routes.info.path}?id=${user.id}`)}>
                        <ListItemIcon>
                            <PersonOutlineOutlinedIcon/>
                        </ListItemIcon>
                        <ListItemText primary="View Profile"/>
                    </ListItemButton>
                    <ListItemButton onClick={handleLogout}>
                        <ListItemIcon>
                            <ExitToAppOutlinedIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Logout"/>
                    </ListItemButton>
                </List>
            </Menu>
        </>
       
    )
}

export default ProfileMenu