import { createSlice, nanoid, createAsyncThunk, current, createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { createBlog, deleteBlog, getAllBlogs, updateBlog } from '../services/blogsServices';

const blogAdaptor = createEntityAdapter({
    sortComparer: (a, b) => {
        const dateA = a.date || "";  // اطمینان از مقداردهی پیش‌فرض
        const dateB = b.date || "";
        return dateB.localeCompare(dateA);  // مقایسه به صورت نزولی
      },
});

const initialState = blogAdaptor.getInitialState({
    status: "idle",
    error: null,
});
console.log(initialState)

export const fetchBlogs = createAsyncThunk("/blogs/fetchBlogs", async () => {
    const response = await getAllBlogs();
    return response.data;
});

export const addNewBlog = createAsyncThunk("/blogs/addNewBlog", async (initialBlog) => {
    const response = await createBlog(initialBlog);
    return response.data;
});

export const deleteApiBlog = createAsyncThunk("/blogs/deleteApiBlog", async (initialBlogId) => {
    await deleteBlog(initialBlogId);
    return initialBlogId;
});

export const updateApiBlog = createAsyncThunk("blogs/updateApiBlog", async initialBlog => {
    const response = await updateBlog(initialBlog, initialBlog.id);
    return response.data;
});

const blogSlice = createSlice({
    name: "blogs",
    initialState: initialState,
    reducers: {
        reactionAdded: (state, action) => {
            const { blogId, reaction } = action.payload;
            const existingBlog = state.entities[blogId];

            if (existingBlog) {
                existingBlog.reactions[reaction]++;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBlogs.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.status = "completed";
                blogAdaptor.upsertMany(state, action.payload);
            })
            .addCase(fetchBlogs.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(addNewBlog.fulfilled, blogAdaptor.addOne)
            .addCase(deleteApiBlog.fulfilled, blogAdaptor.removeOne)
            .addCase(updateApiBlog.fulfilled, blogAdaptor.updateOne)
    }
});

export const {
    selectAll: selectAllBlogs,
    selectById: selectBlogId,
    selectIds: selectBlogIds
} = blogAdaptor.getSelectors(state => state.blogs);

export const selectUserBlogs = createSelector(
    [selectAllBlogs, (state, userId) => userId],
    (blogs, userId) => blogs.filter(blog => blog.user === userId)
);

export const { blogAdded, blogUpdated, blogDeleted, reactionAdded } = blogSlice.actions;

export default blogSlice.reducer;