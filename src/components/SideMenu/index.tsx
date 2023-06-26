import {  Box , IconButton, Avatar, useTheme, Typography, Badge, styled } from '@mui/material'
import React,{ useEffect, useState } from 'react';
import {useSelector} from 'react-redux'
import { themeOptions } from '../../themes/theme';
import { Sidebar , Menu, MenuItem, SubMenu} from 'react-pro-sidebar';
import { ArrowLeftIcon, BookOutlinedIcon, CalendarMonthIcon, ContactPageIcon, ExitToAppIcon, GroupsIcon, HomeIcon, MenuOutLined, PermContactCalendarIcon, REACT_APP_PUBLIC_URL, TableViewOutlinedIcon } from '../../configs/constant';
import { routes } from '../../configs/routes';
import { useNavigate } from 'react-router-dom';

interface propsType {
    broken:boolean
    toggled: boolean
    setBroken: React.Dispatch<React.SetStateAction<boolean>>
    setToggled: React.Dispatch<React.SetStateAction<boolean>>
}
 
const SideMenu =({setBroken,broken, toggled,setToggled}:propsType)=>{
    const {userLogin : user, isLogin} = useSelector((state:RootState)=>state.user)
    const [collapsed, setCollapsed] = useState(false)
    const theme = useTheme();
    const [maxHeight,setMaxHeight] = useState<any>()


    useEffect(()=>{
        setMaxHeight(Math.max( document.body.scrollHeight, document.body.clientHeight, 
            document.documentElement.clientHeight,document.documentElement.scrollHeight, document.documentElement.offsetHeight , document.body.offsetHeight))
    },[maxHeight])

   
    return(
        <Box
            sx={{
                
                "& .ps-sidebar-container": {
                    height:  `${maxHeight}px` ,
                    background: `${themeOptions.palette.gray.lighter}`
                },
                "& .ps-menuitem-root": {
                    padding: "5px 5px 5px 5px !important",
                },

                "& .ps-menu-button:hover": {
                    color: `${themeOptions.palette.blue.active} !important`,
                    background: 'none !important',
                    '& .ps-menu-icon':{
                        transition: 'all 0.3s linear',
                        transform: "scale(1.2) !important",
                    }
                },
                "& .ps-active": {
                    color: `${themeOptions.palette.blue.active} !important`,
                    bgcolor:'secondary.lighter',
                    textDecoration:'underline',
                },
        }}>
            <Sidebar 
                onBackdropClick={()=>setToggled(false)}
                toggled={toggled}
                transitionDuration={1000} 
                customBreakPoint='1024px'
                onBreakPoint={setBroken}
                collapsed ={broken? false: collapsed}
            >
                <Menu>
                    <MenuItem style={{margin: '10px 0 20px 0'}}>
                    {collapsed && !broken && (
                            <IconButton  onClick={()=>setCollapsed(!collapsed)}>
                                <MenuOutLined />
                            </IconButton>
                        )}
                       {(!collapsed || broken )&&
                            ( <Box 
                                display='flex'
                                justifyContent={!broken ? 'space-between' : 'center'}
                                alignItems='center'
                                ml='10px'
                                >
                                <Typography 
                                    variant='h5'>
                                    Dashboard App
                                </Typography>
                               {!broken &&  <IconButton  onClick={()=>setCollapsed(!collapsed)}>
                                    <ArrowLeftIcon fontSize='large'/>
                                </IconButton>
                                }
                            </Box>)
                       }
                    </MenuItem>
                    {(!collapsed || broken ) && (
                        <Box >
                            <Box display='flex' alignItems='center' justifyContent='center'>
                                <StyledBadge
                                    overlap="circular"
                                    variant={isLogin? "dot":'standard'}
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    >
                                    <Avatar 
                                        sx={{width:'80px', height:'80px', cursor:'pointer' , border:`1px solid ${themeOptions.palette.gray.light}`}} 
                                        src={user?.image?`${REACT_APP_PUBLIC_URL}${(JSON.parse(user?.image))?.['0']}`||'':''}
                                    />
                                </StyledBadge>
                                
                            </Box>
                            <Box textAlign='center' gap={theme.spacing(1)}>
                                <Typography variant='h6' >
                                    {user?.firstName ? `${user?.firstName} ${user?.lastName}`  : 'Guest'}
                                </Typography>
                                <Typography color={themeOptions.palette.green.darker} >
                                    {user?.roleId}
                                </Typography>
                            </Box>
                        </Box>
                        )
                    }

                    <Box >
                        <ItemMenu 
                            pathRoutes={routes.dashboard.path}
                            title='Dashboard'
                            linkto={routes.dashboard.path}
                            icon={<HomeIcon/>}
                        />
                      
                        <SubMenu defaultOpen icon={(!collapsed || broken )? null: <GroupsIcon/>} label="Users" component={<Typography variant='h6'/>}>
                            <Box  bgcolor={`${themeOptions.palette.gray.lighter}`}>
                                <ItemMenu 
                                    pathRoutes={routes.users.path}
                                    title='Manage Team'
                                    linkto={`${routes.users.path}?page=0&pageSize=5&orderBy=lastName&order=asc`}
                                    icon={  <GroupsIcon/>}
                                />
                               
                                {
                                    !isLogin && 
                                    <>
                                        <ItemMenu 
                                            pathRoutes={routes.register.path}
                                            title='Register'
                                            linkto={routes.register.path}
                                            icon={<PermContactCalendarIcon/>}
                                      
                                        />
                                        <ItemMenu 
                                            pathRoutes={routes.login.path}
                                            title='Login'
                                            linkto={routes.login.path}
                                            icon={<ExitToAppIcon/>}
                                        />
                                    </> 
                                }
                               
                                <ItemMenu
                                    pathRoutes={routes.info.path} 
                                    title='Profile'
                                    linkto={`${routes.info.path}?id=${user?.id}`}
                                    icon={<ContactPageIcon/>}
                                />
                            </Box>
                        </SubMenu>
                      
                        <SubMenu defaultOpen icon={(!collapsed || broken )? null:  <TableViewOutlinedIcon/>} label="Application" component={<Typography variant='h6'/>}>
                            <Box  bgcolor={`${themeOptions.palette.gray.lighter}`}>
                                <ItemMenu 
                                    pathRoutes={routes.blog.path} 
                                    title='Blog'
                                    linkto= {`${routes.blog.path}?page=0&pageSize=5&orderBy=createdAt&order=desc`}
                                    icon={<BookOutlinedIcon/>}
                                />
                                <ItemMenu 
                                    pathRoutes={routes.calender.path} 
                                    title='Calendar'
                                    linkto={routes.calender.path} 
                                    icon={<CalendarMonthIcon/>}
                                />
                            </Box>
                        </SubMenu>
                    </Box>
                </Menu>
            </Sidebar>

        </Box>
    )
}

export default SideMenu;


const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));
  


  const ItemMenu = (props:any)=>{
      const {title,linkto, icon ,pathRoutes} = props
      const navigate = useNavigate();
      const {stateRoutes} = useSelector((state:RootState)=>state.appState)
      return(
          <MenuItem
              suffix={stateRoutes===pathRoutes?"🔥": null}
              style={{boxSizing:'border-box' }}
              icon={icon}
              active={stateRoutes===pathRoutes}
              onClick={()=>{navigate(`${linkto}`)}}
              >
              <Typography >{title}</Typography>
          </MenuItem>
         
      )
  };