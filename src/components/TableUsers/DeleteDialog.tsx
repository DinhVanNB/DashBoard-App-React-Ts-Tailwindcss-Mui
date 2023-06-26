import { Alert, Button, Stack } from '@mui/material';


interface propsType{
    user:any
    setOpenModal:React.Dispatch<React.SetStateAction<{type:string,isOpen:boolean}>>
    handleDelete:(id:string)=>void
}
  
const DeleteDialog = ({user,setOpenModal,handleDelete}:propsType) => {

    return (
        <Alert  variant="outlined" severity="warning">
            <Stack direction='row' alignItems='center'>
                Bạn có chắc chắn muốn xoá {user.email}
                <Button onClick={()=>{handleDelete(user.id);setOpenModal({type:'',isOpen:false})}}>OK</Button>
                <Button onClick={()=>{setOpenModal({type:'',isOpen:false})}}>Cancel</Button>
            </Stack>
        </Alert>
    );
  };
  
 
export default DeleteDialog;