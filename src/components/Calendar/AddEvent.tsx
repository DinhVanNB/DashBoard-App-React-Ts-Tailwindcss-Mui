import { Fab, Tooltip, Box, IconButton, Typography, Stack, useTheme} from '@mui/material';
import { useState } from 'react';
import AddEventForm from './AddEventForm';
import { Add, CloseIcon } from '../../configs/constant';
import { themeOptions } from '../../themes/theme';

const AddEvent =()=> {
    const [open, setOpen] = useState<boolean>(false);
    const theme = useTheme();

    return (
      < >
        <Tooltip title="Add New Event">
          <Fab
            color="secondary"
            onClick={()=>setOpen(true)}
            sx={{
              position: 'fixed',
              bottom: '1.5vmin',
              right: '1.5vmin',
              zIndex:10
            }}
          >
            <Add />
          </Fab>
        </Tooltip>
        {open && <Box width='300px' boxShadow={theme.shadows[10]} sx={{borderRadius:'1vmin', bgcolor:'#fff', position: 'fixed', bottom: '1.5vmin', right: '1.5vmin', zIndex: 11}}>
          <Stack borderRadius='1vmin 1vmin  0 0' p={1} direction='row' alignItems='center' bgcolor={themeOptions.palette.blue.light} >
            <Typography  flex='1 1 100%' variant='h5' >
              Add New Event
            </Typography>
            <Box >
              <Tooltip title="Close">
                <IconButton onClick={() => setOpen(false)}>
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Stack>
          <Box p={theme.spacing(2)}>
            <AddEventForm setOpen={setOpen}/>
          </Box>
        </Box>}
      </>
    );
  }




export default AddEvent;
