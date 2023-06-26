import { routerReviewApi as router } from "../configs/routes";
import { fetchClient } from "./configApi";

 

const reviewApi ={
    onCreate: async(inputData:any)=>{
        const {endPoint, method} = router.createReview;
        const res = await fetchClient(endPoint,method,inputData)
        const result = await res.json();
        return {status:res.status, result};
    },

    onGetReviewByPostId : async(params:string)=>{
        const {endPoint, method} = router.getReviewByPostId;
        const res = await fetchClient(endPoint,method,null, params)
        const result = await res.json();
        return {status:res.status, result};
    },
};

export default reviewApi;