import { createContext, useReducer } from "react";

export const BlogContext = createContext()

export const blogreducer = (state, action) => {
    switch(action.type) {
        case 'SET_ALL_BLOGS':
            return { blogs : action.payload }
        case 'DELETE_BLOG':
            return { blogs: state.blogs.filter((blog) => blog._id !== action.payload) }
        case 'ADD_BLOG':
            return { blogs: [action.payload, ...state.blogs] }
        default:
            return null
    }
}

export const BlogContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(blogreducer, {
        blogs: null
    })

    return (
        <BlogContext.Provider value={{...state, dispatch}}>
            {children}
        </BlogContext.Provider>
    )
    
}