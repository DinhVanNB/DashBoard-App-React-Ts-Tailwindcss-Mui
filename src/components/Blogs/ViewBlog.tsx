import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, Typography, styled, Link, useTheme, Divider, Stack, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { useState ,useEffect } from 'react';
import {MoreVert, ExpandMoreIcon, DeleteIcon, ExitToAppIcon } from '../../configs/constant';
import { Link as RouterLink } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setAppToast, setLoading } from '../../redux/appSlice';
import { routes } from '../../configs/routes';
import { themeOptions } from '../../themes/theme';
import { REACT_APP_PUBLIC_URL } from '../../configs/constant';
import reviewApi from '../../api/reviewApi';

const ExpandMore = styled((props:any) => {
    const { expand, ...other } = props;
    return <IconButton name={expand? 'open':'close'} {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

interface propsType{
    post: any
    reload:boolean
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>
    handleDeletePost:(id:string)=>Promise<void>
}

const ViewBlog=({post, reload,setOpenDialog, handleDeletePost}:propsType)=>{
    const theme = useTheme();
    const [expanded, setExpanded] = useState(false);
    const [comments, setComments] = useState([])
    const [anchorElOpt, setAnchorElOpt] = useState<HTMLElement|null>(null);
    const dispatch = useDispatch();
    useEffect(()=>{
        onGetComment()
        // eslint-disable-next-line
    },[reload])

    const onGetComment =async()=>{
        try{
            dispatch(setLoading(true))
            const params = `?postId=${post?.id}`
            const {status, result}= await reviewApi.onGetReviewByPostId(params);
            if(status>300) dispatch(setAppToast({status, message: result?.message}));
            if(status<300) setComments(result?.data)
            dispatch(setLoading(false))
        }
        catch(e){
            dispatch(setLoading(false))
        }
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    return(
        <>
            <Card sx={{  maxHeight:'80vh', overflowY:'auto'}}>
                <CardHeader 
                sx={{"& .MuiTypography-root:first-of-type":{fontWeight:600, fontSize:'14px'}}}
                    avatar={
                        <Link display='inline-block' to={`${routes.info.path}?id=${post?.user?.id}`}  component={RouterLink} >
                            <Avatar sx={{border:`1px solid ${themeOptions.palette.gray.main}`, width:'45px', height:'45px'}} src={`${REACT_APP_PUBLIC_URL}${(JSON.parse(post?.user?.image))[0]}` || ''} alt='' />
                        </Link>
                    }
                    action={
                    <IconButton onClick={(e)=>setAnchorElOpt(e.currentTarget)} aria-label="settings">
                        <MoreVert />
                    </IconButton>
                    }
                    title={post?.user?.firstName +' '+  post?.user?.lastName}
                    subheader={`${new Date(post?.createdAt).toDateString()}`}
                />
                <CardMedia
                    component="img"
                    height="250"
                    image={`${REACT_APP_PUBLIC_URL}${(JSON.parse(post?.image))[0]}` || ''}
                    alt="img content"
                />
                <CardContent  >
                    <Typography variant="h6" color='CaptionText'>
                        {post?.title}
                    </Typography>
                    <Typography sx={{overflowWrap:'break-word'}} ml='1vmin' my='1vmin' variant='caption' 
                        // component={'pre'}  
                        color='GrayText'>
                        {post?.content}
                    </Typography>
                </CardContent>
                <Divider/>
                <CardActions onClick={handleExpandClick} disableSpacing={false} >
                        <Typography variant='h6'>Comments:</Typography>
                        <ExpandMore
                            expand={expanded}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >   
                            <ExpandMoreIcon />
                        </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        {
                            comments?.map((data:any)=>(
                                <Stack  my={1}  key={data?.id} spacing={1} >
                                    <Stack  direction='row' spacing={1} alignItems='center' >
                                        <Link underline='hover' display='inline-block' to={`${routes.info.path}?id=${data?.user?.id}`}  component={RouterLink} >
                                            <Avatar sx={{border:`1px solid ${themeOptions.palette.gray.main}`, width:'30px', height:'30px'}} src={`${REACT_APP_PUBLIC_URL}${(JSON.parse(data?.user?.image))[0]}` || ''} alt='' />
                                        </Link>
                                        <Stack>
                                            <Link underline='hover' display='inline-block' to={`${routes.info.path}?id=${data?.user?.id}`}  component={RouterLink} >
                                                <Typography variant='subtitle1' color='InfoText' >
                                                    {data?.user?.firstName + ' '+ data?.user?.lastName}
                                                </Typography>
                                            </Link>
                                            <Typography variant='subtitle2' >
                                                { new Date(data?.createdAt).toLocaleTimeString() + ' '+ new Date(data?.createdAt).toDateString()}
                                            </Typography>
                                        </Stack>
                                       
                                    </Stack>
                                  
                                    <Typography borderRadius={'1vmin'} bgcolor={themeOptions.palette.blue.light} fontSize='16px' p={theme.spacing(1)}>
                                        {data?.comment}
                                    </Typography>
                                </Stack>
                            ))

                        }
                    </CardContent>
                </Collapse>
            </Card>
            <Menu
                id="long-menu"
                anchorEl={anchorElOpt}
                open={Boolean(anchorElOpt)}
                onClose={()=>setAnchorElOpt(null)}
                PaperProps={{
                    style: {
                        maxHeight:'100px',
                        width: 'fit-content',
                        },
                }}
            >
                <MenuItem onClick={()=>{handleDeletePost(post.id);setOpenDialog(false)}}>
                    <ListItemIcon>
                        <DeleteIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Delete"/>
                </MenuItem>
                <MenuItem onClick={()=>setOpenDialog(false)}>
                    <ListItemIcon>
                        <ExitToAppIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Close"/>
                </MenuItem>
            </Menu>
        </>
    )
};



export default ViewBlog;
