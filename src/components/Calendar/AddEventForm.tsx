import { useState } from 'react';
import { TextField, Button, Stack, InputLabel } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {setCalenderEvents} from '../../redux/calenderSlice';

interface propsType {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const AddEventForm =({setOpen}:propsType) => {
    const dispatch = useDispatch();
    const {userLogin} = useSelector((state:RootState)=>state.user)
    const [selectedDate, setSelectedDate] = useState(
      {
        title:'',
        start:'',
        end:'',
        color:''
      });
    
    const handleChange =({target}:React.ChangeEvent<HTMLInputElement>)=>{
      setSelectedDate(prev=>({...prev,[target.name]:target.value}))
    }

    const handleSubmit =(e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      setOpen(false)
      dispatch(setCalenderEvents({...selectedDate,createBy: `${userLogin?.firstName} ${userLogin?.lastName}`, userId: userLogin.id}))
    }

    return (
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <Stack spacing={1}>
              <InputLabel>Event Name*</InputLabel>
              <TextField
                name="title"
                required
                type='text'
                fullWidth
                value={selectedDate.title}
                onChange={handleChange}
              />
            </Stack>
            <Stack spacing={1}>
              <InputLabel>Start Date</InputLabel>
              <TextField
                name="start"
                required
                type='datetime-local'
                fullWidth
                value={selectedDate.start}
                onChange={handleChange}
              />
            </Stack>
            <Stack spacing={1}>
              <InputLabel>End Date</InputLabel>
              <TextField
                name="end"
                required
                type='datetime-local'
                value={selectedDate.end}
                onChange={handleChange}
              />
            </Stack>
            <Stack bgcolor='maroon' spacing={1}>
              <InputLabel>Background Color Event</InputLabel>
              <Stack direction='row' alignItems='center' justifyContent='space-between' >
                <Stack sx={{color:'#fe0000'}} spacing={0.5}>
                  <input type="radio" id="colorRed" name="color" value='#fe0000' onChange={handleChange} />
                  <label htmlFor="colorRed">Red</label>
                </Stack>
                <Stack sx={{color:'#66df5d'}}  spacing={0.5}>
                  <input type="radio" id="colorGreen" name="color" value='#66df5d' onChange={handleChange} />
                  <label htmlFor="colorGreen">Green</label>
                </Stack>
                <Stack sx={{color:'#4752e6'}}  spacing={0.5}>
                  <input type="radio" id="colorBlue" name="color" value='#4752e6' onChange={handleChange} />
                  <label htmlFor="colorBlue">Blue</label>
                </Stack>
                <Stack sx={{color:'#8453DF'}} spacing={0.5}>
                  <input type="radio" id="colorViolet" name="color" value='#8453DF' onChange={handleChange} />
                  <label htmlFor="colorViolet">Violet</label>
                </Stack>
                <Stack sx={{color:'#FAAB00'}} spacing={0.5}>
                  <input type="radio" name="color" id="colorOrange" value='#FAAB00' onChange={handleChange} />
                  <label htmlFor="colorOrange">Orange</label>
                </Stack>
              </Stack>
             
            
            </Stack>
            <Stack direction='row' justifyContent='flex-end' spacing={1}>
              <Button  variant='outlined'  color="secondary" type="submit" >
                Submit
              </Button>
              <Button variant='outlined' color='warning' type='reset' >
                Reset
              </Button>
            </Stack>
          </Stack>
        </form>
    );
  }



export default AddEventForm;
