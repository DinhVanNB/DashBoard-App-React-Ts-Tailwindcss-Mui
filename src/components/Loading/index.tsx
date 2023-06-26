import { Backdrop, CircularProgress } from '@mui/material';
import {useSelector, useDispatch} from 'react-redux';
import { setLoading } from '../../redux/appSlice';

export default function Loading(){
    const {isLoading} =useSelector((state:RootState)=>state.appState)
    const dispatch = useDispatch();

    return(
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex:9999 }}
                open={isLoading} onClick={()=>dispatch(setLoading(false))}
            >
                <CircularProgress color='inherit'/>
            </Backdrop>
        </div>
    )
}