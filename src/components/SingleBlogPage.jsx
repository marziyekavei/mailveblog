import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { blogDeleted, selectBlogId } from "../reducers/blogSlice";
import ShowTime from "./ShowTime";
import ShowAuthor from "./ShowAuthor";
import ReactionButtons from "./ReactionButtons";



const SingleBlogPage = () => {

    const { blogId } = useParams();

    const blog = useSelector(state => selectBlogId(state, blogId));

    if (!blog) {
        return (
            <section>
                <h2>نگرد نیست</h2>
            </section>
        )
    };

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleDelete = () => {
        if (blog) {
            dispatch(blogDeleted({ id: blog.id }));
            navigate("/");
        }
    }

    return (
        <section>
            <article className='blog'>
                <h2>{blog.title}</h2>
                <div>
                    <ShowTime timestamp={blog.date}/>
                    <ShowAuthor userId={blog.user}/>
                </div>
                <p className='blog-content'>{blog.content}</p>

               <ReactionButtons blog={blog}/>

                <Link to={`/editBlog/${blog.id}`} className="button">
                    ویرایش پست
                </Link>
                <button className="muted-button"
                    style={{ marginRight: "10px" }}
                    onClick={handleDelete}
                >
                    حذف پست
                </button>
            </article>

        </section>
    )
}

export default SingleBlogPage;
