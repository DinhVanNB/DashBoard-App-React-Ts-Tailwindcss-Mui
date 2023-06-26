import { createSlice, current } from "@reduxjs/toolkit";


interface typeState{
    posts: any
}

const initialState: typeState={
    posts:{}
}

const postSlice = createSlice({
    name:'post',
    initialState,
    reducers:{
        fetchAllPosts: (state,action)=>{
            state.posts = action.payload
        },
        editPost: (state,action)=>{
            console.log(state,action)
            // const prevState= {...(current(state).userLogin)}
            // state.userLogin  ={...prevState,...action.payload};
            // state.isLogin = true;
        },
        createPost:(state,action)=>{
            state.posts = [].concat(current(state).posts,action.payload)
        },
        deletePost:(state,action)=>{
            console.log(state,action)
            // state.usersData.data=  (current(state).usersData.data).filter(user=>{
            //     return user.id!==action.payload.id
            // })
        }
    }
})

export const {fetchAllPosts, editPost, deletePost,createPost } = postSlice.actions;
export default postSlice.reducer;