import axios from "axios";

const SERVER_URL = "https://api.jsonbin.io/v3";

export const getAllBlogs = () => {
    const url = `${SERVER_URL}/b/678fb134ad19ca34f8f20c9e`;
    return axios.get(url);
};

export const getBlog = (blogId) => {
    const url = `${SERVER_URL}/b/678fb134ad19ca34f8f20c9e/${blogId}`;
    return axios.get(url);
};


export const getAllUsers = () => {
    const url = `${SERVER_URL}/b/678fb134ad19ca34f8f20c9e/users`;
    return axios.get(url)
};

export const getUser = (userId) => {
    const url = `${SERVER_URL}/b/678fb134ad19ca34f8f20c9e/users/${userId}`;
    return axios.get(url);
};

export const deleteUser = (userId) => {
    const url = `${SERVER_URL}/b/678fb134ad19ca34f8f20c9e/users/${userId}`;
    return axios.delete(url);
};

export const createUser = (user) => {
    const url = `${SERVER_URL}/b/678fb134ad19ca34f8f20c9e/users`;
    return axios.post(url, user);
};

export const createBlog = (blog) => {
    const url = `${SERVER_URL}/b/678fb134ad19ca34f8f20c9e`;
    return axios.post(url, blog);
};

export const updateBlog = (blog, blogId) => {
    const url = `${SERVER_URL}/b/678fb134ad19ca34f8f20c9e/${blogId}`;
    return axios.put(url, blog);
};

export const deleteBlog = (blogId) => {
    const url = `${SERVER_URL}/b/678fb134ad19ca34f8f20c9e/${blogId}`;
    return axios.delete(url);
};

//https://api.jsonbin.io/v3/b/678fb134ad19ca34f8f20c9e