import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../css/Blog.css'
import { useBlogContext } from '../hooks/useBlogContext'
import { useDeleteBlog } from '../hooks/useDeleteBlog'
import { format } from 'date-fns';
import { useAuthContext } from '../hooks/useAuthContext'

const Blog = () => {
    const { user } = useAuthContext()
    const allTitlesOfBlogs = document.getElementsByClassName('title-blog-div')
    const allAuthorsOfBlogs = document.getElementsByClassName('author-blog-div')
    const parentsOf_allTitlesOfBlogs = document.getElementsByClassName('blog-div-parent')

    const search_input_event = (e) => {
        // serch by author and title of the blog
        for (var i = 0; i <= allTitlesOfBlogs.length - 1; i++) {
            if (allTitlesOfBlogs[i].textContent.includes(e) || allAuthorsOfBlogs[i].textContent.includes(e)) {
                parentsOf_allTitlesOfBlogs[i].classList.remove('hide')
            } else {
                parentsOf_allTitlesOfBlogs[i].classList.add('hide')
            }
        }
    }

    const { deleteBlog } = useDeleteBlog()
    const { dispatch, blogs } = useBlogContext()
    const navigate = useNavigate()
    useEffect(() => {
        const fetchAllBlogs = async () => {
            const response = await fetch('/api/blog/getall')
            const json = await response.json()

            if (response.ok) {
                await dispatch({ type: 'SET_ALL_BLOGS', payload: json })
            }

            if (!response.ok) {
                console.log(json.msg)
            }
        }

        fetchAllBlogs()
    }, [dispatch])

    const updateInfoForUpdateForm = async (title, text, author, date, id) => {
        const blog = {
            title: title,
            text: text,
            author: author,
            date: date,
            id: id
        }
        localStorage.removeItem('update')
        localStorage.setItem('update', JSON.stringify(blog))
        navigate('/updateblog')
    }
    return (
        <div className='container'>
            <div className="blogs-container">
                {blogs && blogs.map((blog) => {
                    return (
                        <div className='blog-div-parent' key={blog._id}>
                            <div className="title-blog-div">{blog.title}</div>
                            <div className="text-blog-div">{blog.text}</div>
                            <div className="author-blog-div">By {blog.created_by}</div>
                            <div className="date-blog-div">{format(new Date(blog.created_at), 'dd.MM.yyyy')}</div>
                            {(user && blog.created_by === user.username) && (<div className='delete-btn-div'><button className='delete-btn' onClick={() => deleteBlog(blog._id)}>DELETE</button></div>)}
                            {(user && blog.created_by === user.username) && (<div className='update-btn-div'><button className='update-btn' onClick={() => updateInfoForUpdateForm(blog.title, blog.text, blog.created_by, blog.created_at, blog._id)}>UPDATE</button></div>)}
                        </div>
                    )
                })}
            </div>
            <div className="right-vertical-container">
                <div className="input-div"><input type="text" placeholder='Search' className='search-input' onChange={(e) => search_input_event(e.target.value)}></input></div>
                <div className="input-div"><Link to="/postblog" ><button className='post-btn'>Post</button></Link></div>
                <div className="input-div"><button className='see-your-blogs-btn' onClick={() => navigate("/yourblogs")}>See your Blogs</button></div>
            </div>
            <div className="footer"></div>
        </div>
    )
}

export default Blog