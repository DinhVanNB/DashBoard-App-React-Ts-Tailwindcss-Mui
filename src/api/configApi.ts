
import { token } from "../App";
import { REACT_APP_BASE_URL } from "../configs/constant";


export const fetchClient = (endPoint:string,method:string, body?:any, params?:string)=>{
    const formData = new FormData();
    if(body?.image?.length>0 && typeof(body?.image)==='object'){
        [...body.image].map(img=>{
            return formData.append('images',img,img.name)
        })
    }
    if(body?.coverPhoto?.length>0 && typeof(body.coverPhoto)==='object'){
        [...body.coverPhoto].map(img=>{
            return formData.append('coverPhoto',img,img.name)
        })
    }
    if(body?.coverPhoto) delete body.coverPhoto;
    if(body?.image) delete body.image;
    for(let key in body){
        formData.append(key, body[key])
    }

    let opt:any = {
        method ,
        headers:{
            Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
        body: formData
    };
    if(method==='GET') delete opt.body
    
    return fetch(`${REACT_APP_BASE_URL}${endPoint}${params? params:''}`,opt);
};

