import { useNavigate } from "react-router-dom";
import { logoImg } from "../../configs/constant";
import {Typography} from "@mui/material"
import { routes } from "../../configs/routes";



const AuthHeader =()=>{
    const navigate = useNavigate();

    return(
        <div className=" inline-block  ml-2 mt-2 cursor-pointer hover:text-blue-500"  onClick={()=>navigate(routes.dashboard.path)}>
            <img className="w-9 inline-block align-middle" alt="" src={logoImg} />  
            <Typography className=" inline-block align-middle " variant="h6">
                Dashboard
            </Typography>  
        </div>
    )
}

export default AuthHeader;