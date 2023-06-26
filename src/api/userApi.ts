import { routerUserApi as router } from "../configs/routes";
import { fetchClient } from "./configApi";

const userApi = {
    onLogin: async(inputData:object)=>{
        const {endPoint,method} = router.login
        const res = await fetchClient(endPoint,method,inputData)
        const result = await res.json();
        return {status: res.status , result}
    },

    onLogout : async()=>{
        const {endPoint, method} = router.logout;
        const res = await fetchClient(endPoint, method)
        const result = await res.json();
        return {status:res.status, result};
    },

    onRegister: async(inputData: object)=>{
        const {endPoint, method}  = router.register;
        const res = await fetchClient(endPoint,method,inputData)
        const result = await res.json();
        return {status:res.status, result};
    },

    onCheckExistEmail :async (inputData:object)=>{
        const {endPoint, method} = router.checkEmail;
       const res = await fetchClient(endPoint,method,inputData)
        const result = await res.json();
        return {status:res.status, result};
    },

    onGetUsers: async(params:string)=>{
        const {endPoint, method}  = router.getUsers;
        const res = await fetchClient(endPoint, method, null,params)
        const result = await res.json();
        return {status:res.status, result}; 
    },

    onGetUserById:async(params:string)=>{
        const {endPoint, method}  = router.getUserById;
        const res = await fetchClient(endPoint, method, null,params)
        const result = await res.json();
        return {status:res.status, result}; 
    },

    onEdit: async(inputData:object)=>{
        const {endPoint, method}  = router.edit;
        const res = await fetchClient(endPoint, method,inputData);
        const result = await res.json();
        return {status:res.status, result}; 
    },

    onDeleteById: async(id:string)=>{
        const {endPoint, method}  = router.deleteUser;
        const res = await fetchClient(endPoint, method,{id});
        const result = await res.json();
        return {status:res.status, result}; 
    },
    onDeleteMulti: async(id:string[])=>{
        const {endPoint, method}  = router.deleteMulti;
        const res = await fetchClient(endPoint, method,{id});
        const result = await res.json();
        return {status:res.status, result}; 
    },

    onSearchUser: async(params:string)=>{
        const {endPoint, method}  = router.searchUser;
        const res = await fetchClient(endPoint, method,null,params);
        const result = await res.json();
        return {status:res.status, result}; 
    }
}

export default userApi;