import { FormLogin } from "../components/Auth";
import HelmetTitle from "../components/HelmetTitle"


const LoginPage = ()=>{
    

    return(
        <>
            <HelmetTitle title="Đăng nhập | Login"/>
            <FormLogin/>
        </>
    )
}


export default LoginPage;