import { Button, IconButton, Stack } from '@mui/material';
import {useSelector, useDispatch} from 'react-redux'
import { toggleLanguage } from '../../redux/appSlice';
import { NotificationsNoneIcon } from '../../configs/constant';
import ProfileMenu from './ProfileMenu';

const TopBar =()=>{
    const {language} = useSelector((state:RootState)=>state.appState)
    const dispatch = useDispatch();

    return(
        <div className='flex justify-end p-2'>
            <Stack direction='row' spacing={1} alignItems='center'>
                <Button variant="text" onClick={()=>dispatch(toggleLanguage())}>
                    {language==='vi'? "English": "Việt Nam"}
                </Button>
                <IconButton>
                    <NotificationsNoneIcon/>
                </IconButton>
                <ProfileMenu/>
            </Stack>
        </div>
    )
}

export default TopBar;