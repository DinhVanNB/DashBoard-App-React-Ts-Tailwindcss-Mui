import { Helmet } from "react-helmet";

interface PropsType{
    title: string
}

const HelmetTitle =({title}:PropsType)=>{
    return(
        <>
            <Helmet>
                <title>
                    {title}
                </title>
            </Helmet>
        </>
    )
}

export default HelmetTitle;