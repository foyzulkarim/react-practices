import axios from 'axios';
// const BaseUrl = 'http://localhost:61361/api';
const BaseUrl = 'http://feli-api.azurewebsites.net/api';

// data api calls
export const getData = () => {
    return axios.get('http://localhost:4000/comments')
}
export const getPosts = () => {
    return axios.get(`${BaseUrl}/posts`);
}
export const createPost = (data) => {
    console.log("api call ->", data)
    return axios.post(`${BaseUrl}/posts`, data.payload);
}