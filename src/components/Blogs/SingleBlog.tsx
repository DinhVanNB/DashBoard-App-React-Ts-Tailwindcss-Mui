import { Box ,Avatar ,  Typography, Stack, Link, useTheme, Tooltip, Dialog, DialogActions, TextField, Button ,styled } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import moment from "moment";
import 'moment/locale/vi';
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setAccessToken, setAppToast, setLoading } from "../../redux/appSlice";
import reviewApi from "../../api/reviewApi";
import {  REACT_APP_PUBLIC_URL, SendIcon } from "../../configs/constant";
import { routes } from "../../configs/routes";
import { themeOptions } from "../../themes/theme";

const SingleBlog =({post , reload ,setReload,handleDeletePost,  handleToggleLike}:any)=>{
    const theme = useTheme();
    const {userLogin, isLogin} = useSelector((state:RootState)=>state.user)
    const [comment, setComment] = useState('');
    const [openDialog, setOpenDialog] = useState(false)
    const {language} = useSelector((state:RootState)=>state.appState)
    moment.locale(language);
    const dispatch = useDispatch();
    
    const handleCreateComment =async()=>{
        if(comment==='') return
        dispatch(setLoading(true))
        const data ={
            userId: userLogin?.id,
            postId: post?.id,
            comment
        }
        const {status, result} = await reviewApi.onCreate(data);
        if(result?.data?.transaction && result?.data?.transaction !=='') dispatch(setAccessToken(result.data.transaction));
        if(status>300) dispatch(setAppToast({status, message: result.message}));
        if(status<300) {  setComment(''); setReload((prev:boolean)=>!prev)  }
        dispatch(setLoading(false))
    };

    const handleChange= ({target}:React.ChangeEvent<HTMLInputElement>)=>{
        setComment(target.value)
    }

    const handleLike=()=>{
        isLogin && handleToggleLike(post)
    }
    
    return(
        <>
            <BoxStyled
                sx={{
                    backgroundImage: `url(${REACT_APP_PUBLIC_URL}${JSON.parse(post?.coverPhoto)})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}
                >
                
                <Link display='inline-block' to={`${routes.info.path}?id=${post?.user?.id}`}  component={RouterLink} >
                    <Tooltip title={post?.user?.firstName +' '+  post?.user?.lastName} placement='right' >
                        <Avatar sx={{border:`1px solid ${themeOptions.palette.gray.main}`, width:'50px', height:'50px'}} src={`${REACT_APP_PUBLIC_URL}${(JSON.parse(post?.user?.image))?.['0']}` || ''} alt='' />
                    </Tooltip>
                </Link>
                <Stack  sx={{'& .hover:hover':{cursor:'pointer'}}} justifyContent='space-between' >
                    <Box className="textContent">
                    <Link onClick={()=>setOpenDialog(true)} color='inherit' className="hover"  underline="hover" component={Typography}  variant="h5">{post?.title}</Link>
                        {moment(`${new Date(post?.createdAt).toISOString()}`).fromNow()}
                    <Typography  variant='subtitle2' > { new Date(post?.createdAt).toLocaleTimeString() + ' '+ new Date(post?.createdAt).toDateString()}</Typography>
                    </Box>
                    {/* <BlogInterac
                        handleLike={handleLike}
                        views={post?.reviews?.length || 0}
                        like={post?.like}
                    /> */}
                </Stack>
            </BoxStyled>
            <Dialog 
                fullWidth
                maxWidth='md'
                open={openDialog}
                onClose={()=>setOpenDialog(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {/* <BlogView  handleDeletePost={handleDeletePost} setOpenDialog={()=>setOpenDialog(false)} reload={reload}  post={post}/> */}
                {
                    isLogin && 
                    <DialogActions sx={{ margin: 0, background: '#f5f5f5', justifyContent:'space-between'}} >
                        <Avatar sx={{border:`1px solid ${themeOptions.palette.gray.main}`, width:'35px', height:'35px'}} src={`${REACT_APP_PUBLIC_URL}${(JSON.parse(userLogin?.image))?.['0']}` || ''} alt='' />
                        <TextField  value={comment} type='text' name='comment' onChange={handleChange} variant='standard' fullWidth/>
                        <Button onClick={handleCreateComment} type="button" color='info' ><SendIcon/></Button>
                    </DialogActions>
                }
                
            </Dialog>
        </>
    )
    
};



export default SingleBlog;



const BoxStyled = styled(Box)(({ theme }) => ({
      borderRadius: '1vmin',
      minHeight: 330,
      padding: `${theme.spacing(3)}`,
      position: "relative",
      transition: "all 0.3s ease-in-out",
      display: "grid",
      gridTemplateRows: `80px 1fr`,
  
      "&::before": {
        content: `""`,
        display: "block",
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: "rgba(20,20,20,0.5)",
        borderRadius: "inherit",
      },
  
      "&:hover": {
        transform: `translateY(-5px)`,
        boxShadow: theme.shadows[10]
      },
  
      "& .textContent": {
        color: 'white',
        zIndex: 2,
        display: "grid",
        gap: 12,
        alignContent: "space-between",
      },
  
  }));