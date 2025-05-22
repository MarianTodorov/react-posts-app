import type {CreatePost, Posts} from '../interface/Posts'

const API_URL = 'https://jsonplaceholder.typicode.com/posts'

export async function getPosts(): Promise<Posts[]> {
    const response = await fetch(API_URL);
    const data = (await response.json()) as Posts[];
    return data;
}

export async function postNewPosts(newPost: CreatePost): Promise<Posts[]> {
    const resp = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-type': 'application/json; charset=UTF-8',},
        body: JSON.stringify(newPost),
    });

    const data = (await resp.json()) as Posts[];
    return data;
}