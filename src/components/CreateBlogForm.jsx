import { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectAllUsers } from '../reducers/userSlice';
import { nanoid } from '@reduxjs/toolkit';
import { useAddNewBlogMutation } from '../api/apiSlice'


const CreateBlogForm = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userId, setUserId] = useState("");

    const [addNewBlog, { isLoading }] = useAddNewBlogMutation();

    const navigate = useNavigate();

    const users = useSelector(selectAllUsers);

    const onTitleChange = (e) => setTitle(e.target.value);
    const onContentChange = (e) => setContent(e.target.value);
    const onAuthorChange = (e) => setUserId(e.target.value);

    const canSave = [title, content, userId].every(Boolean) && !isLoading;

    const handleSubmitForm = async () => {
        if (canSave) {
            try {
                await addNewBlog({
                    id: nanoid(),
                    date: new Date().toDateString(),
                    title,
                    content,
                    user: userId,
                    reactions: {
                        thumbsUp: 0,
                        hooray: 0,
                        hearts: 0,
                        roceket: 0,
                        eyes: 0,
                    },
                }).unwrap();
                setTitle("");
                setContent("");
                setUserId("");
                navigate("/");
            } catch (error) {
                console.error("failed to save the Blog", error);
            }
        }

    }
    return (
        <section>
            <h2>پست جدید</h2>
            <form action="" autoComplete="off">
                <label htmlFor="blogTitle"> عنوان پست: </label>
                <input
                    type="text"
                    id="blogTitle"
                    name="blogTitle"
                    value={title}
                    onChange={onTitleChange} />
                <label htmlFor="blogAuthor">نویسنده</label>
                <select name="" id="blogAuthor" value={userId} onChange={onAuthorChange}>
                    <option value="">انتخاب نویسنده</option>
                    {
                        users.map(user => (
                            <option value={user.id} key={user.id}>
                                {user.fullname}
                            </option>
                        ))
                    }
                </select>
                <label htmlFor="blogContent"> محتوای اصلی: </label>
                <textarea
                    id="blogContent"
                    name="blogContent"
                    value={content}
                    onChange={onContentChange} />
                <button type="button" onClick={handleSubmitForm}
                    disabled={!canSave}
                > منتشر کردن </button>
            </form>
        </section>
    )
}

export default CreateBlogForm;
