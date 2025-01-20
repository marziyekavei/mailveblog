import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEditBlogMutation, useGetBlogQuery } from "../api/apiSlice";


const EditBlogForm = () => {
    const { blogId } = useParams();

    const { data: blog } = useGetBlogQuery(blogId);
    const [updateBlog, { isLoading }] = useEditBlogMutation();

    const [title, setTitle] = useState(blog.title);
    const [content, setContent] = useState(blog.content);

    const navigate = useNavigate();

    const onTitleChange = (e) => setTitle(e.target.value);
    const onContentChange = (e) => setContent(e.target.value);

    const handleSubmitForm = async () => {
        const editedBlog = {
            id: blogId,
            date: blog.date,
            title,
            content,
            user: blog.user,
            reactions: {
                thumbsUp: 0,
                hooray: 0,
                hearts: 0,
                roceket: 0,
                eyes: 0,
            },
        };
        if (title && content) {
            await updateBlog({ ...editedBlog });
            navigate(`/blogs/${blogId}`);
        }
    }

    if (!blog) {
        return (
            <section>
                <h2>نگرد نیست</h2>
            </section>
        )
    }
    return (
        <section>
            <h2> ویرایش چست </h2>
            <form action="" autoComplete="off">
                <label htmlFor="blogTitle"> عنوان پست: </label>
                <input
                    type="text"
                    id="blogTitle"
                    name="blogTitle"
                    value={title}
                    onChange={onTitleChange} />
                <label htmlFor="blogContent"> محتوای اصلی: </label>
                <textarea
                    id="blogContent"
                    name="blogContent"
                    value={content}
                    onChange={onContentChange} />
                <button type="button" onClick={handleSubmitForm}> ذخیره ویرایش </button>
            </form>
        </section>
    )
}

export default EditBlogForm
