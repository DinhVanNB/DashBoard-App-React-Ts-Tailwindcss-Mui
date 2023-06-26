import { createBrowserRouter, createHashRouter } from "react-router-dom"
import AuthLayout from "../layouts/AuthLayout"
import MainLayout from "../layouts/MainLayout"
import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"
import Protected from "../components/Protected"
import HomePage from "../pages/HomePage"
import UsersPage from "../pages/UsersPage"
import UserInfoPage from "../pages/UserInfoPage"
import BlogsPage from "../pages/BlogsPage"

 
export const routes= {
    dashboard:{
        path:"/",
        element: <HomePage/>
    } ,
    users:{
        path:"/users",
        element:<Protected><UsersPage/></Protected>
    },
    register:{
        path:'/auth/register',
        element:<RegisterPage/>
    },
    login:{
        path:'/auth/login',
        element:<LoginPage/>
    },
    info:{
        path:'/user-info',
        element:<Protected><UserInfoPage/></Protected>
    },
    blog:{
        path:'/blogs',
        element:<BlogsPage/>
    },
    calender:{
        path:'/calender',
        element:<>calender</>
    }
}


export const router = createHashRouter([
    {
        path:'/',
        element: <MainLayout/>,
        children:[
            routes.dashboard,
            routes.users,
            routes.info,
            routes.blog,
            routes.calender
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout/>,
        children: [
            routes.login,
            routes.register
        ]
    }
])

export const routerUserApi = {
    login:{
        endPoint:'auth/login',
        method: 'POST'
    },
    logout:{
        endPoint: 'auth/logout',
        method:'GET'
    },
    register:{
        endPoint: 'auth/register',
        method: 'POST'
    },
    checkEmail: {
        endPoint: 'auth/email',
        method: 'POST'
    },
    edit:{
        endPoint:'users/ed',
        method: 'PUT'
    },
    deleteUser:{
        endPoint: 'users/dl',
        method: 'DELETE'
    },
    getUsers:{
        endPoint:'users/getAll',
        method: 'GET'
    },
    getUserById:{
        endPoint:'users/user',
        method: 'GET'
    },
    searchUser:{
        endPoint: 'users/search',
        method: 'GET'
    },
    deleteMulti:{
        endPoint: 'users/deleteMulti',
        method: 'DELETE'
    }
};

export const routerPostApi = {
    
    getPosts:{
        endPoint: 'posts/getAll',
        method:'GET'
    },
    getPostByPostId:{
        endPoint: 'posts/getByPostId',
        method: 'POST'
    },
    getPostByUserId: {
        endPoint: 'posts/getByUserId/',
        method: 'POST'
    },
    editPost:{
        endPoint:'posts/edit',
        method: 'PUT'
    },
    deletePost:{
        endPoint: 'posts/deleteById',
        method: 'DELETE'
    },
    createPost:{
        endPoint:'posts/create',
        method: 'POST'
    },
    likePost:{
        endPoint:'posts/like',
        method: 'POST'
    },
    
};

export const routerReviewApi = {
    createReview:{
        endPoint: 'reviews/create',
        method:'POST'
    },
    getReviewByPostId:{
        endPoint: 'reviews/getByPostId',
        method: 'POST'
    },
};

  