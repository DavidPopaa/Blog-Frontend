import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"
import '../css/Blog.css'
import { useDeleteBlog } from "../hooks/useDeleteBlog"
import { format } from 'date-fns';
import { useBlogContext } from "../hooks/useBlogContext"

const YourBlogs = () => {
    const { deleteBlog } = useDeleteBlog()
    const { user } = useAuthContext()
    const navigate = useNavigate()
    const { dispatch, blogs } = useBlogContext()

    useEffect(() => {
        const fetchAllBlogs = async() => {
            const response = await fetch('/api/blog/getall')
            const json = await response.json()

            if(response.ok) {
               await dispatch({ type: 'SET_ALL_BLOGS', payload: json })
            }

            if(!response.ok) {
                console.log(json.msg)
            }
        }

        fetchAllBlogs()
    },[dispatch])

    const updateInfoForUpdateForm = async(title, text, author, date, id) => {
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
        <div className='your-blogs'>
            <div className="blogs-container-2">
                {blogs && blogs.map((blog) => {
                    return(
                        blog.created_by === user.username && (<div className='blog-div-parent' key={blog._id}>
                            <div className="title-blog-div">{blog.title}</div>
                            <div className="text-blog-div">{blog.text}</div>
                            <div className="author-blog-div">By {blog.created_by}</div>
                            <div className="date-blog-div">{format(new Date(blog.created_at), 'dd.MM.yyyy')}</div>
                            <div className='delete-btn-div'><button className='delete-btn' onClick={() => deleteBlog(blog._id)}>DELETE</button></div>
                            <div className='update-btn-div'><button className='update-btn' onClick={() => updateInfoForUpdateForm(blog.title, blog.text, blog.created_by, blog.created_at, blog._id)}>UPDATE</button></div>
                        </div>)
                    )
                })}
                {!blogs && <h1>You have no posted blogs</h1>}
            </div>
            
            <div className="footer"></div>
        </div>
    )
}

export default YourBlogs