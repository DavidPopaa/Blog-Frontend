import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"
import { useBlogContext } from "../hooks/useBlogContext"
import '../css/Blog.css'

const PostBlog = () => {
    const navigate = useNavigate()
    const { user } = useAuthContext()
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const { dispatch } = useBlogContext()

    const postBlog = async (e) => {
        e.preventDefault()

        const response = await fetch("/api/blog/post", {
            method: 'POST',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({ title, text, created_by: user.username })
        })
        const json = await response.json()

        if (response.ok) {
            await dispatch({ type: 'ADD_BLOG', payload: json })
            navigate("/")
        }

        if (!response.ok) {
            throw Error("Something went wrong trying to post your blog, try again")
        }
    }
    return (
        <div className="parent-div">
            <form className="postForm" onSubmit={(e) => postBlog(e)}>
                <input className="post-field" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title of the blog..." />
                <textarea className="post-field" value={text} onChange={(e) => setText(e.target.value)} placeholder="Type your blog's content..."></textarea>
                <input className="post-field" type="submit" placeholder="text" />
            </form>


        </div>
    )
}

export default PostBlog