import {  RouterProvider } from 'react-router-dom'
import { router } from './configs/routes';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './themes/theme';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { toast , ToastContainer } from 'react-toastify';
import { setAppToast} from './redux/appSlice';
import "react-toastify/ReactToastify.min.css";
import Loading from './components/Loading';

let token:string;

function App() {
  const {message, status,accessToken} =useSelector((state:RootState)=>state.appState)
  token = accessToken;
  const dispatch = useDispatch();
  
  useEffect(()=>{
      (()=>{
        if(message){
          status<300? toast.success(message) : toast.error(message);
          dispatch(setAppToast({message:'',status:0}))
        }
      })()
  },[message, status, dispatch])

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <RouterProvider router={router}/>
        <ToastContainer 
          position="top-right" 
          draggable={false} 
          theme='colored' 
          closeOnClick 
        />
        <Loading/>
      </ThemeProvider>
    </>
  );
}

export default App;
export {token};