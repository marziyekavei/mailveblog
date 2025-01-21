import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const SUPABASE_URL = "https://mcggfakkqawjnyaqqnju.supabase.co";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jZ2dmYWtrcWF3am55YXFxbmp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczNzg4NTAsImV4cCI6MjA1Mjk1NDg1MH0.XOHfjWTcBlxxMM2TjgyWqnTEjH8m1OlWRTInr8KY_Xo";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${SUPABASE_URL}/rest/v1`,
        prepareHeaders: (headers) => {
            // افزودن هدر برای دسترسی به Supabase
            headers.set('Authorization', `Bearer ${API_KEY}`);
            headers.set('apikey', API_KEY);
            return headers;
        }
    }),
    tagTypes: ["BLOG", "USER"],
    endpoints: builder => ({
        getBlogs: builder.query({
            query: () => "/blogs",
            providesTags: (result = [], error, arg) => [
                "BLOG",
                ...result.map(({ id }) => ({ type: "BLOG", id })),
            ]
        }),
        getBlog: builder.query({
            query: (initialBlogId) => `/blogs?id=eq.${initialBlogId}`,
            providesTags: (result, error, arg) =>
                [{ type: "BLOG", id: arg }],
        }),
        addNewBlog: builder.mutation({
            query: inioalBlog => ({
                url: "/blogs",
                method: "POST",
                body: inioalBlog,
            }),
            invalidatesTags: ["BLOG"]
        }),
        editBlog: builder.mutation({
            query: blog => ({
                url: `/blogs?id=eq.${blog.id}`,
                method: "PUT",
                body: blog
            }),
            invalidatesTags: (result, error, arg) =>
                [{ type: "BLOG", id: arg.id }],
        }),
        deleteBlog: builder.mutation({
            query: blogId => ({
                url: `/blogs?id=eq.${blogId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["BLOG"],
        })
    }),
});

export const {
    useGetBlogsQuery,
    useGetBlogQuery,
    useAddNewBlogMutation,
    useEditBlogMutation,
    useDeleteBlogMutation } = apiSlice;

//https://my-json-server.typicode.com/marziyekavei/veblog
