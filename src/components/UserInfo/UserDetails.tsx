import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, FormHelperText, Grid, InputLabel, OutlinedInput, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";

interface propsType{
    valid:any
    user:any
}

export default function UserDetails({valid,user}:propsType){
    const {errors, handleBlur, handleChange, handleSubmit} = valid;
    const {userLogin} = useSelector((state:RootState)=>state.user)
    const {isLoading} = useSelector((state:RootState)=>state.appState)
  
    return (
      <form id='formEdit' onSubmit={handleSubmit} >
        <Card>
          <CardHeader subheader="The information can be edit" title="Profile"/>
          <CardContent sx={{ pt: 0 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="firstname-edit">First Name*</InputLabel>
                      <OutlinedInput
                          disabled={userLogin?.id!==user?.id}
                          id="firstname-edit"
                          name="firstName"
                          type='text'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          fullWidth
                          error = {errors?.firstName ? true : false}
                      />
                      {errors?.firstName && (
                          <FormHelperText error id="helper-text-firstname-edit">
                              {errors?.firstName}
                          </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="lastname-edit">Last Name*</InputLabel>
                        <OutlinedInput
                            disabled={userLogin?.id!==user?.id}
                            fullWidth
                            type='text'
                            id="lastname-edit"
                            error = {errors?.lastName ? true : false}
                            name="lastName"
                            onBlur={handleBlur}
                            onChange={handleChange}
                        />
                        {errors?.lastName && (
                            <FormHelperText error>
                                {errors?.lastName}
                            </FormHelperText>
                        )}
                    </Stack>
                  </Grid>
                  {userLogin?.id===user?.id && 
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                          <InputLabel htmlFor="email-sigup">Email*</InputLabel>
                          <OutlinedInput
                              disabled
                              fullWidth
                              id='email-sigup'
                              name="email"
                              type='text'
                          />
                      </Stack>
                    </Grid>
                  }
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="address-edit">Position</InputLabel>
                      <OutlinedInput
                          disabled={userLogin?.id!==user?.id}
                          fullWidth
                          id="position-edit"
                          type='text'
                          name="position"
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                    </Stack>
                  </Grid>
                  {userLogin?.id===user?.id && 
                    <>
                      <Grid item xs={12}>
                          <Stack spacing={1}>
                              <InputLabel htmlFor="phone-edit">Phone*</InputLabel>
                              <OutlinedInput
                                  disabled={userLogin?.id!==user?.id}
                                  fullWidth
                                  id="phone-edit"
                                  type='text'
                                  name="phone"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  error={errors?.phone ? true: false}
                              />
                              { errors?.phone && (
                                  <FormHelperText error >
                                      {errors?.phone}
                                  </FormHelperText>
                              )}
                          </Stack>
                      </Grid>
                      <Grid item xs={12}>
                        <Stack spacing={1}>
                              <InputLabel htmlFor="address-edit">Address</InputLabel>
                              <OutlinedInput
                                  disabled={userLogin?.id!==user?.id}
                                  fullWidth
                                  id="address-edit"
                                  type='text'
                                  name="address"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                              />
                          </Stack>
                      </Grid>
                    </>
                  }
                  <Grid item xs={12}>
                      <Stack spacing={1}>
                          <InputLabel htmlFor="address-about">About me</InputLabel>
                          <OutlinedInput
                              disabled={userLogin?.id!==user?.id}
                              fullWidth
                              id="about-edit"
                              type='text'
                              name="about"
                              onBlur={handleBlur}
                              onChange={handleChange}
                           />
                      </Stack>
                  </Grid>
                  <Grid item  xs={12}>
                    <Stack spacing={1}>
                      <Typography>Gender</Typography>
                      <Box >
                          <input disabled={userLogin?.id!==user?.id} type="radio" id="genderNam" name="gender" value='Nam' onChange={handleChange} onBlur={handleBlur}/>
                          &nbsp;
                          <label htmlFor="genderNam">Nam</label>
                          &nbsp;&nbsp;&nbsp;
                          <input disabled={userLogin?.id!==user?.id} type="radio" name="gender" id="genderNu" value='Nữ' onChange={handleChange} onBlur={handleBlur}/>
                          &nbsp;
                          <label htmlFor="genderNu">Nữ</label>
                      </Box>
                    </Stack>
                  </Grid>
              </Grid>
          </CardContent>
          {userLogin?.id===user?.id &&
            <>
              <Divider/>

              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button  disabled={isLoading}  type='submit' variant="contained">
                    { !isLoading? 'Save details' :'Loading...'}
                </Button>
              </CardActions>
            </>
          }
        </Card>
      </form>
    );
}