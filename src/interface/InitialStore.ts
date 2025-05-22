import type {Posts} from "./Posts.ts";

export interface InitialStore{
    allPosts: Posts[],
    lastTwentyPosts: Posts[],
    users: number[],
    filterByUserID: Posts[],
    status: string
}