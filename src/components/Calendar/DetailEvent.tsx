
import { Link as RouterLink } from 'react-router-dom';
import { Popover, Typography ,IconButton , Menu, MenuItem , Divider, Stack,Box, Dialog , Alert , Button, Link} from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCalenderEvents } from '../../redux/calenderSlice';
import { routes } from '../../configs/routes';
import { CalendarMonthIcon, MoreVert } from '../../configs/constant';

interface propsType  {
    eventsJobConvert:any
    handleClose:()=>void
    anchorEl:Element | null
  }

const  DetailEvent =({eventsJobConvert,anchorEl,handleClose}:propsType)=> {
    const [anchorElOpt, setAnchorElOpt] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const {userLogin} = useSelector((state:RootState)=>state.user)
    const dispatch = useDispatch();

    const handleDeleteEvent = () => {
        dispatch(deleteCalenderEvents({id:eventsJobConvert?.id,userId:userLogin?.roleId}))
    };
    

    const handleClickOpt = (e:any) => {
        setAnchorElOpt(e.currentTarget);
      };
    
    const handleCloseOpt = () => {
        setAnchorElOpt(null);
    };

    return (
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
      >
        <Stack width='fit-content' >
            <Stack direction='row' alignItems='center' justifyContent='space-between' color='white' p={0.5} bgcolor={`${eventsJobConvert?.color}`}>
                <Stack direction='row' spacing={1}>
                    <CalendarMonthIcon />
                    <Typography variant='h5' >
                        {eventsJobConvert?.title}
                    </Typography>
                </Stack>
                <IconButton
                    color='inherit'
                    aria-label="More"
                    aria-owns='long-menu'
                    aria-haspopup="true"
                    onClick={handleClickOpt}
                >
                    <MoreVert />
                </IconButton>
            </Stack>
            <Box p={1}>
                <Typography>
                    Người tạo: <Link to={`${routes.info.path}?id=${eventsJobConvert?.userId}`} component={RouterLink} underline='hover' >
                                    <b>{eventsJobConvert?.createBy}</b> 
                                </Link>
                </Typography>
            </Box>
            <Divider />
            <Box p={1}>
                <Typography> 
                    Mô tả: <b></b> 
                </Typography>
            </Box>
            <Divider />
            <Box p={1}>
                <Typography> 
                    Thời gian bắt đầu: <b>{new Date(eventsJobConvert?.start).toLocaleTimeString()}</b> 
                </Typography>
            </Box>
            <Divider />
            <Box p={1}>
                <Typography>
                   Thời gian kết thúc: <b>{new Date(eventsJobConvert?.end).toLocaleTimeString()}</b>
                </Typography>
            </Box>
        </Stack>
        <Menu
            id="long-menu"
            anchorEl={anchorElOpt}
            open={Boolean(anchorElOpt)}
            onClose={handleCloseOpt}
            PaperProps={{
                style: {
                    maxHeight:'50px',
                    width: 'fit-content',
                    },
            }}
        >
            <MenuItem onClick={()=>{handleCloseOpt();setOpenDialog(true)}}>
                Delete Event
            </MenuItem>
        </Menu>
        <Dialog
            open={openDialog}
            onClose={()=>setOpenDialog(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Alert  variant="outlined" severity="warning">
                <Stack direction='row' alignItems='center'>
                    Bạn có chắc chắn muốn xoá {eventsJobConvert?.title}
                    <Button onClick={()=>{handleClose();setOpenDialog(false);handleDeleteEvent()}}>OK</Button>
                </Stack>
            </Alert>
        </Dialog>
      </Popover>
    );
  }



export default DetailEvent;
