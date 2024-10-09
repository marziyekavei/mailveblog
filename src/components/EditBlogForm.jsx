import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { blogUpdated, selectBlogId } from "../reducers/blogSlice";


const EditBlogForm = () => {
    const { blogId } = useParams();

    const blog = useSelector(state => selectBlogId(state, blogId));

    const [title, setTitle] = useState(blog.title);
    const [content, setContent] = useState(blog.content);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onTitleChange = (e) => setTitle(e.target.value);
    const onContentChange = (e) => setContent(e.target.value);

    const handleSubmitForm = () => {
        if (title && content) {
            dispatch(blogUpdated({ id: blogId, title, content }));
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
