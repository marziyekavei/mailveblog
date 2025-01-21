import axios from "axios";

const SUPABASE_URL = "https://mcggfakkqawjnyaqqnju.supabase.co";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jZ2dmYWtrcWF3am55YXFxbmp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczNzg4NTAsImV4cCI6MjA1Mjk1NDg1MH0.XOHfjWTcBlxxMM2TjgyWqnTEjH8m1OlWRTInr8KY_Xo";

const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${API_KEY}`,  // اضافه کردن هدر احراز هویت
    "apikey": API_KEY,  // اضافه کردن کلید API به عنوان هدر
};

export const getAllBlogs = () => {
    const url = `${SUPABASE_URL}/blogs`;
    return axios.get(url, {headers});
};

export const getBlog = (blogId) => {
    const url = `${SUPABASE_URL}/blogs?id=eq.${blogId}`;
    return axios.get(url, {headers});
};


export const getAllUsers = () => {
    const url = `${SUPABASE_URL}/users`;
    return axios.get(url, {headers})
};

export const getUser = (userId) => {
    const url = `${SUPABASE_URL}/users?id=eq.${userId}`;
    return axios.get(url, {headers});
};

export const deleteUser = (userId) => {
    const url = `${SUPABASE_URL}/users?id=eq.${userId}`;
    return axios.delete(url, {headers});
};

export const createUser = (user) => {
    const url = `${SERVER_URL}/users`;
    return axios.post(url, user, {headers});
};

export const createBlog = (blog) => {
    const url = `${SERVER_URL}/blogs`;
    return axios.post(url, blog, {headers});
};

export const updateBlog = (blog, blogId) => {
    const url = `${SUPABASE_URL}/blogs?id=eq.${blogId}`;
    return axios.put(url, blog, {headers});
};

export const deleteBlog = (blogId) => {
    const url = `${SUPABASE_URL}/blogs?id=eq.${blogId}`;
    return axios.delete(url, {headers});
};

//https://api.jsonbin.io/v3/b/678fb134ad19ca34f8f20c9e