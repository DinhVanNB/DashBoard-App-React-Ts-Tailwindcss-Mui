import { useDispatch, useSelector } from 'react-redux';
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
    Typography,
    Box,
    TextField
  } from '@mui/material';
import useValidate from '../../hooks/useValidate';
import { setAppToast } from '../../redux/appSlice';
import validateSchema from '../../utils/validate/validateSchema';


interface propsType{
    user:any
    setOpenModal:React.Dispatch<React.SetStateAction<{type:string,isOpen:boolean}>>
    handleEdit:(data:object)=>void
}

const EditDialog = ({user,setOpenModal,handleEdit}:propsType) => {
    const {language, isLoading} = useSelector((state:RootState)=>state.appState);
    const dispatch = useDispatch();
    const {errors, handleBlur, handleChange, handleSubmit}= useValidate({
      initialData:{
          firstName: '',
          lastName:'',
          email:'',
          phone:'',
      },
      dataSet:user,
      language,
      formId: 'dialogEdit',
      onError:(err:any)=> dispatch(setAppToast(err)), 
      validateSchema :validateSchema,
      onSubmit: async(data:any)=>{ await handleEdit(data); setOpenModal({type:'',isOpen:false}); },
    });

    return (
      <form id='dialogEdit' onSubmit={handleSubmit} >
        <Card>
          <CardHeader subheader="The information can be edit" title="Edit user"/>
          <CardContent sx={{ pt: 0 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                      <InputLabel htmlFor="firstname-edit">First Name</InputLabel>
                      <OutlinedInput
                          disabled
                          id="firstname-edit"
                          name="firstName"
                          type='text'
                          fullWidth
                      />
                  </Grid>
                  <Grid item xs={12} md={6}>
                        <InputLabel htmlFor="lastname-edit">Last Name</InputLabel>
                        <OutlinedInput
                            disabled
                            fullWidth
                            type='text'
                            id="lastname-edit"
                            name="lastName"
                        />
                       
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="email-sigup">Email</InputLabel>
                        <OutlinedInput
                            disabled
                            fullWidth
                            id='email-sigup'
                            name="email"
                            type='text'
                        />
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                      <Stack spacing={1}>
                          <InputLabel htmlFor="phone-edit">Phone*</InputLabel>
                          <OutlinedInput
                              fullWidth
                              id="phone-edit"
                              type='text'
                              name="phone"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={errors.phone ? true: false}
                           />
                          { errors.phone && (
                              <FormHelperText error >
                                  {errors.phone}
                              </FormHelperText>
                          )}
                      </Stack>
                  </Grid>
                  <Grid item xs={12} md={6} >
                    <Stack spacing={1}>
                      <InputLabel htmlFor="address-edit">Position</InputLabel>
                      <OutlinedInput
                          fullWidth
                          id="position-edit"
                          type='text'
                          name="position"
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6} >
                    <Stack spacing={1}>
                      <InputLabel htmlFor="roleId-edit">Role</InputLabel>
                      <TextField
                          fullWidth
                          id="roleId-edit"
                          select
                          name="roleId"
                          defaultValue='' 
                          onBlur={handleBlur}
                          onChange={handleChange}
                          SelectProps={{
                            native: true,
                          }}
                        >
                          <option value='Admin'>Admin</option>
                          <option value='Guest'>Guest</option>
                          <option value='Member'>Member</option>
                        </TextField>
                    </Stack>
                  </Grid>
                  <Grid item  xs={12} >
                    <Stack spacing={1}>
                      <Typography>Gender</Typography>
                      <Box >
                          <input type="radio" id="genderNam" name="gender" value='Nam' onChange={handleChange} onBlur={handleBlur}/>
                          &nbsp;
                          <label htmlFor="genderNam">Nam</label>
                          &nbsp;&nbsp;&nbsp;
                          <input type="radio" name="gender" id="genderNu" value='Nữ' onChange={handleChange} onBlur={handleBlur}/>
                          &nbsp;
                          <label htmlFor="genderNu">Nữ</label>
                      </Box>
                    </Stack>
                  </Grid>
              </Grid>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: 'center' }}>
            <Button disabled={isLoading} type='submit' variant="contained">
               { !isLoading? 'Save' :'Loading...'}
            </Button>
          </CardActions>
        </Card>
      </form>
    );
  };

  export default EditDialog;