import { Grid, MenuItem, Pagination, Stack, TextField } from "@mui/material";
import SingleBlog from "./SingleBlog";
import { setAccessToken, setAppToast, setLoading } from "../../redux/appSlice";
import postApi from "../../api/postApi";
import { routes } from "../../configs/routes";
import { fetchAllPosts } from "../../redux/postSlice";
import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function MultiBlogs(){

    const dispatch  = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(0);
    const [order, setOrder] = useState('desc');
    const {posts} = useSelector((state:RootState)=>state.post);
    const {userLogin} = useSelector((state:RootState)=>state.user);
    const [reload, setReload] = useState(false);
    const paramsSearch:string= '?' + searchParams.toString() 


    useEffect(()=>{ 
      handleGetPosts(paramsSearch)
      setCurrentPage(Number(searchParams.get('page')||0)+1)
      setOrder(searchParams.get('order')||'desc')
      // eslint-disable-next-line
    },[paramsSearch, posts?.data?.length, reload])

    const handleChangePage = ({target}:React.ChangeEvent<unknown>,value:number) => {
        navigate(`${routes.blog.path}?page=${value-1}&pageSize=5&orderBy=createdAt&order=${order}`)
    };

    const handleGetPosts=async(params:string)=>{
      dispatch(setLoading(true))
      const {status, result}= await postApi.onGetPosts(params);
      if(result?.data?.transaction && result?.data?.transaction !=='') dispatch(setAccessToken(result.data.transaction));
      if(status>300) dispatch(setAppToast({status, message: result.message}));
      if(status<300) dispatch(fetchAllPosts(result?.data))
      dispatch(setLoading(false))
    };
    
    const onHanldeSort =(e:React.ChangeEvent<HTMLInputElement>)=>{
         navigate(`${routes.blog.path}?page=0&pageSize=5&orderBy=createdAt&order=${e.target.value}`)
    };

    const handleToggleLike = async(post:any)=>{
      const data ={
          userId: userLogin?.id,
          userName: userLogin.firstName + ' ' + userLogin.lastName,
          postId: post?.id,
      };
      const {status, result} = await postApi.onToggleLike(data);
      if(result?.data?.transaction && result?.data?.transaction !=='') dispatch(setAccessToken(result.data.transaction));
      if(status>300) dispatch(setAppToast({status, message: result.message}));
      if(status<300) {   setReload(prev=>!prev)  }
    };

    const handleDeletePost =async(postId:string)=>{
      dispatch(setLoading(true))
      const {status, result}= await postApi.onDeletePost({postId});
      if(result?.data?.transaction && result?.data?.transaction !=='') dispatch(setAccessToken(result.data.transaction));
       dispatch(setAppToast({status, message: result.message}));
      if(status<300) {navigate(`${routes.blog.path}?page=0&pageSize=5&orderBy=createdAt&order=${order}`);setReload(prev=>!prev)}
      dispatch(setLoading(false))
    }


    return(
        <>  
            <Grid container spacing={3}>
                <Grid textAlign='end' item xs={12} >
                    <TextField
                        variant='standard'
                        id="selectTextField"
                        className="selectFilter"
                        select
                        value={order}
                        onChange={onHanldeSort}
                    >
                        <MenuItem value='desc'>
                            Latest
                        </MenuItem>
                        <MenuItem value='asc'>
                            Oldest
                        </MenuItem>
                    </TextField>
                </Grid>
                {
                    posts?.data?.map((post:any, index:number)=>(
                        <Grid key={post.id} item xs={12} md={index===0? 8 : 4} >
                            <SingleBlog handleDeletePost={handleDeletePost} reload={reload} setReload={setReload} handleToggleLike={handleToggleLike} post={post}/>
                        </Grid>
                    ))
                }
                <Grid item xs={12} >
                    {posts?.totalPages >1 && 
                        <Stack direction='row' justifyContent='center'>
                            <Pagination
                                page={currentPage}
                                shape="rounded"
                                count= {posts?.totalPages||0}
                                boundaryCount={1}
                                onChange={handleChangePage}
                            />
                        </Stack>
                    }
                </Grid>
            </Grid>
        </>
    )
}