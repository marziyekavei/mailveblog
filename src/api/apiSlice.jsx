import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: "https://api.jsonbin.io/v3" }),
    tagTypes: ["BLOG", "USER"],
    endpoints: builder => ({
        getBlogs: builder.query({
            query: () => "/b/678fb134ad19ca34f8f20c9e",
            providesTags: (result = [], error, arg) => [
                "BLOG",
                ...result.map(({ id }) => ({ type: "BLOG", id })),
            ]
        }),
        getBlog: builder.query({
            query: (initialBlogId) => `/b/678fb134ad19ca34f8f20c9e/${initialBlogId}`,
            providesTags: (result, error, arg) =>
                [{ type: "BLOG", id: arg }],
        }),
        addNewBlog: builder.mutation({
            query: inioalBlog => ({
                url: "/b/678fb134ad19ca34f8f20c9e",
                method: "POST",
                body: inioalBlog,
            }),
            invalidatesTags: ["BLOG"]
        }),
        editBlog: builder.mutation({
            query: blog => ({
                url: `/b/678fb134ad19ca34f8f20c9e/${blog.id}`,
                method: "PUT",
                body: blog
            }),
            invalidatesTags: (result, error, arg) =>
                [{ type: "BLOG", id: arg.id }],
        }),
        deleteBlog: builder.mutation({
            query: blogId => ({
                url: `/b/678fb134ad19ca34f8f20c9e/${blogId}`,
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
    // "https://api.jsonbin.io/v3/b/678fb134ad19ca34f8f20c9e"
    