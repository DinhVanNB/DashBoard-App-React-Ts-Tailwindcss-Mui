import {
    Stack,
    InputLabel,
    OutlinedInput,
    FormHelperText,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    IconButton,
    Avatar,
    TextField
  } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { setAppToast, setLoading } from '../../redux/appSlice';
import useValidate from '../../hooks/useValidate';
import validateSchema from '../../utils/validate/validateSchema';
import postApi from '../../api/postApi';
import { createPost } from '../../redux/postSlice';
import { CloseIcon } from '../../configs/constant';

interface propsType{
    setOpenModal:React.Dispatch<React.SetStateAction<boolean>>
}

const AddNewBlog = ({setOpenModal}:propsType) => {
    const {language, isLoading} = useSelector((state:RootState)=>state.appState);
    const [img, setImg] = useState<string>('');
    const [coverImg, setCoverImg] = useState<string>('');
    const dispatch = useDispatch();
    const {errors, resetForm, handleBlur, handleChange, handleSubmit}= useValidate({
      initialData:{
        title: '',
        content:'',
      },
      language,
      formId: 'addPost',
      onError:(err:any)=> dispatch(setAppToast(err)), 
      validateSchema :validateSchema,
      onSubmit: (data:any)=>handleCreateBlog(data),
    });

    const handleCreateBlog =async(data:any)=>{
        try{
            dispatch(setLoading(true))
            const {status, result} = await postApi.onCreatePost(data);
            if(status>300) dispatch(setAppToast({status, message: result.message}));
            if(status===201) {resetForm(); dispatch(createPost(result.data.data)); setOpenModal(false)}
            dispatch(setLoading(false))
        }
        catch(e){
            dispatch(setLoading(false))
        }
    
    };

    const handleUpload= (e:React.ChangeEvent<HTMLInputElement>)=>{
        try{
            if(!e.target.files) return
            e.target.name ==='image'? 
            setImg(URL.createObjectURL(e?.target?.files[0]))
            :
            setCoverImg(URL.createObjectURL(e?.target?.files[0]))
            handleChange(e);
        }
        catch(err){
            dispatch(setLoading(false))
        }
   };

    return (
      <form id='addPost' onSubmit={handleSubmit} >
        <Card >
            <Stack direction='row' justifyContent='space-between' alignItems='center' >
                <CardHeader  title="Create New Post"/>
                <IconButton sx={{mr:2}} onClick={()=>setOpenModal(false)} >
                    <CloseIcon/>
                </IconButton>
            </Stack>
            <CardContent sx={{ pt: 0 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                <Stack spacing={1}>
                    <InputLabel htmlFor="title-addPost">Title*</InputLabel>
                    <OutlinedInput
                        fullWidth
                        id='title-addPost'
                        name="title"
                        type='text'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={errors.title ? true: false}
                    />
                    { errors.title && (
                            <FormHelperText error >
                                {errors.title}
                            </FormHelperText>
                    )}
                </Stack>
                </Grid>
                <Grid item xs={12}>
                <Stack spacing={1}>
                    <InputLabel htmlFor="title-addPost">Content*</InputLabel>
                    <TextField
                        multiline
                        // components={OutlinedInput}
                        fullWidth
                        rows={5}
                        id='content-addPost'
                        name="content"
                        type='text'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={errors.content ? true: false}
                    />
                    { errors.content && (
                        <FormHelperText error >
                            {errors.content}
                        </FormHelperText>
                    )}
                </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputLabel htmlFor="title-addPost">Cover Photo</InputLabel>
                    <IconButton
                        sx={{ height: 120, width:'100%'}}
                        component="label" >
                        <Avatar
                            variant='square'
                            src={coverImg}
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
                </Grid>   
                <Grid item xs={12} md={6}>
                    <InputLabel htmlFor="title-addPost">Image Content</InputLabel>
                    <IconButton
                        sx={{ height: 120, width:'100%'}}
                        component="label" >
                        <Avatar
                            variant='square'
                            src={img}
                            sx={{ height: '100%', width:'100%'}} />
                        <input
                            onChange={handleUpload}
                            onBlur={handleBlur}
                            hidden
                            accept="image/*"
                            name="image"
                            type="file"
                        />
                    </IconButton>
                </Grid>
              </Grid>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: 'center' }}>
            <Button disabled={isLoading} type='submit' variant="contained">
               {!isLoading ?'Create Post': 'Loading...'}
            </Button>
          </CardActions>
        </Card>
      </form>
    );
  };
  

 
export default AddNewBlog;