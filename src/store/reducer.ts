import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type { Posts} from "../interface/Posts.ts";
import type {InitialStore} from "../interface/InitialStore.ts";

const initialState: InitialStore = {
    allPosts: [],
    lastTwentyPosts: [],
    users: [],
    filterByUserID: [],
    status: 'loadView',
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        getPost:(state, action:PayloadAction<Posts[]>)=>{
            state.allPosts = action.payload;
            state.lastTwentyPosts = state.allPosts.slice(-20).reverse();
            const allIds = state.allPosts.map(post => post?.userId);
            const uniqueUserIds = allIds.filter((id, idx) => allIds.indexOf(id) === idx);
            state.users = uniqueUserIds;
        },
        filterByUser:(state, action)=>{
            state.filterByUserID = state.allPosts.filter(post => post?.userId === action.payload).reverse().slice(0,20);
        },
        changeStatus:(state, action)=>{
            state.status = action.payload;
        },
        putNewPost:(state, action)=>{
            state.allPosts = [...state.allPosts, action.payload];
            state.lastTwentyPosts.unshift(action.payload);
            state.lastTwentyPosts.pop();
            const allIds = state.allPosts.map(post => post?.userId);
            const uniqueUserIds = allIds.filter((id, idx) => allIds.indexOf(id) === idx);
            state.users = uniqueUserIds;
        }
    }
})


export const {getPost, filterByUser, changeStatus, putNewPost} = postsSlice.actions;
export default postsSlice.reducer;