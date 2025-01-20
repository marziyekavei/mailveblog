import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ShowTime from './ShowTime';
import ShowAuthor from './ShowAuthor';
import ReactionButtons from './ReactionButtons';
import Spinner from './Spinner ';
import { useGetBlogsQuery } from '../api/apiSlice';

let Blog = ({ blog }) => {
    return (
        <>
            <article className="blog-excerpt">
                <h3>{blog.title}</h3>
                <div>
                    <ShowTime timestamp={blog.date} />
                    <ShowAuthor userId={blog.user} />
                </div>
                <p className='blog-content'>{blog.content.substring(0, 100)}</p>

                <ReactionButtons blog={blog} />

                <Link to={`/blogs/${blog.id}`} className='butten muted-button'>
                    دیدن کامل پست
                </Link>
            </article>
        </>
    )
}

const BlogsList = () => {
    const {
        data: blogs = [],
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetBlogsQuery();

    const navigate = useNavigate();

    const sortedBlogs = useMemo(() => {
        const sortedBlogs = blogs.slice();
        sortedBlogs.sort((a, b) => b.date.localCompare(a.date));
        return sortedBlogs;
    }, [blogs])

    let content;
    if (isLoading) {
        content = <Spinner text=' بارگزاری ... ' />;
    } else if (isSuccess) {
        content = sortedBlogs.map((blog) => <Blog blog={blog} key={blog.id} />);
    
    } else if (isError) {
        content = <div>{error}</div>
    }

    return (
        <section className='blog-list'>
            <button className='full-button accent-button'
                style={{ marginTop: "1em" }}
                onClick={() => navigate("/blogs/create-blog")}>
                ساخت پست جدید
            </button>
            <h2>تمامی پست ها</h2>
            {content}
        </section>
    )
}

export default BlogsList;
