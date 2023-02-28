import { useBlogContext } from "./useBlogContext"

export const useDeleteBlog = () => {
    const { dispatch } = useBlogContext()
    const deleteBlog = async(id) => {
        const response = await fetch('/api/blog/delete/' + id, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        })
        const json = await response.json()
      
        if(response.ok) {
           await dispatch({ type: 'DELETE_BLOG', payload: json._id })
        }

        if(!response.ok) {
            console.log(json.msg)
        }
    }
    return { deleteBlog }
}