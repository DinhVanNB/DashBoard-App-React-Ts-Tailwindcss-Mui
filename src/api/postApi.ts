import { routerPostApi as router} from "../configs/routes";
import { fetchClient } from "./configApi";



const postApi = {

    onGetPosts: async(params:string) => {
        const {endPoint, method} = router.getPosts;
        const res = await fetchClient(endPoint, method, null, params)
        const result = await res.json();
        return {status: res.status, result};
    },

    onGetPostById: async(inputData:any) => {
        const {endPoint, method} = router.editPost;
        const res = await fetchClient(endPoint, method, inputData);
        const result = await res.json();
        return {status: res.status, result};
    },

    onCreatePost: async(inputData:any) => {
        const {endPoint, method} = router.createPost;
        const res = await fetchClient(endPoint, method, inputData);
        const result = await res.json();
        return {status: res.status, result};
    },
    onToggleLike: async(inputData:any)=>{
        const {endPoint, method} = router.likePost;
        const res = await fetchClient(endPoint, method, inputData);
        const result = await res.json();
        return {status: res.status, result};
    },
    onDeletePost: async(inputData:any)=>{
        const {endPoint, method} = router.deletePost;
        const res = await fetchClient(endPoint, method, inputData);
        const result = await res.json();
        return {status: res.status, result};
    }
};

export default postApi;