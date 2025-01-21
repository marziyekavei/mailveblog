import axios from "axios";
const API_KEY = "$2a$10$RkuO3LKgEtgoy2YhCFuZS.7J6Lj5aWQXZJVDS9wjGNtEbJsMtG.Ze";

const SERVER_URL = "https://api.jsonbin.io/v3";

const headers = {
    "X-Master-Key": API_KEY,  // اضافه کردن X-Master-Key در هدر
    "Content-Type": "application/json",  // تنظیم نوع محتوا
};

export const getAllBlogs = () => {
    const url = `${SERVER_URL}/b/678fb134ad19ca34f8f20c9e/blogs`;
    return axios.get(url, {headers});
};

export const getBlog = (blogId) => {
    const url = `${SERVER_URL}/b/678fb134ad19ca34f8f20c9e/blogs/${blogId}`;
    return axios.get(url, {headers});
};


export const getAllUsers = () => {
    const url = `${SERVER_URL}/b/678fb134ad19ca34f8f20c9e/users`;
    return axios.get(url, {headers})
};

export const getUser = (userId) => {
    const url = `${SERVER_URL}/b/678fb134ad19ca34f8f20c9e/users/${userId}`;
    return axios.get(url, {headers});
};

export const deleteUser = (userId) => {
    const url = `${SERVER_URL}/b/678fb134ad19ca34f8f20c9e/users/${userId}`;
    return axios.delete(url, {headers});
};

export const createUser = (user) => {
    const url = `${SERVER_URL}/b/678fb134ad19ca34f8f20c9e/users`;
    return axios.post(url, user, {headers});
};

export const createBlog = (blog) => {
    const url = `${SERVER_URL}/b/678fb134ad19ca34f8f20c9e/blogs`;
    return axios.post(url, blog, {headers});
};

export const updateBlog = (blog, blogId) => {
    const url = `${SERVER_URL}/b/678fb134ad19ca34f8f20c9e/blogs/${blogId}`;
    return axios.put(url, blog, {headers});
};

export const deleteBlog = (blogId) => {
    const url = `${SERVER_URL}/b/678fb134ad19ca34f8f20c9e/blogs/${blogId}`;
    return axios.delete(url, {headers});
};

//https://api.jsonbin.io/v3/b/678fb134ad19ca34f8f20c9e