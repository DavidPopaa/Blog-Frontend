// import { useUpdateInfoContext } from "../hooks/useUpdateInfoContext"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import '../css/Update.css'


const UpdateBlog = () => {
    const previous_data = JSON.parse(localStorage.getItem('update'))
    const [title, setTitle] = useState(previous_data.title)
    const [text, setText] = useState(previous_data.text)
    const [id, setId] = useState(previous_data.id)
    const navigate = useNavigate()

    const updateblog = async (title, text, id, e) => {
        e.preventDefault()
        const response = await fetch("/api/blog/update/" + id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, text })
        })

        if (response.ok) {
            localStorage.removeItem('update')
            navigate("/")
        }
    }
    return (
        <div className="update-div-parent">
            <form className="form" onSubmit={(e) => updateblog(title, text, id, e)}>
                <input className="input-update" value={title} onChange={(e) => setTitle(e.target.value)}></input>
                <input className="input-update" value={text} onChange={(e) => setText(e.target.value)}></input>
                <input className="input-update" type="submit" value="Update" />
            </form>
        </div>
    )
}

export default UpdateBlog