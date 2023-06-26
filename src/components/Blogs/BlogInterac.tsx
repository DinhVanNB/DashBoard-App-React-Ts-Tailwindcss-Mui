import { IconButton, Box, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import { SmsOutlinedIcon, ThumbUpOutlinedIcon } from "../../configs/constant";

interface propsType{
    like: any
    views: number
    handleLike:()=>void
}

const BlogInterac = ({ like, views, handleLike }:propsType) => {
  const {userLogin} = useSelector((state:RootState)=>state.user)

  const printListLike=()=>{
    let list='';
    (JSON.parse(like)).map((user:any)=> list+=user.userName + ', ')
    return list
  }


  return (
    <Box 
      sx={{ textAlign: "right", "& .MuiButtonBase-root": {color:'red'} }}
    >
      <IconButton sx={{fontSize:14, color:'white'}}  component="span" >
        <SmsOutlinedIcon /> &nbsp;{views}
      </IconButton>
      <Tooltip title={printListLike()} placement="top" arrow>
        <IconButton onClick={handleLike} style={{ color:(JSON.parse(like)).some((user:any)=>user?.userId===userLogin?.id)? 'yellow' :  'white', fontSize:'14px'}}   component="span" >
          <ThumbUpOutlinedIcon  /> &nbsp;{(JSON.parse(like)).length || 0}
        </IconButton>
      </Tooltip>
    </Box>
  );
};



export default BlogInterac;
